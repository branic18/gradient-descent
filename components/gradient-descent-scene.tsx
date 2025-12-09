"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera } from "@react-three/drei"
import { LossLandscape } from "./loss-landscape"
import { Agent } from "./agent"
import { GradientVector } from "./gradient-vector"
import { Trail } from "./trail"
import { PerformanceAxis } from "./performance-axis"
import { Suspense } from "react"

interface GradientDescentSceneProps {
  position: { x: number; z: number }
  trail: Array<{ x: number; z: number }>
  showVectors: boolean
  gradient: { dx: number; dz: number }
  currentLoss: number
  targetLoss: number
  isExecuting: boolean
  terrainPulseSpeed: number
}

export function GradientDescentScene({
  position,
  trail,
  showVectors,
  gradient,
  currentLoss,
  targetLoss,
  isExecuting,
  terrainPulseSpeed,
}: GradientDescentSceneProps) {
  const lossFunction = (x: number, z: number) => {
    const quadratic = 0.4 * (x - 0.5) ** 2 + 0.5 * (z - 0.8) ** 2
    const ripples = 0.15 * Math.sin(x * 2) * Math.cos(z * 1.5)
    const ridge = 0.1 * Math.abs(x + z)
    return quadratic + ripples + ridge
  }

  return (
    <>
      <Canvas className="h-full w-full">
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[8, 8, 8]} />
          <OrbitControls enablePan={false} minDistance={5} maxDistance={15} maxPolarAngle={Math.PI / 2.2} />

          {/* Lighting */}
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={0.8} color="#ec4899" />
          <pointLight position={[-10, 5, -10]} intensity={0.5} color="#06b6d4" />
          <pointLight position={[0, 15, 0]} intensity={0.6} color="#a855f7" />

          {/* Scene Components */}
          <LossLandscape pulseSpeed={terrainPulseSpeed} targetReached={currentLoss < targetLoss} />
          <PerformanceAxis targetLoss={targetLoss} />
          <Trail points={trail} />
          <Agent position={position} loss={currentLoss} isExecuting={isExecuting} />
          {showVectors && <GradientVector position={position} gradient={gradient} />}
        </Suspense>
      </Canvas>

      {/* Loss Display */}
      <div className="absolute bottom-8 left-8 z-10 font-mono">
        <div className="rounded-lg border border-primary/30 bg-card/80 p-4 backdrop-blur-sm">
          <div className="text-xs text-muted-foreground">CURRENT LOSS</div>
          <div className="mt-1 text-3xl font-bold text-primary">{currentLoss.toFixed(4)}</div>
          <div className="mt-2 text-xs text-muted-foreground">Target: {targetLoss.toFixed(4)}</div>
          <div className="mt-1 text-xs text-muted-foreground">
            Position: ({position.x.toFixed(2)}, {position.z.toFixed(2)})
          </div>
        </div>
      </div>
    </>
  )
}
