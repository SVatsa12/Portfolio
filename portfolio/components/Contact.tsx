"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaNetworkWired, FaEnvelope, FaGithub, FaLinkedinIn, FaFileAlt } from "react-icons/fa";
import dynamic from "next/dynamic";

// Dynamic import for 3D scene to avoid SSR issues
const ContactScene = dynamic(() => import("./ui/ContactScene"), { 
  ssr: false,
  loading: () => <div className="w-full h-full flex items-center justify-center text-cyan-400 font-mono text-[10px]">INITIALIZING NETWORK...</div>
});

const Contact = () => {
  return (

    <section id="contact" className="w-full py-24 bg-[#020617] relative overflow-hidden flex flex-col items-center">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-blue-900/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 z-10 w-full max-w-6xl">
        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* LEFT COLUMN: Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col space-y-16 lg:space-y-24"
          >
            <div>
              <div className="w-full mb-8">
                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase leading-none">
                  INITIALIZE <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">NETWORK</span>
                </h2>
              </div>
              <p className="max-w-md text-slate-400 text-lg leading-relaxed">
                Open to internships, research, and ambitious engineering projects. Let's build the next generation of AI systems.
              </p>
            </div>

            {/* Availability Badge */}
            <div className="flex items-center gap-3 px-4 py-2 bg-emerald-400/5 border border-emerald-400/20 rounded-full w-fit">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
              <span className="text-emerald-400 font-mono text-xs font-bold tracking-widest">
                OPEN TO OPPORTUNITIES
              </span>
            </div>

            {/* Status Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 bg-white/5 border border-white/5 rounded-2xl backdrop-blur-sm">
              <div className="space-y-1">
                <p className="text-slate-500 font-mono text-[10px] uppercase tracking-tighter">Response Latency</p>
                <p className="text-white font-mono text-sm tracking-widest">&lt; 24 HOURS</p>
              </div>
              <div className="space-y-1">
                <p className="text-slate-500 font-mono text-[10px] uppercase tracking-tighter">Current Timezone</p>
                <p className="text-white font-mono text-sm tracking-widest">IST (UTC+5:30)</p>
              </div>
              <div className="sm:col-span-2 space-y-2 border-t border-white/5 pt-4">
                <p className="text-slate-500 font-mono text-[10px] uppercase tracking-tighter">Focus Areas</p>
                <div className="flex flex-wrap gap-2">
                  {["AI Systems", "Backend Architecture", "Distributed Systems"].map(tag => (
                    <span key={tag} className="px-2 py-1 bg-blue-500/10 border border-blue-500/20 rounded text-[10px] text-blue-300 font-mono uppercase tracking-widest">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <motion.a
              href="mailto:qshubhamq2@gmail.com"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-fit px-8 py-4 bg-linear-to-r from-blue-600 to-emerald-600 rounded-xl text-white font-bold tracking-widest text-sm shadow-[0_0_20px_rgba(37,99,235,0.2)] flex items-center justify-center gap-3 group"
            >
              <FaNetworkWired className="group-hover:rotate-12 transition-transform" />
              OPEN COMMUNICATION CHANNEL
            </motion.a>
          </motion.div>

          {/* RIGHT COLUMN: 3D Widget */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative flex justify-center"
          >
            <div className="w-[320px] h-[320px] md:w-[380px] md:h-[380px] bg-[#020617] backdrop-blur-md border border-white/10 rounded-[2.5rem] p-4 relative overflow-hidden shadow-2xl">
              {/* Internal Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-500/10 rounded-full blur-[60px] pointer-events-none" />
              
              <ContactScene />
              
              {/* Floating Instructions */}
              <div className="absolute bottom-6 left-0 right-0 text-center pointer-events-none">
                <p className="text-slate-500 font-mono text-[9px] tracking-[0.2em] uppercase">
                  Drag to rotate • Click nodes to connect
                </p>
              </div>
            </div>
            
            {/* Decorative Corner Element */}
            <div className="absolute -top-4 -right-4 w-12 h-12 border-t-2 border-r-2 border-cyan-500/40 rounded-tr-2xl pointer-events-none" />
            <div className="absolute -bottom-4 -left-4 w-12 h-12 border-b-2 border-l-2 border-emerald-500/40 rounded-bl-2xl pointer-events-none" />
          </motion.div>
        </div>

        {/* BOTTOM ROW: Connection Hub */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
          {[
            { label: "Email", icon: <FaEnvelope />, href: "mailto:qshubhamq2@gmail.com", color: "hover:text-emerald-400" },
            { label: "GitHub", icon: <FaGithub />, href: "https://github.com/SVatsa12", color: "hover:text-white" },
            { label: "LinkedIn", icon: <FaLinkedinIn />, href: "https://www.linkedin.com/in/svatsa12", color: "hover:text-blue-400" },
            { label: "Resume", icon: <FaFileAlt />, href: "/resume.pdf", color: "hover:text-purple-400" }
          ].map((item, i) => (
            <motion.a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`flex flex-col items-center justify-center p-6 bg-white/5 border border-white/5 rounded-2xl gap-3 transition-all duration-300 group ${item.color} hover:bg-white/10 hover:border-white/10 overflow-hidden relative`}
            >
              <span className="text-2xl opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all">
                {item.icon}
              </span>
              <span className="font-mono text-[10px] tracking-widest uppercase text-slate-500 group-hover:text-current">
                {item.label}
              </span>
              
              {/* Subtle hover pulse */}
              <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.a>
          ))}
        </div>

        {/* Distributed Systems Footer Note */}
        <div className="mt-24 text-center">
          <p className="text-slate-700 font-mono text-[10px] italic tracking-widest">
            "Distributed systems begin with a single connection."
          </p>
          <div className="mt-8 pt-8 border-t border-white/5 w-full text-slate-800 text-[9px] tracking-[0.3em] font-mono">
            © 2025 SHUBHAM VATSA · ALL ENDPOINTS SECURED
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
