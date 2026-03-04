import os

from flask import Flask, request, jsonify
import torch
import clip
from PIL import Image
import requests
import io

app = Flask(__name__)

device = "cuda" if torch.cuda.is_available() else "cpu"
model, preprocess = clip.load("ViT-B/32", device=device)

@app.route("/encode", methods=["POST"])
def encode():
    data = request.json
    image_url = data.get("imageUrl")

    if not image_url:
        return jsonify({"error": "No imageUrl"}), 400

    response = requests.get(image_url)
    image = Image.open(io.BytesIO(response.content)).convert("RGB")
    image_input = preprocess(image).unsqueeze(0).to(device)

    with torch.no_grad():
        vec = model.encode_image(image_input).cpu().numpy().tolist()[0]

    return jsonify({"vector": vec})

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)