#!/usr/bin/env python3
"""
Quick backend health check and test runner
"""
import subprocess
import time
import requests
import sys

# Start backend server
print("Starting backend server...")
backend_proc = subprocess.Popen(
    [sys.executable, "-m", "uvicorn", "main:app", "--host", "127.0.0.1", "--port", "8001"],
    cwd="C:\\Users\\vedan\\illustration-prototype\\backend",
    stdout=subprocess.PIPE,
    stderr=subprocess.STDOUT,
    text=True,
    bufsize=1
)

print("Waiting for server startup...")
time.sleep(3)

# Check health
try:
    r = requests.get("http://127.0.0.1:8001/docs", timeout=5)
    print(f"Server health check: {r.status_code}")
except Exception as e:
    print(f"Server health check failed: {e}")

print("Server is running. Press Ctrl+C to stop.")
try:
    for line in backend_proc.stdout:
        print(line, end="")
except KeyboardInterrupt:
    print("Stopping server...")
    backend_proc.terminate()
    backend_proc.wait()
