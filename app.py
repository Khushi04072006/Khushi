"""
Nutrition Agentic AI — Flask Web Application
IBM Granite LLM · HAM Tone · Guardrails · Medical Disclaimer
"""

import os
import re
import json
from datetime import datetime
from pathlib import Path
from flask import Flask, render_template, request, jsonify, send_file, session
from agents.nutrition_agent import generate_nutrition_plan, answer_query

app = Flask(__name__)
app.secret_key = os.environ.get("FLASK_SECRET_KEY", "nutri-granite-secret-2024")

PLANS_DIR = Path("plans")
PLANS_DIR.mkdir(exist_ok=True)


# ── Helper ────────────────────────────────────────────────────────────────────
def sanitise_filename(name: str) -> str:
    return re.sub(r"[^a-zA-Z0-9_\-]", "_", name)


# ── Routes ────────────────────────────────────────────────────────────────────
@app.route("/")
def index():
    return render_template("index.html")


@app.route("/plan", methods=["GET"])
def plan_page():
    return render_template("plan.html")


@app.route("/chat", methods=["GET"])
def chat_page():
    return render_template("chat.html")


@app.route("/api/generate_plan", methods=["POST"])
def api_generate_plan():
    """Receive user profile JSON, generate nutrition plan, save as .md, return plan text."""
    try:
        data = request.get_json(force=True)

        # Basic validation
        required = ["name", "age", "diet_preference", "city", "country"]
        missing  = [f for f in required if not data.get(f)]
        if missing:
            return jsonify({"error": f"Missing fields: {', '.join(missing)}"}), 400

        # Age validation
        try:
            age = int(data["age"])
            if not (1 <= age <= 120):
                raise ValueError()
        except ValueError:
            return jsonify({"error": "Age must be a number between 1 and 120."}), 400

        # Store user context in session for chat
        session["user_context"] = {
            "name": data["name"],
            "age": age,
            "diet_preference": data["diet_preference"],
            "medical_history": data.get("medical_history", "None"),
            "city": data["city"],
            "country": data["country"],
            "goal": data.get("goal", "General health and wellness"),
            "allergies": data.get("allergies", "None"),
            "gender": data.get("gender", "Not specified"),
        }

        plan_md = generate_nutrition_plan(session["user_context"])

        # Save to .md file
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        safe_name = sanitise_filename(data["name"])
        filename  = f"NutritionPlan_{safe_name}_{timestamp}.md"
        filepath  = PLANS_DIR / filename

        filepath.write_text(plan_md, encoding="utf-8")

        return jsonify({
            "success": True,
            "plan": plan_md,
            "filename": filename
        })

    except Exception as e:
        return jsonify({"error": f"Server error: {str(e)}"}), 500


@app.route("/api/chat", methods=["POST"])
def api_chat():
    """Handle Q&A chat messages."""
    try:
        data     = request.get_json(force=True)
        question = data.get("message", "").strip()

        if not question:
            return jsonify({"error": "Message cannot be empty."}), 400

        if len(question) > 1000:
            return jsonify({"error": "Message too long (max 1000 characters)."}), 400

        user_context = session.get("user_context", None)
        answer = answer_query(question, user_context)

        return jsonify({"success": True, "answer": answer})

    except Exception as e:
        return jsonify({"error": f"Server error: {str(e)}"}), 500


@app.route("/api/download_plan/<filename>")
def download_plan(filename):
    """Download a previously generated nutrition plan .md file."""
    safe = sanitise_filename(filename.replace(".md", "")) + ".md"
    filepath = PLANS_DIR / safe
    if not filepath.exists():
        return jsonify({"error": "File not found."}), 404
    return send_file(str(filepath), as_attachment=True, download_name=safe)


@app.route("/api/health")
def health():
    return jsonify({"status": "ok", "app": "NutriGuide AI", "model": "IBM Granite"})


# ── Entry Point ───────────────────────────────────────────────────────────────
if __name__ == "__main__":
    import sys
    # Force UTF-8 output so emoji print correctly on Windows
    if sys.stdout.encoding != "utf-8":
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    print("\n" + "="*60)
    print("  NutriGuide - Nutrition Agentic AI")
    print("  Powered by IBM Granite LLM via watsonx.ai")
    print("  http://127.0.0.1:5000")
    print("="*60 + "\n")
    app.run(debug=True, host="0.0.0.0", port=5000)
