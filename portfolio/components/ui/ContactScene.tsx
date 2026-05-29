"use client";

import React, { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { 
  Float, 
  Sphere, 
  MeshDistortMaterial, 
  Html, 
  OrbitControls, 
  PerspectiveCamera,
  Stars,
  Line
} from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaLinkedinIn, FaEnvelope, FaFileAlt, FaPlug } from "react-icons/fa";

const nodes = [
  { id: "email", icon: <FaEnvelope />, color: "#10b981", label: "Email", link: "mailto:qshubhamq2@gmail.com", pos: [4, 2, 0], desc: "Direct Communication" },
  { id: "github", icon: <FaGithub />, color: "#3b82f6", label: "GitHub", link: "https://github.com/SVatsa12", pos: [-4, 3, -1], desc: "Open Source Activity" },
  { id: "linkedin", icon: <FaLinkedinIn />, color: "#0ea5e9", label: "LinkedIn", link: "https://www.linkedin.com/in/svatsa12", pos: [-3, -3, 2], desc: "Professional Network" },
  { id: "resume", icon: <FaFileAlt />, color: "#a855f7", label: "Resume", link: "/resume.pdf", pos: [3, -2, -2], desc: "Technical Profile" },
  { id: "opps", icon: <FaPlug />, color: "#22c55e", label: "Open", link: "#", pos: [0, -5, 1], desc: "Available for Internships" },
];

const expertise = [
  { label: "AI Systems", pos: [6, 0, -3] },
  { label: "Backend", pos: [-6, 1, -2] },
  { label: "Distributed", pos: [2, 5, -4] },
];

function ConnectionLine({ start, end, hovered }: { start: [number, number, number], end: [number, number, number], hovered: boolean }) {
  const lineRef = useRef<any>(null);
  
  useFrame((state) => {
    if (lineRef.current && lineRef.current.material) {
      lineRef.current.material.dashOffset -= 0.01;
    }
  });

  return (
    <group>
      {/* Visual connection dot at center-start */}
      <mesh position={start as any}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color={hovered ? "#22d3ee" : "#1e293b"} emissive={hovered ? "#22d3ee" : "#1e293b"} emissiveIntensity={2} />
      </mesh>
      
      <Line
        ref={lineRef}
        points={[new THREE.Vector3(...start), new THREE.Vector3(...end)]}
        color={hovered ? "#22d3ee" : "#1e293b"}
        lineWidth={hovered ? 3 : 1.5}
        transparent
        opacity={hovered ? 0.9 : 0.4}
      />
    </group>
  );
}

function Node({ data, isCore = false, onHover }: { data: any, isCore?: boolean, onHover: (id: string | null) => void }) {
  const [hovered, setHovered] = useState(false);

  const handlePointerOver = () => {
    setHovered(true);
    onHover(data.id || "core");
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = () => {
    setHovered(false);
    onHover(null);
    document.body.style.cursor = 'auto';
  };

  const handleClick = () => {
    if (data.link && data.link !== "#") {
      window.open(data.link, "_blank");
    }
  };

  return (
    <group position={data.pos as any}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh 
          onPointerOver={handlePointerOver} 
          onPointerOut={handlePointerOut}
          onClick={handleClick}
        >
          <sphereGeometry args={[isCore ? 1 : 0.5, 64, 64]} />
          <meshStandardMaterial
            color={hovered ? data.color : (isCore ? "#22d3ee" : "#1e293b")}
            roughness={0.1}
            metalness={0.8}
            emissive={data.color}
            emissiveIntensity={hovered ? 2 : (isCore ? 0.8 : 0.1)}
          />
        </mesh>
        
        {isCore && (
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[1.5, 0.02, 16, 100]} />
            <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={2} transparent opacity={0.3} />
          </mesh>
        )}
      </Float>

      <Html position={[0, isCore ? 1.8 : 1, 0]} center>
        <AnimatePresence>
          {(hovered || isCore) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="pointer-events-none select-none flex flex-col items-center"
            >
              <div 
                className={`px-3 py-1 rounded-full text-xs font-bold tracking-widest whitespace-nowrap backdrop-blur-md border flex items-center gap-2 ${
                  isCore ? "bg-blue-500/20 border-blue-400 text-blue-400" : "bg-slate-900/40 border-slate-700 text-slate-300"
                }`}
                style={hovered ? { borderColor: data.color, color: data.color, boxShadow: `0 0 15px ${data.color}33` } : {}}
              >
                {!isCore && <span className="text-sm">{data.icon}</span>}
                {data.label.toUpperCase()}
              </div>
              {hovered && !isCore && (
                <div className="mt-2 px-2 py-1 bg-black/60 rounded text-[10px] text-white/60 whitespace-nowrap">
                  {data.desc}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </Html>
    </group>
  );
}

export default function ContactScene() {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const coreNode = { id: "core", label: "Shubham", pos: [0, 0, 0], color: "#22d3ee" };

  return (
    <div className="w-full h-full min-h-80 relative cursor-grab active:cursor-grabbing bg-transparent">
      <Canvas 
        shadows
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
        camera={{ position: [0, 0, 12], fov: 50 }}
      >
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate 
          autoRotateSpeed={0.8}
          rotateSpeed={0.5}
          makeDefault
        />
        
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />

        {/* Central Core */}
        <Node data={coreNode} isCore onHover={setActiveNode} />

        {/* Outer Nodes */}
        {nodes.map((node) => (
          <React.Fragment key={node.id}>
            <ConnectionLine 
              start={[0, 0, 0]} 
              end={node.pos as any} 
              hovered={activeNode === node.id || activeNode === "core"} 
            />
            <Node data={node} onHover={setActiveNode} />
          </React.Fragment>
        ))}

        {/* Expertise Nodes (Labels only) */}
        {expertise.map((exp, i) => (
          <group key={i} position={exp.pos as any}>
            <Html center>
              <div className="text-[10px] font-mono text-white/20 whitespace-nowrap tracking-[0.2em] uppercase">
                {exp.label}
              </div>
            </Html>
          </group>
        ))}
      </Canvas>
    </div>
  );
}
