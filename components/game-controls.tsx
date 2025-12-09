"use client"

import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { RotateCcw } from "lucide-react"

interface GameControlsProps {
  showVectors: boolean
  setShowVectors: (show: boolean) => void
  onReset: () => void
  gamePhase: string
}

export function GameControls({ showVectors, setShowVectors, onReset, gamePhase }: GameControlsProps) {
  return (
    <div className="absolute right-8 top-8 z-10 w-64">
      <div className="rounded-lg border border-primary/30 bg-card/80 p-6 backdrop-blur-sm">
        <h2 className="mb-4 font-mono text-lg font-bold text-primary">GAME CONTROLS</h2>

        {/* Show Vectors */}
        <div className="mb-4 flex items-center justify-between">
          <label className="font-mono text-sm text-foreground">Show Gradient</label>
          <Switch checked={showVectors} onCheckedChange={setShowVectors} />
        </div>

        {/* Reset */}
        <Button onClick={onReset} className="w-full bg-transparent" variant="outline">
          <RotateCcw className="mr-2 h-4 w-4" /> Reset Game
        </Button>

        {/* Game Phase */}
        <div className="mt-4 rounded border border-primary/20 bg-background/50 p-3">
          <div className="text-xs text-muted-foreground">Current Phase</div>
          <div className="mt-1 font-mono text-sm font-bold capitalize text-primary">
            {gamePhase.replace(/([A-Z])/g, " $1").trim()}
          </div>
        </div>
      </div>
    </div>
  )
}
