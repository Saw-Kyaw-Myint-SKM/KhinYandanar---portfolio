@echo off
cls
color 0A
echo.
echo  ╔════════════════════════════════════════╗
echo  ║   TAILWIND CSS FIX - ONE CLICK         ║
echo  ╚════════════════════════════════════════╝
echo.
echo  This will fix the Tailwind CSS error.
echo  It will take about 3 minutes.
echo.
echo  Press any key to start...
pause >nul

echo.
echo [1/6] Stopping any running servers...
taskkill /F /IM node.exe >nul 2>&1
timeout /t 2 /nobreak >nul
echo      ✓ Done

echo.
echo [2/6] Deleting node_modules...
if exist node_modules (
    rmdir /s /q node_modules
    echo      ✓ Done
) else (
    echo      ✓ Already deleted
)

echo.
echo [3/6] Deleting package-lock.json...
if exist package-lock.json (
    del package-lock.json
    echo      ✓ Done
) else (
    echo      ✓ Already deleted
)

echo.
echo [4/6] Cleaning npm cache...
npm cache clean --force >nul 2>&1
echo      ✓ Done

echo.
echo [5/6] Installing dependencies...
echo      (This takes 2-3 minutes, please wait...)
npm install
echo      ✓ Done

echo.
echo [6/6] Starting development server...
echo.
echo  ╔════════════════════════════════════════╗
echo  ║   FIX COMPLETE!                        ║
echo  ║   Opening your portfolio...            ║
echo  ╚════════════════════════════════════════╝
echo.
echo  Your portfolio will open at:
echo  http://localhost:5173
echo.
echo  Press Ctrl+C to stop the server
echo.

npm run dev
