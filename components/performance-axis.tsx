"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"

interface PerformanceAxisProps {
  targetLoss: number
}

export function PerformanceAxis({ targetLoss }: PerformanceAxisProps) {
  const targetZoneRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (targetZoneRef.current) {
      const material = targetZoneRef.current.material as THREE.MeshBasicMaterial
      material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.2
    }
  })

  const targetY = -3 + (targetLoss / 5) * 6

  return (
    <group position={[-5.5, 3, 0]}>
      {/* Vertical line */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 6, 8]} />
        <meshBasicMaterial color="#06b6d4" />
      </mesh>

      {/* Top marker (Poor Performance) */}
      <mesh position={[0, 3, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color="#ef4444" />
      </mesh>

      {/* Bottom marker (Top Performance) */}
      <mesh position={[0, -3, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color="#10b981" />
      </mesh>

      {/* Arrow at bottom */}
      <mesh position={[0, -3.3, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.1, 0.2, 8]} />
        <meshBasicMaterial color="#10b981" />
      </mesh>

      <mesh ref={targetZoneRef} position={[0, targetY, 0]}>
        <boxGeometry args={[0.3, 0.5, 0.3]} />
        <meshBasicMaterial color="#10b981" transparent opacity={0.4} />
      </mesh>
    </group>
  )
}
