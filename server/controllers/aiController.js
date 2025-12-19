import OpenAI from "openai";
import sql from "../config/db.js";
import axios from "axios";
import {v2 as cloudinary} from "cloudinary"


const AI = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateArtical = async (req, res) => {
  try {
    console.log('=== Generate Article Controller ===');
    
    const { userId } = req.auth;
    console.log('User ID:', userId);
    
    const { prompt} = req.body;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: "Prompt is required"
      });
    }

    console.log('Request:', { prompt, length: length || 'default' });

    console.log('Calling OpenAI...');
    const response = await AI.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [ {role: "user",content: prompt,},],
      temperature: 0.7,
      max_tokens: length || 100,
    });

    const content = response.choices[0].message.content;
    console.log('✅ OpenAI response received');

    // حفظ في قاعدة البيانات
    await sql`INSERT INTO creations (user_id, prompt, content, type) 
              VALUES(${userId}, ${prompt}, ${content}, 'artical')`;

    console.log('✅ Saved to database');

    res.json({ 
      success: true, 
      content,
      message: "Article generated successfully"
    });

  } catch (error) {
    console.log(' Controller error:', error.message);
    
    res.status(500).json({ 
      success: false, 
      message: "Internal server error: " + error.message 
    });
  }
};
export const generateBlogTitle = async (req, res) => {
  try {
    console.log('=== Generate Article Controller ===');
    
    // اجيب الـ userId من req.auth اللي Clerk بيحطه
    const { userId } = req.auth;
    console.log('User ID:', userId);
    
    const { prompt} = req.body;
    const plan=req.plan
    const free_usage=req.free_usage
    if(plan!=='premium'&& free_usage>=10){
      return res.json({success:false,message:'Limit reached. upgrade to contoue'})
    }

    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: "Prompt is required"
      });
    }

    console.log('Request:', { prompt, length: length || 'default' });

    console.log('Calling OpenAI...');
    const response = await AI.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [ {role: "user",content: prompt,},],
      temperature: 0.7,
      max_tokens: length || 100,
    });

    const content = response.choices[0].message.content;
    console.log(' OpenAI response received');

    // حفظ في قاعدة البيانات
    await sql`INSERT INTO creations (user_id, prompt, content, type) 
              VALUES(${userId}, ${prompt}, ${content}, 'blog-title')`;

    console.log('✅ Saved to database');

    res.json({ success: true,  content, });

  } catch (error) {
    console.log(' Controller error:', error.message);
    
    res.status(500).json({ 
      success: false, 
      message: "Internal server error: " + error.message 
    });
  }
};


export const generateImage = async (req, res) => {
  try {
    const { userId } = req.auth;
    const { prompt, publish } = req.body;
    const plan = req.plan;

    console.log("💡 User Plan:", plan, "| User ID:", userId);

    if (plan !== 'premium') {
      return res.status(403).json({
        success: false,
        message: "This feature is only available for premium subscriptions"
      });
    }

    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: "Prompt is required"
      });
    }

    // 🔍 Debug: تأكد من وجود API Key
    if (!process.env.CLIPDROP_API_KEY) {
      console.error("❌ CLIPDROP_API_KEY is missing!");
      return res.status(500).json({
        success: false,
        message: "API Key configuration error"
      });
    }

    console.log('✅ CLIPDROP_API_KEY exists:', process.env.CLIPDROP_API_KEY.substring(0, 10) + '...');
    console.log('📤 Calling Clipdrop API with prompt:', prompt);

    const formData = new FormData();
    formData.append("prompt", prompt);

    try {
      const { data } = await axios.post(
        "https://clipdrop-api.co/text-to-image/v1",
        formData,
        {
          headers: { 
            'x-api-key': process.env.CLIPDROP_API_KEY 
          },
          responseType: "arraybuffer",
        }
      );

      console.log('✅ Image generated successfully');

      const base64Image = `data:image/png;base64,${Buffer.from(data, 'binary').toString("base64")}`;
      const { secure_url } = await cloudinary.uploader.upload(base64Image);

      await sql`INSERT INTO creations (user_id, prompt, content, type, publish)
        VALUES(${userId}, ${prompt}, ${secure_url}, 'image', ${publish ?? false})
      `;

      res.json({ success: true, content: secure_url });

    } catch (apiError) {
      // 🔥 تفاصيل الخطأ من Clipdrop
      console.error('❌ Clipdrop API Error:', {
        status: apiError.response?.status,
        statusText: apiError.response?.statusText,
        data: apiError.response?.data?.toString(),
        headers: apiError.response?.headers
      });

      return res.status(apiError.response?.status || 500).json({
        success: false,
        message: `Clipdrop API Error: ${apiError.response?.statusText || apiError.message}`,
        details: apiError.response?.data?.toString()
      });
    }

  } catch (error) {
    console.error('❌ Controller error:', error);
    res.status(500).json({
      success: false,
      message: "Internal server error: " + error.message
    });
  }
};