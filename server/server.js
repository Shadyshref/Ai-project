import express from "express";
import cors from "cors";
import "dotenv/config";
import { clerkMiddleware } from "@clerk/express";
import aiRouter from "./routes/aiRoutes.js";
import connectCloudinary from "./config/cloudinary.js";

const app = express();

// // Environment check
// console.log('=== Environment Check ===');
// console.log('OPENAI_API_KEY exists:', !!process.env.OPENAI_API_KEY);
// console.log('OPENAI_API_KEY length:', process.env.OPENAI_API_KEY?.length);
// console.log('OPENAI_API_KEY starts with:', process.env.OPENAI_API_KEY?.substring(0, 7));
// console.log('CLERK_SECRET_KEY exists:', !!process.env.CLERK_SECRET_KEY);

app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

await connectCloudinary()

// Test endpoint - أضف ده هنا
// app.get('/test-openai', async (req, res) => {
//   try {
//     console.log('=== Testing OpenAI API ===');
    
//     const OpenAI = (await import('openai')).default;
//     const testAI = new OpenAI({
//       apiKey: process.env.OPENAI_API_KEY,
//     });
    
//     console.log('Making test request to OpenAI...');
//     const response = await testAI.chat.completions.create({
//       model: "gpt-4o-mini",
//       messages: [{ role: "user", content: "Say hello in one word" }],
//       max_tokens: 5,
//     });
    
//     console.log('✅ OpenAI test successful');
//     res.json({ 
//       success: true, 
//       message: "OpenAI API working perfectly",
//       response: response.choices[0].message.content,
//       apiKeyValid: true
//     });
    
//   } catch (error) {
//     console.log(' OpenAI test failed:', error.message);
    
//     res.json({ 
//       success: false, 
//       message: error.message,
//       apiKeyExists: !!process.env.OPENAI_API_KEY, 
//       apiKeyLength: process.env.OPENAI_API_KEY?.length
//     });
//   }
// });

// باقي الـ routes
app.use('/api/ai', aiRouter);

app.get('/', (req, res) => {
  return res.send("server is live!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});