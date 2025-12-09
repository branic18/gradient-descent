"use client"

import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Play, Pause, RotateCcw } from "lucide-react"

interface ControlPanelProps {
  isPlaying: boolean
  setIsPlaying: (playing: boolean) => void
  learningRate: number
  setLearningRate: (rate: number) => void
  speed: number
  setSpeed: (speed: number) => void
  showVectors: boolean
  setShowVectors: (show: boolean) => void
}

export function ControlPanel({
  isPlaying,
  setIsPlaying,
  learningRate,
  setLearningRate,
  speed,
  setSpeed,
  showVectors,
  setShowVectors,
}: ControlPanelProps) {
  const handleReset = () => {
    setIsPlaying(false)
    window.location.reload()
  }

  return (
    <div className="absolute right-8 top-8 z-10 w-80">
      <div className="rounded-lg border border-primary/30 bg-card/80 p-6 backdrop-blur-sm">
        <h2 className="mb-4 font-mono text-lg font-bold text-primary">CONTROLS</h2>

        {/* Play/Pause */}
        <div className="mb-4 flex gap-2">
          <Button onClick={() => setIsPlaying(!isPlaying)} className="flex-1" size="lg">
            {isPlaying ? (
              <>
                <Pause className="mr-2 h-4 w-4" /> Pause
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" /> Play
              </>
            )}
          </Button>
          <Button onClick={handleReset} size="lg" variant="outline">
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>

        {/* Learning Rate */}
        <div className="mb-4">
          <div className="mb-2 flex items-center justify-between">
            <label className="font-mono text-sm text-foreground">Learning Rate</label>
            <span className="font-mono text-sm text-primary">{learningRate.toFixed(2)}</span>
          </div>
          <Slider
            value={[learningRate]}
            onValueChange={([value]) => setLearningRate(value)}
            min={0.05}
            max={0.5}
            step={0.05}
            className="w-full"
          />
          <p className="mt-1 text-xs text-muted-foreground">Controls step size per iteration</p>
        </div>

        {/* Speed */}
        <div className="mb-4">
          <div className="mb-2 flex items-center justify-between">
            <label className="font-mono text-sm text-foreground">Animation Speed</label>
            <span className="font-mono text-sm text-primary">{speed}x</span>
          </div>
          <Slider
            value={[speed]}
            onValueChange={([value]) => setSpeed(value)}
            min={0.5}
            max={3}
            step={0.5}
            className="w-full"
          />
        </div>

        {/* Show Vectors */}
        <div className="flex items-center justify-between">
          <label className="font-mono text-sm text-foreground">Show Gradient Vectors</label>
          <Switch checked={showVectors} onCheckedChange={setShowVectors} />
        </div>
      </div>
    </div>
  )
}
