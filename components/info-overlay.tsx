"use client"

import { useState } from "react"
import { Info, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function InfoOverlay() {
  const [showInfo, setShowInfo] = useState(false)

  return (
    <>
      {/* Info Button */}
      <Button
        onClick={() => setShowInfo(true)}
        size="icon"
        variant="outline"
        className="absolute bottom-8 right-8 z-10"
      >
        <Info className="h-4 w-4" />
      </Button>

      {/* Info Panel */}
      {showInfo && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/80 p-8 backdrop-blur-sm">
          <div className="max-w-2xl rounded-lg border border-primary/30 bg-card p-8">
            <div className="mb-6 flex items-start justify-between">
              <h2 className="font-mono text-2xl font-bold text-primary">How Gradient Descent Works</h2>
              <Button onClick={() => setShowInfo(false)} size="icon" variant="ghost">
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4 text-sm leading-relaxed text-foreground">
              <div>
                <h3 className="mb-2 font-mono font-bold text-secondary">The Gradient</h3>
                <p className="text-muted-foreground">
                  At each position, the <span className="text-primary">purple arrow</span> shows the direction of
                  steepest <strong>increase</strong> (uphill). The <span className="text-accent">green arrow</span>{" "}
                  points in the opposite direction—the path of steepest <strong>descent</strong> (downhill).
                </p>
              </div>

              <div>
                <h3 className="mb-2 font-mono font-bold text-secondary">Why It Changes</h3>
                <p className="text-muted-foreground">
                  The gradient is <strong>recalculated at every step</strong> because the landscape's slope varies. As
                  the orb moves, the terrain beneath it changes, requiring a new direction and magnitude for the next
                  step.
                </p>
              </div>

              <div>
                <h3 className="mb-2 font-mono font-bold text-secondary">Learning Rate</h3>
                <p className="text-muted-foreground">
                  The learning rate controls <strong>step size</strong>. Higher values mean bigger jumps (faster but
                  riskier), lower values mean smaller steps (slower but more precise). The update formula is:{" "}
                  <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
                    new_position = old_position - (learning_rate × gradient)
                  </code>
                </p>
              </div>

              <div>
                <h3 className="mb-2 font-mono font-bold text-secondary">Convergence</h3>
                <p className="text-muted-foreground">
                  As the orb approaches the minimum (optimal performance), the gradient becomes smaller, steps get
                  tinier, and the algorithm stabilizes at the <span className="text-accent">lowest point</span>.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
