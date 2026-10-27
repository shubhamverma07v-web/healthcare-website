@echo off
set "PATH=C:\Users\shubham\.gemini\antigravity\scratch\nodejs\node-v20.18.0-win-x64;%PATH%"
cd /d "%~dp0"
echo ========================================================
echo   Launching MediGuide - Healthcare Information Platform
echo   Competition: DevFusion 2026
echo ========================================================
echo.
npm run dev
pause
