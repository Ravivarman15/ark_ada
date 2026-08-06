import { jsPDF } from "jspdf";
import type { AssessmentResult, Student, SkillScore } from "@/types/assessment";
import { SKILL_DEFINITIONS } from "@/types/assessment";

const LOGO_PATH = "/WhatsApp Image 2026-02-04 at 11.06.19.jpeg";

// ── Layout (A4 portrait, mm) ──────────────────────────────────────────────────
const PW = 210, PH = 297, M = 16, CW = PW - M * 2;
const FOOTER = 10, SAFE_B = PH - FOOTER - 6;

// ── Typography ────────────────────────────────────────────────────────────────
const F = { hero: 26, h1: 18, h2: 14, h3: 12, body: 11, small: 10, caption: 9 };
const LH = (pt: number) => pt * 0.56;

// ── Colour palette — B&W print-safe ──────────────────────────────────────────
type RGB = [number, number, number];
const C: Record<string, RGB> = {
  black:    [  0,   0,   0],
  navy:     [ 22,  40,  80],
  navyDk:   [ 14,  24,  50],
  navyLt:   [ 50,  78, 128],
  gold:     [160, 120,   0],
  white:    [255, 255, 255],
  g50:      [255, 255, 255],
  g100:     [245, 245, 245],
  g200:     [220, 220, 220],
  g300:     [190, 190, 190],
  g400:     [150, 150, 150],
  g500:     [110, 110, 110],
  g600:     [ 80,  80,  80],
  g700:     [ 50,  50,  50],
  g800:     [ 20,  20,  20],
  green:    [  0, 110,  60],
  greenBg:  [255, 255, 255],
  greenDk:  [  0,  80,  40],
  amber:    [140,  90,   0],
  amberBg:  [255, 255, 255],
  amberDk:  [110,  70,   0],
  red:      [180,  30,  30],
  redBg:    [255, 255, 255],
  redDk:    [130,  20,  20],
  purple:   [ 80,  50, 160],
  teal:     [  0, 120, 110],
};

// ── Helpers ───────────────────────────────────────────────────────────────────
const getSkillName = (c: string) => SKILL_DEFINITIONS.find(s => s.code === c)?.name ?? c;
const getSkillDesc = (c: string) => SKILL_DEFINITIONS.find(s => s.code === c)?.description ?? "";
const levelRGB   = (l: string): RGB => l === "green" ? C.green  : l === "yellow" ? C.amber  : C.red;
const levelBgRGB = (_l: string): RGB => C.white;
const levelDkRGB = (l: string): RGB => l === "green" ? C.greenDk: l === "yellow" ? C.amberDk: C.redDk;
const levelLabel = (l: string) =>      l === "green" ? "Proficient" : l === "yellow" ? "Developing" : "Needs Focus";
const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
const trunc = (s: string, max: number) => s.length > max ? s.slice(0, max - 1) + "…" : s;

const LEARNER_META: Record<string, { label: string; tagline: string; detail: string }> = {
  "concept-strong":     { label: "Advanced Learner",         tagline: "Excelling across skill areas",      detail: "Demonstrates strong conceptual grasp and analytical depth. Ready for enrichment challenges and higher-order thinking tasks." },
  "practice-dependent": { label: "Steady Performer",         tagline: "Solid foundation, needs practice",  detail: "Core understanding is present. Regular practice and reinforcement will unlock next-level performance." },
  "foundation-risk":    { label: "Needs Structured Support", tagline: "Targeted intervention recommended", detail: "Key foundational gaps detected. A focused remediation plan is strongly recommended before advancing to the next level." },
  "high-potential":     { label: "High Potential Learner",   tagline: "Aptitude exceeds current output",   detail: "Natural aptitude is evident. Consistent challenge and coaching will help this learner excel rapidly." },
};
const DEFAULT_META = { label: "Learner", tagline: "", detail: "See full skill breakdown for detailed insights." };

const ERROR_DEFS: Record<string, { label: string; desc: string; suggestion: string; color: RGB }> = {
  "concept-gap":      { label: "Concept Gap",      desc: "Student lacks understanding of the core concept behind the question.",                       suggestion: "Re-teach the foundational concept using concrete examples and visual models.",           color: C.red    },
  "slow-processing":  { label: "Slow Processing",  desc: "Response time is well above average — may indicate a need for fluency-building practice.",   suggestion: "Use timed drills and repetition to improve processing speed and automaticity.",         color: C.amber  },
  "careless-error":   { label: "Careless Error",   desc: "Likely understands the concept but makes execution mistakes under pressure.",                suggestion: "Introduce step-by-step verification habits and encourage self-checking.",              color: C.purple },
  "language-barrier": { label: "Language Barrier", desc: "Question phrasing appears to be a barrier to demonstrating knowledge.",                     suggestion: "Provide bilingual support or simplify question language during remediation.",           color: C.teal   },
};

// ── Image loader ──────────────────────────────────────────────────────────────
const loadImageAsBase64 = (url: string): Promise<string> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const cv = document.createElement("canvas");
      cv.width = img.width; cv.height = img.height;
      const ctx = cv.getContext("2d");
      if (ctx) { ctx.drawImage(img, 0, 0); resolve(cv.toDataURL("image/jpeg")); }
      else reject(new Error("Canvas ctx null"));
    };
    img.onerror = reject;
    img.src = url;
  });

