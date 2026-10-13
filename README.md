# 🥗 NutriGuide — Nutrition Agentic AI Application

> **Powered by IBM Granite LLM via IBM watsonx.ai**

[![Python](https://img.shields.io/badge/Python-3.10%2B-blue?logo=python)](https://python.org)
[![Flask](https://img.shields.io/badge/Flask-3.0-lightgrey?logo=flask)](https://flask.palletsprojects.com)
[![IBM Granite](https://img.shields.io/badge/IBM-Granite%20LLM-purple?logo=ibm)](https://www.ibm.com/products/watsonx-ai)
[![License: MIT](https://img.shields.io/badge/License-MIT-green)](LICENSE)

---

## 📋 Table of Contents

1. [Project Overview](#-project-overview)
2. [Agentic AI SDLC Phases](#-agentic-ai-sdlc-phases)
3. [Features](#-features)
4. [Technology Stack](#-technology-stack)
5. [Project Structure](#-project-structure)
6. [Quick Start](#-quick-start)
7. [IBM watsonx.ai Setup](#-ibm-watsonxai-setup)
8. [Environment Variables](#-environment-variables)
9. [Usage Guide](#-usage-guide)
10. [AI Ethics & Guardrails](#-ai-ethics--guardrails)
11. [Medical Disclaimer](#-medical-disclaimer)
12. [Task 1 — GitHub Setup](#-task-1--github-setup)

---

## 🌟 Project Overview

**NutriGuide** is a web-based **Agentic AI** application that generates personalised 7-day nutrition plans using **IBM Granite LLM** (via IBM watsonx.ai). It collects user profile details, analyses them using advanced AI, and produces science-backed dietary recommendations tailored to the individual's age, diet preference, medical history, and geographic location.

### Key Highlights
- 🤖 **Agentic AI** — multi-step reasoning: profile collection → analysis → plan generation → Q&A
- 🧠 **IBM Granite LLM** — enterprise-grade foundation model via IBM watsonx.ai
- 🛡️ **Ethical AI** — HAM (Helpful, Accurate, Mindful) principles with safety guardrails
- 🩺 **Medical Awareness** — adapts for diabetes, hypertension, and other conditions
- 📄 **Downloadable Plans** — saves personalised plan as `.md` file
- 💬 **Agentic Chat** — real-time Q&A nutritional assistant

---

## 🔄 Agentic AI SDLC Phases

| Phase | Description | Implementation |
|-------|-------------|---------------|
| **1. Problem Definition** | Identify nutrition planning as high-impact AI use case | User profile collection & personalised planning |
| **2. Data & Knowledge** | Domain knowledge encoding + LLM grounding | IBM Granite model + rule-based fallback engine |
| **3. Agent Design** | Design agentic reasoning loop | `agents/nutrition_agent.py` — perception → reasoning → action |
| **4. Guardrails & Ethics** | Safety filters, HAM tone, disclaimer | Keyword-based guardrails, medical disclaimers |
| **5. Development** | Full-stack web implementation | Flask backend + HTML/CSS/JS frontend |
| **6. Testing** | Validate agent responses | Rule-based fallback tested offline |
| **7. Deployment** | Production-ready packaging | `.bat` launcher, `requirements.txt`, GitHub repo |
| **8. Monitoring** | Continuous improvement | Extensible architecture for logging & feedback |

---

## ✨ Features

- ✅ Personalised 7-day meal plan (Breakfast, Snack, Lunch, Snack, Dinner)
- ✅ Daily macro and calorie targets (protein, carbs, fats)
- ✅ Medical condition support (diabetes, hypertension, etc.)
- ✅ Vegetarian / Non-vegetarian / Vegan / Pescatarian support
- ✅ Location-aware food recommendations
- ✅ Hydration and lifestyle tips
- ✅ Downloadable `.md` nutrition plan file
- ✅ Agentic Q&A chat (IBM Granite powered)
- ✅ Ethical AI guardrails (blocks harmful advice)
- ✅ HAM tone — Helpful, Accurate, Mindful
- ✅ Offline rule-based fallback (no API key needed for demo)
- ✅ Responsive design (mobile-friendly)

---

## 🛠️ Technology Stack

| Layer | Technology |
|-------|-----------|
| **AI Model** | IBM Granite 13B Instruct v2 |
| **AI Platform** | IBM watsonx.ai |
| **Backend** | Python 3.10+, Flask 3.0 |
| **Frontend** | HTML5, CSS3, Vanilla JavaScript |
| **Markdown Renderer** | Marked.js (CDN) |
| **Plan Export** | Python file I/O → `.md` format |
| **Deployment** | Windows `.bat` launcher / Linux shell |

---

## 📁 Project Structure

```
nutrition-ai-app/
├── app.py                      # Flask web application (main entry point)
├── requirements.txt            # Python dependencies
├── .gitignore                  # Git ignore rules
├── .env.example                # Environment variable template
├── run.bat                     # Windows one-click launcher
├── README.md                   # This file
│
├── agents/
│   ├── __init__.py
│   └── nutrition_agent.py      # IBM Granite agent logic + guardrails
│
├── templates/
│   ├── index.html              # Landing page
│   ├── plan.html               # Nutrition plan form + result
│   └── chat.html               # Agentic Q&A chat interface
│
├── static/
│   ├── css/
│   │   └── style.css           # Full application stylesheet
│   └── js/
│       ├── main.js             # Homepage JS
│       ├── plan.js             # Plan page logic
│       └── chat.js             # Chat interface logic
│
└── plans/                      # Generated .md nutrition plans (auto-created)
    └── (NutritionPlan_*.md files saved here)
```

---

## 🚀 Quick Start

### Option A — Windows (Recommended)

```bat
1. Double-click  run.bat
```

That's it! The script will:
- Create a Python virtual environment
- Install all dependencies
- Start the Flask server
- Open the app at http://127.0.0.1:5000

---

### Option B — Manual Setup

#### Prerequisites
- Python 3.10 or higher → https://www.python.org/downloads/
- Git → https://git-scm.com/downloads

#### Steps

```bash
# 1. Clone the repository
git clone https://github.com/Khushi04072006/Khushi.git
cd Khushi

# 2. Create virtual environment
python -m venv venv

# Windows activation
venv\Scripts\activate

# macOS/Linux activation
source venv/bin/activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Configure environment variables (optional — see IBM watsonx.ai Setup)
copy .env.example .env
# Edit .env with your API credentials

# 5. Run the application
python app.py

# 6. Open browser
# Visit: http://127.0.0.1:5000
```

---

## 🔑 IBM watsonx.ai Setup

To use the **real IBM Granite LLM** (instead of the built-in rule-based fallback):

1. **Create an IBM Cloud account** → https://cloud.ibm.com/registration
2. **Provision Watson Machine Learning** service
3. **Create a watsonx.ai project** → https://dataplatform.cloud.ibm.com
4. **Generate an API Key** → IBM Cloud → Manage → Access → API Keys
5. **Copy your Project ID** from the watsonx.ai project settings

Then update your `.env` file:

```env
WATSONX_API_KEY=your_ibm_cloud_api_key_here
WATSONX_PROJECT_ID=your_watsonx_project_id_here
WATSONX_URL=https://us-south.ml.cloud.ibm.com
```

> 💡 **Without IBM credentials**, the app runs in **demo mode** using the built-in rule-based nutrition engine — all features work offline!

---

## 🔐 Environment Variables

Create a `.env` file in the project root (copy from `.env.example`):

```env
# IBM watsonx.ai Credentials (optional — enables IBM Granite LLM)
WATSONX_API_KEY=your_api_key_here
WATSONX_PROJECT_ID=your_project_id_here
WATSONX_URL=https://us-south.ml.cloud.ibm.com

# Flask Settings
FLASK_SECRET_KEY=your_random_secret_key_here
FLASK_ENV=development
```

> ⚠️ **NEVER commit your `.env` file to GitHub.** It is already in `.gitignore`.

---

## 📖 Usage Guide

### 1. Generate Your Nutrition Plan
1. Navigate to **My Plan** (http://127.0.0.1:5000/plan)
2. Fill in your profile:
   - Name, Age, Gender
   - Diet Preference (Vegetarian, Non-Veg, Vegan, Pescatarian)
   - Medical History (Diabetes, Blood Pressure, etc.)
   - Allergies, Health Goal
   - City & Country
3. Click **Generate My Nutrition Plan**
4. View your personalised 7-day plan
5. Click **Download .md** to save it

### 2. Ask NutriGuide (Agentic Chat)
1. Navigate to **Ask NutriGuide** (http://127.0.0.1:5000/chat)
2. Type any nutrition question or click a suggested prompt
3. Get instant, context-aware AI responses
4. Press **Enter** to send (Shift+Enter for new line)

---

## 🛡️ AI Ethics & Guardrails

NutriGuide follows responsible AI principles:

| Principle | Implementation |
|-----------|---------------|
| **Helpful** | Clear, actionable, science-based recommendations |
| **Accurate** | IBM Granite LLM + evidence-based fallback rules |
| **Mindful** | Warm, respectful, non-judgmental tone |
| **Safe** | Keyword guardrails block harmful advice (crash diets, self-harm, etc.) |
| **Transparent** | Always identifies as AI; never claims to replace a doctor |
| **Inclusive** | Supports diverse dietary preferences and medical conditions |
| **Privacy** | No user data stored permanently (session-only) |

---

## ⚕️ Medical Disclaimer

> **IMPORTANT:** NutriGuide is an AI-powered tool designed for **informational and educational purposes only**.
>
> The nutrition plans and advice generated by this application are **NOT** a substitute for professional medical advice, diagnosis, or treatment. Always seek the guidance of a qualified physician, registered dietitian, or other qualified health provider before making significant changes to your diet, especially if you have a pre-existing medical condition such as diabetes, hypertension, kidney disease, or any other chronic illness.
>
> The creators and developers of NutriGuide bear **no liability** for any health decisions made based on the information provided by this application.
>
> **If you are experiencing a medical emergency, call your local emergency services immediately.**

---

## 📌 Task 1 — GitHub Setup

### Step-by-Step Instructions for the User

#### 1. Sign In to GitHub
1. Open https://github.com in your browser
2. Click **Sign in** (top right)
3. Enter your username: `Khushi04072006` and your password
4. Complete any two-factor authentication if prompted

#### 2. Repository is Ready
The repository **https://github.com/Khushi04072006/Khushi** has been set up.
All NutriGuide application files are deployed here.

#### 3. Clone to Your Local Machine
```bash
git clone https://github.com/Khushi04072006/Khushi.git
cd Khushi
```

#### 4. Run the Application Locally
```bat
# Windows — just double-click:
run.bat

# Or manually:
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

#### 5. Open the App
Visit: **http://127.0.0.1:5000**

---

## 👩‍💻 Author

**Khushi** — [@Khushi04072006](https://github.com/Khushi04072006)

---

## 📄 License

This project is licensed under the MIT License.

---

*Built with ❤️ using IBM Granite AI | Following Agentic AI SDLC | HAM Principles | Ethical AI Guidelines*
