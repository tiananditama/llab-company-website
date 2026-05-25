$ErrorActionPreference = 'Stop'
$ffmpeg = "C:\Users\Crew\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1.1-full_build\bin\ffmpeg.exe"
if (-not (Test-Path $ffmpeg)) {
    $f = Get-Command ffmpeg -ErrorAction SilentlyContinue
    if ($f) { $ffmpeg = $f.Source } else { throw "ffmpeg not found" }
}

$root = "c:\Users\Crew\llab scrape"
$pngs = Get-ChildItem $root -Recurse -Filter *.png | Sort-Object FullName

$ok = 0; $fail = 0; $savedBytes = 0L
foreach ($png in $pngs) {
    $webp = [System.IO.Path]::ChangeExtension($png.FullName, ".webp")
    $rel = $png.FullName.Substring($root.Length + 1)
    Write-Host ("-> {0} ({1:N2} MB)" -f $rel, ($png.Length/1MB))
    if (Test-Path $webp) { Remove-Item $webp -Force }
    & $ffmpeg -y -loglevel error -i $png.FullName -c:v libwebp -quality 70 $webp
    if ($LASTEXITCODE -eq 0 -and (Test-Path $webp)) {
        $newSize = (Get-Item $webp).Length
        $delta = $png.Length - $newSize
        $savedBytes += $delta
        Write-Host ("   OK -> {0:N2} MB (saved {1:N2} MB)" -f ($newSize/1MB), ($delta/1MB)) -ForegroundColor Green
        Remove-Item $png.FullName -Force
        $ok++
    } else {
        Write-Host ("   FAIL (exit $LASTEXITCODE)") -ForegroundColor Red
        $fail++
    }
}

Write-Host ""
Write-Host ("Done: $ok converted, $fail failed. Total saved: {0:N1} MB" -f ($savedBytes/1MB)) -ForegroundColor Cyan
