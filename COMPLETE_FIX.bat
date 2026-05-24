@echo off
echo ========================================
echo  COMPLETE TAILWIND CSS FIX
echo ========================================
echo.
echo This will completely reinstall everything with the correct versions.
echo.
pause

echo Step 1: Stopping any running servers...
taskkill /F /IM node.exe 2>nul
timeout /t 2 /nobreak >nul

echo Step 2: Removing old installation...
if exist node_modules (
    echo Deleting node_modules folder...
    rmdir /s /q node_modules
)
if exist package-lock.json (
    echo Deleting package-lock.json...
    del package-lock.json
)
if exist dist (
    echo Deleting dist folder...
    rmdir /s /q dist
)

echo.
echo Step 3: Installing correct versions...
echo This will take 2-3 minutes...
echo.

npm install

echo.
echo Step 4: Verifying Tailwind version...
npm list tailwindcss

echo.
echo ========================================
echo  Installation Complete!
echo ========================================
echo.
echo Now starting the development server...
echo.

npm run dev

pause
