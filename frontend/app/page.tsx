"use client";

import { useState, useRef } from "react";
import { 
  Upload, ImageIcon, LayoutGrid, Settings, Wand2, 
  ChevronRight, Image as ImgIcon, Palette, FileText, User
} from "lucide-react";

// Updated Styles List with "Edit Original"
const STYLES = [
  { id: "Edit Original", name: "Edit Original (Use Script)", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=150&q=80" },
  { id: "Disney 3D", name: "3D Cartoon", img: "https://images.unsplash.com/photo-1618331835717-801e976710b2?auto=format&fit=crop&w=150&q=80" },
  { id: "Photorealistic", name: "Photorealistic", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80" },
  { id: "Watercolor", name: "Watercolor", img: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&w=150&q=80" },
  { id: "Anime", name: "Anime", img: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=150&q=80" },
  { id: "Line Art", name: "Line Art", img: "https://images.unsplash.com/photo-1525909002-1b05e0c869d8?auto=format&fit=crop&w=150&q=80" },
];

const AGES = ["Child", "Teen", "Adult", "Elder", "Animal", "Fantasy"];

export default function FreepikClone() {
  const [selectedStyle, setSelectedStyle] = useState("Disney 3D");
  const [selectedAge, setSelectedAge] = useState("Child");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [customPrompt, setCustomPrompt] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResultUrl(null);
    }
  };

  const handleGenerate = async () => {
    if (!selectedImage) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("file", selectedImage);
    formData.append("style", selectedStyle);
    formData.append("age_category", selectedAge); // Send Age
    if (customPrompt) formData.append("custom_prompt", customPrompt);

    try {
      const res = await fetch("http://localhost:8000/generate-illustration", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Generation failed");
      setResultUrl(data.image_url);
    } catch (err) {
      alert("Error generating image. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#0f0f12] text-white font-sans overflow-hidden">
      
      {/* SIDEBAR */}
      <aside className="w-64 border-r border-white/10 flex flex-col p-4 bg-[#0f0f12] md:flex">
        <div className="flex items-center gap-2 mb-8 px-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-xl">F</div>
          <span className="font-bold text-lg tracking-tight">Freepik AI</span>
        </div>
        <nav className="space-y-1 flex-1">
          <NavItem icon={<LayoutGrid size={20} />} label="AI Suite" />
          <NavItem icon={<ImageIcon size={20} />} label="Image Generator" active />
          <NavItem icon={<Settings size={20} />} label="Settings" />
        </nav>
      </aside>

      {/* CONTROL PANEL */}
      <div className="w-full md:w-[400px] border-r border-white/10 flex flex-col bg-[#141417]">
        <div className="p-6 border-b border-white/10">
          <h1 className="text-xl font-semibold flex items-center gap-2">
            <Wand2 className="text-blue-500" size={20} />
            Generator
          </h1>
        </div>

        <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar flex-1">
          
          {/* UPLOAD */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-white/90 flex items-center gap-2">
                <ImgIcon size={16} /> Reference Image
              </label>
            </div>
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="group relative h-40 w-full border-2 border-dashed border-white/20 rounded-xl hover:border-blue-500/50 hover:bg-blue-500/5 transition-all cursor-pointer overflow-hidden flex flex-col items-center justify-center bg-black/20"
            >
              <input ref={fileInputRef} type="file" className="hidden" accept="image/*" onChange={handleFileSelect} />
              {previewUrl ? (
                <img src={previewUrl} alt="Preview" className="w-full h-full object-cover opacity-60 group-hover:opacity-40" />
              ) : (
                <div className="flex flex-col items-center">
                  <Upload size={24} className="text-white/50 mb-2" />
                  <span className="text-xs text-white/50">Upload Photo</span>
                </div>
              )}
            </div>
          </section>

          {/* AGE / TYPE SELECTOR */}
          <section>
             <label className="text-sm font-medium text-white/90 flex items-center gap-2 mb-3">
              <User size={16} /> Character Type
            </label>
            <div className="flex flex-wrap gap-2">
              {AGES.map((age) => (
                <button
                  key={age}
                  onClick={() => setSelectedAge(age)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border
                    ${selectedAge === age 
                      ? "bg-blue-600 border-blue-500 text-white" 
                      : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"}
                  `}
                >
                  {age}
                </button>
              ))}
            </div>
          </section>

          {/* STYLE GRID */}
          <section>
            <label className="text-sm font-medium text-white/90 flex items-center gap-2 mb-3">
              <Palette size={16} /> Choose Style
            </label>
            <div className="grid grid-cols-2 gap-3">
              {STYLES.map((style) => (
                <button
                  key={style.id}
                  onClick={() => setSelectedStyle(style.id)}
                  className={`relative h-16 rounded-lg overflow-hidden border transition-all text-left p-3 flex flex-col justify-end
                    ${selectedStyle === style.id ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-transparent opacity-60 hover:opacity-100'}
                  `}
                >
                  <img src={style.img} alt={style.name} className="absolute inset-0 w-full h-full object-cover -z-10" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />
                  <span className="relative text-xs font-medium z-10">{style.name}</span>
                </button>
              ))}
            </div>
          </section>

          {/* CUSTOM PROMPT */}
          <section>
            <label className="text-sm font-medium text-white/90 flex items-center gap-2 mb-3">
              <FileText size={16} /> Additional Script
            </label>
            <textarea
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="e.g. wearing a spacesuit, on mars..."
              className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-white/30 focus:border-blue-500 focus:outline-none min-h-[60px]"
            />
          </section>

          {/* GENERATE BTN */}
          <button
            onClick={handleGenerate}
            disabled={!selectedImage || loading}
            className={`w-full py-4 rounded-xl font-bold text-sm shadow-lg transition-all flex items-center justify-center gap-2 mt-auto
              ${!selectedImage || loading 
                ? "bg-white/10 text-white/30 cursor-not-allowed" 
                : "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-900/20"}
            `}
          >
            {loading ? "Generating..." : "Generate Illustration"}
          </button>
        </div>
      </div>

      {/* MAIN CANVAS */}
      <main className="flex-1 bg-[#0f0f12] p-8 flex items-center justify-center relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0,transparent_70%)] pointer-events-none" />
        {resultUrl ? (
          <div className="relative max-w-2xl w-full aspect-square bg-[#1a1a1e] rounded-2xl border border-white/10 shadow-2xl overflow-hidden group">
            <img src={resultUrl} alt="Result" className="w-full h-full object-contain" />
            <div className="absolute bottom-6 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <a href={resultUrl} download="result.png" className="bg-white text-black px-6 py-2 rounded-full font-bold text-sm hover:bg-gray-200">
                Download
              </a>
            </div>
          </div>
        ) : (
          <div className="text-center opacity-30">
            <ImageIcon size={48} className="mx-auto mb-4" />
            <p>Result will appear here</p>
          </div>
        )}
      </main>
    </div>
  );
}

function NavItem({ icon, label, active = false }: { icon: any, label: string, active?: boolean }) {
  return (
    <button className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors
      ${active ? "bg-blue-600/10 text-blue-400" : "text-white/60 hover:bg-white/5 hover:text-white"}
    `}>
      {icon} {label}
    </button>
  );
}