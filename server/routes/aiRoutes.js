import express from 'express';
import { requireAuth } from '@clerk/express';
import { 
  generateArtical, 
  generateBlogTitle, 
  generateImage 
} from '../controllers/aiController.js';
import { auth } from '../middlewares/auth.js';

const aiRouter = express.Router();

// الـ routes
aiRouter.post('/generate-artical', requireAuth(), generateArtical);
aiRouter.post('/generate-blog-title', requireAuth(), generateBlogTitle);
aiRouter.post('/generate-image', auth, generateImage); // ✅ custom middleware
aiRouter.get('/test-auth', auth, (req, res) => { // 🔍 للاختبار
  res.json({
    success: true,
    userId: req.auth.userId,
    plan: req.plan
  });
});

export default aiRouter;