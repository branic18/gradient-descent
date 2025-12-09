"use client"

import { GradientDescentScene } from "@/components/gradient-descent-scene"
import { GameControls } from "@/components/game-controls"
import { DefinitionCards } from "@/components/definition-cards"
import { DirectionSelector } from "@/components/direction-selector"
import { LearningRateDial } from "@/components/learning-rate-dial"
import { GameFeedback } from "@/components/game-feedback"
import { SuccessBanner } from "@/components/success-banner"
import { useState } from "react"

export default function Home() {
  const [gamePhase, setGamePhase] = useState<
    "intro" | "selectDirection" | "selectLearningRate" | "executing" | "success"
  >("intro")
  const [position, setPosition] = useState({ x: -3, z: -3 })
  const [trail, setTrail] = useState<Array<{ x: number; z: number }>>([])
  const [selectedDirection, setSelectedDirection] = useState<{ x: number; z: number } | null>(null)
  const [selectedLearningRate, setSelectedLearningRate] = useState(0.3)
  const [feedback, setFeedback] = useState<string>("")
  const [iteration, setIteration] = useState(0)
  const [totalIterations, setTotalIterations] = useState(0)
  const [showVectors, setShowVectors] = useState(true)
  const [terrainPulseSpeed, setTerrainPulseSpeed] = useState(1)

  const lossFunction = (x: number, z: number) => {
    // Asymmetric quadratic bowl with offset minimum
    const quadratic = 0.4 * (x - 0.5) ** 2 + 0.5 * (z - 0.8) ** 2

    // Add sinusoidal ripples for varied terrain steepness
    const ripples = 0.15 * Math.sin(x * 2) * Math.cos(z * 1.5)

    // Add a diagonal ridge to force SE/SW movements
    const ridge = 0.1 * Math.abs(x + z)

    return quadratic + ripples + ridge
  }

  // Gradient computation
  const computeGradient = (x: number, z: number) => {
    const h = 0.01
    const dx = (lossFunction(x + h, z) - lossFunction(x - h, z)) / (2 * h)
    const dz = (lossFunction(x, z + h) - lossFunction(x, z - h)) / (2 * h)
    return { dx, dz }
  }

  const currentLoss = lossFunction(position.x, position.z)
  const gradient = computeGradient(position.x, position.z)
  const targetLoss = 0.3

  const handleDefinitionsComplete = () => {
    setGamePhase("selectDirection")
  }

  const handleDirectionSelected = (direction: { x: number; z: number }) => {
    setSelectedDirection(direction)

    const gradientMagnitude = Math.sqrt(gradient.dx * gradient.dx + gradient.dz * gradient.dz)

    // Calculate second derivatives (curvature) for better terrain analysis
    const h = 0.05
    const ddx =
      (computeGradient(position.x + h, position.z).dx - computeGradient(position.x - h, position.z).dx) / (2 * h)
    const ddz =
      (computeGradient(position.x, position.z + h).dz - computeGradient(position.x, position.z - h).dz) / (2 * h)
    const curvature = Math.abs(ddx) + Math.abs(ddz)

    // Combine gradient magnitude and curvature for varied terrain feedback
    // Low values = gentle terrain, high values = steep terrain
    const terrainMetric = gradientMagnitude * 3 + curvature * 2
    setTerrainPulseSpeed(Math.min(5, Math.max(1, terrainMetric)))

    setGamePhase("selectLearningRate")
  }

  const handleLearningRateSelected = (rate: number) => {
    setSelectedLearningRate(rate)
    executeStep(rate)
  }

  const executeStep = (learningRate: number) => {
    setGamePhase("executing")

    setTimeout(() => {
      if (!selectedDirection) return

      const oldLoss = lossFunction(position.x, position.z)

      // Move in selected direction
      const newX = position.x + selectedDirection.x * learningRate
      const newZ = position.z + selectedDirection.z * learningRate
      const newLoss = lossFunction(newX, newZ)

      // Add to trail
      setTrail((t) => [...t, { x: position.x, z: position.z }].slice(-50))
      setPosition({ x: newX, z: newZ })
      setTotalIterations((i) => i + 1)

      // Evaluate the move
      const trueGradient = computeGradient(position.x, position.z)
      const optimalDirection = { x: -trueGradient.dx, z: -trueGradient.dz }
      const dotProduct = selectedDirection.x * optimalDirection.x + selectedDirection.z * optimalDirection.z
      const selectedMag = Math.sqrt(selectedDirection.x ** 2 + selectedDirection.z ** 2)
      const optimalMag = Math.sqrt(optimalDirection.x ** 2 + optimalDirection.z ** 2)
      const cosineAngle = dotProduct / (selectedMag * optimalMag)

      let directionFeedback = ""
      if (cosineAngle > 0.9) {
        directionFeedback = "Perfect direction choice!"
      } else if (cosineAngle > 0.5) {
        directionFeedback = "Good direction, slightly off optimal."
      } else if (cosineAngle > 0) {
        directionFeedback = "Direction okay, but not ideal."
      } else {
        directionFeedback = "Warning: Moving uphill!"
      }

      let movementFeedback = ""
      if (newLoss < oldLoss) {
        movementFeedback = "You moved closer to minimum"
      } else if (newLoss > oldLoss) {
        movementFeedback = "Overshoot - loss increased"
      } else {
        movementFeedback = "Minimal progress - try adjusting LR"
      }

      setFeedback(`${directionFeedback}\n${movementFeedback}\nNew loss: ${newLoss.toFixed(4)}`)

      // Check for success
      if (newLoss < targetLoss) {
        setTimeout(() => {
          setGamePhase("success")
        }, 2000)
      } else {
        setTimeout(() => {
          setSelectedDirection(null)
          setGamePhase("selectDirection")
        }, 3000)
      }
    }, 500)
  }

  const handleReset = () => {
    setPosition({ x: -3, z: -3 })
    setTrail([])
    setTotalIterations(0)
    setGamePhase("intro")
    setFeedback("")
    setSelectedDirection(null)
  }

  return (
    <main className="relative h-screen w-full overflow-hidden bg-background">
      {/* Title */}
      <div className="absolute left-8 top-8 z-10">
        <h1 className="font-mono text-4xl font-bold tracking-tight text-primary">GRADIENT DESCENT</h1>
        <p className="mt-1 font-mono text-sm text-muted-foreground">Navigate to optimal performance</p>
        <div className="mt-2 font-mono text-xs text-primary">Iteration: {totalIterations}</div>
      </div>

      {/* 3D Scene */}
      <GradientDescentScene
        position={position}
        trail={trail}
        showVectors={showVectors}
        gradient={gradient}
        currentLoss={currentLoss}
        targetLoss={targetLoss}
        isExecuting={gamePhase === "executing"}
        terrainPulseSpeed={terrainPulseSpeed}
      />

      {/* Game UI */}
      {gamePhase === "intro" && <DefinitionCards onComplete={handleDefinitionsComplete} />}

      {gamePhase === "selectDirection" && (
        <DirectionSelector position={position} gradient={gradient} onDirectionSelected={handleDirectionSelected} />
      )}

      {gamePhase === "selectLearningRate" && (
        <LearningRateDial
          gradient={gradient}
          terrainPulseSpeed={terrainPulseSpeed}
          onLearningRateSelected={handleLearningRateSelected}
        />
      )}

      {gamePhase === "executing" && feedback && <GameFeedback feedback={feedback} />}

      {gamePhase === "success" && (
        <SuccessBanner totalIterations={totalIterations} finalLoss={currentLoss} onReset={handleReset} />
      )}

      {/* Game Controls */}
      <GameControls
        showVectors={showVectors}
        setShowVectors={setShowVectors}
        onReset={handleReset}
        gamePhase={gamePhase}
      />
    </main>
  )
}
