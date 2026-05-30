$ErrorActionPreference = "Stop"
$Branch = "claude/pensive-cannon-5k4By"

Write-Host "==> Fetching latest code from branch: $Branch" -ForegroundColor Cyan
git fetch origin $Branch
git checkout $Branch
git pull origin $Branch

Write-Host "==> Stopping existing containers" -ForegroundColor Cyan
docker compose down

Write-Host "==> Building images (no cache)" -ForegroundColor Cyan
docker compose build --no-cache

Write-Host "==> Starting containers" -ForegroundColor Cyan
docker compose up -d

Write-Host "==> Container status" -ForegroundColor Cyan
docker compose ps

Write-Host ""
Write-Host "Done. App is running at:" -ForegroundColor Green
Write-Host "  Dashboard  -->  http://localhost" -ForegroundColor Green
Write-Host "  Admin      -->  http://localhost/admin" -ForegroundColor Green
Write-Host "  API        -->  http://localhost:3001" -ForegroundColor Green
