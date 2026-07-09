import { cn } from "@/lib/utils";
import type { SkillLevel, SkillCode } from "@/types/assessment";
import { SKILL_DEFINITIONS } from "@/types/assessment";

interface SkillBadgeProps {
  skillCode: SkillCode;
  level: SkillLevel;
  showName?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const SkillBadge = ({
  skillCode,
  level,
  showName = true,
  size = "md",
  className,
}: SkillBadgeProps) => {
  const skill = SKILL_DEFINITIONS.find((s) => s.code === skillCode);

  const levelStyles = {
    green: "bg-skill-green/15 text-skill-green border-skill-green/30",
    yellow: "bg-skill-yellow/15 text-skill-yellow border-skill-yellow/30",
    red: "bg-skill-red/15 text-skill-red border-skill-red/30",
  };

  const sizeStyles = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-1.5 text-base",
  };

  const levelLabels = {
    green: "Ready to Advance",
    yellow: "Needs Support",
    red: "Foundation Gap",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border font-medium transition-all hover:scale-105",
        levelStyles[level],
        sizeStyles[size],
        className
      )}
    >
      <span className="font-bold">{skillCode}</span>
      {showName && skill && (
        <>
          <span className="opacity-60">|</span>
          <span>{skill.name}</span>
        </>
      )}
      <span
        className={cn(
          "ml-1 w-2 h-2 rounded-full",
          level === "green" && "bg-skill-green",
          level === "yellow" && "bg-skill-yellow",
          level === "red" && "bg-skill-red"
        )}
        title={levelLabels[level]}
      />
    </div>
  );
};
