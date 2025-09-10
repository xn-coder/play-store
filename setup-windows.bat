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
    echo Java: Found
    java -version
)

REM Check for Maven
where mvn >nul 2>nul
if %errorlevel% neq 0 (
    echo Maven: Not Found. Please install Maven 3.6 or higher.
    exit /b 1
) else (
    echo Maven: Found
    mvn -version
)

echo.
echo All prerequisites are installed.
