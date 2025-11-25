import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { 
  ChevronRight, 
  ChevronLeft, 
  Search, 
  AlertTriangle, 
  Activity, 
  FileText, 
  XCircle, 
  CheckCircle2, 
  Maximize2,
  ScanLine,
  Microscope,
  HelpCircle,
  Skull
} from 'lucide-react';

// --- Types ---

interface SlideData {
  id: number;
  section: string;
  title: string;
  render: (isActive: boolean) => React.ReactNode;
}

// --- Components ---

// 1. Background Effect (Sci-fi Grid)
const Background = () => (
  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
    <div className="absolute inset-0 bg-endo-dark opacity-90" />
    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,18,18,0)_1px,transparent_1px),linear-gradient(90deg,rgba(18,18,18,0)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20"></div>
    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-cyan-900/10 to-transparent animate-pulse-slow"></div>
  </div>
);

// 2. Image Placeholder Component
const MedicalImage = ({ label, figure, isDanger = false }: { label: string, figure: string, isDanger?: boolean }) => {
  // تبدیل figure مثلاً "22.1" به "22.1.jpg"
  const imageUrl = `https://raw.githubusercontent.com/sanazsofe-wq/Endo-Jafari/main/${figure}.jpg`;
  
  return (
    <div className={`relative group overflow-hidden rounded-xl border-2 ${isDanger ? 'border-endo-danger/50' : 'border-endo-accent/30'} bg-black shadow-2xl transition-all duration-500 hover:scale-[1.02]`}>
      <img
        src={imageUrl}
        alt={label}
        className="w-full h-64 md:h-80 object-cover opacity-80 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0"
      />
      <div className="absolute inset-0 bg-scanlines opacity-10 pointer-events-none"></div>
      <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm px-3 py-1 rounded border border-white/20 text-xs font-mono text-white">
        FIG {figure}
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform">
        <p className="text-sm font-mono text-white/90">{label}</p>
      </div>
      <div className="absolute inset-0 border-[1px] border-white/10 rounded-xl pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-white/30 animate-[scan_2s_linear_infinite] pointer-events-none shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
    </div>
  );
};

// 3. Interactive Question Box
const QuestionBox = ({ question, answer }: { question: string, answer: string }) => {
  const [revealed, setRevealed] = useState(false);
  return (
    <div className="mt-6 p-1 rounded-lg bg-gradient-to-r from-endo-accent/20 to-transparent border-l-4 border-endo-accent">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2 text-endo-accent font-bold uppercase text-sm tracking-wider">
          <HelpCircle size={16} />
          <span>Interactive Query</span>
        </div>
        <p className="text-lg font-medium mb-4">{question}</p>
        {!revealed ? (
          <button 
            onClick={() => setRevealed(true)}
            className="px-4 py-2 bg-endo-accent/20 hover:bg-endo-accent/40 text-endo-accent rounded transition-colors text-sm font-mono border border-endo-accent/30"
          >
            REVEAL DIAGNOSIS
          </button>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white/90 font-light bg-black/30 p-3 rounded"
          >
            <span className="text-endo-success font-bold mr-2">ANSWER:</span>
            {answer}
          </motion.div>
        )}
      </div>
    </div>
  );
};

// --- Main App Component ---

