$ErrorActionPreference = 'Stop'
$ffmpeg = "C:\Users\Crew\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1.1-full_build\bin\ffmpeg.exe"
if (-not (Test-Path $ffmpeg)) {
    $f = Get-Command ffmpeg -ErrorAction SilentlyContinue
    if ($f) { $ffmpeg = $f.Source } else { throw "ffmpeg not found" }
}

$root = "c:\Users\Crew\llab scrape"
$mp4s = Get-ChildItem $root -Recurse -Filter *.mp4 | Sort-Object FullName

$ok = 0; $fail = 0; $savedBytes = 0L
foreach ($src in $mp4s) {
    $rel = $src.FullName.Substring($root.Length + 1)
    $origSize = $src.Length
    Write-Host ("-> {0} ({1:N2} MB)" -f $rel, ($origSize/1MB))

    $tmp = $src.FullName + ".tmp.mp4"
    $passlog = $src.FullName + ".pass"

    # 2-pass ABR @ 500 kbps with 500 kbps peak cap, no audio.
    & $ffmpeg -y -loglevel error -i $src.FullName `
        -c:v libx264 -preset medium `
        -b:v 500k -maxrate 500k -bufsize 1000k `
        -pix_fmt yuv420p `
        -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" `
        -movflags +faststart -an `
        -pass 1 -passlogfile $passlog -f mp4 NUL
    if ($LASTEXITCODE -ne 0) { Write-Host "   FAIL pass1 (exit $LASTEXITCODE)" -ForegroundColor Red; $fail++; continue }

    & $ffmpeg -y -loglevel error -i $src.FullName `
        -c:v libx264 -preset medium `
        -b:v 500k -maxrate 500k -bufsize 1000k `
        -pix_fmt yuv420p `
        -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" `
        -movflags +faststart -an `
        -pass 2 -passlogfile $passlog $tmp
    $rc = $LASTEXITCODE

    # Clean up pass logfiles
    Get-ChildItem -Path ($passlog + "*") -ErrorAction SilentlyContinue | Remove-Item -Force -ErrorAction SilentlyContinue

    if ($rc -eq 0 -and (Test-Path $tmp)) {
        $newSize = (Get-Item $tmp).Length
        Remove-Item $src.FullName -Force
        Move-Item $tmp $src.FullName
        $delta = $origSize - $newSize
        $savedBytes += $delta
        Write-Host ("   OK -> {0:N2} MB (saved {1:N2} MB)" -f ($newSize/1MB), ($delta/1MB)) -ForegroundColor Green
        $ok++
    } else {
        Write-Host "   FAIL pass2 (exit $rc)" -ForegroundColor Red
        if (Test-Path $tmp) { Remove-Item $tmp -Force }
        $fail++
    }
}

Write-Host ""
Write-Host ("Done: $ok re-encoded, $fail failed. Total saved: {0:N1} MB" -f ($savedBytes/1MB)) -ForegroundColor Cyan
