"use client"

interface GameFeedbackProps {
  feedback: string
}

export function GameFeedback({ feedback }: GameFeedbackProps) {
  return (
    <div className="absolute left-1/2 top-1/2 z-40 -translate-x-1/2 -translate-y-1/2">
      <div className="animate-in fade-in zoom-in rounded-lg border border-primary/50 bg-card/95 p-8 text-center shadow-2xl shadow-primary/20 backdrop-blur-sm duration-500">
        <div className="whitespace-pre-line font-mono text-lg leading-relaxed text-primary">{feedback}</div>
      </div>
    </div>
  )
}
