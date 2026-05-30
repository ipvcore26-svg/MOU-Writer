#!/bin/bash
set -e

WORKSPACE="/workspaces/MOU-Writer"

echo "==> Installing backend dependencies..."
cd "$WORKSPACE/backend" && npm install

echo "==> Installing frontend dependencies..."
cd "$WORKSPACE/frontend" && npm install

echo "==> Creating template directory..."
mkdir -p "$WORKSPACE/backend/templates"
mkdir -p "$WORKSPACE/backend/uploads"

echo "==> Setup complete."
