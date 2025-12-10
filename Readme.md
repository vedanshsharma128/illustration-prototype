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