import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { Grade, Student } from "@/types/assessment";
import { GraduationCap, BookOpen, ArrowRight, User } from "lucide-react";
import { Logo } from "@/components/Logo";

interface OnboardingFormProps {
  onComplete: (student: Omit<Student, "id" | "createdAt">) => void;
  className?: string;
}

export const OnboardingForm = ({ onComplete, className }: OnboardingFormProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    grade: "" as unknown as Grade,
    school: "",
  });

  const grades: Grade[] = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const handleNext = () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      onComplete(formData);
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.name.trim().length >= 2;
      case 2:
        return !!formData.grade;
      default:
        return false;
    }
  };

  return (
    <div className={cn("w-full max-w-md mx-auto", className)}>
      {/* Progress indicator */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {[1, 2].map((s) => (
          <div key={s} className="flex items-center">
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center font-heading font-bold text-sm transition-all duration-300",
                s === step && "bg-accent text-accent-foreground shadow-glow scale-110",
                s < step && "bg-success text-success-foreground",
                s > step && "bg-muted text-muted-foreground"
              )}
            >
              {s < step ? "✓" : s}
            </div>
            {s < 2 && (
              <div
                className={cn(
                  "w-12 h-1 mx-1 rounded-full transition-all duration-300",
                  s < step ? "bg-success" : "bg-muted"
                )}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step content */}
      <div className="bg-card rounded-2xl p-8 shadow-ark-lg border border-border animate-fade-in">
        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="w-20 h-20 mx-auto flex items-center justify-center mb-4 bg-muted/40 rounded-2xl border border-border/50 p-2">
                <Logo size="lg" showText={false} />
              </div>
              <h2 className="font-heading text-2xl font-bold text-foreground tracking-tight">
                Welcome to ARK Diagnostic
              </h2>
              <p className="text-muted-foreground text-sm">
                Let's start with your name
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground font-semibold text-sm">
                Student Name
              </Label>
              <Input
                id="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="h-12 text-lg border-2 border-border/80 focus-visible:ring-primary/20 focus-visible:border-primary transition-all duration-200"
                autoFocus
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="school" className="text-foreground font-semibold text-sm">
                School Name (Optional)
              </Label>
              <Input
                id="school"
                placeholder="Enter your school name"
                value={formData.school}
                onChange={(e) =>
                  setFormData({ ...formData, school: e.target.value })
                }
                className="h-12 border-2 border-border/80 focus-visible:ring-primary/20 focus-visible:border-primary transition-all duration-200"
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="w-20 h-20 mx-auto flex items-center justify-center mb-4 bg-muted/40 rounded-2xl border border-border/50 p-2">
                <Logo size="lg" showText={false} />
              </div>
              <h2 className="font-heading text-2xl font-bold text-foreground tracking-tight">
                Select Your Grade
              </h2>
              <p className="text-muted-foreground text-sm">
                Choose your current grade level
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-foreground font-semibold text-sm flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-primary/70" />
                  Grade
                </Label>
                <Select
                  value={formData.grade?.toString()}
                  onValueChange={(value) =>
                    setFormData({ ...formData, grade: parseInt(value) as Grade })
                  }
                >
                  <SelectTrigger className="h-12 text-lg border-2 border-border/80 focus:ring-primary/20 focus:border-primary transition-all duration-200">
                    <SelectValue placeholder="Select your grade" />
                  </SelectTrigger>
                  <SelectContent>
                    {grades.map((grade) => (
                      <SelectItem key={grade} value={grade.toString()}>
                        Grade {grade}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 flex gap-3">
          {step > 1 && (
            <Button
              variant="outline"
              onClick={() => setStep(step - 1)}
              className="flex-1"
            >
              Back
            </Button>
          )}
          <Button
            variant="hero"
            onClick={handleNext}
            disabled={!canProceed()}
            className="flex-1"
          >
            {step === 2 ? "Start Assessment" : "Continue"}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
