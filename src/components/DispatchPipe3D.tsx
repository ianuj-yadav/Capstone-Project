import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import * as THREE from "three";

type DispatchPipeProps = {
  activeStageIndex?: number;
  onSelectStage?: (index: number) => void;
};

const STAGE_NODES = [
  { name: "Speech", azure: "Azure Speech", color: "#1D63FF", pos: [-3.6, 0, 0] },
  { name: "Vision", azure: "Azure Vision", color: "#10B981", pos: [-1.8, 0, 0] },
  { name: "Language", azure: "Azure Language", color: "#8B5CF6", pos: [0, 0, 0] },
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
      speeds.current[i] = 0.025 + Math.random() * 0.04;
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
        <cylinderGeometry args={[0.32, 0.32, 8.4, 32]} />
        <meshStandardMaterial
          color="#333A48"
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>

      {/* Internal Pulsing Energy Core */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.16, 0.16, 8.3, 16]} />
        <meshBasicMaterial color="#111318" wireframe />
      </mesh>

      {/* 5 Junction Nodes */}
      {STAGE_NODES.map((node, idx) => {
        const isActive = idx === activeIndex;
        return (
          <group key={node.name} position={node.pos as [number, number, number]}>
            {/* Junction Ring Collar */}
            <mesh rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.48, 0.48, 0.32, 16]} />
              <meshStandardMaterial color="#111318" roughness={0.1} metalness={0.9} />
            </mesh>

            {/* Glowing Junction Sphere */}
            <mesh>
              <sphereGeometry args={[isActive ? 0.48 : 0.36, 32, 32]} />
              <meshStandardMaterial
                color={node.color}
                emissive={node.color}
                emissiveIntensity={isActive ? 1.6 : 0.5}
                roughness={0.1}
              />
            </mesh>

            {/* Node Label Text */}
            <Text
              position={[0, 0.78, 0]}
              fontSize={0.3}
              color={isActive ? "#FF3B1F" : "#111318"}
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
          size={0.1}
          color={STAGE_NODES[activeIndex]?.color ?? "#FF3B1F"}
          transparent
          opacity={0.9}
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
    <div className="relative h-[320px] w-full border-3 border-[#111318] bg-[#FAF8F2] shadow-[6px_6px_0px_#111318]">
      {/* Console Status Header Bar */}
      <div className="flex flex-wrap items-center justify-between border-b-3 border-[#111318] bg-[#FFFFFF] px-4 py-2 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 bg-[#FF3B1F] animate-pulse" />
          <span className="font-bold text-[#111318]">3D AZURE AI DISPATCH CONDUIT</span>
        </div>
        <span className="text-slate-600 font-bold">Orbit 3D pipe · Click node below</span>
      </div>

      {/* R3F Canvas / Mobile Fallback */}
      {isMobile ? (
        <div className="flex h-[250px] flex-col items-center justify-center p-6 text-center">
          <p className="font-display text-lg text-[#FF3B1F]">
            AZURE AI PIPELINE CONDUIT
          </p>
          <p className="mt-2 font-mono text-xs text-slate-700">
            [5-Stage Microservice Highway: Speech → Vision → Language → RAG → OpenAI]
          </p>
        </div>
      ) : (
        <Canvas camera={{ position: [0, 1.2, 7.5], fov: 50 }}>
          <ambientLight intensity={0.9} />
          <pointLight position={[10, 10, 10]} intensity={1.5} />
          <pointLight position={[-10, -10, -10]} intensity={0.8} />
          <ConduitPipe activeIndex={activeStageIndex} />
          <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 1.8} minPolarAngle={Math.PI / 3} />
        </Canvas>
      )}

      {/* Quick Stage Trigger Selector Bar */}
      <div className="absolute bottom-2 left-2 right-2 flex flex-wrap justify-center gap-1.5 bg-[#FFFFFF]/95 p-2 border-2 border-[#111318] shadow-[3px_3px_0px_#111318]">
        {STAGE_NODES.map((node, idx) => (
          <button
            key={node.name}
            type="button"
            onClick={() => onSelectStage?.(idx)}
            className={`px-2.5 py-1 text-[11px] font-mono font-bold uppercase transition-all border-2 border-[#111318] ${
              idx === activeStageIndex
                ? "bg-[#FF3B1F] text-[#FFFFFF] shadow-[2px_2px_0px_#111318]"
                : "bg-[#F8F6F0] text-[#111318] hover:bg-[#D4FF00]"
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
