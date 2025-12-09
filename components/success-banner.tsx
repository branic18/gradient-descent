"use client"

import { Button } from "@/components/ui/button"
import { Trophy } from "lucide-react"

interface SuccessBannerProps {
  totalIterations: number
  finalLoss: number
  onReset: () => void
}

export function SuccessBanner({ totalIterations, finalLoss, onReset }: SuccessBannerProps) {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="animate-in zoom-in rounded-lg border border-green-500/50 bg-card/95 p-12 text-center shadow-2xl shadow-green-500/20 duration-700">
        <div className="mb-6">
          <Trophy className="mx-auto h-20 w-20 text-green-500" />
        </div>

        <h2 className="mb-4 font-mono text-4xl font-bold text-green-500">TARGET LOSS ACHIEVED</h2>
        <p className="mb-8 text-xl text-muted-foreground">Optimization Complete</p>

        <div className="mb-8 grid grid-cols-2 gap-6 font-mono">
          <div className="rounded-lg border border-primary/30 bg-background/50 p-4">
            <div className="text-sm text-muted-foreground">Total Iterations</div>
            <div className="mt-1 text-3xl font-bold text-primary">{totalIterations}</div>
          </div>
          <div className="rounded-lg border border-primary/30 bg-background/50 p-4">
            <div className="text-sm text-muted-foreground">Final Loss</div>
            <div className="mt-1 text-3xl font-bold text-green-500">{finalLoss.toFixed(4)}</div>
          </div>
        </div>

        <Button onClick={onReset} size="lg" className="w-full">
          Play Again
        </Button>
      </div>
    </div>
  )
}
