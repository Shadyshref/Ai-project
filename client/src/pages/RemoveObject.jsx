import { Eraser, Scissors, Sparkles } from 'lucide-react';
import React, { useState } from 'react'

const RemoveObject = () => {
  const [input, setInput] = useState("");
  const [object, setObject] = useState("");
  
    
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
          <Sparkles className="w-6 text-[#4A7AFF]" />
          <h1 className="text-lg font-semibold">Object Removal</h1>
        </div>
        <p className="mt-6 text-sm font-medium">Upload image</p>
        <input
          onChange={(e) => setInput(e.target.files[0])}
          accept='image/*'
          type="file"
          className="text-center p-2 outline-none mt-2 px-3 text-sm border text-gray-600 border-gray-300"
          required
        />
        <p className="mt-6 text-sm font-medium">Describe  object name to remove</p>
        <textarea
          onChange={(e) => setObject(e.target.value)}
          value={object}
          type="text"
          className="text-center w-full p-2 outline-none mt-2 px-3 text-sm border rounded-md border-gray-300"
          placeholder="e.g., watch or soon ,only single object name"
          required
          rows={4}
        />

        <button className="w-full flex justify-center gap-2 bg-gradient-to-r from-[#4179F6] to-[#8E37EB] px-4 py-2 mt-6 text-sm text-white rounded-l-lg cursor-pointer">
          <Scissors className="w-5" />
          Remove object
        </button>
      </form>
      {/* right col */}
      <div className="bg-white flex-1 p-4 max-w-lg w-400 rounded-lg flex flex-col min-h-96 border border-gray-200 ">
        <div className="flex items-center gap-3">
          <Scissors className="w-5 h-5 text-[#4A7AFF]" />
          <h1 className="text-xl font-semibold"> Processed Image </h1>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
            <Scissors className="w-5 h-5 " />
            <p className="whitespace-nowrap" >Upload an image and click "Remove object" to get started</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RemoveObject