import express from "express";
import cors from "cors";
import { config } from "dotenv";
import process from "process";

const PORT = 8000;
const app = express();

config();

app.use(express.json());
app.use(cors());

const LANGUAGE_MODEL_API_KEY = process.env.LANGUAGE_MODEL_API_KEY;
const LANGUAGE_MODEL_URL = `https://generativelanguage.googleapis.com/v1beta1/models/chat-bison-001:generateMessage?key=${LANGUAGE_MODEL_API_KEY}`;

app.get("/prompt/:text", async (req, res) => {
  const text = req.params.text;

  const payload = {
    prompt: {
      messages: [
        {
          content: text,
        },
      ],
    },
    temperature: 0.1,
    candidate_count: 1,
  };
  const response = await fetch(LANGUAGE_MODEL_URL, {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    method: "POST",
  });

  const data = await response.json();
  console.log(data);
  res.send(data);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
