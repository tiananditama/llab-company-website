$ErrorActionPreference = 'Stop'
$ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36"
$root = "c:\Users\Crew\llab scrape"

$projects = @(
    "A-Duel-Dual-Phone",
    "Citizens-of-Tmrw",
    "Dairy-Queen-Xmas-Campaign",
    "Do-Great-Things",
    "Gaming-In-The-Sky",
    "Intel-Unison",
    "Legion-x-Jasmine-Sokko",
    "My-Many-Selves",
    "November-Shopathon",
    "Power-In-Your-Hands"
)

function Html-ToMarkdown {
    param([string]$html)
    $t = $html
    # Block-level tags -> newlines (headings preserved with markdown prefix)
    $t = [regex]::Replace($t, '(?is)<h1[^>]*>(.*?)</h1>', "`n`n# `$1`n`n")
    $t = [regex]::Replace($t, '(?is)<h2[^>]*>(.*?)</h2>', "`n`n## `$1`n`n")
    $t = [regex]::Replace($t, '(?is)<h3[^>]*>(.*?)</h3>', "`n`n### `$1`n`n")
    $t = [regex]::Replace($t, '(?is)<h4[^>]*>(.*?)</h4>', "`n`n#### `$1`n`n")
    $t = [regex]::Replace($t, '(?is)<br\s*/?>', "`n")
    $t = [regex]::Replace($t, '(?is)</p>', "`n`n")
    $t = [regex]::Replace($t, '(?is)</div>', "`n")
    $t = [regex]::Replace($t, '(?is)<li[^>]*>', "- ")
    $t = [regex]::Replace($t, '(?is)</li>', "`n")
    # Remove script/style content entirely
    $t = [regex]::Replace($t, '(?is)<style[^>]*>.*?</style>', '')
    $t = [regex]::Replace($t, '(?is)<script[^>]*>.*?</script>', '')
    # Strip remaining tags
    $t = [regex]::Replace($t, '(?is)<[^>]+>', '')
    # Decode HTML entities
    $t = [System.Net.WebUtility]::HtmlDecode($t)
    # Normalize whitespace: collapse 3+ newlines to 2, trim each line's trailing spaces
    $t = [regex]::Replace($t, '[ \t]+\r?\n', "`n")
    $t = [regex]::Replace($t, '\r\n', "`n")
    $t = [regex]::Replace($t, '\n{3,}', "`n`n")
    # Replace non-breaking spaces with regular spaces
    $t = $t -replace [char]0x00A0, ' '
    $t = $t.Trim()
    return $t
}

function Get-MainProjectContent {
    param([string]$html)
    # Find all <projectcontent>...</projectcontent> blocks, return the project body.
    # Cargo wraps a project page in several blocks: a logo/nav header, optional <style>-only
    # blocks, the real project body, and a footer with copyright. We skip header (nav links to
    # Projects/Approach/Contact) and footer (copyright), then pick the longest remaining block
    # measured after stripping inline <style>/<script> so animation keyframes don't inflate it.
    $matches = [regex]::Matches($html, '(?is)<projectcontent[^>]*>(.*?)</projectcontent>')
    if ($matches.Count -eq 0) { return $null }
    $best = $null
    $bestLen = -1
    foreach ($m in $matches) {
        $body = $m.Groups[1].Value
        if ($body -match 'All Rights Reserved' -or $body -match '©\s*\d{4}\s*Liquidlab') { continue }
        $hasNav = ($body -match 'href="Projects"') -and ($body -match 'href="Approach"') -and ($body -match 'href="Contact"')
        if ($hasNav) { continue }
        $measure = [regex]::Replace($body, '(?is)<style[^>]*>.*?</style>', '')
        $measure = [regex]::Replace($measure, '(?is)<script[^>]*>.*?</script>', '')
        if ($measure.Length -gt $bestLen) {
            $bestLen = $measure.Length
            $best = $body
        }
    }
    return $best
}

function Get-PageTitle {
    param([string]$html)
    $m = [regex]::Match($html, '(?is)<title>(.*?)</title>')
    if ($m.Success) { return [System.Net.WebUtility]::HtmlDecode($m.Groups[1].Value).Trim() }
    return ""
}

foreach ($slug in $projects) {
    $url = "https://liquid-lab.com/$slug"
    Write-Host "=== $slug ===" -ForegroundColor Cyan
    Write-Host "  fetching $url"
    try {
        $r = Invoke-WebRequest -Uri $url -UserAgent $ua -UseBasicParsing
    } catch {
        Write-Host "  FAILED: $($_.Exception.Message)" -ForegroundColor Red
        continue
    }
    $html = $r.Content
    $title = Get-PageTitle $html
    $body = Get-MainProjectContent $html
    if (-not $body) {
        Write-Host "  no projectcontent block found" -ForegroundColor Yellow
        continue
    }

    # Extract image URLs in order (data-src preferred, then src), only freight.cargo.site
    $imgUrls = New-Object System.Collections.Generic.List[string]
    foreach ($m in [regex]::Matches($body, '<img\b[^>]*?(?:data-src|src)\s*=\s*"([^"]+)"')) {
        $u = $m.Groups[1].Value
        if ($u -match 'freight\.cargo\.site') { $imgUrls.Add($u) }
    }
    # Also catch data-src that appears after src on same tag (fallback)
    foreach ($m in [regex]::Matches($body, 'data-src\s*=\s*"(https?://freight\.cargo\.site/[^"]+)"')) {
        $u = $m.Groups[1].Value
        if (-not $imgUrls.Contains($u)) { $imgUrls.Add($u) }
    }

    # Prepare folder
    $folder = Join-Path $root $slug
    if (-not (Test-Path $folder)) { New-Item -ItemType Directory -Path $folder | Out-Null }
    $imgFolder = Join-Path $folder "images"
    if ($imgUrls.Count -gt 0 -and -not (Test-Path $imgFolder)) { New-Item -ItemType Directory -Path $imgFolder | Out-Null }

    # Download images
    $i = 0
    foreach ($u in $imgUrls) {
        $i++
        $leaf = [System.IO.Path]::GetFileName(($u -split '\?')[0])
        if (-not $leaf) { $leaf = "img$i.bin" }
        $name = "{0:D2}-{1}" -f $i, $leaf
        $dest = Join-Path $imgFolder $name
        if (Test-Path $dest) { Write-Host "  [skip] $name" ; continue }
        try {
            Invoke-WebRequest -Uri $u -UserAgent $ua -UseBasicParsing -OutFile $dest
            Write-Host "  [img] $name"
        } catch {
            Write-Host "  [img-fail] $u : $($_.Exception.Message)" -ForegroundColor Red
        }
    }

    # Write markdown (main body text only — strip tags, no frontmatter)
    $md = Html-ToMarkdown $body
    $mdPath = Join-Path $folder "index.md"
    [System.IO.File]::WriteAllText($mdPath, $md, (New-Object System.Text.UTF8Encoding($false)))
    Write-Host "  [md] $mdPath ($($md.Length) chars, $($imgUrls.Count) images)"
}

Write-Host "DONE" -ForegroundColor Green
