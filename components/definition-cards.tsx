"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronRight } from "lucide-react"

interface DefinitionCardsProps {
  onComplete: () => void
}

const definitions = [
  {
    title: "Derivative (1D Slope)",
    description:
      "A measure of how fast the loss changes with respect to one parameter. It tells you the slope in a single direction.",
    icon: "📐",
  },
  {
    title: "Gradient (Multi-Directional Slope Vector)",
    description:
      "A neon vector arrow showing the direction of steepest uphill slope from your current position on the loss terrain. The negative gradient is the steepest downhill direction — your ideal direction to minimize loss.",
    icon: "🎯",
  },
  {
    title: "Learning Rate (Step Size Multiplier)",
    description:
      "A cyberpunk 'thruster intensity' that controls how far your drone moves in the chosen direction. Small learning rate = cautious, precise micro-steps. Large learning rate = fast leaps, but may overshoot.",
    icon: "⚡",
  },
  {
    title: "Total Loss",
    description:
      "The current elevation on the Y-axis performance scale. Higher = poor performance. Lower = better performance.",
    icon: "📊",
  },
  {
    title: "Target Loss",
    description: "The green glowing minimum region you must reach — the optimal performance zone.",
    icon: "🎯",
  },
]

export function DefinitionCards({ onComplete }: DefinitionCardsProps) {
  const [currentCard, setCurrentCard] = useState(0)

  const handleNext = () => {
    if (currentCard < definitions.length - 1) {
      setCurrentCard(currentCard + 1)
    } else {
      onComplete()
    }
  }

  const def = definitions[currentCard]

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <Card className="w-full max-w-2xl border-primary/30 bg-card/95 p-8 shadow-2xl">
        <div className="mb-6 text-center">
          <div className="mb-4 text-6xl">{def.icon}</div>
          <h2 className="mb-2 font-mono text-2xl font-bold text-primary">{def.title}</h2>
          <p className="text-balance leading-relaxed text-muted-foreground">{def.description}</p>
        </div>

        <div className="mb-4 flex justify-center gap-2">
          {definitions.map((_, i) => (
            <div key={i} className={`h-2 w-2 rounded-full ${i === currentCard ? "bg-primary" : "bg-muted"}`} />
          ))}
        </div>

        <Button onClick={handleNext} className="w-full" size="lg">
          {currentCard < definitions.length - 1 ? (
            <>
              Next <ChevronRight className="ml-2 h-4 w-4" />
            </>
          ) : (
            "Begin Game"
          )}
        </Button>
      </Card>
    </div>
  )
}
