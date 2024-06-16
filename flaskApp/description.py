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
            You are an AI assistant tasked with generating a product description for an ornament listing on Amazon. You are provided with the image. 
          ''',
        },
        {
          "type": "image_url",
          "image_url": {
            "url": "https://www.myehaat.in/s/609e53c38fa6f71798cbe26e/636e1dd74714d3efe8b5595b/_dsf4306-640x640.JPG",
          },
        },
        {
            "type": "text",
            "text": 
            '''
                Using all of this information, your task is to create an engaging and informative product description that highlights the key features and selling points of the ornament. The description should be around 50 words long and written in a persuasive yet natural tone, as if you were trying to convince a potential customer to purchase the ornament.
            '''
        }
      ],
    }
  ],
  max_tokens=300,
)
print(response.choices[0].message.content)