@echo off
title Launch Eligible Schemes Finder
echo ========================================================
echo    Launching Eligible Schemes Finder Full-Stack App
echo ========================================================
echo.

echo [1/3] Starting Spring Boot Backend (Port 8080)...
start "Backend - Spring Boot" cmd /k "cd /d "%~dp0backend" && mvnw.cmd spring-boot:run"

echo [2/3] Starting React Vite Frontend (Port 5173)...
start "Frontend - React Vite" cmd /k "cd /d "%~dp0frontend" && npm.cmd run dev"

echo [3/3] Waiting for servers to initialize...
timeout /t 5 >nul

echo Opening browser at http://localhost:5173...
start http://localhost:5173

echo.
echo Both servers are running in separate terminal windows!
echo - Backend API:  http://localhost:8080/api/schemes
echo - H2 Database:  http://localhost:8080/h2-console
echo - Frontend UI:  http://localhost:5173
echo.
pause
