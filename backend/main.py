import os
import io
import time
import random
import requests
import base64
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pollinations URL (No API Key required)
# We use the 'flux' model which is currently the best free model available
POLLINATIONS_URL = "https://image.pollinations.ai/prompt/"

@app.post("/generate-illustration")
async def generate_illustration(
    file: UploadFile = File(...),
    style: str = Form("Disney 3D"),
    age_category: str = Form("Child"),
    custom_prompt: str = Form(None)
):
    try:
        print(f"--- Request: {style} | {age_category} ---")
        
        # 1. Setup Prompt
        # Since we can't upload the image to Pollinations easily, 
        # we create a super-detailed prompt to match the vibe.
        user_script = custom_prompt if custom_prompt else "happy expression"
        seed = random.randint(1, 10000) # Random seed for variety
        
        style_prompts = {
            "Edit Original": f"high quality photo of a {age_category}, {user_script}, sharp focus, realistic texture, 8k, cinematic lighting",
            "Disney 3D": f"pixar style 3d render of a {age_category}, {user_script}, cute, big eyes, disney animation style, vibrant colors, 4k, masterpiece",
            "Photorealistic": f"cinematic portrait of a {age_category}, {user_script}, hyperrealistic, 8k, highly detailed face, photography, raw style",
            "Watercolor": f"watercolor painting of a {age_category}, {user_script}, soft pastel colors, children's book illustration, dreamy, wet on wet",
            "Anime": f"anime portrait of a {age_category}, {user_script}, studio ghibli style, vibrant, detailed background, cel shaded",
            "Line Art": f"black and white line art coloring book page of a {age_category}, {user_script}, clean lines, minimal, vector style, white background"
        }

        final_prompt = style_prompts.get(style, style_prompts["Disney 3D"])
        
        # Add "nologo" to remove watermarks and "flux" for quality
        # URL encoding the prompt is handled by requests, but we format the URL string carefully
        full_url = f"{POLLINATIONS_URL}{final_prompt}?width=1024&height=1024&seed={seed}&model=flux&nologo=true"
        
        print(f"Generating with Pollinations: {final_prompt[:50]}...")

        # 2. Call Pollinations (GET request)
        response = requests.get(full_url, timeout=30)

        if response.status_code == 200:
            print("Success! Image generated.")
            # Convert raw bytes to Base64 for frontend
            img_b64 = base64.b64encode(response.content).decode("utf-8")
            return {"status": "success", "image_url": f"data:image/jpeg;base64,{img_b64}"}
        else:
            print(f"Error {response.status_code}: {response.text}")
            raise HTTPException(status_code=500, detail="Pollinations Error")

    except Exception as e:
        print(f"CRITICAL ERROR: {str(e)}")
        # Fallback to a placeholder if everything breaks, to prevent crash
        raise HTTPException(status_code=500, detail="Internet/Generation Error. Try again.")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)