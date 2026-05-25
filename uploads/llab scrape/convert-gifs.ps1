$ErrorActionPreference = 'Stop'
$ffmpeg = "C:\Users\Crew\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1.1-full_build\bin\ffmpeg.exe"
if (-not (Test-Path $ffmpeg)) {
    $f = Get-Command ffmpeg -ErrorAction SilentlyContinue
    if ($f) { $ffmpeg = $f.Source } else { throw "ffmpeg not found" }
}

$root = "c:\Users\Crew\llab scrape"
$gifs = Get-ChildItem $root -Recurse -Filter *.gif | Sort-Object FullName

$ok = 0; $fail = 0; $savedBytes = 0L
foreach ($gif in $gifs) {
    $mp4 = [System.IO.Path]::ChangeExtension($gif.FullName, ".mp4")
    $rel = $gif.FullName.Substring($root.Length + 1)
    Write-Host ("-> {0} ({1:N1} MB)" -f $rel, ($gif.Length/1MB))
    if (Test-Path $mp4) { Remove-Item $mp4 -Force }
    # -y overwrite, -loglevel error keeps output quiet, scale filter ensures even dimensions for yuv420p
    & $ffmpeg -y -loglevel error -i $gif.FullName `
        -movflags +faststart `
        -pix_fmt yuv420p `
        -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" `
        -c:v libx264 -crf 23 -preset medium `
        $mp4
    if ($LASTEXITCODE -eq 0 -and (Test-Path $mp4)) {
        $mp4Size = (Get-Item $mp4).Length
        $delta = $gif.Length - $mp4Size
        $savedBytes += $delta
        Write-Host ("   OK -> {0:N1} MB (saved {1:N1} MB)" -f ($mp4Size/1MB), ($delta/1MB)) -ForegroundColor Green
        Remove-Item $gif.FullName -Force
        $ok++
    } else {
        Write-Host ("   FAIL (exit $LASTEXITCODE)") -ForegroundColor Red
        $fail++
    }
}

Write-Host ""
Write-Host ("Done: $ok converted, $fail failed. Total saved: {0:N1} MB" -f ($savedBytes/1MB)) -ForegroundColor Cyan
