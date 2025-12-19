import  { useState } from "react";
import {Edit, Sparkles} from 'lucide-react'

const WriteArtical = () => {
  const ArticalLength=[
    {length:800,text:'Short (500-800 words)'},
    {length:1200,text:'Short (500-1200 words)'},
    {length:1600,text:'Short (1200+ words)'}
  ]
    const [selectedLength,setSelectedLength]=useState(ArticalLength[0])
    const [input,setInput]=useState("")

    const onSubmitHandler=async (e)=>{
      e.preventDefault();
      
    }

  return (
    <div className="h-full flex  overflow-y-scroll p-6 items-start flex-wrap gap-12 text-slate-700">
      {/* left col */}
      <form onSubmit={onSubmitHandler} className="flex-1 max-w-lg p-4 bg-white rounded-lg border border-gray-200">

        <div className="flex"> 
          <Sparkles className="w-6 text-[#4A7AFF]"/>
          <h1 className="text-lg font-semibold">Artical configuration</h1>
        </div>
        <p className="mt-6 text-sm font-medium">Artical Topic</p>
        <input onChange={(e)=>setInput(e.target.value)} value={input} type="text" className="text-center p-2 outline-none mt-2 px-3 text-sm border border-gray-300" placeholder="The future of artificial intelligence is..." required />

        <p className="mt-4 text-sm font-medium">Artical Length</p>
        <div className="mt-3 flex gap-3 flex-wrap sm:max-w-9/11"> 
          {ArticalLength.map((item,index)=>(
            <span onClick={()=>setSelectedLength(item)} className={`text-xs px-4 py-1 rounded-full border cursor-pointer ${ selectedLength.text===item.text? 'bg-blue-50 text-blue-700' :'text-gray-500 border-gray-300'}`} key={index}>{item.text}</span>

          ))}
        </div>
        <br />  
        <button className="w-full flex justify-center gap-2 bg-gradient-to-r from-[#226BFF] to-[#65ADFF] px-4 py-2 mt-6 text-sm text-white rounded-l-lg cursor-pointer">
          <Edit className="w-5"/>
          Generate artical 
        </button>
      </form>
      {/* right col */}
      <div className="bg-white flex-1 p-4 max-w-lg  w-400 rounded-lg flex flex-col min-h-96 border border-gray-200 max-h-[600px]">
        <div className="flex items-center gap-3">
          <Edit className="w-5 h-5 text-[#4A7AFF]"/>
          <h1 className="text-xl font-semibold">  Generated artical </h1>

        </div>
        <div className="flex-1 flex justify-center items-center">
          <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
                      <Edit className="w-5 h-5 "/>
                      <p>Enter a topic and click "Generate artical" to get started</p>


          </div>

        </div>

      </div>
    </div>
  );
};

export default WriteArtical;
