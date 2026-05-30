#!/bin/bash

WORKSPACE="/workspaces/MOU-Writer"
LOG_DIR="$WORKSPACE/.devcontainer/logs"
mkdir -p "$LOG_DIR"

# Always pull latest code so stale builds never run
echo "==> Pulling latest code..."
git -C "$WORKSPACE" pull origin claude/gallant-bohr-DXQe7 2>&1 || true

echo "==> Installing any new dependencies..."
cd "$WORKSPACE/backend"  && npm install --silent
cd "$WORKSPACE/frontend" && npm install --silent

# Kill any existing processes on our ports
pkill -f "node server.js" 2>/dev/null || true
pkill -f "vite"           2>/dev/null || true
sleep 1

echo "==> Starting backend on port 3001..."
cd "$WORKSPACE/backend"
nohup node server.js > "$LOG_DIR/backend.log" 2>&1 &
echo "    Backend PID: $!"

echo "==> Starting frontend on port 5173..."
cd "$WORKSPACE/frontend"
nohup npx vite --host 0.0.0.0 --port 5173 > "$LOG_DIR/frontend.log" 2>&1 &
echo "    Frontend PID: $!"

echo ""
echo "==> Services started."
echo "    Dashboard  -->  http://localhost:5173"
echo "    API        -->  http://localhost:3001"
echo ""
echo "    (Codespaces will show forwarded public URLs in the PORTS tab)"
