import { cn } from "@/lib/utils";
import type { AssessmentResult, Student } from "@/types/assessment";
import { SKILL_DEFINITIONS } from "@/types/assessment";
import { LearnerTypeCard } from "./LearnerTypeCard";
import { ProgressRing } from "./ProgressRing";
import { Button } from "./ui/button";
import { generatePDFReport } from "@/utils/generateReport";
import { toast } from "@/components/ui/sonner";
import {
  Download, RefreshCw, Clock, Target,
  CheckCircle2, XCircle, ChevronRight, AlertCircle,
} from "lucide-react";
import { Logo } from "./Logo";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell,
  PieChart, Pie, Legend,
} from "recharts";

interface ResultsDashboardProps {
  result: AssessmentResult;
  student: Student;
  onRetake?: () => void;
  className?: string;
}

const LEVEL_CONFIG = {
  green: { label: "Ready to Advance", bg: "bg-emerald-50", border: "border-emerald-300", text: "text-emerald-700", bar: "bg-emerald-500" },
  yellow: { label: "Needs Support", bg: "bg-yellow-50", border: "border-yellow-300", text: "text-yellow-700", bar: "bg-yellow-500" },
  red: { label: "Foundation Gap", bg: "bg-red-50", border: "border-red-300", text: "text-red-700", bar: "bg-red-500" },
};

const SUBJECT_META = {
  english: { label: "English", color: "hsl(213, 75%, 40%)" },
  mathematics: { label: "Mathematics", color: "hsl(270, 60%, 50%)" },
  science: { label: "Science", color: "hsl(142, 60%, 35%)" },
};