const App: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for prev, 1 for next

  // --- Slide Definitions ---
  const slides: SlideData[] = [
    // ---------------- SECTION 1: INTRO ----------------
    {
      id: 0,
      section: "INTRODUCTION",
      title: "Title",
      render: () => (
        <div className="flex flex-col items-center justify-center h-full text-center space-y-8">
          <motion.div layoutId="main-title" className="text-5xl md:text-7xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-200 to-blue-400 animate-pulse-slow">
            CHRONIC CRACKS & FRACTURES
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-2xl text-blue-200/70 font-mono">
            Chapter 22: Cohen's Pathways of the Pulp
          </motion.div>
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, type: "spring" }}
            className="bg-endo-panel/50 backdrop-blur-md border border-white/10 p-6 rounded-2xl max-w-2xl"
          >
            <div className="flex items-center justify-center gap-3 text-endo-accent mb-2">
              <Search size={32} />
              <h3 className="text-xl font-bold uppercase tracking-widest">Case File: The Diagnostic Challenge</h3>
            </div>
            <p className="text-gray-400">Detective Work in Endodontics</p>
          </motion.div>
        </div>
      )
    },
    {
      id: 1,
      section: "THE CHALLENGE",
      title: "Why is this hard?",
      render: () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full">
          <div className="space-y-6">
            <motion.h2 layoutId="slide-title" className="text-4xl font-bold text-white mb-6">The Diagnostic Challenge</motion.h2>
            <ul className="space-y-4">
              {[
                { icon: AlertTriangle, color: "text-yellow-400", title: "Symptoms", desc: "Vague or asymptomatic." },
                { icon: ScanLine, color: "text-blue-400", title: "Radiography", desc: "Often inconclusive." },
                { icon: Skull, color: "text-red-400", title: "Patient Trust", desc: "Lost due to prolonged undiagnosed pain." }
              ].map((item, i) => (
                <motion.li 
                  key={i}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                  className="flex items-center bg-endo-panel/40 p-4 rounded-lg border border-white/5"
                >
                  <item.icon className={`${item.color} mr-4`} size={28} />
                  <div>
                    <strong className={`block text-lg ${item.color}`}>{item.title}</strong>
                    <span className="text-gray-300">{item.desc}</span>
                  </div>
                </motion.li>
              ))}
            </ul>
            <div className="bg-endo-accent/10 border border-endo-accent p-4 rounded mt-4">
              <strong className="text-endo-accent block mb-1">MISSION GOAL:</strong>
              <span className="text-white font-mono">EARLY DIAGNOSIS</span>
            </div>
          </div>
          <div>
            <QuestionBox 
              question="Why do patients often get angry at dentists in these cases?" 
              answer="Because they've been in pain for months, but the dentist saw nothing on the X-ray and claimed the tooth was healthy!" 
            />
          </div>
        </div>
      )
    },
    {
      id: 2,
      section: "DEFINITIONS",
      title: "AAE Definitions",
      render: () => (
        <div className="h-full flex flex-col justify-center">
          <motion.h2 layoutId="slide-title" className="text-4xl font-bold text-white mb-10 flex items-center gap-3">
            <FileText className="text-endo-accent" /> AAE Glossary of Terms
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border-t-4 border-yellow-500 shadow-xl"
            >
              <h3 className="text-3xl font-bold text-yellow-500 mb-4">CRACK</h3>
              <ul className="space-y-3 text-gray-300 list-disc pl-5">
                <li>Thin surface disruption</li>
                <li>Unknown depth (Incomplete)</li>
                <li>May cause pain or sensitivity</li>
              </ul>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border-t-4 border-red-600 shadow-xl"
            >
              <h3 className="text-3xl font-bold text-red-600 mb-4">FRACTURE</h3>
              <ul className="space-y-3 text-gray-300 list-disc pl-5">
                <li>Complete "Split" or "Break"</li>
                <li>Deeper than a crack</li>
                <li>Segments may or may not be separated</li>
              </ul>
            </motion.div>
          </div>
        </div>
      )
    },
    {
      id: 3,
      section: "CLASSIFICATION",
      title: "Types of Fractures",
      render: () => (
        <div className="h-full flex flex-col items-center justify-center">
          <motion.div className="w-full max-w-4xl relative">
            {/* Crown Origin */}
            <div className="flex flex-col md:flex-row justify-between gap-6">
              <motion.div className="flex-1 bg-blue-900/20 border border-blue-500/30 p-6 rounded-xl">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center font-bold">1</span>
                  <h3 className="text-xl font-bold text-blue-400">Crown Originating</h3>
                </div>
                <div className="space-y-2 font-mono text-sm text-blue-100">
                  <div className="p-2 bg-blue-900/40 rounded">Cracked Cusp</div>
                  <div className="p-2 bg-blue-900/40 rounded">Cracked Tooth</div>
                  <div className="p-2 bg-blue-900/40 rounded">Split Tooth</div>
                </div>
              </motion.div>

              {/* Root Origin */}
              <motion.div className="flex-1 bg-red-900/20 border border-red-500/30 p-6 rounded-xl">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center font-bold">2</span>
                  <h3 className="text-xl font-bold text-red-400">Root Originating</h3>
                </div>
                <div className="space-y-2 font-mono text-sm text-red-100">
                  <div className="p-2 bg-red-900/40 rounded">Vertical Root Fracture (VRF)</div>
                </div>
              </motion.div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8 p-4 bg-white/5 rounded-lg border-l-4 border-yellow-400 text-sm text-gray-300"
            >
              <strong className="text-yellow-400 mr-2">NOTE:</strong>
              Unlike Chapter 21 (Trauma), these are typically caused by <span className="text-white underline decoration-dotted">chronic, repetitive forces</span> (like bruxism), not a single impact event.
            </motion.div>
          </motion.div>
        </div>
      )
    },
    // ---------------- SECTION 2: CRACKED CUSP ----------------
    {
      id: 4,
      section: "CRACKED CUSP",
      title: "The Classic Signs",
      render: () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full items-center">
          <div>
            <motion.div className="inline-block px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs font-bold mb-4 border border-yellow-500/50">
              CROWN ORIGIN
            </motion.div>
            <motion.h2 layoutId="slide-title" className="text-4xl font-bold mb-6">Cracked Cusp</motion.h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center text-red-400">
                  <Activity size={20} />
                </div>
                <div>
                  <div className="text-sm text-gray-400">Chief Complaint</div>
                  <div className="font-bold text-lg">Sharp Pain on Chewing</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center text-green-400">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <div className="text-sm text-gray-400">Gold Standard Test</div>
                  <div className="font-bold text-lg">Tooth Sleuth</div>
                </div>
              </div>

              <div className="p-4 bg-gray-800 rounded-lg border border-gray-700 mt-4">
                <div className="text-endo-accent font-bold mb-1">KEY SIGN: Rebound Pain</div>
                <p className="text-sm text-gray-400">Pain occurs upon release of biting pressure.</p>
              </div>
            </div>
          </div>
          <div className="relative">
             <MedicalImage label="Application of Tooth Sleuth device" figure="22.2" />
             <QuestionBox 
               question="Why use a Tooth Sleuth instead of a cotton roll?" 
               answer="Because we must isolate individual cusps to find the specific offending one." 
             />
          </div>
        </div>
      )
    },
    {
      id: 5,
      section: "CRACKED CUSP",
      title: "Other Diagnosis Methods",
      render: () => (
        <div className="flex flex-col h-full">
           <motion.h2 layoutId="slide-title" className="text-3xl font-bold mb-8">Other Diagnostic Methods</motion.h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
             <div className="bg-endo-panel p-6 rounded-xl border border-white/5 flex flex-col items-center text-center">
                <div className="mb-4 text-blue-400"><Maximize2 size={40} /></div>
                <h3 className="text-xl font-bold mb-2">Transillumination</h3>
                <p className="text-sm text-gray-400">Light does NOT cross the crack line. One side glows, the other stays dark.</p>
             </div>
             <div className="bg-endo-panel p-6 rounded-xl border border-white/5 flex flex-col items-center text-center">
                <div className="mb-4 text-green-400"><Activity size={40} /></div>
                <h3 className="text-xl font-bold mb-2">Vitality</h3>
                <p className="text-sm text-gray-400">Pulp is usually VITAL.</p>
             </div>
             <div className="bg-endo-panel p-6 rounded-xl border border-white/5 flex flex-col items-center text-center">
                <div className="mb-4 text-gray-400"><Skull size={40} /></div>
                <h3 className="text-xl font-bold mb-2">Percussion</h3>
                <p className="text-sm text-gray-400">Usually NEGATIVE.</p>
             </div>
           </div>
           <div className="h-64 mt-6">
             <MedicalImage label="Transillumination showing stopped light" figure="22.3" />
           </div>
        </div>
      )
    },
    {
      id: 6,
      section: "CRACKED CUSP",
      title: "Treatment Plan",
      render: () => (
        <div className="h-full flex items-center justify-center">
          <div className="max-w-4xl w-full">
            <motion.h2 layoutId="slide-title" className="text-4xl font-bold mb-8 text-center">Treatment Strategy</motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-gray-700 rounded-2xl overflow-hidden">
              <div className="bg-blue-900/30 p-10 flex flex-col justify-center items-center text-center border-r border-gray-700">
                <h3 className="text-2xl font-bold text-blue-300 mb-4">PRIMARY GOAL</h3>
                <p className="text-4xl font-black text-white">PROTECT THE CUSP</p>
                <div className="mt-6 px-4 py-2 bg-blue-600 rounded text-white font-mono">Full Coverage Crown / Onlay</div>
              </div>
              <div className="bg-gray-900/50 p-10 flex flex-col justify-center items-center text-center">
                 <h3 className="text-2xl font-bold text-gray-400 mb-4">ROOT CANAL?</h3>
                 <div className="text-6xl mb-4">❌</div>
                 <p className="text-gray-300">Not unless Irreversible Pulpitis symptoms are present.</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    // ---------------- SECTION 3: CRACKED TOOTH ----------------
    {
      id: 7,
      section: "CRACKED TOOTH",
      title: "The Invisible Nightmare",
      render: () => (
        <div className="h-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
           <div>
             <motion.h2 layoutId="slide-title" className="text-4xl font-bold mb-2">Cracked Tooth</motion.h2>
             <p className="text-xl text-endo-danger font-mono mb-8">The Invisible Ghost 👻</p>
             
             <div className="space-y-6">
               <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                 <span className="text-gray-400">Direction</span>
                 <span className="font-bold font-mono text-endo-accent">Mesiodistal</span>
               </div>
               <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                 <span className="text-gray-400">X-Ray Visibility</span>
                 <span className="font-bold font-mono text-gray-500">INVISIBLE (Parallel to beam)</span>
               </div>
               <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                 <span className="text-gray-400">Movement</span>
                 <span className="font-bold font-mono text-white">None (Segments attached)</span>
               </div>
             </div>

             <div className="mt-8">
               <div className="text-sm text-gray-400 mb-2">Symptom Progression:</div>
               <div className="flex items-center gap-2 text-sm font-mono">
                 <span className="bg-yellow-500/20 text-yellow-500 px-2 py-1 rounded">Sharp Pain</span>
                 <ChevronRight size={16} />
                 <span className="bg-orange-500/20 text-orange-500 px-2 py-1 rounded">Cold Sensitivity</span>
                 <ChevronRight size={16} />
                 <span className="bg-gray-700 text-gray-400 px-2 py-1 rounded">Necrosis (Painless)</span>
               </div>
             </div>
           </div>
           <div>
             <MedicalImage label="Mesiodistal Crack Visualization" figure="22.4" isDanger />
           </div>
        </div>
      )
    },
    {
      id: 8,
      section: "CRACKED TOOTH",
      title: "Fracture Necrosis",
      render: () => (
        <div className="h-full flex flex-col">
          <motion.h2 layoutId="slide-title" className="text-3xl font-bold mb-6">Fracture Necrosis</motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
            <div className="relative">
               <MedicalImage label="Radiograph appearing normal but pulp is necrotic" figure="22.5" />
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-600/80 text-white px-4 py-2 rounded font-bold backdrop-blur-sm animate-pulse">
                 NON-VITAL
               </div>
            </div>
            <div className="flex flex-col justify-center space-y-6">
              <div className="bg-endo-panel p-6 rounded-lg border-l-4 border-endo-danger">
                <h3 className="font-bold text-lg mb-2">The Silent Killer Mechanism</h3>
                <div className="flex flex-col gap-2 font-mono text-sm">
                   <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-white"></div>Intact Tooth (No Caries)</div>
                   <div className="flex items-center gap-2"><ChevronRight size={14} className="text-gray-500"/>Microscopic Crack</div>
                   <div className="flex items-center gap-2"><ChevronRight size={14} className="text-gray-500"/>Bacterial Infiltration</div>
                   <div className="flex items-center gap-2 text-endo-danger font-bold"><ChevronRight size={14} />PULP NECROSIS</div>
                </div>
              </div>
              <QuestionBox 
                question="We see nothing on the X-Ray (Slide A). Why is the tooth dead?"
                answer="Bacteria travelled through the invisible crack directly to the pulp."
              />
            </div>
          </div>
        </div>
      )
    },
    {
      id: 9,
      section: "CRACKED TOOTH",
      title: "Split Tooth",
      render: () => (
        <div className="h-full flex flex-col items-center justify-center">
          <motion.h2 layoutId="slide-title" className="text-4xl font-bold mb-8 text-center text-endo-danger">Evolution to Split Tooth 💔</motion.h2>
          
          <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-black/40 p-4 rounded-xl border border-white/10 text-center">
               <div className="font-mono text-gray-400 text-xs uppercase mb-2">Condition</div>
               <div className="text-xl font-bold">Complete Separation</div>
            </div>
             <div className="bg-black/40 p-4 rounded-xl border border-white/10 text-center">
               <div className="font-mono text-gray-400 text-xs uppercase mb-2">Diagnosis</div>
               <div className="text-xl font-bold text-endo-accent">"Wedging"</div>
               <div className="text-xs text-gray-500">Movement of segments with explorer</div>
            </div>
             <div className="bg-black/40 p-4 rounded-xl border border-white/10 text-center">
               <div className="font-mono text-gray-400 text-xs uppercase mb-2">Visualization</div>
               <div className="text-xl font-bold text-blue-400">Dyes</div>
               <div className="text-xs text-gray-500">Methylene Blue after removing restoration</div>
            </div>
          </div>

          <div className="w-full max-w-2xl h-64">
             <MedicalImage label="Probing the deep split" figure="22.6" isDanger />
          </div>
        </div>
      )
    },
    {
      id: 10,
      section: "CRACKED TOOTH",
      title: "Treatment Protocol",
      render: () => (
        <div className="h-full flex flex-col">
          <motion.h2 layoutId="slide-title" className="text-3xl font-bold mb-6">Treatment Protocol</motion.h2>
          
          <div className="flex-1 flex flex-col justify-center space-y-6">
            {/* Immediate Action */}
            <div className="bg-blue-900/20 border border-blue-500/50 p-4 rounded-lg flex items-center gap-4">
               <div className="bg-blue-500 text-white p-3 rounded font-bold">STEP 1</div>
               <div>
                 <div className="font-bold text-blue-300">IMMEDIATE STABILIZATION</div>
                 <div className="text-white">Orthodontic Band or Temporary Crown</div>
               </div>
            </div>

            {/* Decision Tree */}
            <div className="flex flex-col md:flex-row gap-4 ml-16">
               <div className="flex-1 bg-green-900/20 border border-green-500/50 p-4 rounded-lg">
                  <div className="text-green-400 font-bold mb-2">Pain Resolves?</div>
                  <div className="text-white">Proceed to Permanent Crown</div>
               </div>
               <div className="flex-1 bg-orange-900/20 border border-orange-500/50 p-4 rounded-lg">
                  <div className="text-orange-400 font-bold mb-2">Pain Persists?</div>
                  <div className="text-white">RCT + Crown</div>
               </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
               <div className="bg-gray-800 p-4 rounded-lg text-center">
                 <div className="text-3xl font-bold text-white mb-1">20%</div>
                 <div className="text-xs text-gray-400">Of Reversible Pulpitis cases eventually need Endo</div>
               </div>
               <div className="bg-red-900/40 border border-red-600 p-4 rounded-lg text-center">
                 <div className="text-xl font-bold text-red-500 mb-1">HOPELESS SIGN 🏴</div>
                 <div className="text-xs text-red-200">Crack crosses pulp floor connecting Mesial to Distal → Extraction</div>
               </div>
            </div>
          </div>
        </div>
      )
    },
    // ---------------- SECTION 4: VRF ----------------
    {
      id: 11,
      section: "VRF",
      title: "Vertical Root Fracture",
      render: () => (
        <div className="h-full flex flex-col items-center justify-center text-center">
          <div className="bg-endo-danger/20 text-endo-danger px-4 py-1 rounded-full text-sm font-bold mb-6 border border-endo-danger/50 animate-pulse">
            ROOT ORIGIN - CRITICAL DIAGNOSIS
          </div>
          <motion.h2 layoutId="slide-title" className="text-5xl md:text-6xl font-black text-white mb-10 tracking-tighter">
            V.R.F.
          </motion.h2>
          
          <div className="grid grid-cols-2 gap-8 w-full max-w-3xl">
            <div className="bg-endo-panel p-6 rounded-xl border-t-4 border-white text-left">
              <div className="text-gray-400 text-sm">LOCATION</div>
              <div className="text-2xl font-bold text-white">ROOT</div>
            </div>
            <div className="bg-endo-panel p-6 rounded-xl border-t-4 border-white text-left">
              <div className="text-gray-400 text-sm">DIRECTION</div>
              <div className="text-2xl font-bold text-white">BUCCO-LINGUAL</div>
            </div>
            <div className="bg-endo-panel p-6 rounded-xl border-t-4 border-white text-left">
              <div className="text-gray-400 text-sm">SEGMENTS</div>
              <div className="text-2xl font-bold text-white">Incomplete Separation</div>
            </div>
            <div className="bg-endo-panel p-6 rounded-xl border-t-4 border-endo-danger text-left">
              <div className="text-gray-400 text-sm">PRIMARY VICTIMS</div>
              <div className="text-2xl font-bold text-endo-danger">Endo Treated Teeth</div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 12,
      section: "VRF",
      title: "Clinical Signs",
      render: () => (
        <div className="h-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-8">
            <motion.h2 layoutId="slide-title" className="text-3xl font-bold text-white">Clinical Signs 🚩</motion.h2>
            
            <div className="bg-gray-800/50 p-4 rounded-lg border-l-4 border-blue-400">
              <h3 className="text-xl font-bold text-blue-400 mb-2">1. Sinus Tract</h3>
              <p className="text-gray-300">Located coronally (near attached gingiva), NOT in mucosa like an apical abscess.</p>
            </div>

            <div className="bg-gray-800/50 p-4 rounded-lg border-l-4 border-purple-400">
              <h3 className="text-xl font-bold text-purple-400 mb-2">2. The Pocket</h3>
              <ul className="grid grid-cols-2 gap-2 font-mono text-sm text-gray-300">
                <li className="flex items-center gap-2"><CheckCircle2 size={12}/> DEEP</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={12}/> NARROW</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={12}/> TIGHT</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={12}/> ISOLATED</li>
              </ul>
            </div>
          </div>
          <div>
            <MedicalImage label="Narrow VRF Pocket vs Wide Perio Pocket" figure="22.10 & 22.15" />
          </div>
        </div>
      )
    },
    {
      id: 13,
      section: "VRF",
      title: "Probing Challenge",
      render: () => (
        <div className="h-full flex flex-col justify-center max-w-3xl mx-auto">
          <motion.h2 layoutId="slide-title" className="text-3xl font-bold mb-8">The Probing Challenge</motion.h2>
          
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-8 rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
               <Microscope size={120} />
             </div>
             
             <div className="mb-6">
               <strong className="text-red-400 block text-sm uppercase tracking-wider mb-2">The Problem</strong>
               <p className="text-xl text-white">Metal probes engage coronal convexity and <span className="underline decoration-red-500 decoration-2">miss the pocket</span>.</p>
             </div>
             
             <div className="mb-6">
               <strong className="text-green-400 block text-sm uppercase tracking-wider mb-2">The Solution</strong>
               <p className="text-2xl text-white font-bold">Flexible Plastic Probe</p>
             </div>

             <div className="flex items-center gap-4 bg-black/40 p-4 rounded-lg">
               <div className="bg-white text-black p-2 rounded font-bold text-xs">SIGN</div>
               <div className="font-mono text-white">"Blanching" of gingiva upon insertion.</div>
             </div>
          </div>
        </div>
      )
    },
    {
      id: 14,
      section: "VRF",
      title: "Radiography",
      render: () => (
        <div className="h-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <motion.h2 layoutId="slide-title" className="text-3xl font-bold mb-6">Radiographic Signs ☢️</motion.h2>
            
            <div className="space-y-6">
               <div className="opacity-50">
                 <div className="text-sm font-bold uppercase mb-1">Early Stage</div>
                 <div className="text-gray-400">Invisible (Blocked by Gutta Percha)</div>
               </div>

               <div>
                 <div className="text-endo-accent font-bold uppercase mb-2 text-xl">Late Stage (Classic)</div>
                 <ul className="space-y-3">
                   <li className="flex items-center gap-3 bg-endo-panel p-3 rounded border border-endo-accent/30">
                     <div className="w-8 h-8 rounded-full border-2 border-endo-accent flex items-center justify-center text-endo-accent font-black">J</div>
                     <span className="font-bold text-white">"J-Shaped" / Halo Radiolucency</span>
                   </li>
                   <li className="flex items-center gap-3 bg-endo-panel p-3 rounded border border-white/10">
                     <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">📐</div>
                     <span className="text-gray-300">Angular Bone Loss</span>
                   </li>
                 </ul>
               </div>

               <div className="text-sm bg-yellow-900/20 text-yellow-200 p-3 rounded border border-yellow-700">
                 <strong>PRO TIP:</strong> Change Horizontal Angulation to see separation of GP or post.
               </div>
            </div>
          </div>
          <div>
            <MedicalImage label='Classic "Halo" lesion' figure="22.13" />
          </div>
        </div>
      )
    },
    {
      id: 15,
      section: "VRF",
      title: "CBCT Role",
      render: () => (
        <div className="h-full flex flex-col justify-center">
          <motion.h2 layoutId="slide-title" className="text-3xl font-bold mb-8">Role of CBCT</motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="bg-green-900/20 p-6 rounded-xl border border-green-500/30">
               <h3 className="text-green-400 font-bold text-xl mb-4 flex items-center gap-2"><CheckCircle2 /> PROS</h3>
               <p className="text-white">Axial View (Cross section) provides the best visualization of bone loss patterns.</p>
             </div>
             
             <div className="bg-red-900/20 p-6 rounded-xl border border-red-500/30">
               <h3 className="text-red-400 font-bold text-xl mb-4 flex items-center gap-2"><XCircle /> CONS & LIMITS</h3>
               <ul className="space-y-3 text-gray-300 text-sm">
                 <li><strong className="text-white">Artifacts:</strong> "Star-burst" effect from GP/Metal.</li>
                 <li><strong className="text-white">Resolution:</strong> Crack must be 2x voxel size.</li>
                 <li>Often shows the <em className="text-gray-400">bone loss pattern</em> rather than the crack itself.</li>
               </ul>
             </div>
          </div>
        </div>
      )
    },
    // ---------------- SECTION 5: ETIOLOGY ----------------
    {
      id: 16,
      section: "ETIOLOGY",
      title: "Natural Causes",
      render: () => (
        <div className="h-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
           <div>
             <motion.h2 layoutId="slide-title" className="text-3xl font-bold mb-6">Etiology: Anatomy 🧬</motion.h2>
             <div className="space-y-4 text-gray-300">
               <p>Roots with <strong className="text-white">Oval</strong> or <strong className="text-white">Dumbbell</strong> cross-sections are at highest risk.</p>
               
               <div className="bg-endo-panel p-4 rounded-lg mt-4">
                 <div className="text-sm text-gray-400 uppercase tracking-widest mb-2">Most Susceptible Teeth</div>
                 <ol className="list-decimal list-inside space-y-2 font-bold text-white">
                   <li>Maxillary Premolars</li>
                   <li>Mesial Root of Mandibular Molars</li>
                 </ol>
               </div>
               
               <div className="mt-4 p-2 bg-red-500/10 text-red-300 text-sm rounded border border-red-500/20">
                 <strong>DANGER ZONE:</strong> Concavities on Mesial/Distal walls.
               </div>
             </div>
           </div>
           <div>
             <MedicalImage label="Root Cross-sections" figure="22.22" />
           </div>
        </div>
      )
    },
    {
      id: 17,
      section: "ETIOLOGY",
      title: "Iatrogenic Causes",
      render: () => (
        <div className="h-full flex flex-col justify-center items-center">
           <motion.h2 layoutId="slide-title" className="text-3xl font-bold mb-10">Etiology: The Dentist's Fault? 👨‍⚕️</motion.h2>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
             {[
               { title: "Over Prep", desc: "Excessive canal shaping weakens structure." },
               { title: "Rotary Files", desc: "Large taper files cause microcracks." },
               { title: "Obturation", desc: "Excessive force during Lateral Compaction.", extra: "NiTi Spreader > SS Spreader" },
               { title: "Posts", desc: "Active screw posts & lack of Ferrule." }
             ].map((item, i) => (
               <motion.div 
                 key={i}
                 whileHover={{ y: -10 }}
                 className="bg-endo-panel p-6 rounded-xl border border-white/10 shadow-lg"
               >
                 <div className="text-endo-accent font-bold mb-2">{item.title}</div>
                 <div className="text-sm text-gray-400">{item.desc}</div>
                 {item.extra && <div className="mt-3 text-xs text-green-400 font-mono border-t border-white/10 pt-2">{item.extra}</div>}
               </motion.div>
             ))}
           </div>
        </div>
      )
    },
    // ---------------- SECTION 6: SUMMARY ----------------
    {
      id: 18,
      section: "TREATMENT",
      title: "VRF Treatment",
      render: () => (
        <div className="h-full flex flex-col items-center justify-center text-center">
           <motion.h2 layoutId="slide-title" className="text-4xl font-bold mb-8">VRF Treatment Plan</motion.h2>
           
           <div className="bg-red-600 p-8 rounded-full w-48 h-48 flex items-center justify-center shadow-[0_0_50px_rgba(220,38,38,0.5)] mb-8 animate-pulse">
             <span className="text-2xl font-black text-white">EXTRACTION</span>
           </div>
           
           <p className="text-xl text-gray-300 max-w-xl">
             Why not repair? <br/>
             <span className="text-gray-500 italic">Long term results are unreliable.</span>
           </p>

           <div className="mt-8 text-sm text-endo-accent border border-endo-accent/30 px-4 py-2 rounded-full">
             Exception: <strong>Root Amputation</strong> (Multi-rooted teeth)
           </div>
        </div>
      )
    },
    {
      id: 19,
      section: "SUMMARY",
      title: "Comparison Table",
      render: () => (
        <div className="h-full flex flex-col justify-center">
           <motion.h2 layoutId="slide-title" className="text-3xl font-bold mb-6 text-center">The Grand Finale: Comparison</motion.h2>
           
           <div className="overflow-x-auto">
             <table className="w-full text-left border-collapse">
               <thead>
                 <tr>
                   <th className="p-4 border-b border-gray-600 text-gray-400 font-mono text-sm">FEATURE</th>
                   <th className="p-4 border-b border-gray-600 text-yellow-400 font-bold text-xl">CRACKED TOOTH</th>
                   <th className="p-4 border-b border-gray-600 text-red-400 font-bold text-xl">VRF</th>
                 </tr>
               </thead>
               <tbody className="font-mono text-sm">
                 {[
                   { feat: "Direction", c: "Mesiodistal", v: "Bucco-Lingual" },
                   { feat: "Pulp Status", c: "Vital (Early)", v: "Non-Vital (RCT)" },
                   { feat: "Radiography", c: "Negative", v: "J-Shaped / Halo" },
                   { feat: "Pocket", c: "None", v: "Deep, Narrow, Isolated" },
                   { feat: "Treatment", c: "Crown / Band", v: "Extraction" },
                 ].map((row, i) => (
                   <motion.tr 
                     key={i}
                     initial={{ opacity: 0, x: -20 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     transition={{ delay: i * 0.1 }}
                     className="hover:bg-white/5 transition-colors border-b border-gray-800"
                   >
                     <td className="p-4 text-gray-300 font-bold">{row.feat}</td>
                     <td className="p-4 text-white">{row.c}</td>
                     <td className="p-4 text-white">{row.v}</td>
                   </motion.tr>
                 ))}
               </tbody>
             </table>
           </div>
        </div>
      )
    },
    {
      id: 20,
      section: "CONCLUSION",
      title: "Final Thoughts",
      render: () => (
        <div className="h-full flex flex-col items-center justify-center text-center">
          <motion.div 
            initial={{ scale: 0 }} 
            animate={{ scale: 1 }} 
            className="text-green-400 mb-6"
          >
            <CheckCircle2 size={80} />
          </motion.div>
          <h2 className="text-4xl font-bold text-white mb-6">Case Closed</h2>
          <p className="text-xl text-gray-300 max-w-2xl leading-relaxed">
            Pay attention to subtle signs. <br/>
            Take isolated pockets seriously. <br/>
            Do not weaken the tooth structure unnecessarily.
          </p>
          <div className="mt-12 animate-bounce">
            <p className="text-endo-accent font-mono text-sm">ANY QUESTIONS?</p>
          </div>
        </div>
      )
    }
  ];

  // --- Logic ---

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setDirection(1);
      setCurrentSlide(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setDirection(-1);
      setCurrentSlide(prev => prev - 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  const slideVariants = {
    hidden: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? 45 : -45,
    }),
    visible: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 20,
        mass: 1
      }
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? -45 : 45,
      transition: { duration: 0.4 }
    })
  };

  // --- Render ---

  return (
    <div className="relative w-screen h-screen bg-endo-dark text-white overflow-hidden font-sans perspective-1000">
      <Background />

      {/* Main Content Area */}
      <div className="relative z-10 w-full h-full flex flex-col pt-16 pb-20 px-4 md:px-16">
        <LayoutGroup>
          <AnimatePresence initial={false} custom={direction} mode='wait'>
            <motion.div
              key={currentSlide}
              custom={direction}
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full h-full max-w-7xl mx-auto"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Slide Header (Sticky morph) */}
              <div className="mb-6 flex justify-between items-end border-b border-white/10 pb-4">
                 <div>
                   <motion.div className="text-endo-accent text-xs font-mono tracking-[0.2em] mb-1">
                     {slides[currentSlide].section} /// SLIDE {currentSlide + 1}
                   </motion.div>
                 </div>
              </div>
              
              {/* Slide Body */}
              <div className="h-[calc(100%-4rem)] overflow-y-auto">
                {slides[currentSlide].render(true)}
              </div>
            </motion.div>
          </AnimatePresence>
        </LayoutGroup>
      </div>

      {/* Top Bar / Navigation */}
      <div className="absolute top-0 left-0 w-full h-16 bg-black/40 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-6 z-50">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
          <Activity className="text-endo-accent" />
          <span className="hidden md:inline">Endo</span>Detective
        </div>
        <div className="flex items-center gap-4">
           <div className="text-xs font-mono text-gray-400 hidden md:block">
             CASE FILE: #22-COHEN
           </div>
        </div>
      </div>

      {/* Bottom Control Bar */}
      <div className="absolute bottom-0 left-0 w-full h-20 bg-black/60 backdrop-blur-lg border-t border-white/10 flex items-center justify-between px-6 md:px-12 z-50">
        
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 h-1 bg-endo-accent transition-all duration-500 ease-out shadow-[0_0_10px_#38bdf8]" style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}></div>

        <button 
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="p-3 rounded-full hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-all active:scale-95"
        >
          <ChevronLeft size={32} />
        </button>

        <div className="flex flex-col items-center">
           <div className="text-2xl font-mono font-bold">{currentSlide + 1} <span className="text-gray-500 text-lg">/ {slides.length}</span></div>
           <div className="text-[10px] text-gray-400 uppercase tracking-widest hidden md:block">Investigation Progress</div>
        </div>

        <button 
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className="p-3 rounded-full hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-all active:scale-95"
        >
          <ChevronRight size={32} />
        </button>
      </div>

    </div>
  );
};

export default App;
