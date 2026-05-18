export type StartupAnalysis = {
  bsScore: number;
  viabilityScore: number;
  redundancyScore: number;
  timeWasteRisk: "Low" | "Medium" | "High" | "Extreme";
  verdict: string;
  translation: string;
  reasons: string[];
  betterVersion: string;
  nextMove: string;
};

type Signal = {
  label: string;
  points: number;
  reason?: string;
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function pctFromPenalty(penalty: number) {
  return clamp(Math.round(100 - penalty), 0, 100);
}

function toRisk(v: number): StartupAnalysis["timeWasteRisk"] {
  if (v >= 78) return "Extreme";
  if (v >= 55) return "High";
  if (v >= 32) return "Medium";
  return "Low";
}

function normalize(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s$%.-]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function hasAny(t: string, phrases: string[]) {
  return phrases.some((p) => t.includes(p));
}

export function analyzeStartupIdea(input: string): StartupAnalysis {
  const raw = input ?? "";
  const text = normalize(raw);

  if (!text) {
    return {
      bsScore: 0,
      viabilityScore: 0,
      redundancyScore: 0,
      timeWasteRisk: "Extreme",
      verdict: "No idea provided.",
      translation:
        "You gave me nothing. If you can’t describe it in one sentence, you can’t validate it.",
      reasons: ["Empty input."],
      betterVersion:
        "Write one sentence: buyer + painful moment + what you replace + why you’re different.",
      nextMove:
        "Paste a single sentence describing the idea. Include buyer + pain + why they pay.",
    };
  }

  const reasons: string[] = [];

  const vagueSignals: Signal[] = [];
  const crowdSignals: Signal[] = [];
  const viabilitySignals: Signal[] = [];
  const edgeSignals: Signal[] = [];

  const vagueWords = [
    "platform",
    "community",
    "ecosystem",
    "solution",
    "seamless",
    "next-gen",
    "revolutionize",
    "disrupt",
    "empower",
    "innovative",
    "synergy",
    "ai-powered",
    "powered by ai",
    "agentic",
    "web3",
    "blockchain",
  ];

  const crowdedBuckets: Array<{ key: string; points: number; label: string }> = [
    { key: "ai wrapper", points: 22, label: "AI wrapper vibes" },
    { key: "marketplace", points: 18, label: "Marketplace (hard mode)" },
    { key: "social", points: 18, label: "Social app" },
    { key: "to-do", points: 20, label: "To-do / habit app" },
    { key: "crm", points: 18, label: "CRM / sales tooling" },
    { key: "dating", points: 18, label: "Dating" },
    { key: "job board", points: 18, label: "Job board" },
    { key: "newsletter", points: 14, label: "Newsletter / content product" },
    { key: "budgeting", points: 16, label: "Budgeting / finance tracker" },
  ];

  const crowdedTriggers: Array<[string, string[]]> = [
    ["ai wrapper", ["wrapper", "chatgpt", "llm", "prompt", "agent", "ai assistant"]],
    ["marketplace", ["marketplace", "two-sided", "buyers and sellers"]],
    ["social", ["social", "friends", "followers", "feed", "community"]],
    ["to-do", ["todo", "to-do", "habit", "planner", "notes app", "note taking"]],
    ["crm", ["crm", "sales pipeline", "leads", "outreach"]],
    ["dating", ["dating", "match", "swipe"]],
    ["job board", ["job board", "jobs marketplace", "hiring marketplace"]],
    ["newsletter", ["newsletter", "creator", "substack"]],
    ["budgeting", ["budget", "expense tracker", "personal finance"]],
  ];

  const buyerTerms = [
    "buyers",
    "customer",
    "customers",
    "teams",
    "companies",
    "founders",
    "operators",
    "investors",
    "accelerators",
    "studios",
    "agencies",
    "devs",
    "developers",
    "sales",
    "recruiters",
    "doctors",
    "nurses",
    "lawyers",
    "accountants",
    "landlords",
  ];

  const painTerms = [
    "pain",
    "frustrating",
    "broken",
    "waste",
    "wasting",
    "slow",
    "error",
    "risk",
    "compliance",
    "churn",
    "downtime",
    "cost",
    "expensive",
    "losing",
    "late",
    "manual",
    "spreadsheet",
    "copy paste",
    "copy-paste",
    "mess",
    "chaos",
  ];

  const revenueTerms = [
    "$",
    "pricing",
    "pay",
    "paid",
    "revenue",
    "subscription",
    "per seat",
    "contract",
    "pilot",
    "invoice",
    "budget",
    "roi",
  ];

  const edgeTerms = [
    "wedge",
    "unfair",
    "advantage",
    "exclusive",
    "distribution",
    "data",
    "proprietary",
    "workflow",
    "integrations",
    "compliance",
    "regulated",
    "latency",
    "10x",
    "cheaper",
    "faster",
    "better",
    "only",
    "unique",
  ];

  const problemShapeTerms = ["so that", "because", "instead of", "without", "to reduce", "to cut", "to avoid"];

  const wordCount = text.split(" ").filter(Boolean).length;
  if (wordCount < 6) {
    vagueSignals.push({
      label: "Too short to be real",
      points: 18,
      reason: "Under-specified ideas hide the buyer, pain, and wedge.",
    });
  }

  const vagueHits = vagueWords.filter((w) => text.includes(w));
  if (vagueHits.length >= 2) {
    vagueSignals.push({
      label: "Vague language",
      points: 16 + Math.min(10, vagueHits.length * 2),
      reason: `Reads like marketing fog (${vagueHits.slice(0, 4).join(", ")}).`,
    });
  } else if (vagueHits.length === 1) {
    vagueSignals.push({
      label: "Some marketing fog",
      points: 10,
      reason: `Contains vague framing (“${vagueHits[0]}”).`,
    });
  }

  const buyerMentioned = hasAny(text, buyerTerms);
  const painMentioned = hasAny(text, painTerms);
  const revenueMentioned = hasAny(text, revenueTerms);
  const edgeMentioned = hasAny(text, edgeTerms) || /(better|faster|cheaper)\b/.test(text);
  const problemShape = hasAny(text, problemShapeTerms);

  if (!buyerMentioned) {
    viabilitySignals.push({
      label: "Missing buyer",
      points: 22,
      reason: "If you can’t name who pays, you’re building for “people.”",
    });
  }
  if (!painMentioned) {
    viabilitySignals.push({
      label: "Weak pain signal",
      points: 16,
      reason: "No concrete pain, risk, or cost described.",
    });
  }
  if (!revenueMentioned) {
    viabilitySignals.push({
      label: "No payment / revenue angle",
      points: 14,
      reason: "Nothing suggests budget authority or willingness to pay.",
    });
  }
  if (!edgeMentioned) {
    edgeSignals.push({
      label: "No wedge / differentiation",
      points: 18,
      reason: "No edge stated (why you, why now, why better).",
    });
  }
  if (!problemShape) {
    viabilitySignals.push({
      label: "No causal structure",
      points: 10,
      reason: "Doesn’t connect buyer → pain → solution in a crisp way.",
    });
  }

  for (const [bucket, triggers] of crowdedTriggers) {
    if (hasAny(text, triggers)) {
      const def = crowdedBuckets.find((b) => b.key === bucket);
      if (def) crowdSignals.push({ label: def.label, points: def.points });
    }
  }

  if (/for (everyone|anyone|anybody|all)\b/.test(text) || text.includes("for everyone")) {
    vagueSignals.push({
      label: "Targets everyone",
      points: 16,
      reason: "If it’s for everyone, it’s for no one.",
    });
  }

  if (text.includes("ai") && !painMentioned && !buyerMentioned) {
    vagueSignals.push({
      label: "AI-first, problem-later",
      points: 14,
      reason: "Sounds like “AI” searching for a justification.",
    });
  }

  const redundancyPenalty = crowdSignals.reduce((s, x) => s + x.points, 0);
  const bsPenalty =
    vagueSignals.reduce((s, x) => s + x.points, 0) +
    edgeSignals.reduce((s, x) => s + x.points * 0.6, 0);
  const viabilityPenalty =
    viabilitySignals.reduce((s, x) => s + x.points, 0) +
    (redundancyPenalty > 0 ? 8 : 0) +
    (edgeMentioned ? -8 : 0) +
    (buyerMentioned ? -8 : 0) +
    (painMentioned ? -6 : 0) +
    (revenueMentioned ? -6 : 0);

  const bsScore = clamp(Math.round(bsPenalty), 0, 100);
  const redundancyScore = clamp(Math.round(redundancyPenalty), 0, 100);
  const viabilityScore = pctFromPenalty(viabilityPenalty);

  const timeWasteValue = clamp(
    Math.round(bsScore * 0.38 + redundancyScore * 0.36 + (100 - viabilityScore) * 0.42),
    0,
    100,
  );
  const timeWasteRisk = toRisk(timeWasteValue);

  const collectedReasons = [
    ...vagueSignals.map((s) => s.reason ?? s.label),
    ...crowdSignals.map((s) => s.label),
    ...viabilitySignals.map((s) => s.reason ?? s.label),
    ...edgeSignals.map((s) => s.reason ?? s.label),
  ].filter(Boolean) as string[];

  const topReasons = Array.from(new Set(collectedReasons)).slice(0, 7);
  reasons.push(...topReasons);

  const verdict =
    viabilityScore >= 72 && bsScore <= 35 && redundancyScore <= 35
      ? "Worth validating — if you can prove the wedge fast."
      : viabilityScore >= 55 && timeWasteRisk !== "Extreme"
        ? "Maybe — but it’s under-specified and flirting with redundancy."
        : "High risk of being a time sink. Tighten buyer/pain/wedge or kill it.";

  const translationParts: string[] = [];
  translationParts.push(
    buyerMentioned
      ? "Buyer is at least hinted."
      : "Buyer is missing — this is a vibe, not a business.",
  );
  translationParts.push(
    painMentioned
      ? "Pain is mentioned."
      : "Pain is vague — nothing sounds urgent or expensive.",
  );
  translationParts.push(
    revenueMentioned
      ? "Money is acknowledged."
      : "No payment path mentioned — danger of building a free toy.",
  );
  translationParts.push(
    edgeMentioned
      ? "Some edge/differentiation language exists."
      : "No wedge — sounds copyable.",
  );
  if (redundancyScore >= 40) translationParts.push("Category smells crowded.");

  const translation = translationParts.join(" ");

  const buyerHint = buyerMentioned
    ? "a specific buyer"
    : "a single buyer with budget authority (e.g., recruiting leads at 200–2000 person companies)";
  const painHint = painMentioned
    ? "a specific painful moment"
    : "a recurring painful moment that costs time/money/risk (weekly)";
  const wedgeHint = edgeMentioned
    ? "a provable wedge"
    : "a wedge you can prove (distribution, data, compliance, workflow lock-in)";

  const betterVersion = `For ${buyerHint}, when they hit ${painHint}, we replace the current workaround with ______, delivering ______ in <14 days via ${wedgeHint}.`;

  const nextMove =
    timeWasteRisk === "Extreme" || !buyerMentioned
      ? "Pick one buyer. Write 10 names. Schedule 3 calls this week. Ask what breaks weekly and what they currently pay for."
      : !revenueMentioned
        ? "Write a pricing hypothesis (who pays, how much, why now). Offer a paid pilot to 3 target buyers."
        : !edgeMentioned
          ? "Define your wedge: what you can do that incumbents won’t/can’t. Prove it with a tiny demo + one integration."
          : "Run a 48-hour validation sprint: landing page + outreach to 20 targets + 5 calls + ask for a paid pilot.";

  return {
    bsScore,
    viabilityScore,
    redundancyScore,
    timeWasteRisk,
    verdict,
    translation,
    reasons: reasons.length ? reasons : ["No obvious red flags detected."],
    betterVersion,
    nextMove,
  };
}

