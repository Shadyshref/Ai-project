import React from 'react'
import { Edit, Hash, Image, Sparkles } from "lucide-react";

import { useState } from "react";


const GenerateImage = () => {
    const ImageStyle = ['Realistic','Chibli style','Anime style','Cartoon style','Fantasy style','Realistic style','3D style','Portrait style'];
  const [selectedStyle, setSelectedStyle] = useState('Realistic');
  const [input, setInput] = useState("");
  const [puplish,setPublish]=useState(false)

  const onSubmitHandler = async (e) => {
    e.preventDefault();
  };
  return (
   <div className="h-full flex  overflow-y-scroll p-6 items-start flex-wrap gap-12 text-slate-700">
      {/* left col */}
      <form
        onSubmit={onSubmitHandler}
        className="flex-1 max-w-lg p-4 bg-white rounded-lg border border-gray-200"
      >
        <div className="flex">
          <Sparkles className="w-6 text-[#00AD25]" />
          <h1 className="text-lg font-semibold">AI Image Generator</h1>
        </div>
        <p className="mt-6 text-sm font-medium">Describe your image</p>
        <textarea
          onChange={(e) => setInput(e.target.value)}
          value={input}
          type="text"
          className="text-center w-full p-2 outline-none mt-2 px-3 text-sm border rounded-md border-gray-300"
          placeholder="Describe what you want to see in the image..."
          required
          rows={4}
        />

        <p className="mt-4 text-sm font-medium">Style</p>
        <div className="mt-3 flex gap-3 flex-wrap sm:max-w-9/11">
          {ImageStyle.map((item, index) => (
            <span
              onClick={() => setSelectedStyle(item)}
              className={`text-xs px-4 py-1 rounded-full border cursor-pointer ${
                selectedStyle === item
                  ? "bg-green-50 text-green-700"
                  : "text-gray-500 border-gray-300"
              }`}
              key={index}
            >
              {item}
            </span>
          ))}
        </div>
        <div className='my-6 flex items-center gap-2'>
          <label className=' relative cursor-pointer' >
            <input type="checkbox"  onChange={(e)=>setPublish(e.target.checked)} checked={puplish} className=' sr-only peer'/>
            <div className='w-11 h-6 bg-slate-300 rounded-full peer-checked:bg-green-500 transition '>

            </div>
            <span className=' absolute left-1 top-1.5 w-3 h-3 bg-white rounded-full transition peer-checked:translate-x-5'>

            </span>

          </label>
          <p>Make this image puplic</p>

        </div>
        <button className="w-full flex justify-center gap-2 bg-gradient-to-r from-[#00AD25] to-[#04FF50] px-4 py-2 mt-6 text-sm text-white rounded-l-lg cursor-pointer">
          <Image className="w-5" />
          Generate image
        </button>
      </form>
      {/* right col */}
      <div className="bg-white flex-1  w-400 p-4 max-w-lg rounded-lg flex flex-col min-h-96 border border-gray-200 ">
        <div className="flex items-center gap-3">
          <Image className="w-5 h-5 text-[#00AD25]" />
          <h1 className="text-xl font-semibold"> Generated image </h1>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
            <Edit className="w-5 h-5 " />
            <p>Enter a topic and click "Generate image" to get started</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GenerateImage