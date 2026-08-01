import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import * as THREE from "three";

type DispatchPipeProps = {
  activeStageIndex?: number;
  onSelectStage?: (index: number) => void;
};

const STAGE_NODES = [
  { name: "Speech", azure: "Azure Speech", color: "#2B6EFF", pos: [-3.6, 0, 0] },
  { name: "Vision", azure: "Azure Vision", color: "#C9F031", pos: [-1.8, 0, 0] },
  { name: "Language", azure: "Azure Language", color: "#A855F7", pos: [0, 0, 0] },
  { name: "RAG Search", azure: "AI Search", color: "#F59E0B", pos: [1.8, 0, 0] },
  { name: "OpenAI", azure: "Azure OpenAI", color: "#FF3B1F", pos: [3.6, 0, 0] },
];

function ConduitPipe({ activeIndex }: { activeIndex: number }) {
  const pipeRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Particle position array
  const particleCount = 100;
  const positions = useRef(new Float32Array(particleCount * 3));
  const speeds = useRef(new Float32Array(particleCount));

  useEffect(() => {
    for (let i = 0; i < particleCount; i++) {
      positions.current[i * 3] = (Math.random() - 0.5) * 8; // x along pipe
      positions.current[i * 3 + 1] = (Math.random() - 0.5) * 0.4; // y offset
      positions.current[i * 3 + 2] = (Math.random() - 0.5) * 0.4; // z offset
      speeds.current[i] = 0.02 + Math.random() * 0.04;
    }
  }, []);

  useFrame((_, delta) => {
    if (pipeRef.current) {
      pipeRef.current.rotation.y += delta * 0.15;
    }

    if (particlesRef.current) {
      const geo = particlesRef.current.geometry;
      const posAttr = geo.attributes["position"];
      if (posAttr) {
        const arr = posAttr.array as Float32Array;
        if (arr) {
          for (let i = 0; i < particleCount; i++) {
            arr[i * 3] = (arr[i * 3] ?? 0) + (speeds.current[i] ?? 0.02);
            if ((arr[i * 3] ?? 0) > 4.2) {
              arr[i * 3] = -4.2;
            }
          }
          posAttr.needsUpdate = true;
        }
      }
    }
  });

  return (
    <group ref={pipeRef}>
      {/* Outer Metallic Cylinder Conduit */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.3, 0.3, 8.4, 32]} />
        <meshStandardMaterial
          color="#1E222D"
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Internal Pulsing Energy Core */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.15, 0.15, 8.3, 16]} />
        <meshBasicMaterial color="#FF3B1F" wireframe />
      </mesh>

      {/* 5 Junction Nodes */}
      {STAGE_NODES.map((node, idx) => {
        const isActive = idx === activeIndex;
        return (
          <group key={node.name} position={node.pos as [number, number, number]}>
            {/* Junction Ring Collar */}
            <mesh rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.45, 0.45, 0.3, 16]} />
              <meshStandardMaterial color="#0B0C0E" roughness={0.1} metalness={0.9} />
            </mesh>

            {/* Glowing Junction Sphere */}
            <mesh>
              <sphereGeometry args={[isActive ? 0.45 : 0.35, 32, 32]} />
              <meshStandardMaterial
                color={node.color}
                emissive={node.color}
                emissiveIntensity={isActive ? 1.5 : 0.4}
                roughness={0.1}
              />
            </mesh>

            {/* Node Label Text */}
            <Text
              position={[0, 0.75, 0]}
              fontSize={0.28}
              color={isActive ? "#C9F031" : "#F3F0E9"}
              anchorX="center"
              anchorY="middle"
              font="https://fonts.gstatic.com/s/jetbrainsmono/v13/tB3g524-GGq3n53yAoTsdbI.woff"
            >
              {node.name.toUpperCase()}
            </Text>
          </group>
        );
      })}

      {/* Particle Light Stream inside Pipe */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions.current, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          color={STAGE_NODES[activeIndex]?.color ?? "#C9F031"}
          transparent
          opacity={0.85}
        />
      </points>
    </group>
  );
}

export function DispatchPipe3D({
  activeStageIndex = 0,
  onSelectStage,
}: DispatchPipeProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 600);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="relative h-[320px] w-full border-3 border-[#000000] bg-[#0B0C0E] shadow-[6px_6px_0px_#000000]">
      {/* Console Status Header Bar */}
      <div className="flex flex-wrap items-center justify-between border-b-2 border-slate-800 bg-[#12141A] px-4 py-2 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 bg-[#C9F031] animate-pulse" />
          <span className="font-bold text-[#C9F031]">R3F DISPATCH CONDUIT 3D</span>
        </div>
        <span className="text-slate-400">Drag to orbit 3D model · Select node below</span>
      </div>

      {/* R3F Canvas / Mobile Fallback */}
      {isMobile ? (
        <div className="flex h-[250px] flex-col items-center justify-center p-6 text-center">
          <p className="font-display text-lg text-[#FF3B1F]">
            AZURE AI PIPELINE CONDUIT
          </p>
          <p className="mt-2 font-mono text-xs text-slate-400">
            [5-Stage Microservice Highway Active: Speech → Vision → Language → RAG → OpenAI]
          </p>
        </div>
      ) : (
        <Canvas camera={{ position: [0, 1.2, 7.5], fov: 50 }}>
          <ambientLight intensity={0.6} />
          <pointLight position={[10, 10, 10]} intensity={1.2} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          <ConduitPipe activeIndex={activeStageIndex} />
          <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 1.8} minPolarAngle={Math.PI / 3} />
        </Canvas>
      )}

      {/* Quick Stage Trigger Selector Bar */}
      <div className="absolute bottom-2 left-2 right-2 flex flex-wrap justify-center gap-1.5 bg-[#0B0C0E]/90 p-2 border-t border-slate-800 backdrop-blur-sm">
        {STAGE_NODES.map((node, idx) => (
          <button
            key={node.name}
            type="button"
            onClick={() => onSelectStage?.(idx)}
            className={`px-2.5 py-1 text-[11px] font-mono font-bold uppercase transition-all ${
              idx === activeStageIndex
                ? "bg-[#C9F031] text-[#000000] border-2 border-[#000000]"
                : "bg-[#1A1C23] text-[#F3F0E9] border border-slate-700 hover:border-[#C9F031]"
            }`}
          >
            0{idx + 1}. {node.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default DispatchPipe3D;
