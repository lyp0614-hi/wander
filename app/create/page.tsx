"use client";

import { useState } from "react";
import Link from "next/link";

type Step = {
  eyebrow: string;
  question: string;
  hint: string;
  chips: string[];
};

const STEPS: Step[] = [
  {
    eyebrow: "CREATE TRIP",
    question: "这一次，你想去哪里？",
    hint: "Where do you want to go this time?",
    chips: ["我知道要去哪", "我还不知道去哪"],
  },
  {
    eyebrow: "DURATION",
    question: "打算玩几天？",
    hint: "How many days?",
    chips: ["3 天", "5 天", "7 天", "时间灵活"],
  },
  {
    eyebrow: "BUDGET",
    question: "大概预算是多少？",
    hint: "What's your budget?",
    chips: ["1000 以内", "1000–2000", "2000–3000", "3000–5000", "5000–8000", "8000 以上", "还没想好"],
  },
  {
    eyebrow: "MOOD",
    question: "这次想要什么感觉？",
    hint: "What do you want to feel?",
    chips: ["慢一点 · Slow", "多探索 · Curious", "城市故事 · City", "自然放空 · Nature"],
  },
];

export default function CreateTrip() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [freeText, setFreeText] = useState("");

  const current = STEPS[step];
  const done = step >= STEPS.length;

  const pick = (value: string) => {
    setAnswers([...answers, value]);
    setFreeText("");
    setStep(step + 1);
  };

  const submitFree = () => {
    if (!freeText.trim()) return;
    pick(freeText.trim());
  };

  return (
    <div className="relative flex min-h-full flex-1 flex-col bg-background text-foreground">
      <div className="film-grain" aria-hidden />

      <header className="relative z-10 flex items-center justify-between gap-4 px-5 pt-7 pb-4 sm:px-10 sm:pt-8 md:px-16 lg:px-24">
        <Link
          href="/"
          className="shrink-0 text-[0.85rem] font-medium tracking-[0.28em] text-foreground sm:text-[0.95rem]"
        >
          WANDER
        </Link>
        <nav className="flex items-center gap-4 sm:gap-10">
          <Link
            href="/"
            className="whitespace-nowrap text-[0.58rem] tracking-[0.16em] text-ink-muted transition-colors hover:text-foreground sm:text-[0.7rem] sm:tracking-[0.22em]"
          >
            ← BACK HOME
          </Link>
        </nav>
      </header>

      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-16 sm:px-10">
        {!done ? (
          <div className="w-full max-w-xl text-center">
            <p className="text-[0.68rem] tracking-[0.42em] text-ink-muted">
              {current.eyebrow} · {step + 1} / {STEPS.length}
            </p>
            <h1 className="mt-6 text-3xl font-medium leading-snug sm:text-4xl md:text-5xl">
              {current.question}
            </h1>
            <p className="mt-3 text-sm italic tracking-wide text-ink-muted">{current.hint}</p>

            <div className="mt-10">
              <input
                value={freeText}
                onChange={(e) => setFreeText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && submitFree()}
                placeholder="告诉我你的想法… Tell me what's on your mind..."
                className="w-full border-b border-foreground/30 bg-transparent px-2 py-4 text-center text-base text-foreground placeholder:text-ink-muted/60 focus:border-foreground focus:outline-none"
              />
              <button
                onClick={submitFree}
                className="mt-8 inline-flex border border-foreground/80 px-8 py-3 text-[0.75rem] tracking-[0.12em] transition-colors hover:bg-foreground hover:text-background"
              >
                继续 Continue →
              </button>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              {current.chips.map((chip) => (
                <button
                  key={chip}
                  onClick={() => pick(chip)}
                  className="border border-ink-muted/40 px-4 py-2 text-sm text-ink-muted transition-colors hover:border-foreground hover:text-foreground"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="w-full max-w-xl text-center">
            <p className="text-[0.68rem] tracking-[0.42em] text-ink-muted">TRIP BRIEF</p>
            <h1 className="mt-6 text-3xl font-medium sm:text-4xl md:text-5xl">这就是这次旅行吗？</h1>
            <p className="mt-3 text-sm italic tracking-wide text-ink-muted">Does this feel right?</p>

            <div className="mx-auto mt-10 max-w-md border border-foreground/20 px-8 py-8 text-left">
              <Row label="DESTINATION 目的地" value={answers[0] || "待定 · Decide later"} />
              <Row label="DURATION 时长" value={answers[1] || "—"} />
              <Row label="BUDGET 预算" value={answers[2] || "—"} />
              <Row label="MOOD 感觉" value={answers[3] || "—"} />
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => {
                  setStep(0);
                  setAnswers([]);
                }}
                className="border border-ink-muted/40 px-8 py-3 text-[0.75rem] tracking-[0.12em] text-ink-muted transition-colors hover:border-foreground hover:text-foreground"
              >
                修改 Edit
              </button>
              <button className="border border-foreground/80 px-8 py-3 text-[0.75rem] tracking-[0.12em] transition-colors hover:bg-foreground hover:text-background">
                开始规划 Start Planning →
              </button>
            </div>
          </div>
        )}
      </main>

      <footer className="relative z-10 px-6 pb-10 pt-2 text-center sm:px-10">
        <p className="text-[0.7rem] tracking-[0.08em] text-ink-muted">
          One question at a time. 一次一个问题。
        </p>
      </footer>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-6 border-b border-foreground/10 py-3 last:border-0">
      <span className="text-[0.62rem] tracking-[0.2em] text-ink-muted">{label}</span>
      <span className="text-right text-sm">{value}</span>
    </div>
  );
}
