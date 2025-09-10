@echo off

echo *************************************************
echo ***           Starting Frontend             ***
echo *************************************************
echo.
echo Make sure you have Python installed and available in your PATH.

REM Change directory to the frontend folder
cd frontend

REM Start a simple HTTP server using Python
REM This will serve the frontend on http://localhost:8000
python -m http.server 8000

