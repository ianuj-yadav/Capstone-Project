import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import * as THREE from "three";

type DispatchPipeProps = {
  activeStageIndex?: number;
  onSelectStage?: (index: number) => void;
};

const STAGE_NODES = [
  { name: "Speech", azure: "Azure Speech", color: "#2563EB", pos: [-3.5, 0, 0] },
  { name: "Vision", azure: "Azure Vision", color: "#059669", pos: [-1.75, 0, 0] },
  { name: "Language", azure: "Azure Language", color: "#7C3AED", pos: [0, 0, 0] },
  { name: "RAG Search", azure: "AI Search", color: "#D97706", pos: [1.75, 0, 0] },
  { name: "OpenAI", azure: "Azure OpenAI", color: "#DC2626", pos: [3.5, 0, 0] },
];

function NeuralRingScene({ activeIndex }: { activeIndex: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Particle positions
  const particleCount = 120;
  const positions = useRef(new Float32Array(particleCount * 3));
  const speeds = useRef(new Float32Array(particleCount));

  useEffect(() => {
    for (let i = 0; i < particleCount; i++) {
      positions.current[i * 3] = (Math.random() - 0.5) * 8.2;
      positions.current[i * 3 + 1] = (Math.random() - 0.5) * 0.4;
      positions.current[i * 3 + 2] = (Math.random() - 0.5) * 0.4;
      speeds.current[i] = 0.02 + Math.random() * 0.035;
    }
  }, []);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.12;
    }

    if (particlesRef.current) {
      const geo = particlesRef.current.geometry;
      const posAttr = geo.attributes["position"];
      if (posAttr) {
        const arr = posAttr.array as Float32Array;
        if (arr) {
          for (let i = 0; i < particleCount; i++) {
            arr[i * 3] = (arr[i * 3] ?? 0) + (speeds.current[i] ?? 0.02);
            if ((arr[i * 3] ?? 0) > 4.1) {
              arr[i * 3] = -4.1;
            }
          }
          posAttr.needsUpdate = true;
        }
      }
    }
  });

  return (
    <group ref={groupRef}>
      {/* Sleek Torus Bus Conduit */}
      <mesh ref={ringRef} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.22, 0.22, 8.2, 32]} />
        <meshStandardMaterial
          color="#475569"
          roughness={0.3}
          metalness={0.6}
        />
      </mesh>

      {/* Internal Core Wireframe */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.1, 0.1, 8.1, 16]} />
        <meshBasicMaterial color="#2563EB" wireframe />
      </mesh>

      {/* 5 Junction Nodes */}
      {STAGE_NODES.map((node, idx) => {
        const isActive = idx === activeIndex;
        return (
          <group key={node.name} position={node.pos as [number, number, number]}>
            {/* Collar Ring */}
            <mesh rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.38, 0.38, 0.28, 24]} />
              <meshStandardMaterial color="#0F172A" roughness={0.1} metalness={0.9} />
            </mesh>

            {/* Glowing Sphere */}
            <mesh>
              <sphereGeometry args={[isActive ? 0.44 : 0.32, 32, 32]} />
              <meshStandardMaterial
                color={node.color}
                emissive={node.color}
                emissiveIntensity={isActive ? 1.5 : 0.4}
                roughness={0.1}
              />
            </mesh>

            {/* Floating Label */}
            <Text
              position={[0, 0.75, 0]}
              fontSize={0.28}
              color={isActive ? "#2563EB" : "#0F172A"}
              anchorX="center"
              anchorY="middle"
              font="https://fonts.gstatic.com/s/jetbrainsmono/v13/tB3g524-GGq3n53yAoTsdbI.woff"
            >
              {node.name.toUpperCase()}
            </Text>
          </group>
        );
      })}

      {/* Particle Light Trail */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions.current, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.09}
          color={STAGE_NODES[activeIndex]?.color ?? "#2563EB"}
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
    <div className="card-light relative h-[360px] w-full overflow-hidden bg-[#F8FAFC]">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-200 bg-white px-5 py-3 text-xs font-mono">
        <div className="flex items-center gap-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-blue-600 animate-pulse" />
          <span className="font-extrabold text-slate-900 tracking-wide">
            3D AZURE AI CONDUIT
          </span>
        </div>
        <span className="text-slate-500 font-medium">
          Drag to rotate 3D pipeline · Click stage node below
        </span>
      </div>

      {/* Canvas / Mobile Fallback */}
      {isMobile ? (
        <div className="flex h-[280px] flex-col items-center justify-center p-6 text-center">
          <p className="font-display text-lg font-bold text-blue-600">
            AZURE AI PIPELINE CONDUIT
          </p>
          <p className="mt-2 font-mono text-xs text-slate-600">
            [5-Stage Highway: Speech → Vision → Language → RAG → OpenAI]
          </p>
        </div>
      ) : (
        <Canvas camera={{ position: [0, 1.2, 7.5], fov: 48 }}>
          <ambientLight intensity={1.1} />
          <pointLight position={[10, 10, 10]} intensity={1.5} />
          <pointLight position={[-10, -10, -10]} intensity={0.8} />
          <NeuralRingScene activeIndex={activeStageIndex} />
          <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 1.7} minPolarAngle={Math.PI / 3} />
        </Canvas>
      )}

      {/* Stage Selector Pill Row */}
      <div className="absolute bottom-3 left-3 right-3 flex flex-wrap justify-center gap-2 bg-white/95 p-2 rounded-xl border border-slate-200 shadow-sm">
        {STAGE_NODES.map((node, idx) => {
          const isActive = idx === activeStageIndex;
          return (
            <button
              key={node.name}
              type="button"
              onClick={() => onSelectStage?.(idx)}
              className={`px-3 py-1.5 text-[11px] font-mono font-bold rounded-lg transition-all ${
                isActive
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              0{idx + 1}. {node.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default DispatchPipe3D;
