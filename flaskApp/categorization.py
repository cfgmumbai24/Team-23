from openai import OpenAI
import base64
import json
import os

cwd = os.getcwd()
config_file_path = os.path.abspath(os.path.join(cwd, 'config.json'))
with open(config_file_path, 'r') as f:
    config = json.load(f)
    credentials = config['params']

client = OpenAI(
    organization=credentials['openai_organization_id'],
    project=credentials['openai_project_id'],
    api_key=credentials['openai_api_key'],
)

title = "Ethnic Grey Colored Necklace and earring set"
material = "Terracota"
method = "Handmade"

response = client.chat.completions.create(
  model="gpt-4o",
  messages=[
    {
      "role": "user",
      "content": [
        {
          "type": "text",
          "text": f'''
            You are an AI assistant tasked with categorizing an ornament based on its material. 
          ''',
        },
        {
          "type": "image_url",
          "image_url": {
            "url": "https://5.imimg.com/data5/ML/NV/MY-49141453/jute-craft-1000x1000.jpg",
          },
        }
      ],
    }
  ],
        functions=[
            {
                "name": "Ornament_Categorization",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "Category": {"type": "integer", "description": "The category of the product based on the material from the image. 0: Terracotta, 1: Macrame , 2: Banana, 3: Macrum, 4: Jute, 5: Others"},
                    },
                    "required": ["Category"]
                }
            }
        ],
)
print(response.choices[0].message.function_call.arguments)