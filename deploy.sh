#!/usr/bin/env bash
set -e

BRANCH="claude/pensive-cannon-5k4By"

echo "==> Fetching latest code from branch: $BRANCH"
git fetch origin "$BRANCH"
git checkout "$BRANCH"
git pull origin "$BRANCH"

echo "==> Stopping existing containers"
docker compose down

echo "==> Building images (no cache)"
docker compose build --no-cache

echo "==> Starting containers"
docker compose up -d

echo "==> Container status"
docker compose ps

echo ""
echo "Done. App is running at:"
echo "  Dashboard  ->  http://localhost"
echo "  Admin      ->  http://localhost/admin"
echo "  API        ->  http://localhost:3001"
