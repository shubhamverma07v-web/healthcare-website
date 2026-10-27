$env:PATH = "C:\Users\shubham\.gemini\antigravity\scratch\nodejs\node-v20.18.0-win-x64;" + $env:PATH
Set-Location $PSScriptRoot
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "  Launching MediGuide - Healthcare Information Platform" -ForegroundColor Cyan
Write-Host "  Competition: DevFusion 2026" -ForegroundColor Cyan
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "Starting Vite development server..." -ForegroundColor Green
npm run dev
