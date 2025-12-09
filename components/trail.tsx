"use client"

import * as THREE from "three"
import { useMemo } from "react"

interface TrailProps {
  points: Array<{ x: number; z: number }>
}

export function Trail({ points }: TrailProps) {
  const lineGeometry = useMemo(() => {
    if (points.length < 2) return null

    const positions = points.flatMap((p) => {
      const y = 0.3 * p.x * p.x + 0.3 * p.z * p.z + 0.1 * p.x * p.z + 0.5
      return [p.x, y, p.z]
    })

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3))

    return geometry
  }, [points])

  if (!lineGeometry) return null

  return (
    <line geometry={lineGeometry}>
      <lineBasicMaterial color="#ec4899" linewidth={2} transparent opacity={0.6} />
    </line>
  )
}
