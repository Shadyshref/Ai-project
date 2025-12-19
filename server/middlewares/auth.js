import { clerkClient } from "@clerk/express";


/// Middleware to check userId and hasPremiumPlan

export const auth = async (req, res, next) => {
  try {
    // ✅ استخدم req.auth() كـ function مش object
    const authData = req.auth();
    
    // 🔍 Debug: شوف إيه اللي جاي من Clerk
    console.log("🔍 Auth data:", authData);

    const { userId, has } = authData;

    // ✅ تحقق من وجود userId
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - No user ID found"
      });
    }

    console.log("✅ User ID:", userId);

    const hasPremiumPlan = await has({ plan: "premium" });
    const user = await clerkClient.users.getUser(userId);

    console.log("💎 Has Premium Plan:", hasPremiumPlan);
    console.log("📊 User metadata:", user.privateMetadata);

    if (!hasPremiumPlan && user.privateMetadata?.free_usage !== undefined) {
      req.free_usage = user.privateMetadata.free_usage;
    } else {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: 0,
        },
      });
      req.free_usage = 0;
    }

    req.plan = hasPremiumPlan ? "premium" : "free";
    req.auth = { userId }; // 🔥 حفظ userId للكونترولر

    console.log("✅ Auth successful - Plan:", req.plan);
    
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(401).json({
      success: false,
      message: "Authentication failed: " + error.message
    });
  }
};

/// Middleware to check userId and haspremiumPlane



// export const auth=async (req,res,next)=>{
//     try {
//         const {userId,has}=await req.auth()
//         const hasPremiumPlan=await has({plan:"premium"});
//         const user=await clerkClient.users.getUser(userId)
//         if(!hasPremiumPlan&&user.privateMetadata.free_usage){
//             req.free_usage=user.privateMetadata.free_usage

//         }else{
//             await clerkClient.users.updateUserMetadata(userId,{
//                 privateMetadata:{
//                     free_usage:0
//                 }
//             })
//             req.free_usage=0
//         }
//         req.plan=hasPremiumPlan? 'premium':'free';
//         next()
//     } catch (error) {
//         res.json({succes:false,message:error.message})

//     }

// }
