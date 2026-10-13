@echo off
title NutriGuide AI — IBM Granite Nutrition Assistant
color 0A

echo.
echo  ============================================================
echo    NutriGuide AI — Nutrition Agentic AI Application
echo    Powered by IBM Granite LLM via watsonx.ai
echo  ============================================================
echo.

:: ── Check Python ──────────────────────────────────────────────
python --version >nul 2>&1
if errorlevel 1 (
    echo  [ERROR] Python is not installed or not in PATH.
    echo  Please download Python 3.10+ from: https://www.python.org/downloads/
    echo  Make sure to check "Add Python to PATH" during installation.
    pause
    exit /b 1
)
echo  [OK] Python found.

:: ── Create virtual environment if missing ─────────────────────
if not exist "venv\" (
    echo  [SETUP] Creating virtual environment...
    python -m venv venv
    if errorlevel 1 (
        echo  [ERROR] Failed to create virtual environment.
        pause
        exit /b 1
    )
    echo  [OK] Virtual environment created.
)

:: ── Activate virtual environment ──────────────────────────────
echo  [SETUP] Activating virtual environment...
call venv\Scripts\activate.bat

:: ── Install / upgrade dependencies ────────────────────────────
echo  [SETUP] Installing dependencies (this may take a minute)...
pip install -r requirements.txt --quiet
if errorlevel 1 (
    echo  [ERROR] Failed to install dependencies.
    pause
    exit /b 1
)
echo  [OK] Dependencies installed.

:: ── Create plans directory if missing ─────────────────────────
if not exist "plans\" (
    mkdir plans
    echo  [OK] Plans directory created.
)

:: ── Copy .env.example to .env if .env doesn't exist ───────────
if not exist ".env" (
    if exist ".env.example" (
        copy ".env.example" ".env" >nul
        echo  [INFO] .env file created from .env.example
        echo  [INFO] Edit .env to add your IBM watsonx.ai credentials (optional).
    )
)

echo.
echo  ============================================================
echo    Starting NutriGuide AI Server...
echo    Open your browser at: http://127.0.0.1:5000
echo    Press Ctrl+C to stop the server.
echo  ============================================================
echo.

:: ── Launch Flask application ───────────────────────────────────
start "" "http://127.0.0.1:5000"
python app.py

:: ── On server exit ─────────────────────────────────────────────
echo.
echo  Server stopped. Press any key to close.
pause >nul
