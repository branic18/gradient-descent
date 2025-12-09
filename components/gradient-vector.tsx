"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"

interface GradientVectorProps {
  position: { x: number; z: number }
  gradient: { dx: number; dz: number }
}

export function GradientVector({ position, gradient }: GradientVectorProps) {
  const upArrowRef = useRef<THREE.Group>(null)
  const downArrowRef = useRef<THREE.Group>(null)

  const y = 0.3 * position.x * position.x + 0.3 * position.z * position.z + 0.1 * position.x * position.z + 0.5

  const magnitude = Math.sqrt(gradient.dx * gradient.dx + gradient.dz * gradient.dz)
  const arrowLength = Math.min(magnitude * 2, 2)

  useFrame((state) => {
    if (downArrowRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 4) * 0.1
      downArrowRef.current.scale.setScalar(pulse)
    }
  })

  return (
    <group position={[position.x, y, position.z]}>
      {/* Upward gradient (steepest ascent) */}
      <group ref={upArrowRef} rotation={[0, Math.atan2(gradient.dz, gradient.dx), 0]}>
        <mesh position={[arrowLength / 2, 0, 0]}>
          <cylinderGeometry args={[0.03, 0.03, arrowLength, 8]} />
          <meshBasicMaterial color="#a855f7" transparent opacity={0.5} />
        </mesh>
        <mesh position={[arrowLength, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <coneGeometry args={[0.1, 0.2, 8]} />
          <meshBasicMaterial color="#a855f7" transparent opacity={0.5} />
        </mesh>
      </group>

      {/* Downward gradient (descent direction) - highlighted */}
      <group ref={downArrowRef} rotation={[0, Math.atan2(-gradient.dz, -gradient.dx), 0]}>
        <mesh position={[arrowLength / 2, 0, 0]}>
          <cylinderGeometry args={[0.05, 0.05, arrowLength, 8]} />
          <meshBasicMaterial color="#10b981" />
        </mesh>
        <mesh position={[arrowLength, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <coneGeometry args={[0.15, 0.3, 8]} />
          <meshBasicMaterial color="#10b981" />
        </mesh>
      </group>
    </group>
  )
}