export const ResultsDashboard = ({ result, student, onRetake, className }: ResultsDashboardProps) => {

  const overallAccuracy = Math.round(
    result.skillScores.reduce((sum, s) => sum + s.accuracy, 0) / result.skillScores.length
  );

  const correctAnswers = result.responses.filter((r) => r.isCorrect).length;
  const totalQuestions = result.responses.length;
  const totalMins = Math.floor(result.totalTime / 60);
  const totalSecs = result.totalTime % 60;

  const greenSkills = result.skillScores.filter((s) => s.level === "green").length;
  const yellowSkills = result.skillScores.filter((s) => s.level === "yellow").length;
  const redSkills = result.skillScores.filter((s) => s.level === "red").length;

  // ── Chart Data ──

  // Radar — one spoke per skill
  const radarData = SKILL_DEFINITIONS.map((def) => {
    const score = result.skillScores.find((s) => s.skillCode === def.code);
    return { skill: def.code, value: score?.accuracy ?? 0, fullMark: 100 };
  });

  // Subject bar chart
  const subjectBarData = (["english", "mathematics", "science"] as const).map((subj) => {
    const codes = SKILL_DEFINITIONS.filter((d) => d.subject === subj).map((d) => d.code);
    const scores = result.skillScores.filter((s) => codes.includes(s.skillCode as never));
    const avg = scores.length ? Math.round(scores.reduce((a, b) => a + b.accuracy, 0) / scores.length) : 0;
    return { subject: SUBJECT_META[subj].label, accuracy: avg, fill: SUBJECT_META[subj].color };
  });

  // Pie — skill distribution
  const pieData = [
    { name: "Ready to Advance", value: greenSkills, fill: "#16a34a" },
    { name: "Needs Support", value: yellowSkills, fill: "#eab308" },
    { name: "Foundation Gap", value: redSkills, fill: "#dc2626" },
  ].filter((d) => d.value > 0);

  // Error analysis
  const errorTags = result.responses.filter((r) => !r.isCorrect).reduce(
    (acc, r) => { acc[r.errorTag] = (acc[r.errorTag] || 0) + 1; return acc; },
    {} as Record<string, number>
  );
  const errorBarData = Object.entries(errorTags)
    .filter(([k]) => k !== "none")
    .map(([tag, count]) => ({
      tag: tag.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      count,
    }));

  // Per-skill bar data
  const skillBarData = result.skillScores.map((s) => {
    const def = SKILL_DEFINITIONS.find((d) => d.code === s.skillCode);
    return {
      code: s.skillCode, name: def?.name || s.skillCode,
      value: s.accuracy, fill: LEVEL_CONFIG[s.level].text.includes("emerald") ? "#16a34a" : LEVEL_CONFIG[s.level].text.includes("yellow") ? "#eab308" : "#dc2626",
      level: s.level,
    };
  });

  // Subject groups for detail section
  const subjectGroups = (["english", "mathematics", "science"] as const).map((subj) => {
    const codes = SKILL_DEFINITIONS.filter((d) => d.subject === subj).map((d) => d.code);
    const scores = result.skillScores.filter((s) => codes.includes(s.skillCode as never));
    const avg = scores.length ? Math.round(scores.reduce((a, b) => a + b.accuracy, 0) / scores.length) : 0;
    return { subj, label: SUBJECT_META[subj].label, scores, avg };
  });

  const handleDownloadReport = async () => {
    try {
      toast.info("Generating your report...");
      await generatePDFReport(result, student);
      toast.success("Report downloaded successfully!");
    } catch (error) {
      console.error("Failed to generate report:", error);
      toast.error("Failed to generate report. Please try again.");
    }
  };

  return (
    <div className={cn("min-h-screen bg-background", className)}>

      {/* ── Header ── */}
      <header className="bg-gradient-to-r from-primary via-primary to-primary/90 text-primary-foreground py-5">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo size="sm" className="text-primary-foreground [&_span]:text-primary-foreground [&_.text-foreground]:text-primary-foreground [&_.text-muted-foreground]:text-primary-foreground/70" />
            <div className="h-8 w-px bg-primary-foreground/20 mx-1" />
            <div>
              <h2 className="font-heading text-lg font-bold">Assessment Results</h2>
              <p className="text-primary-foreground/70 text-xs">{student.name} · {student.grade === "NEET" ? "NEET" : `Grade ${student.grade}`}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              onClick={handleDownloadReport}>
              <Download className="w-4 h-4 mr-1.5" /> PDF
            </Button>
            <Button variant="outline" size="sm"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              onClick={onRetake}>
              <RefreshCw className="w-4 h-4 mr-1.5" /> Retake
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-5xl space-y-8">

        {/* ── Score Overview ── */}
        <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <ProgressRing progress={overallAccuracy} size={120} strokeWidth={10}>
              <div className="text-center">
                <span className="font-heading text-3xl font-bold text-foreground">{overallAccuracy}%</span>
                <span className="block text-xs text-muted-foreground">Overall</span>
              </div>
            </ProgressRing>

            <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
              {[
                { label: "Correct", value: `${correctAnswers}/${totalQuestions}`, icon: CheckCircle2, color: "text-emerald-600" },
                { label: "Incorrect", value: `${totalQuestions - correctAnswers}`, icon: XCircle, color: "text-red-500" },
                { label: "Time", value: `${totalMins}m ${totalSecs}s`, icon: Clock, color: "text-blue-600" },
                { label: "Skills", value: `${result.skillScores.length}`, icon: Target, color: "text-purple-600" },
              ].map(({ label, value, icon: Icon, color }) => (
                <div key={label} className="text-center p-3 rounded-xl bg-muted/40">
                  <Icon className={cn("w-5 h-5 mx-auto mb-1", color)} />
                  <div className="font-heading font-bold text-lg text-foreground">{value}</div>
                  <div className="text-xs text-muted-foreground">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Skill Level Summary (3 cards) ── */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Ready to Advance", count: greenSkills, bg: "bg-emerald-50", border: "border-emerald-200", color: "text-emerald-700" },
            { label: "Needs Support", count: yellowSkills, bg: "bg-yellow-50", border: "border-yellow-200", color: "text-yellow-700" },
            { label: "Foundation Gap", count: redSkills, bg: "bg-red-50", border: "border-red-200", color: "text-red-700" },
          ].map(({ label, count, bg, border, color }) => (
            <div key={label} className={cn("rounded-xl border p-4 text-center", bg, border)}>
              <div className={cn("font-heading font-bold text-2xl", color)}>{count}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
            </div>
          ))}
        </div>

        {/* ── Learner Profile ── */}
        <LearnerTypeCard type={result.learnerType} />

        {/* ── Charts Row ── */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* Radar Chart */}
          <div className="bg-card rounded-2xl p-5 border border-border shadow-sm">
            <h3 className="font-heading font-semibold text-foreground mb-3 text-sm">Skill Radar</h3>
            <ResponsiveContainer width="100%" height={260}>
              <RadarChart data={radarData} margin={{ top: 5, right: 25, bottom: 5, left: 25 }}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="skill" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                <Radar name="Accuracy" dataKey="value" stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))" fillOpacity={0.2} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart — Skill Distribution */}
          <div className="bg-card rounded-2xl p-5 border border-border shadow-sm">
            <h3 className="font-heading font-semibold text-foreground mb-3 text-sm">Skill Distribution</h3>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name"
                  cx="50%" cy="50%" outerRadius={90} innerRadius={50} paddingAngle={3}
                  label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                  labelLine={false}>
                  {pieData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                </Pie>
                <Legend iconType="circle" iconSize={8}
                  formatter={(val) => <span style={{ fontSize: 12, color: "hsl(var(--foreground))" }}>{val}</span>} />
                <Tooltip formatter={(val) => [`${val} skills`, ""]} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ── Subject Accuracy Bar Chart ── */}
        <div className="bg-card rounded-2xl p-5 border border-border shadow-sm">
          <h3 className="font-heading font-semibold text-foreground mb-3 text-sm">Subject-wise Accuracy</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={subjectBarData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="subject" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                tickFormatter={(v) => `${v}%`} />
              <Tooltip formatter={(val) => [`${val}%`, "Accuracy"]} />
              <Bar dataKey="accuracy" radius={[6, 6, 0, 0]} maxBarSize={80}>
                {subjectBarData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* ── All Skills Bar Chart ── */}
        <div className="bg-card rounded-2xl p-5 border border-border shadow-sm">
          <h3 className="font-heading font-semibold text-foreground mb-3 text-sm">All Skills — Accuracy</h3>
          <ResponsiveContainer width="100%" height={Math.max(200, skillBarData.length * 30)}>
            <BarChart data={skillBarData} layout="vertical"
              margin={{ top: 0, right: 20, bottom: 0, left: 80 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--border))" />
              <XAxis type="number" domain={[0, 100]} tickFormatter={(v) => `${v}%`}
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
              <YAxis type="category" dataKey="name" width={75}
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
              <Tooltip formatter={(val) => [`${val}%`, "Accuracy"]} />
              <Bar dataKey="value" radius={[0, 6, 6, 0]} maxBarSize={20}>
                {skillBarData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* ── Error Analysis ── */}
        {errorBarData.length > 0 && (
          <div className="bg-card rounded-2xl p-5 border border-border shadow-sm">
            <h3 className="font-heading font-semibold text-foreground mb-3 text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-500" /> Error Type Analysis
            </h3>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={errorBarData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="tag" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                <Tooltip />
                <Bar dataKey="count" fill="#ef4444" radius={[6, 6, 0, 0]} maxBarSize={60} />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 grid sm:grid-cols-2 gap-3">
              {[
                { key: "concept-gap", label: "Concept Gap", desc: "Did not understand the underlying concept." },
                { key: "slow-processing", label: "Slow Processing", desc: "Took longer than expected — needs fluency practice." },
                { key: "careless-error", label: "Careless Error", desc: "Likely knew the answer but made a mistake." },
                { key: "language-barrier", label: "Language Barrier", desc: "Difficulty understanding the question phrasing." },
              ].filter((e) => errorTags[e.key]).map((e) => (
                <div key={e.key} className="bg-muted/50 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-foreground">{e.label}</span>
                    <span className="text-sm font-bold text-red-600">{errorTags[e.key]}×</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{e.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Subject Breakdown (detailed) ── */}
        <div className="space-y-4">
          <h3 className="font-heading font-semibold text-foreground text-lg">Subject Breakdown</h3>
          {subjectGroups.map(({ subj, label, scores, avg }) => (
            <div key={subj} className="bg-card rounded-xl border border-border p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-heading font-bold text-foreground">{label}</h4>
                <span className={cn(
                  "font-heading font-bold text-lg",
                  avg >= 70 ? "text-emerald-600" : avg >= 40 ? "text-yellow-600" : "text-red-600"
                )}>{avg}%</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div className={cn("h-full rounded-full transition-all duration-500",
                  avg >= 70 ? "bg-emerald-500" : avg >= 40 ? "bg-yellow-500" : "bg-red-500"
                )} style={{ width: `${avg}%` }} />
              </div>
              <div className="space-y-2">
                {scores.map((s) => {
                  const def = SKILL_DEFINITIONS.find((d) => d.code === s.skillCode);
                  const cfg = LEVEL_CONFIG[s.level];
                  return (
                    <div key={s.skillCode} className="flex items-center gap-3 py-2 border-b border-border/50 last:border-0">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-foreground">{s.skillCode}</span>
                          <span className="text-sm text-foreground truncate">{def?.name}</span>
                        </div>
                      </div>
                      <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full border shrink-0", cfg.bg, cfg.text, cfg.border)}>
                        {cfg.label}
                      </span>
                      <span className="font-heading font-bold text-foreground w-12 text-right">{s.accuracy}%</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* ── Priority Areas ── */}
        {redSkills > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-5 space-y-3">
            <h3 className="font-heading font-bold text-red-700 flex items-center gap-2">
              <XCircle className="w-5 h-5" /> Needs Immediate Attention
            </h3>
            <div className="space-y-2">
              {result.skillScores.filter((s) => s.level === "red").map((s) => {
                const def = SKILL_DEFINITIONS.find((d) => d.code === s.skillCode);
                return (
                  <div key={s.skillCode} className="flex items-start gap-2 bg-white/70 rounded-lg p-3">
                    <ChevronRight className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                    <div>
                      <div className="font-semibold text-sm text-foreground">{s.skillCode} — {def?.name} ({s.accuracy}%)</div>
                      <div className="text-xs text-muted-foreground">{def?.description}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Strengths ── */}
        {greenSkills > 0 && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 space-y-3">
            <h3 className="font-heading font-bold text-emerald-700 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" /> Strengths
            </h3>
            <div className="grid sm:grid-cols-2 gap-2">
              {result.skillScores.filter((s) => s.level === "green").map((s) => {
                const def = SKILL_DEFINITIONS.find((d) => d.code === s.skillCode);
                return (
                  <div key={s.skillCode} className="flex items-center gap-2 bg-white/70 rounded-lg p-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div>
                      <div className="font-semibold text-sm text-foreground">{def?.name}</div>
                      <div className="text-xs text-muted-foreground">{s.accuracy}% accuracy</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Recommendations ── */}
        <div className="bg-card rounded-xl border border-border p-5 space-y-3">
          <h3 className="font-heading font-semibold text-foreground">Recommendations</h3>
          <div className="space-y-2">
            {result.recommendations.map((rec, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/40">
                <span className="shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                  {i + 1}
                </span>
                <p className="text-sm text-foreground">{rec}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Download CTA ── */}
        <div className="flex justify-center pb-6">
          <Button variant="hero" size="lg" onClick={handleDownloadReport}>
            <Download className="w-5 h-5 mr-2" /> Download Full Report
          </Button>
        </div>

      </main>
    </div>
  );
};
