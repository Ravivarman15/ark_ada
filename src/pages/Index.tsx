import { useState } from "react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/Logo";
import { OnboardingForm } from "@/components/OnboardingForm";
import { QuestionCard } from "@/components/QuestionCard";
import { AssessmentTimer } from "@/components/AssessmentTimer";
import { ResultsDashboard } from "@/components/ResultsDashboard";
import { Button } from "@/components/ui/button";
import { getQuestionsForGrade } from "@/data/sampleQuestions";
import type {
  Student,
  Subject,
  AssessmentResult,
  QuestionResponse,
  SkillScore,
  SkillCode,
  LearnerType,
} from "@/types/assessment";
import { SKILL_DEFINITIONS } from "@/types/assessment";
import { ArrowLeft, Play, BookOpen, Calculator, Microscope, ChevronRight, Menu, X } from "lucide-react";

type AppState = "landing" | "onboarding" | "assessment" | "results";

const generateUUID = () =>
  typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;


const Index = () => {
  const [appState, setAppState] = useState<AppState>("landing");
  const [student, setStudent] = useState<Student | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<QuestionResponse[]>([]);
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);

  const handleOnboardingComplete = (data: Omit<Student, "id" | "createdAt">) => {
    const newStudent: Student = {
      ...data,
      id: generateUUID(),
      createdAt: new Date(),
    };
    setStudent(newStudent);
    setCurrentQuestionIndex(0);
    setStartTime(new Date());
    setAppState("assessment");
  };

  const handleAnswer = (answer: string | string[], timeTaken: number, isSkipped?: boolean) => {
    const questions = getQuestionsForGrade(student?.grade || 3);
    const currentQuestion = questions[currentQuestionIndex];

    if (!currentQuestion) return;

    const isCorrect = isSkipped
      ? false
      : Array.isArray(currentQuestion.correctAnswer)
        ? JSON.stringify(answer) === JSON.stringify(currentQuestion.correctAnswer)
        : answer === currentQuestion.correctAnswer;

    const response: QuestionResponse = {
      questionId: currentQuestion.id,
      selectedAnswer: isSkipped ? "" : answer,
      isCorrect,
      timeTaken,
      errorTag: isCorrect
        ? "none"
        : isSkipped
          ? "none"
          : timeTaken > currentQuestion.expectedTime
            ? "slow-processing"
            : "concept-gap",
    };

    const updatedResponses = [...responses, response];
    setResponses(updatedResponses);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Assessment complete - generate results
      generateResults(updatedResponses);
    }
  };

  const handleTimeUp = () => {
    // Time's up - generate results with current responses
    generateResults();
  };

  const generateResults = (finalResponses?: QuestionResponse[]) => {
    const activeResponses = finalResponses || responses;
    const gradeQuestions = getQuestionsForGrade(student?.grade || 3);
    const skillScores: SkillScore[] = SKILL_DEFINITIONS.map((skill) => {
      const skillResponses = activeResponses.filter((r) => {
        const question = gradeQuestions.find((q) => q.id === r.questionId);
        return question?.skillCode === skill.code;
      });

      if (skillResponses.length === 0) {
        return {
          skillCode: skill.code as SkillCode,
          level: "yellow" as const,
          accuracy: 50,
          avgTime: 30,
          questionsAttempted: 0,
        };
      }

      const correct = skillResponses.filter((r) => r.isCorrect).length;
      const accuracy = Math.round((correct / skillResponses.length) * 100);
      const avgTime =
        skillResponses.reduce((sum, r) => sum + r.timeTaken, 0) /
        skillResponses.length;

      const level =
        accuracy >= 70 ? "green" : accuracy >= 40 ? "yellow" : "red";

      return {
        skillCode: skill.code as SkillCode,
        level,
        accuracy,
        avgTime,
        questionsAttempted: skillResponses.length,
      };
    });

    const greenCount = skillScores.filter((s) => s.level === "green").length;
    const redCount = skillScores.filter((s) => s.level === "red").length;
    const avgAccuracy =
      skillScores.reduce((sum, s) => sum + s.accuracy, 0) / skillScores.length;

    let learnerType: LearnerType = "practice-dependent";
    if (greenCount >= 10 && avgAccuracy >= 80) {
      learnerType = "high-potential";
    } else if (greenCount >= 8) {
      learnerType = "concept-strong";
    } else if (redCount >= 5) {
      learnerType = "foundation-risk";
    }

    const recommendations = [
      learnerType === "high-potential"
        ? "Consider advanced enrichment programs and Olympiad preparation."
        : learnerType === "concept-strong"
          ? "Focus on speed training and complex multi-step problems."
          : learnerType === "foundation-risk"
            ? "Priority: Strengthen foundational concepts with one-on-one support."
            : "Increase daily practice with varied problem types.",
      redCount > 0
        ? `Focus on improving: ${skillScores
          .filter((s) => s.level === "red")
          .map((s) => SKILL_DEFINITIONS.find((d) => d.code === s.skillCode)?.name)
          .slice(0, 3)
          .join(", ")}`
        : "Great progress! Challenge yourself with above-grade problems.",
      "Schedule a follow-up assessment in 30 days to track progress.",
    ];

    const totalTime = startTime
      ? Math.round((new Date().getTime() - startTime.getTime()) / 1000)
      : 0;

    const result: AssessmentResult = {
      id: generateUUID(),
      studentId: student?.id || "",
      completedAt: new Date(),
      totalTime,
      skillScores,
      learnerType,
      responses: activeResponses,
      recommendations,
    };

    setAssessmentResult(result);
    setAppState("results");
  };

  const handleRetake = () => {
    setAppState("landing");
    setStudent(null);
    setCurrentQuestionIndex(0);
    setResponses([]);
    setAssessmentResult(null);
    setStartTime(null);
  };

  // Landing Page
  if (appState === "landing") {
    const scrollTo = (id: string, closeMobile?: () => void) => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      closeMobile?.();
    };

    const MobileMenuWrapper = () => {
      const [mobileOpen, setMobileOpen] = useState(false);
      const navItems = [
        { label: "Assessment", id: "section-assessment" },
        { label: "Subjects", id: "section-subjects" },
        { label: "Reports", id: "section-reports" },
      ];
      return (
        <header className="sticky top-0 w-full backdrop-blur-md bg-primary/95 border-b border-primary-foreground/10 z-50 shadow-md">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Logo size="md" className="[&_.text-foreground]:text-primary-foreground [&_.text-muted-foreground]:text-primary-foreground/70" />
            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-6">
              {navItems.map(({ label, id }) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className="text-primary-foreground/85 hover:text-accent text-sm font-semibold tracking-wide uppercase transition-colors"
                >
                  {label}
                </button>
              ))}
            </nav>
            <Button
              variant="hero"
              size="sm"
              onClick={() => setAppState("onboarding")}
              className="hidden md:flex"
            >
              <Play className="w-4 h-4 mr-1.5 fill-current" />
              Start Now
            </Button>
            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 rounded-lg text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
          {/* Mobile dropdown */}
          {mobileOpen && (
            <div className="md:hidden bg-primary/98 border-t border-primary-foreground/10 animate-fade-in">
              <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
                {navItems.map(({ label, id }) => (
                  <button
                    key={id}
                    onClick={() => scrollTo(id, () => setMobileOpen(false))}
                    className="w-full text-left px-4 py-3 rounded-xl text-primary-foreground/90 hover:bg-primary-foreground/10 hover:text-accent font-semibold text-sm uppercase tracking-wide transition-all duration-200"
                  >
                    {label}
                  </button>
                ))}
                <div className="pt-3 border-t border-primary-foreground/10 mt-2">
                  <Button
                    variant="hero"
                    size="sm"
                    onClick={() => setAppState("onboarding")}
                    className="w-full"
                  >
                    <Play className="w-4 h-4 mr-1.5 fill-current" />
                    Start Now
                  </Button>
                </div>
              </div>
            </div>
          )}
        </header>
      );
    };

    return (
      <div className="min-h-screen bg-background flex flex-col">
        <MobileMenuWrapper />

        {/* ── Hero ── */}
        <section className="relative ark-gradient-bg overflow-hidden flex flex-col min-h-[90vh]">
          <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px] pointer-events-none animate-pulse-slow" />
          <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-pink-500/10 rounded-full blur-[80px] pointer-events-none animate-float" />
          <div className="flex-1 container mx-auto px-4 flex items-center z-10 py-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
              <div className="text-center lg:text-left space-y-8">
                <div className="inline-block px-4 py-1.5 bg-accent/25 rounded-full border border-accent/20">
                  <span className="text-accent font-semibold tracking-wider text-xs uppercase">NEP 2020 Aligned • Skill-Based Assessment</span>
                </div>
                <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground leading-tight tracking-tight">
                  Discover Every{" "}
                  <span className="ark-gradient-text">Student's</span>
                  <br />True Potential
                </h1>
                <p className="text-lg text-primary-foreground/80 max-w-xl font-medium leading-relaxed">
                  ARK Diagnostic Assessment maps 15 core skills across English, Mathematics, and Science for Grades 3–12. Not ranking—understanding.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
                  <Button variant="hero" size="xl" onClick={() => setAppState("onboarding")} className="text-lg px-8">
                    <Play className="w-5 h-5 mr-2 fill-current" />Start Assessment
                  </Button>
                  <Button
                    variant="outline"
                    size="xl"
                    onClick={() => scrollTo("section-assessment")}
                    className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:border-primary-foreground/50 transition-all duration-300"
                  >
                    Learn More
                    <ChevronRight className="w-5 h-5 ml-1" />
                  </Button>
                </div>
              </div>
              <div className="hidden lg:grid grid-cols-2 gap-4">
                {[
                  { icon: BookOpen, title: "English", desc: "Reading, Grammar & Comprehension", skills: "5 core skills (E1–E5)", color: "bg-blue-500/20 text-blue-300 border border-blue-500/30", onClick: () => scrollTo("section-subjects") },
                  { icon: Calculator, title: "Mathematics", desc: "Number Sense & Problem Solving", skills: "5 core skills (M1–M5)", color: "bg-purple-500/20 text-purple-300 border border-purple-500/30", onClick: () => scrollTo("section-subjects") },
                  { icon: Microscope, title: "Science", desc: "Observation & Application", skills: "5 core skills (S1–S5)", color: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30", onClick: () => scrollTo("section-subjects") },
                  { icon: Play, title: "Adaptive", desc: "Personalised difficulty bands", skills: "AI-Powered diagnostics", color: "bg-pink-500/20 text-pink border border-pink-500/30", onClick: () => scrollTo("section-assessment") },
                ].map((item, index) => (
                  <button
                    key={index}
                    onClick={item.onClick}
                    className="group bg-primary-foreground/5 backdrop-blur-md rounded-2xl p-6 border border-primary-foreground/10 hover:bg-primary-foreground/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between h-44 text-left w-full"
                  >
                    <div>
                      <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110`}>
                        <item.icon className="w-6 h-6" />
                      </div>
                      <h3 className="font-heading font-bold text-primary-foreground text-lg tracking-tight">{item.title}</h3>
                      <p className="text-primary-foreground/60 text-xs mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-primary-foreground/50 text-[10px] tracking-wider uppercase font-bold">{item.skills}</span>
                      <ChevronRight className="w-4 h-4 text-primary-foreground/40 group-hover:text-accent group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
          {/* Stats bar */}
          <div className="container mx-auto px-4 pb-10 z-10">
            <div className="max-w-3xl mx-auto bg-primary-foreground/5 backdrop-blur-md rounded-2xl p-5 border border-primary-foreground/10">
              <div className="grid grid-cols-4 gap-4 text-center divide-x divide-primary-foreground/10">
                {[
                  { value: "15", label: "Core Skills" },
                  { value: "3", label: "Subjects" },
                  { value: "20 Min", label: "Duration" },
                  { value: "3–12", label: "Grades" },
                ].map((stat, i) => (
                  <div key={i} className={cn(i > 0 && "pl-4")}>
                    <span className="font-heading text-3xl font-extrabold text-accent">{stat.value}</span>
                    <span className="block text-[10px] uppercase tracking-widest font-bold text-primary-foreground/70 mt-1">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Assessment Section ── */}
        <section id="section-assessment" className="py-20 bg-background">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-14">
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-widest mb-3">How It Works</span>
              <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">The ARK Assessment Process</h2>
              <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">A scientifically-designed 20-minute diagnostic that reveals deep insights into every student's skill profile.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[
                { step: "01", title: "Student Onboarding", desc: "Enter name, school, and grade. No login required. Takes under 30 seconds to get started.", icon: "👤" },
                { step: "02", title: "Skill Assessment", desc: "Answer 15–30 adaptive questions across English, Maths, and Science. Each question targets a specific skill code.", icon: "📝" },
                { step: "03", title: "Instant Analysis", desc: "Receive a detailed skill map instantly — identifying green (strong), yellow (developing), and red (needs support) areas.", icon: "📊" },
              ].map((item) => (
                <div key={item.step} className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="font-heading font-extrabold text-primary text-sm">{item.step}</span>
                    </div>
                    <div>
                      <span className="text-2xl mb-2 block">{item.icon}</span>
                      <h3 className="font-heading font-bold text-foreground text-lg mb-2">{item.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 text-primary-foreground">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="font-heading font-extrabold text-2xl mb-3">Question Types</h3>
                  <div className="space-y-3">
                    {[
                      { type: "Multiple Choice (MCQ)", desc: "Select the correct answer from 4 options" },
                      { type: "True / False", desc: "Evaluate statements as factual or incorrect" },
                      { type: "Match the Following", desc: "Connect items from two columns correctly" },
                    ].map((q) => (
                      <div key={q.type} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                        <div>
                          <span className="font-semibold text-sm">{q.type}</span>
                          <span className="text-primary-foreground/70 text-sm ml-2">— {q.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-heading font-extrabold text-2xl mb-3">Difficulty Bands</h3>
                  <div className="space-y-3">
                    {[
                      { band: "Below Grade", color: "bg-emerald-400", desc: "Foundation-level questions" },
                      { band: "At Grade", color: "bg-yellow-400", desc: "Standard curriculum level" },
                      { band: "Above Grade", color: "bg-pink-400", desc: "Enrichment & challenge level" },
                    ].map((b) => (
                      <div key={b.band} className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${b.color} flex-shrink-0`} />
                        <span className="font-semibold text-sm">{b.band}</span>
                        <span className="text-primary-foreground/70 text-sm">— {b.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center mt-10">
              <Button variant="default" size="lg" onClick={() => setAppState("onboarding")}>
                <Play className="w-4 h-4 mr-2 fill-current" />
                Take the Assessment Now
              </Button>
            </div>
          </div>
        </section>

        {/* ── Subjects Section ── */}
        <section id="section-subjects" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-14">
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-widest mb-3">Subjects & Skills</span>
              <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">15 Skills Across 3 Subjects</h2>
              <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">Each skill is mapped to a unique code and assessed through targeted questions aligned to the NEP 2020 curriculum framework.</p>
            </div>
            <div className="space-y-6">
              {[
                {
                  subject: "English",
                  icon: BookOpen,
                  color: "text-blue-600",
                  bg: "bg-blue-50 border-blue-200",
                  headerBg: "bg-blue-600",
                  skills: SKILL_DEFINITIONS.filter(s => s.subject === "english"),
                },
                {
                  subject: "Mathematics",
                  icon: Calculator,
                  color: "text-purple-600",
                  bg: "bg-purple-50 border-purple-200",
                  headerBg: "bg-purple-600",
                  skills: SKILL_DEFINITIONS.filter(s => s.subject === "mathematics"),
                },
                {
                  subject: "Science",
                  icon: Microscope,
                  color: "text-emerald-600",
                  bg: "bg-emerald-50 border-emerald-200",
                  headerBg: "bg-emerald-600",
                  skills: SKILL_DEFINITIONS.filter(s => s.subject === "science"),
                },
              ].map((subj) => (
                <div key={subj.subject} className={`rounded-2xl border ${subj.bg} overflow-hidden`}>
                  <div className={`${subj.headerBg} text-white px-6 py-4 flex items-center gap-3`}>
                    <subj.icon className="w-5 h-5" />
                    <h3 className="font-heading font-bold text-lg">{subj.subject}</h3>
                    <span className="ml-auto text-white/70 text-sm">{subj.skills.length} skills assessed</span>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
                    {subj.skills.map((skill) => (
                      <div key={skill.code} className="bg-white rounded-xl p-4 border border-border/40 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-2 py-0.5 rounded-md text-xs font-extrabold bg-primary text-primary-foreground font-mono`}>{skill.code}</span>
                          <h4 className="font-heading font-bold text-foreground text-sm">{skill.name}</h4>
                        </div>
                        <p className="text-muted-foreground text-xs leading-relaxed">{skill.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Button variant="default" size="lg" onClick={() => setAppState("onboarding")}>
                <Play className="w-4 h-4 mr-2 fill-current" />
                Assess All 15 Skills
              </Button>
            </div>
          </div>
        </section>

        {/* ── Reports Section ── */}
        <section id="section-reports" className="py-20 bg-background">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-14">
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-widest mb-3">Detailed Reports</span>
              <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">Actionable Skill Reports</h2>
              <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">Every assessment generates a comprehensive report that educators and parents can use to guide learning decisions.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6 mb-10">
              {[
                { emoji: "🗺️", title: "Skill Heatmap", desc: "Visual breakdown of all 15 skills colour-coded into green (proficient), yellow (developing), and red (needs focus) levels." },
                { emoji: "📈", title: "Radar Chart", desc: "Spider diagram showing relative strength across all skills at a glance — great for identifying hidden strengths and blind spots." },
                { emoji: "🎯", title: "Learner Profile", desc: "AI-generated learner archetype: Advanced Learner, Steady Performer, High Potential, or Needs Structured Support." },
                { emoji: "📋", title: "PDF Report Download", desc: "Download a professional, school-ready PDF report with full skill analysis, error tag breakdown, and personalised learning recommendations." },
                { emoji: "⚡", title: "Error Tag Analysis", desc: "Identifies why a student got questions wrong — Concept Gap, Slow Processing, Careless Error, or Language Barrier." },
                { emoji: "📊", title: "Subject-wise Accuracy", desc: "Bar charts showing percentage accuracy for English, Mathematics, and Science separately so teachers can prioritise remediation." },
              ].map((item) => (
                <div key={item.title} className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 flex gap-4">
                  <span className="text-3xl flex-shrink-0 mt-1">{item.emoji}</span>
                  <div>
                    <h3 className="font-heading font-bold text-foreground text-base mb-1.5">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-gradient-to-br from-primary/5 to-accent/5 border border-border rounded-2xl p-8 text-center">
              <h3 className="font-heading font-extrabold text-2xl text-foreground mb-2">Ready to generate your first report?</h3>
              <p className="text-muted-foreground mb-6 max-w-lg mx-auto">Complete the assessment and receive a fully-detailed skill report instantly — no account needed.</p>
              <Button variant="default" size="lg" onClick={() => setAppState("onboarding")} className="mx-auto">
                <Play className="w-4 h-4 mr-2 fill-current" />
                Start Your Free Assessment
              </Button>
            </div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="bg-primary text-primary-foreground py-8">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <Logo size="sm" className="[&_.text-foreground]:text-primary-foreground [&_.text-muted-foreground]:text-primary-foreground/70" />
            <p className="text-primary-foreground/60 text-sm text-center">ARK Diagnostic Assessment · NEP 2020 Aligned · Confidential — For Authorised Educator Use Only</p>
            <Button variant="hero" size="sm" onClick={() => setAppState("onboarding")}>
              <Play className="w-4 h-4 mr-1.5 fill-current" />
              Start Assessment
            </Button>
          </div>
        </footer>
      </div>
    );
  }

  // Onboarding
  if (appState === "onboarding") {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <header className="container mx-auto px-4 py-6 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setAppState("landing")}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <Logo size="sm" />
        </header>

        <main className="flex-1 container mx-auto px-4 py-8 flex items-center justify-center">
          <OnboardingForm onComplete={handleOnboardingComplete} />
        </main>
      </div>
    );
  }

  // Assessment
  if (appState === "assessment") {
    const questions = getQuestionsForGrade(student?.grade || 3);
    const currentQuestion = questions[currentQuestionIndex];

    if (!currentQuestion) return null;

    return (
      <div className="min-h-screen bg-background flex flex-col">
        <header className="w-full bg-card border-b border-border py-4 shadow-sm">
          <div className="container mx-auto px-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Logo size="sm" showText={false} />
              <div className="h-6 w-px bg-border mx-1" />
              <div>
                <p className="font-heading font-bold text-foreground leading-none text-base">
                  ARK Diagnostic Assessment
                </p>
                <p className="text-xs text-muted-foreground mt-1.5">
                  {student?.name} • Grade {student?.grade}
                </p>
              </div>
            </div>
            <AssessmentTimer totalSeconds={60 * 20} onTimeUp={handleTimeUp} />
          </div>
        </header>

        <main className="flex-1 container mx-auto px-4 py-8">
          <QuestionCard
            question={currentQuestion}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={questions.length}
            onAnswer={handleAnswer}
          />
        </main>
      </div>
    );
  }

  // Results
  if (appState === "results" && assessmentResult && student) {
    return (
      <ResultsDashboard
        result={assessmentResult}
        student={student}
        onRetake={handleRetake}
      />
    );
  }

  return null;
};

export default Index;
