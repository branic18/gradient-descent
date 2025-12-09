"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"

interface AgentProps {
  position: { x: number; z: number }
  loss: number
  isExecuting: boolean
}

export function Agent({ position, loss, isExecuting }: AgentProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const lightRef = useRef<THREE.PointLight>(null)
  const outerRingRef = useRef<THREE.Mesh>(null)

  // Calculate Y position based on loss function
  const y = 0.3 * position.x * position.x + 0.3 * position.z * position.z + 0.1 * position.x * position.z + 0.5

  useFrame((state) => {
    if (meshRef.current) {
      const basePulse = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.1
      const executionPulse = isExecuting ? 1 + Math.sin(state.clock.elapsedTime * 10) * 0.2 : 1
      meshRef.current.scale.setScalar(basePulse * executionPulse)
    }
    if (lightRef.current) {
      lightRef.current.intensity = 2 + Math.sin(state.clock.elapsedTime * 3) * 0.5
    }
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z = state.clock.elapsedTime * 2
    }
  })

  return (
    <group position={[position.x, y, position.z]}>
      {/* Main orb */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial
          color="#ec4899"
          emissive="#ec4899"
          emissiveIntensity={isExecuting ? 2.5 : 1.5}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Outer glow ring */}
      <mesh ref={outerRingRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.5, 0.02, 16, 32]} />
        <meshBasicMaterial color="#ec4899" transparent opacity={0.4} />
      </mesh>

      {isExecuting && (
        <mesh position={[0, -0.3, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.2, 0.6, 8]} />
          <meshBasicMaterial color="#06b6d4" transparent opacity={0.6} />
        </mesh>
      )}

      {/* Point light for glow */}
      <pointLight ref={lightRef} color="#ec4899" intensity={2} distance={5} />
    </group>
  )
}
