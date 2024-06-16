const OpenAI = require("openai");
const { createClient } = require("@supabase/supabase-js");

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI,
});

// Initialize Supabase client
const supabase = createClient(process.env.SUPABASE_URL, process.env.ANON_KEY);

async function uploadFileToSupabase(file, bucketName, filePath) {
  try {
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file.data, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      throw error;
    }

    const { publicURL } = supabase.storage
      .from(bucketName)
      .getPublicUrl(filePath);
    return publicURL;
  } catch (error) {
    console.error("Error uploading file to Supabase:", error);
    throw new Error(`Failed to upload file: ${error.message}`);
  }
}

async function generateContentFromImage(imageUrl) {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: " You are an AI assistant tasked with generating title & description for an ornament listing on Amazon and categorizing the ornament based on its material.",
            },
            {
              type: "image_url",
              image_url: {
                url: "https://5.imimg.com/data5/SELLER/Default/2022/11/MA/QZ/UQ/99052377/whatsapp-image-2022-11-03-at-12-41-31-pm-1--1000x1000.jpeg",
              },
            },
          ],
        },
      ],
      tools: [
        {
          type: "function",
          function: {
            name: "Ornament_Details",
            parameters: {
              type: "object",
              properties: {
                Title: {
                  type: "string",
                  description:
                    "Create a title for the product to list it on Amazon",
                },
                Category: {
                  type: "integer",
                  description:
                    "The category of the product based on the material from the image. 0: Terracotta, 1: Macrame , 2: Banana, 3: Macrum, 4: Jute, 5: Others",
                },
                Description: {
                  type: "string",
                  description:
                    "Create an engaging and informative product description that highlights the key features and selling points of the ornament. The description should be around 50 words long and written in a persuasive yet natural tone, as if you were trying to convince a potential customer to purchase the ornament.",
                },
              },
              required: ["title", "Category", "Description"],
            },
          },
        },
      ],
      model: "gpt-4o",
    });

    const response = completion.choices[0]?.message?.tool_calls;

    // Assuming the response is structured in a predictable way:
    // const [title, description, category] = response.split("\n");

    console.log(response);
    return {
      //   title: title.trim(),
      //   description: description.trim(),
      //   category: category.trim(),
      test: "heloo",
    };
  } catch (error) {
    console.error("Error generating content from image:", error);
    throw new Error(`Failed to generate content: ${error.message}`);
  }
}

async function generateDescription(req, res) {
  try {
    // Handling file upload
    if (!req.files || !req.files.image) {
      return res.status(400).json({ message: "No image file was uploaded." });
    }

    const file = req.files.image;
    const filePath = `images/${file.name}`;
    const bucketName = "jpmc";

    // Upload the image to Supabase
    const imageUrl = await uploadFileToSupabase(file, bucketName, filePath);

    // Generate title, description, and category from the image URL
    const imageData = await generateContentFromImage(imageUrl);

    console.log(imageData);
    res.status(200).json({ test: "testing" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = { generateContentFromImage, generateDescription };