// ════════════════════════════════════════════════════════════════════════════════
// MAIN GENERATOR
// ════════════════════════════════════════════════════════════════════════════════
export const generatePDFReport = async (
  result: AssessmentResult,
  student: Student
): Promise<void> => {
  console.log("Generating PDF report...");
  try {
    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    let y = 0;
    let currentPageTitle = "";

    const completedAt = result.completedAt instanceof Date
      ? result.completedAt : new Date(result.completedAt);

    // ── Drawing primitives ────────────────────────────────────────────────────
    const sf = (style: "bold" | "normal" | "italic", size: number, rgb: RGB = C.g800) => {
      doc.setFont("helvetica", style); doc.setFontSize(size); doc.setTextColor(...rgb);
    };
    const tC = (t: string, cx: number, yy: number) => doc.text(t, cx, yy, { align: "center" });
    const tR = (t: string, rx: number, yy: number) => doc.text(t, rx, yy, { align: "right" });
    const tL = (t: string, lx: number, yy: number) => doc.text(t, lx, yy);

    const fillRect = (x: number, yy: number, w: number, h: number, fill: RGB, r = 3) => {
      doc.setFillColor(...fill);
      if (r > 0) doc.roundedRect(x, yy, w, Math.max(h, 0.5), r, r, "F");
      else doc.rect(x, yy, w, Math.max(h, 0.5), "F");
    };

    const strokeRect = (x: number, yy: number, w: number, h: number, _fill: RGB, stroke: RGB, lw = 0.4, r = 3) => {
      doc.setFillColor(255, 255, 255);
      doc.setDrawColor(...stroke);
      doc.setLineWidth(lw);
      if (r > 0) doc.roundedRect(x, yy, w, Math.max(h, 0.5), r, r, "FD");
      else doc.rect(x, yy, w, Math.max(h, 0.5), "FD");
    };

    const bar = (x: number, yy: number, w: number, pct: number, rgb: RGB, h = 4) => {
      doc.setFillColor(...C.g200);
      doc.roundedRect(x, yy, w, h, h / 2, h / 2, "F");
      const filled = w * clamp(pct, 0, 100) / 100;
      if (filled >= 1) {
        doc.setFillColor(...rgb);
        doc.roundedRect(x, yy, filled, h, h / 2, h / 2, "F");
      }
    };

    const divLine = (yy: number, col: RGB = C.g300, lw = 0.3) => {
      doc.setDrawColor(...col); doc.setLineWidth(lw);
      doc.line(M, yy, M + CW, yy);
    };

    const textBlock = (lines: string[], x: number, startY: number, lh: number) => {
      lines.forEach((ln, i) => tL(ln, x, startY + i * lh));
    };

    // ── Internal page header ──────────────────────────────────────────────────
    const drawInternalHdr = (title: string, isNewSection: boolean) => {
      doc.setFillColor(255, 255, 255); doc.rect(0, 0, PW, 16, "F");
      doc.setFillColor(...C.navy); doc.rect(0, 0, 4, 16, "F");
      doc.setFillColor(...C.gold); doc.rect(0, 15, PW, 0.8, "F");
      doc.setDrawColor(...C.g300); doc.setLineWidth(0.3); doc.line(0, 15.8, PW, 15.8);
      sf("bold", F.small, C.navy);
      tL(isNewSection ? title : `${title} (continued)`, M + 2, 11);
      sf("normal", F.caption, C.g600);
      tR(`${trunc(student.name, 28)} · ${student.grade === "NEET" ? "NEET" : `Grade ${student.grade}`}`, PW - M, 11);
      if (logoB64) doc.addImage(logoB64, "JPEG", PW / 2 - 6, 1.5, 12, 12);
      y = 23;
    };

    // FIX: Added white background fill on every new page so content never
    // renders on a transparent/grey background in overflow pages.
    const newPage = (explicit = false) => {
      doc.addPage();
      doc.setFillColor(255, 255, 255);
      doc.rect(0, 0, PW, PH, "F");
      drawInternalHdr(currentPageTitle, explicit);
    };

    const checkSp = (needed: number) => {
      if (y + needed > SAFE_B) newPage(false);
    };

    // ── Section header — with optional minimum-content guard to prevent orphans.
    // Pass minContent to ensure heading + first content block fit together.
    const secHdr = (title: string, sub = "", minContent = 0) => {
      checkSp(20 + minContent);
      doc.setFillColor(255, 255, 255); doc.rect(M, y, CW, 13, "F");
      doc.setFillColor(...C.navy); doc.rect(M, y, 3.5, 11, "F");
      doc.setFillColor(...C.gold); doc.rect(M, y + 9, 3.5, 2, "F");
      sf("bold", F.h3, C.navy); tL(title, M + 8, y + 8);
      if (sub) { sf("normal", F.caption, C.g500); tR(sub, M + CW, y + 8); }
      divLine(y + 13, C.g300, 0.3);
      y += 18;
    };

    // ── Pre-compute data ──────────────────────────────────────────────────────
    const totalResp   = result.responses.length;
    const correctAns  = result.responses.filter(r => r.isCorrect).length;
    const incorrectCt = totalResp - correctAns;
    const overallAcc  = result.skillScores.length
      ? Math.round(result.skillScores.reduce((s, sk) => s + sk.accuracy, 0) / result.skillScores.length) : 0;
    const avgTimePerQ = totalResp
      ? Math.round(result.responses.reduce((s, r) => s + r.timeTaken, 0) / totalResp) : 0;
    const totalMins   = Math.floor(result.totalTime / 60);
    const totalSecs   = result.totalTime % 60;
    const greenCount  = result.skillScores.filter(s => s.level === "green").length;
    const yellowCount = result.skillScores.filter(s => s.level === "yellow").length;
    const redCount    = result.skillScores.filter(s => s.level === "red").length;

    const engScores  = result.skillScores.filter(s => s.skillCode.startsWith("E"));
    const mathScores = result.skillScores.filter(s => s.skillCode.startsWith("M"));
    const sciScores  = result.skillScores.filter(s => s.skillCode.startsWith("S"));
    const subjAvg    = (arr: SkillScore[]) =>
      arr.length ? Math.round(arr.reduce((a, b) => a + b.accuracy, 0) / arr.length) : 0;

    const lm = LEARNER_META[result.learnerType] ?? DEFAULT_META;
    const accColor: RGB = overallAcc >= 70 ? C.green : overallAcc >= 40 ? C.amber : C.red;

    const errorTags = result.responses
      .filter(r => !r.isCorrect)
      .reduce((acc, r) => {
        if (r.errorTag && r.errorTag !== "none") acc[r.errorTag] = (acc[r.errorTag] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

    let logoB64: string | null = null;
    try { logoB64 = await loadImageAsBase64(LOGO_PATH); } catch { /* non-fatal */ }

    // ════════════════════════════════════════════════════════════════════════════
    // PAGE 1 — COVER / SUMMARY
    // ════════════════════════════════════════════════════════════════════════════
    currentPageTitle = "Summary";

    doc.setFillColor(255, 255, 255); doc.rect(0, 0, PW, PH, "F");

    doc.setFillColor(...C.navy);   doc.rect(0, 0, PW, 62, "F");
    doc.setFillColor(...C.navyDk); doc.rect(0, 54, PW, 8, "F");
    doc.setFillColor(...C.gold);   doc.rect(0, 62, PW, 2, "F");

    if (logoB64) doc.addImage(logoB64, "JPEG", M, 10, 26, 26);
    const tX = logoB64 ? M + 32 : M;

    sf("bold", F.hero, C.white);
    tL("ARK Diagnostic Assessment", tX, 24);
    sf("normal", F.h2, C.gold);
    tL("NEP-Aligned Skill Mapping Report", tX, 34);
    sf("normal", F.small, [210, 220, 235] as RGB);
    tL(`Assessment Date: ${completedAt.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}`, tX, 44);
    if (student.school) {
      sf("normal", F.caption, [180, 195, 215] as RGB);
      tR(trunc(student.school, 36), PW - M, 57);
    }

    y = 72;

    // ── Student info + Score card ─────────────────────────────────────────────
    const infoW = CW * 0.63, scoreX = M + infoW + 5, scoreW = CW - infoW - 5;
    const cardH = 34;

    strokeRect(M, y, infoW, cardH, C.white, C.navy, 0.5, 3);
    sf("bold", F.h2, C.navy);      tL(trunc(student.name, 28), M + 8, y + 11);
    sf("normal", F.small, C.g600); tL(student.grade === "NEET" ? "NEET" : `Grade ${student.grade}`, M + 8, y + 19);
    if (student.school) { sf("normal", F.caption, C.g600); tL(trunc(student.school, 36), M + 8, y + 27); }
    sf("normal", F.caption, C.g500); tL(`Report generated: ${completedAt.toLocaleDateString("en-IN")}`, M + 8, y + 33);

    strokeRect(scoreX, y, scoreW, cardH, C.white, accColor, 0.8, 3);
    sf("bold", 30, accColor);           tC(`${overallAcc}%`, scoreX + scoreW / 2, y + 18);
    sf("bold", F.small, accColor);      tC("Overall Accuracy", scoreX + scoreW / 2, y + 26);
    sf("normal", F.caption, C.g600);    tC(`${correctAns} of ${totalResp} correct`, scoreX + scoreW / 2, y + 32);
    y += cardH + 8;

    // ── Stat boxes ────────────────────────────────────────────────────────────
    const sg = 3, sbW = (CW - sg * 4) / 5;
    const stats = [
      { val: `${totalMins}m ${totalSecs}s`, lbl: "Total Time",    accent: C.navy    },
      { val: `${correctAns}/${totalResp}`,  lbl: "Correct",       accent: C.green   },
      { val: `${result.skillScores.length}`,lbl: "Skills Tested", accent: C.navyLt  },
      { val: `${avgTimePerQ}s`,             lbl: "Avg per Q",     accent: C.purple  },
      { val: `${greenCount}/${result.skillScores.length}`, lbl: "Proficient", accent: C.teal },
    ];
    stats.forEach((st, i) => {
      const bx = M + i * (sbW + sg);
      strokeRect(bx, y, sbW, 22, C.white, C.navy, 0.35, 2);
      doc.setFillColor(...st.accent as RGB);
      doc.roundedRect(bx, y, sbW, 2, 1, 1, "F");
      sf("bold", F.h3, st.accent as RGB); tC(st.val, bx + sbW / 2, y + 13);
      sf("normal", F.caption, C.g700);    tC(st.lbl, bx + sbW / 2, y + 20);
    });
    y += 28;

    // ── Learner profile banner ────────────────────────────────────────────────
    sf("normal", F.body, C.g800);
    const detLines = doc.splitTextToSize(lm.detail, CW - 24);
    const bannerH  = 32 + detLines.length * LH(F.body);
    checkSp(bannerH + 4);

    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(...C.navy);
    doc.setLineWidth(0.5);
    doc.roundedRect(M, y, CW, bannerH, 3, 3, "FD");
    doc.setFillColor(...C.navy); doc.rect(M, y, 3.5, bannerH, "F");
    doc.setFillColor(...C.gold); doc.rect(M, y + bannerH - 2, 3.5, 2, "F");

    sf("bold", F.h3, C.navy);
    tL(lm.label, M + 9, y + 12);
    sf("italic", F.small, C.g600);
    tL(lm.tagline, M + 9, y + 21);
    divLine(y + 24, C.g300, 0.25);
    sf("normal", F.body, C.g800);
    textBlock(detLines, M + 9, y + 30, LH(F.body));
    y += bannerH + 8;

    // ── 3 skill-status summary boxes ─────────────────────────────────────────
    const smGap = 4, smW = (CW - smGap * 2) / 3;
    checkSp(28);
    [
      { lbl: "Proficient",  n: greenCount,  fg: C.green,  dk: C.greenDk },
      { lbl: "Developing",  n: yellowCount, fg: C.amber,  dk: C.amberDk },
      { lbl: "Needs Focus", n: redCount,    fg: C.red,    dk: C.redDk   },
    ].forEach((sm, i) => {
      const bx = M + i * (smW + smGap);
      strokeRect(bx, y, smW, 24, C.white, sm.fg as RGB, 0.6, 3);
      sf("bold", 22, sm.dk as RGB);         tC(`${sm.n}`, bx + smW / 2, y + 14);
      sf("bold", F.caption, sm.dk as RGB);  tC(sm.lbl,    bx + smW / 2, y + 21);
    });
    y += 30;

    // ── Subject overview ──────────────────────────────────────────────────────
    // FIX: pass minContent so heading doesn't orphan if subject rows won't fit
    const subjectRowH = 14;
    const subjectCount = [engScores, mathScores, sciScores].filter(s => s.length > 0).length;
    secHdr("SUBJECT-WISE PERFORMANCE", "", subjectCount * subjectRowH);

    [
      { lbl: "English",     scores: engScores  },
      { lbl: "Mathematics", scores: mathScores },
      { lbl: "Science",     scores: sciScores  },
    ].forEach(({ lbl, scores }) => {
      if (!scores.length) return;
      const avg  = subjAvg(scores);
      const aCol: RGB = avg >= 70 ? C.green : avg >= 40 ? C.amber : C.red;
      checkSp(subjectRowH);

      sf("bold", F.small, C.navy);     tL(lbl, M, y + 7);
      sf("normal", F.caption, C.g600); tL(`${scores.length} skills`, M + 28, y + 7);
      bar(M + 50, y + 3, CW - 74, avg, aCol, 5);

      strokeRect(PW - M - 22, y + 1, 20, 9, C.white, aCol, 0.5, 2);
      sf("bold", F.caption, aCol); tC(`${avg}%`, PW - M - 12, y + 7.5);

      divLine(y + 13, C.g200, 0.2);
      y += subjectRowH;
    });
    y += 4;

    // ════════════════════════════════════════════════════════════════════════════
    // PAGE 2 — VISUAL ANALYTICS
    // ════════════════════════════════════════════════════════════════════════════
    doc.addPage();
    doc.setFillColor(255, 255, 255); doc.rect(0, 0, PW, PH, "F");
    currentPageTitle = "Visual Analytics";
    drawInternalHdr(currentPageTitle, true);

    // ── Donut gauge helper ────────────────────────────────────────────────────
    const drawDonut = (cx: number, cy: number, oR: number, iR: number, pct: number, label: string, sub: string) => {
      const buildArc = (from: number, to: number, r1: number, r2: number) => {
        const pts: { x: number; y: number }[] = [];
        const steps = Math.max(30, Math.round(Math.abs(to - from) * 80));
        for (let i = 0; i <= steps; i++) { const a = from + (to - from) * i / steps; pts.push({ x: cx + r1 * Math.cos(a), y: cy + r1 * Math.sin(a) }); }
        for (let i = steps; i >= 0; i--) { const a = from + (to - from) * i / steps; pts.push({ x: cx + r2 * Math.cos(a), y: cy + r2 * Math.sin(a) }); }
        return pts;
      };
      const drawArc = (pts: { x: number; y: number }[], fill: RGB) => {
        const segs: [number, number][] = pts.slice(1).map((p, i) => [p.x - pts[i].x, p.y - pts[i].y] as [number, number]);
        doc.setFillColor(...fill);
        doc.lines(segs, pts[0].x, pts[0].y, [1, 1], "F", true);
      };
      const SA = -Math.PI, EA = 0;
      drawArc(buildArc(SA, EA, oR, iR), C.g200);
      const col: RGB = pct >= 70 ? C.green : pct >= 40 ? C.amber : C.red;
      if (pct > 0) drawArc(buildArc(SA, SA + (EA - SA) * clamp(pct, 0, 100) / 100, oR, iR), col);
      sf("bold", F.h3, col); tC(label, cx, cy + 2);
      sf("normal", F.caption, C.g600); tC(sub, cx, cy + 8);
    };

    // ── Skill heatmap ─────────────────────────────────────────────────────────
    // FIX: pass minContent so heading + at least first row stay together
    const hmCols = 4, hmGap = 3;
    const hmCellW = (CW - hmGap * (hmCols - 1)) / hmCols;
    const hmCellH = 18;
    const numHmRows = Math.ceil(result.skillScores.length / hmCols);
    secHdr("SKILL HEATMAP", "All assessed skills at a glance", hmCellH + 3);

    for (let row = 0; row < numHmRows; row++) {
      checkSp(hmCellH + 3);
      for (let col2 = 0; col2 < hmCols; col2++) {
        const idx = row * hmCols + col2;
        if (idx >= result.skillScores.length) break;
        const sk  = result.skillScores[idx];
        const bx  = M + col2 * (hmCellW + hmGap);
        const fg  = levelRGB(sk.level);
        const dk  = levelDkRGB(sk.level);

        strokeRect(bx, y, hmCellW, hmCellH, C.white, fg, 0.5, 2);
        doc.setFillColor(...fg); doc.rect(bx, y, 2.5, hmCellH, "F");

        sf("bold", F.small, dk);        tL(sk.skillCode, bx + 6, y + 7);
        sf("normal", F.small, C.g700);  tL(trunc(getSkillName(sk.skillCode), 19), bx + 6, y + 13);
        sf("bold", F.small, dk);        tR(`${sk.accuracy}%`, bx + hmCellW - 4, y + 7);
      }
      y += hmCellH + (row < numHmRows - 1 ? hmGap : 0);
    }
    y += 10;

    // ── Accuracy gauges ───────────────────────────────────────────────────────
    const gH = 42, gW = CW / 4;
    secHdr("ACCURACY GAUGES", "Subject vs Overall", gH + 6);

    checkSp(gH + 6);
    [
      { lbl: "English",     avg: subjAvg(engScores),  sub: `${engScores.length} skills`          },
      { lbl: "Mathematics", avg: subjAvg(mathScores), sub: `${mathScores.length} skills`         },
      { lbl: "Science",     avg: subjAvg(sciScores),  sub: `${sciScores.length} skills`          },
      { lbl: "Overall",     avg: overallAcc,           sub: `${result.skillScores.length} total` },
    ].forEach(({ lbl, avg, sub }, gi) => {
      const gcx = M + gi * gW + gW / 2;
      const gcy = y + gH * 0.42;
      strokeRect(M + gi * gW + 1, y, gW - 2, gH, C.white, C.g300, 0.3, 2);
      drawDonut(gcx, gcy, 14, 9, avg, `${avg}%`, lbl);
      sf("normal", F.caption, C.g600); tC(sub, gcx, y + gH - 2);
    });
    y += gH + 8;

    // ════════════════════════════════════════════════════════════════════════════
    // PAGE 3 — DETAILED SKILL BREAKDOWN
    // ════════════════════════════════════════════════════════════════════════════
    doc.addPage();
    doc.setFillColor(255, 255, 255); doc.rect(0, 0, PW, PH, "F");
    currentPageTitle = "Detailed Skill Breakdown";
    drawInternalHdr(currentPageTitle, true);

    const drawSkillTable = (skills: SkillScore[], subLabel: string, subCol: RGB) => {
      if (!skills.length) return;
      // FIX: reserve space for sub-header + column header + at least one data row
      checkSp(40);

      fillRect(M, y, CW, 10, subCol, 2);
      doc.setFillColor(...C.gold); doc.rect(M, y, 3.5, 10, "F");
      sf("bold", F.h3, C.white);   tL(subLabel, M + 8, y + 7.5);
      sf("normal", F.caption, [220, 220, 220] as RGB); tR(`${skills.length} skills assessed`, M + CW - 4, y + 7.5);
      y += 13;

      // Column headers
      fillRect(M, y, CW, 9, C.g100, 0);
      divLine(y, C.g300, 0.35);
      sf("bold", F.small, C.g800);
      tL("Code",        M + 4,   y + 6);
      tL("Skill",       M + 22,  y + 6);
      tL("Description", M + 60,  y + 6);
      tC("Accuracy",    M + 122, y + 6);
      tC("Avg Time",    M + 143, y + 6);
      tC("Status",      M + 164, y + 6);
      divLine(y + 9, C.g300, 0.35);
      y += 11;

      skills.forEach((sk, idx) => {
        const nm  = getSkillName(sk.skillCode);
        const dsc = getSkillDesc(sk.skillCode);
        const fg  = levelRGB(sk.level);
        const dk  = levelDkRGB(sk.level);

        sf("normal", F.small, C.g700);
        const descLines = doc.splitTextToSize(dsc || "—", 48);
        const ROW_H = Math.max(16, 6 + descLines.length * LH(F.small) + 6);
        checkSp(ROW_H + 2);

        if (idx % 2 === 1) fillRect(M, y, CW, ROW_H, C.g100, 0);
        else { doc.setFillColor(255, 255, 255); doc.rect(M, y, CW, ROW_H, "F"); }

        fillRect(M + 2, y + (ROW_H - 8) / 2, 17, 8, C.navy, 2);
        sf("bold", F.caption, C.white);
        tC(sk.skillCode, M + 10.5, y + (ROW_H - 8) / 2 + 5.5);

        sf("bold", F.small, C.navy);    tL(trunc(nm, 20), M + 22, y + ROW_H * 0.38);
        sf("bold", F.small, dk);        tL(levelLabel(sk.level), M + 22, y + ROW_H * 0.68);

        sf("normal", F.small, C.g700);
        textBlock(descLines.slice(0, 3), M + 60, y + ROW_H * 0.28, LH(F.small));

        sf("bold", F.small, dk); tC(`${sk.accuracy}%`, M + 122, y + ROW_H * 0.46);
        bar(M + 113, y + ROW_H * 0.58, 18, sk.accuracy, fg, 2.5);

        const tCol: RGB = sk.avgTime > 60 ? C.red : sk.avgTime > 30 ? C.amber : C.green;
        const tDk: RGB  = sk.avgTime > 60 ? C.redDk : sk.avgTime > 30 ? C.amberDk : C.greenDk;
        strokeRect(M + 135, y + (ROW_H - 8) / 2, 16, 8, C.white, tDk, 0.4, 2);
        sf("bold", F.caption, tDk);
        tC(`${Math.round(sk.avgTime)}s`, M + 143, y + (ROW_H - 8) / 2 + 5.5);

        strokeRect(M + 149, y + (ROW_H - 10) / 2, 30, 10, C.white, fg, 0.5, 2);
        sf("bold", 8.5, dk);
        tC(levelLabel(sk.level), M + 164, y + (ROW_H - 10) / 2 + 6.8);

        divLine(y + ROW_H, C.g200, 0.18);
        y += ROW_H;
      });
      y += 8;
    };

    drawSkillTable(engScores,  "ENGLISH SKILLS",     C.navy);
    drawSkillTable(mathScores, "MATHEMATICS SKILLS", C.navy);
    drawSkillTable(sciScores,  "SCIENCE SKILLS",     C.navy);

    // ════════════════════════════════════════════════════════════════════════════
    // PAGE 4 — ERROR ANALYSIS & COACHING
    // ════════════════════════════════════════════════════════════════════════════
    doc.addPage();
    doc.setFillColor(255, 255, 255); doc.rect(0, 0, PW, PH, "F");
    currentPageTitle = "Error Analysis & Coaching";
    drawInternalHdr(currentPageTitle, true);

    // ── Time analysis ─────────────────────────────────────────────────────────
    const timeSorted = [...result.skillScores].sort((a, b) => b.avgTime - a.avgTime).slice(0, 6);
    secHdr("RESPONSE TIME ANALYSIS", "Slowest skills by average seconds per question", 12);

    const maxT = Math.max(...timeSorted.map(s => s.avgTime), 1);
    timeSorted.forEach(sk => {
      checkSp(12);
      const pctT = (sk.avgTime / maxT) * 100;
      const tCol: RGB = sk.avgTime > 60 ? C.red : sk.avgTime > 30 ? C.amber : C.green;
      const tDk: RGB  = sk.avgTime > 60 ? C.redDk : sk.avgTime > 30 ? C.amberDk : C.greenDk;
      sf("bold", F.small, C.navy);    tL(sk.skillCode, M, y + 5.5);
      sf("normal", F.small, C.g700);  tL(trunc(getSkillName(sk.skillCode), 26), M + 14, y + 5.5);
      bar(M + 72, y + 1.5, CW - 94, pctT, tCol, 5);
      strokeRect(PW - M - 18, y + 0.5, 16, 7, C.white, tDk, 0.4, 2);
      sf("bold", F.caption, tDk);  tC(`${Math.round(sk.avgTime)}s`, PW - M - 10, y + 6);
      divLine(y + 10, C.g200, 0.2);
      y += 11;
    });
    y += 6;

    // ── Error pattern analysis ────────────────────────────────────────────────
    const sortedErrors = Object.entries(errorTags)
      .filter(([k]) => ERROR_DEFS[k])
      .sort(([, a], [, b]) => b - a);

    // Estimate first error box height for orphan prevention
    const firstErrH = sortedErrors.length > 0 ? (() => {
      const def = ERROR_DEFS[sortedErrors[0][0]];
      const descL = doc.splitTextToSize(def.desc, CW - 22);
      const suggL = doc.splitTextToSize(`Coaching Tip: ${def.suggestion}`, CW - 22);
      return 14 + descL.length * LH(F.body) + 4 + suggL.length * LH(F.body) + 10;
    })() : 20;

    secHdr(
      "ERROR PATTERN ANALYSIS",
      `${incorrectCt} incorrect · ${correctAns} correct · ${totalResp} total`,
      firstErrH + 4
    );

    if (incorrectCt === 0) {
      strokeRect(M, y, CW, 16, C.white, C.green, 0.5, 2);
      doc.setFillColor(...C.green); doc.rect(M, y, 3.5, 16, "F");
      sf("bold", F.h3, C.greenDk); tL("Perfect score — no incorrect responses!", M + 9, y + 10);
      y += 22;
    } else if (sortedErrors.length === 0) {
      strokeRect(M, y, CW, 20, C.white, C.amber, 0.5, 2);
      doc.setFillColor(...C.amber); doc.rect(M, y, 3.5, 20, "F");
      sf("bold", F.small, C.amberDk);  tL(`${incorrectCt} incorrect response(s) recorded.`, M + 9, y + 9);
      sf("normal", F.small, C.g700);   tL("Error pattern tags were not captured for these responses.", M + 9, y + 16);
      y += 26;
    } else {
      sortedErrors.forEach(([tag, count]) => {
        const def   = ERROR_DEFS[tag];
        const pct   = totalResp ? Math.round((count / totalResp) * 100) : 0;
        const descL = doc.splitTextToSize(def.desc, CW - 22);
        const suggL = doc.splitTextToSize(`Coaching Tip: ${def.suggestion}`, CW - 22);
        const boxH  = 14 + descL.length * LH(F.body) + 4 + suggL.length * LH(F.body) + 10;
        checkSp(boxH + 4);

        strokeRect(M, y, CW, boxH, C.white, def.color, 0.5, 2);
        doc.setFillColor(...def.color); doc.rect(M, y, 3.5, boxH, "F");
        sf("bold", F.h3, def.color); tL(def.label, M + 9, y + 11);

        strokeRect(M + CW - 44, y + 4, 18, 8, C.white, C.g400, 0.3, 2);
        sf("bold", F.caption, C.g700); tC(`${pct}%`, M + CW - 35, y + 9.5);
        strokeRect(M + CW - 24, y + 4, 20, 8, C.white, def.color, 0.4, 2);
        sf("bold", F.caption, def.color); tC(`${count}x`, M + CW - 14, y + 9.5);

        sf("normal", F.body, C.g800);
        textBlock(descL, M + 9, y + 16, LH(F.body));

        const suggY = y + 16 + descL.length * LH(F.body) + 4;
        sf("italic", F.body, def.color);
        textBlock(suggL, M + 9, suggY, LH(F.body));

        const barY = y + boxH - 7;
        fillRect(M + 9, barY, CW - 18, 3.5, C.g200, 1);
        const fillW = clamp((CW - 18) * pct / 100, 1, CW - 18);
        fillRect(M + 9, barY, fillW, 3.5, def.color, 1);

        y += boxH + 5;
      });
    }
    y += 4;

    // ── Priority interventions ────────────────────────────────────────────────
    const redList = result.skillScores.filter(s => s.level === "red");
    if (redList.length > 0) {
      const firstRedH = (() => {
        const dLines = doc.splitTextToSize(getSkillDesc(redList[0].skillCode) || "No description available.", CW - 22);
        return Math.max(22, 14 + dLines.length * LH(F.body) + 6);
      })();
      secHdr("PRIORITY INTERVENTIONS", `${redList.length} skill(s) with foundation gaps`, firstRedH + 4);

      redList.forEach(sk => {
        const desc   = getSkillDesc(sk.skillCode) || "No description available.";
        const dLines = doc.splitTextToSize(desc, CW - 22);
        const boxH   = Math.max(22, 14 + dLines.length * LH(F.body) + 6);
        checkSp(boxH + 4);

        strokeRect(M, y, CW, boxH, C.white, C.red, 0.5, 2);
        doc.setFillColor(...C.red); doc.rect(M, y, 3.5, boxH, "F");
        sf("bold", F.h3, C.redDk);
        tL(`${sk.skillCode} — ${trunc(getSkillName(sk.skillCode), 38)}`, M + 9, y + 10);
        strokeRect(M + CW - 24, y + 4, 20, 9, C.white, C.red, 0.4, 2);
        sf("bold", F.small, C.red); tC(`${sk.accuracy}%`, M + CW - 14, y + 10.5);
        sf("normal", F.body, C.redDk);
        textBlock(dLines, M + 9, y + 16, LH(F.body));
        y += boxH + 3;
      });
      y += 4;
    }

    // ── Skills needing support ────────────────────────────────────────────────
    const yellList = result.skillScores.filter(s => s.level === "yellow");
    if (yellList.length > 0) {
      const halfW = (CW - 4) / 2;
      const ROW_H = 15;
      secHdr("SKILLS NEEDING SUPPORT", `${yellList.length} skill(s) in developing stage`, ROW_H + 2);

      for (let i = 0; i < yellList.length; i += 2) {
        checkSp(ROW_H + 2);
        for (let col = 0; col < 2; col++) {
          const sk = yellList[i + col];
          if (!sk) break;
          const bx = M + col * (halfW + 4);
          strokeRect(bx, y, halfW, ROW_H, C.white, C.amber, 0.5, 2);
          doc.setFillColor(...C.amber); doc.rect(bx, y, 3.5, ROW_H, "F");
          sf("bold", F.small, C.amberDk);
          tL(`${sk.skillCode} — ${trunc(getSkillName(sk.skillCode), 18)}`, bx + 7, y + 7);
          bar(bx + 7, y + 10, halfW - 34, sk.accuracy, C.amber, 3);
          strokeRect(bx + halfW - 24, y + 4, 20, 8, C.white, C.amber, 0.4, 2);
          sf("bold", F.caption, C.amberDk); tC(`${sk.accuracy}%`, bx + halfW - 14, y + 9.5);
        }
        y += ROW_H + 2;
      }
      y += 4;
    }

    // ── Proficient skills ─────────────────────────────────────────────────────
    const greenList = result.skillScores.filter(s => s.level === "green");
    if (greenList.length > 0) {
      const halfW = (CW - 4) / 2;
      const ROW_H = 14;
      secHdr("STRENGTHS & PROFICIENT SKILLS", `${greenList.length} skill(s) performing well`, ROW_H + 2);

      for (let i = 0; i < greenList.length; i += 2) {
        checkSp(ROW_H + 2);
        for (let col = 0; col < 2; col++) {
          const sk = greenList[i + col];
          if (!sk) break;
          const bx = M + col * (halfW + 4);
          strokeRect(bx, y, halfW, ROW_H, C.white, C.green, 0.5, 2);
          doc.setFillColor(...C.green); doc.rect(bx, y, 3.5, ROW_H, "F");
          sf("bold", F.small, C.greenDk);
          tL(`${sk.skillCode} — ${trunc(getSkillName(sk.skillCode), 18)}`, bx + 7, y + 6.5);
          sf("normal", F.caption, C.g600);
          tL(`${sk.accuracy}% accuracy · ${Math.round(sk.avgTime)}s avg`, bx + 7, y + 11.5);
        }
        y += ROW_H + 2;
      }
      y += 4;
    }

    // ── Coaching recommendations ──────────────────────────────────────────────
    if (result.recommendations?.length) {
      const firstRecLines = doc.splitTextToSize(result.recommendations[0], CW - 28);
      const firstRecH = 8 + firstRecLines.length * LH(F.body) + 6;
      secHdr("PERSONALISED COACHING RECOMMENDATIONS", "", firstRecH + 4);

      result.recommendations.forEach((rec, i) => {
        const lines = doc.splitTextToSize(rec, CW - 28);
        const boxH  = 8 + lines.length * LH(F.body) + 6;
        checkSp(boxH + 4);

        strokeRect(M, y, CW, boxH, C.white, C.g300, 0.3, 2);
        doc.setFillColor(...C.navy); doc.circle(M + 9, y + boxH / 2, 5.5, "F");
        sf("bold", F.small, C.white); tC(`${i + 1}`, M + 9, y + boxH / 2 + 3);
        sf("normal", F.body, C.g800);
        textBlock(lines, M + 20, y + 8 + LH(F.body), LH(F.body));
        y += boxH + 4;
      });
      y += 2;
    }

    // ── Retest schedule ───────────────────────────────────────────────────────
    const retestMsg = result.learnerType === "foundation-risk"
      ? "ALERT: Mandatory retest recommended in 30 days after targeted remediation and teacher-guided intervention."
      : result.learnerType === "practice-dependent"
      ? "Retest recommended in 60 days. Focus practice on identified yellow and red skill areas first."
      : "Strong performance! Schedule a progress retest in 60–90 days to track continued advancement.";

    const rtLines = doc.splitTextToSize(retestMsg, CW - 16);
    const rtH     = 14 + rtLines.length * LH(F.body) + 6;
    checkSp(rtH + 4);
    fillRect(M, y, CW, rtH, C.navy, 3);
    doc.setFillColor(...C.gold); doc.rect(M, y, 3.5, rtH, "F");
    sf("bold", F.h3, C.gold);  tL("Recommended Retest Schedule", M + 9, y + 11);
    sf("normal", F.body, [210, 220, 230] as RGB);
    textBlock(rtLines, M + 9, y + 18, LH(F.body));

    // ════════════════════════════════════════════════════════════════════════════
    // FOOTER — stamp on every page
    // ════════════════════════════════════════════════════════════════════════════
    const pageCount = doc.getNumberOfPages();
    for (let pg = 1; pg <= pageCount; pg++) {
      doc.setPage(pg);
      doc.setFillColor(...C.navyDk); doc.rect(0, PH - FOOTER, PW, FOOTER, "F");
      doc.setFillColor(...C.gold);   doc.rect(0, PH - FOOTER, PW, 0.6, "F");

      sf("normal", F.caption, [180, 195, 215] as RGB);
      tC("ARK Diagnostic Assessment  ·  NEP 2020 Aligned  ·  Confidential — For Authorised Educator Use Only", PW / 2, PH - 3.5);

      fillRect(PW - M - 20, PH - FOOTER + 1.5, 18, 7, C.gold, 2);
      sf("bold", F.caption, C.navyDk); tC(`${pg} / ${pageCount}`, PW - M - 11, PH - 3.5);
    }

    // ── Save ──────────────────────────────────────────────────────────────────
    const dateStr  = completedAt.toISOString().split("T")[0];
    const fileName = `ARK_Report_${student.name.replace(/\s+/g, "_")}_Grade${student.grade}_${dateStr}.pdf`;
    doc.save(fileName);
    console.log("PDF saved:", fileName);

  } catch (err) {
    console.error("PDF generation error:", err);
    throw err;
  }
};