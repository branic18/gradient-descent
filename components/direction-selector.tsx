"use client"

import { useState } from "react"

interface DirectionSelectorProps {
  position: { x: number; z: number }
  gradient: { dx: number; dz: number }
  onDirectionSelected: (direction: { x: number; z: number }) => void
}

export function DirectionSelector({ position, gradient, onDirectionSelected }: DirectionSelectorProps) {
  const [selectedAngle, setSelectedAngle] = useState<number | null>(null)

  // Generate 8 directions
  const directions = Array.from({ length: 8 }, (_, i) => {
    const angle = (i * Math.PI) / 4
    return {
      angle,
      x: Math.cos(angle),
      z: Math.sin(angle),
      label: ["E", "NE", "N", "NW", "W", "SW", "S", "SE"][i],
    }
  })

  // Calculate optimal direction (negative gradient)
  const optimalAngle = Math.atan2(-gradient.dz, -gradient.dx)

  const handleSelect = (dir: { x: number; z: number }) => {
    onDirectionSelected(dir)
  }

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="text-center">
        <div className="mb-8">
          <h2 className="mb-2 font-mono text-3xl font-bold text-primary">CHOOSE DIRECTION</h2>
          <p className="text-balance text-muted-foreground">Select the direction to move your cyberpunk drone</p>
          <p className="mt-2 text-sm text-cyan-400">Hint: The gradient points uphill — go the opposite way!</p>
        </div>

        <div className="relative mx-auto h-96 w-96">
          {/* Center */}
          <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary" />

          {/* Direction buttons */}
          {directions.map((dir, i) => {
            const radius = 140
            const x = radius * Math.cos(dir.angle)
            const z = radius * Math.sin(dir.angle)

            // Check how close to optimal
            const angleDiff = Math.abs(dir.angle - optimalAngle)
            const isNearOptimal = Math.min(angleDiff, 2 * Math.PI - angleDiff) < Math.PI / 4

            return (
              <button
                key={i}
                onClick={() => handleSelect({ x: dir.x, z: dir.z })}
                className="absolute flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-primary/50 bg-card/80 font-mono text-sm font-bold text-primary backdrop-blur-sm transition-all hover:scale-110 hover:border-primary hover:bg-primary/20 hover:shadow-lg hover:shadow-primary/50"
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% - ${z}px)`,
                }}
              >
                {dir.label}
                {isNearOptimal && (
                  <div className="absolute -right-1 -top-1 h-3 w-3 animate-pulse rounded-full bg-cyan-400" />
                )}
              </button>
            )
          })}

          {/* Rings */}
          <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/20" />
          <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/10" />
        </div>
      </div>
    </div>
  )
}
