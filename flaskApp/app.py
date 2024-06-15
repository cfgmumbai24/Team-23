# app.py
from flask import Flask, request, jsonify
import requests
from PIL import Image
from transformers import BitsAndBytesConfig, pipeline
import torch

app = Flask(__name__)

quantization_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_compute_dtype=torch.float16
)

model_id = "llava-hf/llava-1.5-7b-hf"
pipe = pipeline("image-to-text", model=model_id, model_kwargs={"quantization_config": quantization_config})

@app.route('/describe_image', methods=['POST'])
def describe_image():
    try:

        data = request.json
        image_url = data.get('image_url')
        prompt = data.get('prompt')

        image = Image.open(requests.get(image_url, stream=True).raw)

        formatted_prompt = f"USER: <image>\n{prompt}\nASSISTANT:"

        outputs = pipe(image, prompt=formatted_prompt, generate_kwargs={"max_new_tokens": 200})
        response = {
            "description": outputs[0]["generated_text"]
        }

        return jsonify(response)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
