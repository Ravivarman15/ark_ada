import { cn } from "@/lib/utils";
import type { LearnerType } from "@/types/assessment";
import { Brain, Target, AlertTriangle, Rocket } from "lucide-react";

interface LearnerTypeCardProps {
  type: LearnerType;
  className?: string;
}

const learnerTypeInfo: Record<
  LearnerType,
  {
    label: string;
    description: string;
    icon: typeof Brain;
    color: string;
    bgColor: string;
    recommendation: string;
  }
> = {
  "concept-strong": {
    label: "Concept Strong",
    description:
      "Excellent grasp of fundamental concepts. Understands the 'why' behind solutions.",
    icon: Brain,
    color: "text-skill-green",
    bgColor: "bg-skill-green/10 border-skill-green/30",
    recommendation:
      "Ready for advanced topics and Olympiad-level challenges. Focus on speed and complex problem-solving.",
  },
  "practice-dependent": {
    label: "Practice Dependent",
    description:
      "Knows procedures well but needs more practice to build automaticity.",
    icon: Target,
    color: "text-skill-yellow",
    bgColor: "bg-skill-yellow/10 border-skill-yellow/30",
    recommendation:
      "Increase timed practice sessions. Focus on variety of problems within mastered concepts.",
  },
  "foundation-risk": {
    label: "Foundation Risk",
    description:
      "Shows gaps in foundational skills that may affect future learning.",
    icon: AlertTriangle,
    color: "text-skill-red",
    bgColor: "bg-skill-red/10 border-skill-red/30",
    recommendation:
      "Priority intervention needed. Focus on basic concepts before advancing. One-on-one support recommended.",
  },
  "high-potential": {
    label: "High Potential",
    description:
      "Shows exceptional reasoning and quick learning ability across subjects.",
    icon: Rocket,
    color: "text-pink",
    bgColor: "bg-pink/10 border-pink/30",
    recommendation:
      "Enrich with challenging content. Consider acceleration or enrichment programs. Nurture creative thinking.",
  },
};

export const LearnerTypeCard = ({ type, className }: LearnerTypeCardProps) => {
  const info = learnerTypeInfo[type];
  const Icon = info.icon;

  return (
    <div
      className={cn(
        "p-6 rounded-2xl border-2 transition-all duration-300",
        info.bgColor,
        className
      )}
    >
      <div className="flex items-start gap-4">
        <div
          className={cn(
            "flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center",
            info.color,
            "bg-white shadow-sm"
          )}
        >
          <Icon className="w-7 h-7" />
        </div>
        <div className="flex-1 space-y-2">
          <h3 className="font-heading text-xl font-bold text-foreground">
            {info.label}
          </h3>
          <p className="text-muted-foreground">{info.description}</p>
          <div className="pt-3 border-t border-border/50">
            <p className="text-sm font-medium text-foreground">
              <span className="text-accent">💡 Recommendation:</span>{" "}
              {info.recommendation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
