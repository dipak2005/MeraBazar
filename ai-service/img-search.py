# ml_server/ml_server.py
from flask import Flask, request, jsonify
import torch
import clip
from PIL import Image
import io

app = Flask(__name__)

device = "cuda" if torch.cuda.is_available() else "cpu"
model, preprocess = clip.load("ViT-B/32", device=device)

@app.route("/encode", methods=["POST"])
def encode():
    if "image" not in request.files:
        return jsonify({"error": "no image"}), 400
    
    img_bytes = request.files["image"].read()
    image = Image.open(io.BytesIO(img_bytes)).convert("RGB")
    image_input = preprocess(image).unsqueeze(0).to(device)

    with torch.no_grad():
        vec = model.encode_image(image_input).cpu().numpy().tolist()[0]

    return jsonify({"vector": vec})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)