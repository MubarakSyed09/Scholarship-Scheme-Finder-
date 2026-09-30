# Eligible Schemes Finder - PowerShell One-Click Launcher

Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "   Launching Eligible Schemes Finder Full-Stack App     " -ForegroundColor Yellow
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host ""

$root = $PSScriptRoot

# 1. Start Backend in separate process
Write-Host "[1/3] Starting Spring Boot Backend (Port 8080)..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$root\backend'; .\mvnw.cmd spring-boot:run"

# 2. Start Frontend in separate process
Write-Host "[2/3] Starting React Vite Frontend (Port 5173)..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$root\frontend'; npm.cmd run dev"

# 3. Wait and open browser
Write-Host "[3/3] Waiting for servers to initialize..." -ForegroundColor Yellow
Start-Sleep -Seconds 4
Start-Process "http://localhost:5173"

Write-Host ""
Write-Host "🚀 Both servers launched successfully!" -ForegroundColor Green
Write-Host " - Frontend UI: http://localhost:5173" -ForegroundColor White
Write-Host " - Backend API: http://localhost:8080/api/schemes" -ForegroundColor White
Write-Host " - H2 Console:  http://localhost:8080/h2-console" -ForegroundColor White
Write-Host ""
