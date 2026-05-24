@echo off
echo ========================================
echo  Fixing Tailwind CSS and Starting Dev Server
echo ========================================
echo.

echo Step 1: Cleaning old installation...
if exist node_modules (
    rmdir /s /q node_modules
    echo - Removed node_modules
)

if exist package-lock.json (
    del package-lock.json
    echo - Removed package-lock.json
)

echo.
echo Step 2: Installing dependencies...
echo This may take 2-3 minutes...
call npm install

echo.
echo Step 3: Starting development server...
echo.
echo Your portfolio will open at: http://localhost:5173
echo Press Ctrl+C to stop the server
echo.

call npm run dev

pause
