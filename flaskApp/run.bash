curl -X POST http://<server-ip>:5000/describe_image \
     -H "Content-Type: application/json" \
     -d '{
           "image_url": "https://llava-vl.github.io/static/images/view.jpg",
           "prompt": "What are the things I should be cautious about when I visit this place?"
         }'
