import axios from "axios";
import FormData from "form-data";

/**
 * Generate embedding vector from Flask AI service
 * @param {string} imageUrl - Cloudinary image URL
 * @returns {Array<number> | null}
 */
 const generateEmbedding = async (imageUrl) => {
  try {
    if (!imageUrl) {
      throw new Error("Image URL is required");
    }

    // 1️⃣ Download image from Cloudinary
    const imageResponse = await axios.get(imageUrl, {
      responseType: "arraybuffer",
    });

    // 2️⃣ Prepare form-data for Flask
    const form = new FormData();
    form.append("image", imageResponse.data, {
      filename: "image.jpg",
      contentType: "image/jpeg",
    });

    // 3️⃣ Send image to Flask AI service
    const aiResponse = await axios.post(
      "http://127.0.0.1:5000/encode",
      form,
      {
        headers: {
          ...form.getHeaders(),
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      }
    );

    // 4️⃣ Validate response
    if (!aiResponse.data || !aiResponse.data.vector) {
      throw new Error("Invalid AI response");
    }

    return aiResponse.data.vector;

  } catch (error) {
    console.error("❌ Embedding Generation Error:", error.message);
    return null;
  }
};

module.exports = { generateEmbedding };