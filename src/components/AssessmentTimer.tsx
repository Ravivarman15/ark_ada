import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Clock, AlertTriangle } from "lucide-react";

interface AssessmentTimerProps {
  totalSeconds: number;
  onTimeUp: () => void;
  className?: string;
}

export const AssessmentTimer = ({
  totalSeconds,
  onTimeUp,
  className,
}: AssessmentTimerProps) => {
  const [remainingSeconds, setRemainingSeconds] = useState(totalSeconds);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onTimeUp]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}:${mins.toString().padStart(2, "0")}:${secs
        .toString()
        .padStart(2, "0")}`;
    }
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const percentRemaining = (remainingSeconds / totalSeconds) * 100;
  const isLowTime = percentRemaining < 20;
  const isCritical = percentRemaining < 10;

  return (
    <div
      className={cn(
        "flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-300",
        isCritical
          ? "bg-danger/20 border-2 border-danger animate-pulse"
          : isLowTime
          ? "bg-warning/20 border-2 border-warning"
          : "bg-primary/10 border-2 border-primary/30",
        className
      )}
    >
      {isCritical ? (
        <AlertTriangle className="w-5 h-5 text-danger" />
      ) : (
        <Clock
          className={cn(
            "w-5 h-5",
            isLowTime ? "text-warning" : "text-primary"
          )}
        />
      )}
      <div className="flex flex-col">
        <span
          className={cn(
            "font-mono text-lg font-bold",
            isCritical
              ? "text-danger"
              : isLowTime
              ? "text-warning"
              : "text-foreground"
          )}
        >
          {formatTime(remainingSeconds)}
        </span>
        <span className="text-xs text-muted-foreground">Time Remaining</span>
      </div>
    </div>
  );
};
