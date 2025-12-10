# AI Storybook Illustration Generator

A personalized illustration generator that transforms user inputs into stylized storybook characters (Disney 3D, Anime, Watercolor, etc.). Built with **Next.js** for the frontend and **FastAPI** for the backend, integrating **Pollinations.ai** (Flux Model) for high-quality, free generation.

## Features

* **Modern UI:** Glassmorphism design inspired by professional tools.
* **Dual-Engine Fallback:** Uses Pollinations.ai (Flux) to ensure 100% free, unlimited generation without API keys or credit limits.
* **Smart Prompt Engineering:** Automatically constructs detailed prompts based on selected style, age category, and user scripts.
* **Styles:** Disney 3D, Photorealistic, Watercolor, Anime, Line Art, and Edit Original.
* **Character Types:** Child, Teen, Adult, Elder, Animal, Fantasy.

## Tech Stack

* **Frontend:** Next.js 14 (App Router), Tailwind CSS, Lucide React icons.
* **Backend:** Python 3.10+, FastAPI, Uvicorn.
* **AI Engine:** Pollinations.ai (Flux Model) & Hugging Face Inference (Legacy).

## Getting Started with the AI

### Prerequisites

* Node.js (v18+)
* Python (v3.9+)

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd illustration-prototype
```
### 2.Frontend Setup
```bash
cd frontend
npm install
npm run dev
``` 
Frontend runs at:
```ardunio
http://localhost:3000
```
### 3.Backend Setup
```bash
cd backend
python -m venv venv
```
Activate virtual environment:
#### Windows
```bash
venv\Scripts\activate
```
#### Mac/Linux
```bash 
source venv/bin/activate
```
#### Install dependencies:
```bash
pip install -r requirements.txt
```
#### Run backend:
```bash
uvicorn main:app --reload
```
#### Backend runs at:
```arduino
http://localhost:8000
```

## How It Works

### 1.User selects:
* Character Type
* Age Group
* Art Style
* Story / Description

### 2.Frontend sends request to FastAPI

### 3.Backend:
* Builds an optimized AI prompt
* Sends it to Pollinations.ai
* Returns the generated image

### 4.Image is rendered instantly on the UI 

## 👨‍💻 Author
#### Vedansh Sharma
Full Stack Developer & AI Engineer
* GitHub: https://github.com/Vedanshsharma128
* Email: vedansh0704@gmail.com
