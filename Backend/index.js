import express from "express";
import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json()); // Middleware to parse JSON request bodies
app.use(cors()); // Enable CORS for all origins (for development only!)

const API_KEY = process.env.GEMINI_API_KEY;

app.post("/generate-response", async (req, res) => {
  try {
    const prompt = req.body.prompt;

    if (!API_KEY) {
      return res
        .status(500)
        .json({ error: "GEMINI_API_KEY environment variable not set." });
    }

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);
    // console.log("Full API response:", result);

    const text = await result.response.text(); //FIX: Call `.text()`
    // console.log("Generated text:", text);

    res.json({ result: text });
  } catch (error) {
    console.error(
      "Error calling Gemini API:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
