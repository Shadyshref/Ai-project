import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/HomePage";
import Layout from "./pages/Layout";
import DashBoard from "./pages/DashBoard";
import WriteArtical from "./pages/WriteArtical";
import BlogTitles from "./pages/BlogTitles";
import GenerateImage from "./pages/GenerateImage";
import RemoveBackground from "./pages/RemoveBackground";
import RemoveObject from "./pages/RemoveObject";
import ReviewResume from "./pages/ReviewResume";
import Community from "./pages/Community";
import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";

const App = () => {
  const{getToken}=useAuth()
  useEffect(()=>{
getToken().then((token)=>console.log(token));
  },[])
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ai" element={<Layout />}>
          <Route index element={<DashBoard />} />
          <Route path="write-article" element={<WriteArtical />} />
          <Route path="blog-titles" element={<BlogTitles />} />
          <Route path="genarate-images" element={<GenerateImage />} />
          <Route path="remove-background" element={<RemoveBackground />} />
          <Route path="remove-object" element={<RemoveObject />} />
          <Route path="review-resume" element={<ReviewResume />} />
          <Route path="community" element={<Community />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
