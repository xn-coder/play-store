@echo off

echo *************************************************
echo ***        Verifying Prerequisites          ***
echo *************************************************

REM Check for Java
where java >nul 2>nul
if %errorlevel% neq 0 (
    echo Java: Not Found. Please install Java 17 or higher.
    exit /b 1
) else (
    for /f "tokens=2 delims=^"" %%a in ('java -version 2^>^&1 ^| findstr "version" ') do (
        echo Java: Found (%%a^)
    )
)

REM Check for Maven
where mvn >nul 2>nul
if %errorlevel% neq 0 (
    echo Maven: Not Found. Please install Maven 3.6 or higher.
    exit /b 1
) else (
    for /f "tokens=3" %%a in ('mvn -version 2^>^&1 ^| findstr "Apache Maven" ') do (
        echo Maven: Found (%%a^)
    )
)

echo.
echo All prerequisites are installed.
