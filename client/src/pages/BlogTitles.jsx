import { Edit, Hash, Sparkles } from "lucide-react";
import { useState } from "react";

const BlogTitles = () => {
  const BlogCategories = ['General','Technology','Business','Health','Lifestyle','Education','Travel','Food'];
  const [selectedCategories, setSelectedCategories] = useState('General');
  const [input, setInput] = useState("");

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
          <Sparkles className="w-6 text-[#8E37AB]" />
          <h1 className="text-lg font-semibold">AI Title Generator</h1>
        </div>
        <p className="mt-6 text-sm font-medium">Keyword</p>
        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          type="text"
          className="text-center p-2 outline-none mt-2 px-3 text-sm border border-gray-300"
          placeholder="The future of artificial intelligence is..."
          required
        />

        <p className="mt-4 text-sm font-medium">Category</p>
        <div className="mt-3 flex gap-3 flex-wrap sm:max-w-9/11">
          {BlogCategories.map((item, index) => (
            <span
              onClick={() => setSelectedCategories(item)}
              className={`text-xs px-4 py-1 rounded-full border cursor-pointer ${
                selectedCategories === item
                  ? "bg-purple-50 text-purple-700"
                  : "text-gray-500 border-gray-300"
              }`}
              key={index}
            >
              {item}
            </span>
          ))}
        </div>
        <br />
        <button className="w-full flex justify-center gap-2 bg-gradient-to-r from-[#C341F6] to-[#8E37EB] px-4 py-2 mt-6 text-sm text-white rounded-l-lg cursor-pointer">
          <Hash className="w-5" />
          Generate Title
        </button>
      </form>
      {/* right col */}
      <div className="bg-white flex-1 p-4 max-w-lg  w-400 rounded-lg flex flex-col min-h-96 border border-gray-200 ">
        <div className="flex items-center gap-3">
          <Hash className="w-5 h-5 text-[#4A7AFF]" />
          <h1 className="text-xl font-semibold"> Generated titles </h1>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
            <Edit className="w-5 h-5 " />
            <p>Enter a topic and click "Generate title" to get started</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogTitles;
