import { cn } from "@/lib/utils";
import type { Subject } from "@/types/assessment";
import { BookOpen, Calculator, Microscope, ArrowRight, Check } from "lucide-react";

interface SubjectCardProps {
  subject: Subject;
  isSelected?: boolean;
  isCompleted?: boolean;
  questionsCount: number;
  estimatedTime: number;
  onClick?: () => void;
  className?: string;
}

const subjectInfo: Record<
  Subject,
  {
    label: string;
    icon: typeof BookOpen;
    color: string;
    gradient: string;
  }
> = {
  english: {
    label: "English",
    icon: BookOpen,
    color: "text-blue-600",
    gradient: "from-blue-500/20 to-blue-600/10",
  },
  mathematics: {
    label: "Mathematics",
    icon: Calculator,
    color: "text-purple-600",
    gradient: "from-purple-500/20 to-purple-600/10",
  },
  science: {
    label: "Science",
    icon: Microscope,
    color: "text-emerald-600",
    gradient: "from-emerald-500/20 to-emerald-600/10",
  },
};

export const SubjectCard = ({
  subject,
  isSelected,
  isCompleted,
  questionsCount,
  estimatedTime,
  onClick,
  className,
}: SubjectCardProps) => {
  const info = subjectInfo[subject];
  const Icon = info.icon;

  return (
    <button
      onClick={onClick}
      disabled={isCompleted}
      className={cn(
        "group relative w-full p-6 rounded-2xl border-2 text-left transition-all duration-300",
        isCompleted
          ? "border-success/50 bg-success/10 cursor-default"
          : isSelected
          ? "border-accent bg-accent/10 shadow-glow"
          : "border-border bg-card hover:border-primary/30 hover:shadow-ark",
        className
      )}
    >
      {/* Background gradient */}
      <div
        className={cn(
          "absolute inset-0 rounded-2xl bg-gradient-to-br opacity-50",
          info.gradient
        )}
      />

      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <div
            className={cn(
              "w-14 h-14 rounded-xl flex items-center justify-center bg-white shadow-sm",
              info.color
            )}
          >
            <Icon className="w-7 h-7" />
          </div>
          {isCompleted ? (
            <div className="w-8 h-8 rounded-full bg-success flex items-center justify-center">
              <Check className="w-5 h-5 text-success-foreground" />
            </div>
          ) : isSelected ? (
            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center animate-bounce-subtle">
              <ArrowRight className="w-5 h-5 text-accent-foreground" />
            </div>
          ) : null}
        </div>

        <h3 className="font-heading text-xl font-bold text-foreground mb-1">
          {info.label}
        </h3>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>{questionsCount} questions</span>
          <span>•</span>
          <span>~{estimatedTime} mins</span>
        </div>

        {isCompleted && (
          <div className="mt-3 text-sm font-medium text-success">
            ✓ Completed
          </div>
        )}
      </div>
    </button>
  );
};
