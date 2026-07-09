import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Question } from "@/types/assessment";
import { Clock, ChevronRight, Check } from "lucide-react";

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (answer: string | string[], timeTaken: number) => void;
  className?: string;
}

export const QuestionCard = ({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  className,
}: QuestionCardProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [matchAnswers, setMatchAnswers] = useState<Record<string, string>>({});
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setSelectedAnswer(null);
    setMatchAnswers({});
    setElapsedTime(0);
    setIsSubmitting(false);
  }, [question.id]);

  const handleSubmit = () => {
    setIsSubmitting(true);
    if (question.type === "match") {
      const answers = Object.entries(matchAnswers).map(
        ([left, right]) => `${left}:${right}`
      );
      onAnswer(answers, elapsedTime);
    } else if (selectedAnswer) {
      onAnswer(selectedAnswer, elapsedTime);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const isTimeWarning = elapsedTime > question.expectedTime * 0.8;
  const isTimeExceeded = elapsedTime > question.expectedTime;

  const canSubmit =
    question.type === "match"
      ? Object.keys(matchAnswers).length === (question.matchPairs?.length || 0)
      : selectedAnswer !== null;

  const difficultyColors = {
    below: "bg-skill-green/20 text-skill-green",
    at: "bg-skill-yellow/20 text-skill-yellow",
    above: "bg-pink/20 text-pink",
  };

  return (
    <div className={cn("w-full max-w-3xl mx-auto", className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm font-medium">
            {questionNumber} / {totalQuestions}
          </span>
          <span
            className={cn(
              "px-2 py-0.5 rounded-full text-xs font-medium capitalize",
              difficultyColors[question.difficultyBand]
            )}
          >
            {question.difficultyBand} grade
          </span>
        </div>
        <div
          className={cn(
            "flex items-center gap-2 px-3 py-1.5 rounded-full font-mono text-sm font-medium transition-colors",
            isTimeExceeded
              ? "bg-danger/20 text-danger"
              : isTimeWarning
              ? "bg-warning/20 text-warning"
              : "bg-muted text-muted-foreground"
          )}
        >
          <Clock className="w-4 h-4" />
          {formatTime(elapsedTime)}
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-muted rounded-full mb-8 overflow-hidden">
        <div
          className="h-full bg-accent rounded-full transition-all duration-300"
          style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
        />
      </div>

      {/* Question */}
      <div className="bg-card rounded-2xl p-8 shadow-ark-lg border border-border">
        <div className="flex items-start gap-3 mb-6">
          <span className="flex-shrink-0 w-8 h-8 bg-accent rounded-lg flex items-center justify-center font-heading font-bold text-sm text-accent-foreground">
            Q
          </span>
          <p className="text-lg font-medium text-foreground leading-relaxed">
            {question.text}
          </p>
        </div>

        {question.imageUrl && (
          <div className="mb-6 rounded-xl overflow-hidden border border-border">
            <img
              src={question.imageUrl}
              alt="Question visual"
              className="w-full max-h-64 object-contain bg-muted"
            />
          </div>
        )}

        {/* MCQ Options */}
        {question.type === "mcq" && question.options && (
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => setSelectedAnswer(option)}
                className={cn(
                  "w-full p-4 rounded-xl border-2 text-left transition-all duration-200 flex items-center gap-3 group hover:-translate-y-0.5 hover:shadow-sm",
                  selectedAnswer === option
                    ? "border-primary bg-primary/5 shadow-sm scale-[1.01] hover:scale-[1.01]"
                    : "border-border hover:border-primary/30 bg-card"
                )}
              >
                <span
                  className={cn(
                    "flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm transition-all duration-200",
                    selectedAnswer === option
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground group-hover:bg-muted-foreground/15"
                  )}
                >
                  {String.fromCharCode(65 + index)}
                </span>
                <span className={cn(
                  "font-medium transition-colors duration-200",
                  selectedAnswer === option ? "text-primary font-semibold" : "text-foreground"
                )}>{option}</span>
                {selectedAnswer === option && (
                  <Check className="w-5 h-5 text-primary ml-auto animate-fade-in" />
                )}
              </button>
            ))}
          </div>
        )}

        {/* True/False */}
        {question.type === "true-false" && (
          <div className="grid grid-cols-2 gap-4">
            {["True", "False"].map((option) => (
              <button
                key={option}
                onClick={() => setSelectedAnswer(option)}
                className={cn(
                  "p-6 rounded-xl border-2 text-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm group",
                  selectedAnswer === option
                    ? "border-primary bg-primary/5 shadow-sm"
                    : "border-border hover:border-primary/30 bg-card"
                )}
              >
                <span className={cn(
                  "font-heading font-bold text-xl transition-colors duration-200",
                  selectedAnswer === option ? "text-primary" : "text-foreground"
                )}>
                  {option}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Match the Following */}
        {question.type === "match" && question.matchPairs && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground mb-4">
              Match the items on the left with the correct options on the right
            </p>
            {question.matchPairs.map((pair, index) => (
              <div key={index} className="flex items-center gap-4 bg-muted/20 p-2.5 rounded-xl border border-border/30">
                <div className="flex-1 p-3 bg-card border border-border/50 rounded-lg text-foreground font-semibold text-sm shadow-sm">
                  {pair.left}
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground animate-pulse-slow" />
                <select
                  value={matchAnswers[pair.left] || ""}
                  onChange={(e) =>
                    setMatchAnswers({
                      ...matchAnswers,
                      [pair.left]: e.target.value,
                    })
                  }
                  className="flex-1 p-3 bg-card border-2 border-border/80 rounded-lg text-foreground font-semibold text-sm focus:border-primary focus:ring-primary transition-all duration-200 cursor-pointer shadow-sm"
                >
                  <option value="">Select match</option>
                  {question.matchPairs.map((p, i) => (
                    <option key={i} value={p.right}>
                      {p.right}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        )}

        {/* Submit button */}
        <div className="mt-8 flex justify-end">
          <Button
            variant="hero"
            size="lg"
            onClick={handleSubmit}
            disabled={!canSubmit || isSubmitting}
            className="min-w-[160px]"
          >
            {isSubmitting ? "Submitting..." : "Next Question"}
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
