"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

interface LossLandscapeProps {
  pulseSpeed: number
  targetReached: boolean
}

export function LossLandscape({ pulseSpeed, targetReached }: LossLandscapeProps) {
  const meshRef = useRef<THREE.Mesh>(null)

  // Create the landscape geometry
  const geometry = new THREE.PlaneGeometry(10, 10, 50, 50)
  const positions = geometry.attributes.position.array

  for (let i = 0; i < positions.length; i += 3) {
    const x = positions[i]
    const z = positions[i + 1]
    const quadratic = 0.4 * (x - 0.5) ** 2 + 0.5 * (z - 0.8) ** 2
    const ripples = 0.15 * Math.sin(x * 2) * Math.cos(z * 1.5)
    const ridge = 0.1 * Math.abs(x + z)
    const y = quadratic + ripples + ridge
    positions[i + 2] = y
  }

  geometry.computeVertexNormals()

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.MeshStandardMaterial

      if (targetReached) {
        // Green glow when target is reached
        material.color.setHex(0x10b981)
        material.emissive.setHex(0x10b981)
        material.emissiveIntensity = 0.5 + Math.sin(state.clock.elapsedTime * 3) * 0.3
      } else {
        // Pulse based on terrain steepness
        material.color.setHex(0x06b6d4)
        material.emissive.setHex(0x06b6d4)
        material.emissiveIntensity = 0.3 + Math.sin(state.clock.elapsedTime * pulseSpeed) * 0.2
      }
    }
  })

  return (
    <mesh ref={meshRef} geometry={geometry} rotation={[-Math.PI / 2, 0, 0]}>
      <meshStandardMaterial
        color="#06b6d4"
        emissive="#06b6d4"
        emissiveIntensity={0.3}
        wireframe
        transparent
        opacity={0.6}
      />
    </mesh>
  )
}
