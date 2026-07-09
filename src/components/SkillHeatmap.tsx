import { cn } from "@/lib/utils";
import type { SkillScore, Subject } from "@/types/assessment";
import { SKILL_DEFINITIONS } from "@/types/assessment";
import { SkillBadge } from "./SkillBadge";

interface SkillHeatmapProps {
  skillScores: SkillScore[];
  subject?: Subject;
  className?: string;
}

export const SkillHeatmap = ({ skillScores, subject, className }: SkillHeatmapProps) => {
  const filteredSkills = subject
    ? SKILL_DEFINITIONS.filter((s) => s.subject === subject)
    : SKILL_DEFINITIONS;

  const subjects: Subject[] = ["english", "mathematics", "science"];
  const subjectLabels = {
    english: "English",
    mathematics: "Mathematics",
    science: "Science",
  };

  const subjectIcons = {
    english: "📚",
    mathematics: "🔢",
    science: "🔬",
  };

  const groupedSkills = subjects.reduce((acc, subj) => {
    acc[subj] = filteredSkills.filter((s) => s.subject === subj);
    return acc;
  }, {} as Record<Subject, typeof filteredSkills>);

  return (
    <div className={cn("space-y-6", className)}>
      {(subject ? [subject] : subjects).map((subj) => (
        <div key={subj} className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">{subjectIcons[subj]}</span>
            <h3 className="font-heading font-semibold text-foreground">
              {subjectLabels[subj]}
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {groupedSkills[subj].map((skill) => {
              const score = skillScores.find((s) => s.skillCode === skill.code);
              const level = score?.level || "yellow";
              const accuracy = score?.accuracy ?? 0;

              return (
                <div
                  key={skill.code}
                  className={cn(
                    "group relative p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-ark cursor-pointer",
                    level === "green" && "border-skill-green/30 bg-skill-green/5 hover:border-skill-green/50",
                    level === "yellow" && "border-skill-yellow/30 bg-skill-yellow/5 hover:border-skill-yellow/50",
                    level === "red" && "border-skill-red/30 bg-skill-red/5 hover:border-skill-red/50"
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-heading font-bold text-sm text-foreground">
                          {skill.code}
                        </span>
                        <span
                          className={cn(
                            "w-2.5 h-2.5 rounded-full",
                            level === "green" && "bg-skill-green",
                            level === "yellow" && "bg-skill-yellow",
                            level === "red" && "bg-skill-red"
                          )}
                        />
                      </div>
                      <p className="text-sm font-medium text-foreground">
                        {skill.name}
                      </p>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {skill.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-heading font-bold text-foreground">
                        {accuracy}%
                      </span>
                    </div>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="mt-3 h-1.5 rounded-full bg-muted overflow-hidden">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all duration-500",
                        level === "green" && "bg-skill-green",
                        level === "yellow" && "bg-skill-yellow",
                        level === "red" && "bg-skill-red"
                      )}
                      style={{ width: `${accuracy}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};
