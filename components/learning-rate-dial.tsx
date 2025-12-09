"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface LearningRateDialProps {
  gradient: { dx: number; dz: number }
  terrainPulseSpeed: number
  onLearningRateSelected: (rate: number) => void
}

export function LearningRateDial({ gradient, terrainPulseSpeed, onLearningRateSelected }: LearningRateDialProps) {
  const [learningRate, setLearningRate] = useState(0.3)
  const [rotation, setRotation] = useState(0)

  let terrainCategory = ""
  if (terrainPulseSpeed < 2) {
    terrainCategory = "FLAT — High LR recommended"
  } else if (terrainPulseSpeed < 3) {
    terrainCategory = "GENTLE — Medium-High LR safe"
  } else if (terrainPulseSpeed < 4) {
    terrainCategory = "MODERATE — Medium LR optimal"
  } else {
    terrainCategory = "STEEP — Low LR advised"
  }

  const handleRotation = (delta: number) => {
    const newRotation = Math.max(0, Math.min(180, rotation + delta))
    setRotation(newRotation)
    setLearningRate(0.05 + (newRotation / 180) * 0.45)
  }

  const handleConfirm = () => {
    onLearningRateSelected(learningRate)
  }

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="text-center">
        <div className="mb-8">
          <h2 className="mb-2 font-mono text-3xl font-bold text-primary">SET LEARNING RATE</h2>
          <p className="text-balance text-muted-foreground">Control your cyberpunk drone's thruster intensity</p>

          {/* Terrain analysis */}
          <div className="mt-4 rounded-lg border border-cyan-400/30 bg-cyan-950/30 p-4">
            <div className="mb-2 font-mono text-sm text-cyan-400">TERRAIN ANALYSIS</div>
            <div className="flex items-center justify-center gap-2">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-8 w-2 rounded ${i < terrainPulseSpeed ? "bg-cyan-400" : "bg-cyan-950"}`}
                    style={{
                      animation: i < terrainPulseSpeed ? `pulse ${1 / terrainPulseSpeed}s infinite` : "none",
                    }}
                  />
                ))}
              </div>
              <span className="font-mono text-sm text-cyan-400">{terrainCategory}</span>
            </div>
          </div>
        </div>

        {/* Dial */}
        <div className="relative mx-auto mb-8 h-80 w-80">
          {/* Background circle */}
          <div className="absolute inset-0 rounded-full border-4 border-primary/30 bg-card/50 backdrop-blur-sm" />

          {/* Energy rings */}
          <div className="absolute inset-4 rounded-full border-2 border-primary/20" />
          <div className="absolute inset-8 rounded-full border-2 border-primary/20" />

          {/* Center core */}
          <div
            className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary"
            style={{
              boxShadow: `0 0 ${20 + learningRate * 100}px ${10 + learningRate * 50}px rgba(236, 72, 153, 0.5)`,
              animation: `pulse ${2 - learningRate * 1.5}s infinite`,
            }}
          />

          {/* Dial indicator */}
          <div
            className="absolute left-1/2 top-1/2 h-32 w-1 origin-bottom -translate-x-1/2 bg-primary"
            style={{
              transform: `translateX(-50%) rotate(${rotation - 90}deg)`,
              transformOrigin: "bottom center",
            }}
          />

          {/* Value display */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="font-mono text-4xl font-bold text-background">{learningRate.toFixed(2)}</div>
          </div>
        </div>

        {/* Controls */}
        <div className="mb-4 flex justify-center gap-4">
          <Button onClick={() => handleRotation(-15)} size="lg" variant="outline">
            - Lower
          </Button>
          <Button onClick={() => handleRotation(15)} size="lg" variant="outline">
            Higher +
          </Button>
        </div>

        <Button onClick={handleConfirm} size="lg" className="w-64">
          Confirm & Execute
        </Button>
      </div>
    </div>
  )
}
