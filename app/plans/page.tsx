"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import {
  getServerTripBriefSnapshot,
  getTripBriefSnapshot,
  hasTripBrief,
  parseTripBrief,
  subscribeTripBrief,
} from "../lib/trip-brief";

type Plan = {
  id: string;
  number: string;
  title: string;
  titleEn: string;
  pace: string;
  budget: string;
  route: string[];
  pros: string;
  cons: string;
};

const PLANS: Plan[] = [
  {
    id: "slow",
    number: "01",
    title: "慢慢走",
    titleEn: "Slow",
    pace: "一天只做一件事",
    budget: "贴着你的预算下限，留出余地",
    route: [
      "清早出门，找一家坐得住的咖啡馆",
      "挑一条老街，不要求走完",
      "下午留白：午睡、写字、随便走走",
      "天黑前回到住处附近吃晚饭",
    ],
    pros: "不赶路，回来以后还记得细节。",
    cons: "去的地方少，可能会觉得「没玩够」。",
  },
  {
    id: "deep",
    number: "02",
    title: "深入逛",
    titleEn: "Deep",
    pace: "每天走很多路，早出晚归",
    budget: "接近你给的上限，换更多体验",
    route: [
      "上午把博物馆或美术馆一次看完",
      "中午去本地人吃饭的那条街",
      "下午串起老城里的三个点",
      "傍晚找一个高的地方看全景",
    ],
    pros: "看到的东西最多，一次把这座城市读厚。",
    cons: "体力消耗大，后半程容易累。",
  },
  {
    id: "night",
    number: "03",
    title: "夜色",
    titleEn: "Night",
    pace: "白天慢，晚上出门",
    budget: "钱更多花在吃和夜里",
    route: [
      "上午睡到自然醒，只安排一件小事",
      "下午三四点才正式出门",
      "夜市、小酒馆、河边或天桥",
      "深夜的便利店，顺着灯光走回去",
    ],
    pros: "看见城市的另一面，人少，光好看。",
    cons: "白天时间少，早起类的安排基本放弃。",
  },
];

export default function Plans() {
  const raw = useSyncExternalStore(
    subscribeTripBrief,
    getTripBriefSnapshot,
    getServerTripBriefSnapshot
  );
  const [selected, setSelected] = useState<string[]>([]);
  const [generated, setGenerated] = useState(false);

  const brief = parseTripBrief(raw);
  const reading = raw === undefined;
  const ready = brief !== null && hasTripBrief(brief);

  const chosen = PLANS.filter((plan) => selected.includes(plan.id));
  const chosenLabel = chosen.map((plan) => `${plan.number} ${plan.title}`).join(" ＋ ");

  const togglePlan = (id: string) => {
    setGenerated(false);
    setSelected((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
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
            href="/create"
            className="whitespace-nowrap text-[0.58rem] tracking-[0.16em] text-ink-muted transition-colors hover:text-foreground sm:text-[0.7rem] sm:tracking-[0.22em]"
          >
            ← EDIT BRIEF
          </Link>
        </nav>
      </header>

      <main className="relative z-10 flex flex-1 flex-col items-center px-6 py-14 sm:px-10 sm:py-16">
        <div className="w-full max-w-2xl">
          <p className="text-center text-[0.68rem] tracking-[0.42em] text-ink-muted">
            PLANS · 三个方案
          </p>
          <h1 className="mt-6 text-center text-3xl font-medium leading-snug sm:text-4xl md:text-5xl">
            同一个假期，三种走法
          </h1>
          <p className="mt-3 text-center text-sm italic tracking-wide text-ink-muted">
            Three ways to spend the same days.
          </p>

          <section className="mt-12">
            <p className="text-[0.62rem] tracking-[0.28em] text-ink-muted">
              YOUR TRIP BRIEF · 你的旅行设定
            </p>

            {ready && brief ? (
              <div className="mt-5 border border-foreground/20 px-7 py-7 sm:px-8 sm:py-8">
                <Row
                  label="DESTINATION 目的地"
                  value={brief.destination || "待定 · Decide later"}
                />
                <Row label="DURATION 时长" value={brief.duration || "—"} />
                <Row label="BUDGET 预算" value={brief.budget || "—"} />
                <Row label="MOOD 感觉" value={brief.mood || "—"} />
              </div>
            ) : (
              <div className="mt-5 border border-dashed border-foreground/25 px-7 py-10 text-center sm:px-8">
                <p className="text-sm leading-7 text-ink-muted">
                  {reading
                    ? "正在读取你的旅行设定…"
                    : "这一次还没有设定。先回答四个问题，我们再一起看方案。"}
                </p>
                {!reading && (
                  <Link
                    href="/create"
                    className="mt-7 inline-flex items-center justify-center border border-foreground/80 px-7 py-3 text-[0.75rem] tracking-[0.08em] transition-colors hover:bg-foreground hover:text-background"
                  >
                    ＋ 开始一次旅行 ＋ Start a Journey
                  </Link>
                )}
              </div>
            )}
          </section>

        </div>

        <section className="mt-16 w-full max-w-5xl">
          <div className="flex flex-col items-center gap-4 border-t border-foreground/15 pt-10 text-center">
            <p className="text-[0.62rem] tracking-[0.28em] text-ink-muted">
              THREE WAYS · 三个走法
            </p>
            <p className="text-sm leading-7 text-ink-muted">
              先点选你想留下的方案，也可以几条合在一起。
            </p>
            {brief?.destination ? (
              <p className="text-[0.66rem] tracking-[0.14em] text-ink-muted/80">
                这一次 · {brief.destination}
              </p>
            ) : null}
          </div>

          <ol className="mt-12 grid gap-12 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
            {PLANS.map((plan) => {
              const picked = selected.includes(plan.id);

              return (
                <li key={plan.id} className="flex">
                  <button
                    type="button"
                    aria-pressed={picked}
                    onClick={() => togglePlan(plan.id)}
                    className={`flex w-full flex-col border-t pt-6 text-left transition-colors ${
                      picked
                        ? "-mx-4 border-foreground bg-foreground/[0.045] px-4 sm:-mx-5 sm:px-5"
                        : "border-foreground/25 hover:border-foreground/60"
                    }`}
                  >
                    <span className="flex items-baseline justify-between gap-4">
                      <span
                        className={`text-[0.7rem] tracking-[0.3em] ${
                          picked ? "text-foreground" : "text-ink-muted"
                        }`}
                      >
                        {plan.number}
                      </span>
                      <span className="text-[0.58rem] tracking-[0.2em] text-ink-muted">
                        {picked ? "已选 · PICKED" : "点选 · PICK"}
                      </span>
                    </span>

                    <span className="mt-5 block text-2xl font-medium">
                      {plan.title}
                    </span>
                    <span className="mt-1 block text-[0.7rem] uppercase tracking-[0.24em] text-ink-muted">
                      {plan.titleEn}
                    </span>

                    <span className="mt-7 block">
                      <Line label="PACE · 节奏" value={plan.pace} />
                      <Line label="BUDGET · 预算" value={plan.budget} />
                    </span>

                    <span className="mt-7 block">
                      <span className="block text-[0.6rem] tracking-[0.24em] text-ink-muted">
                        ROUTE · 主要安排
                      </span>
                      <span className="mt-3 block space-y-2 text-sm leading-6">
                        {plan.route.map((item) => (
                          <span key={item} className="flex gap-3">
                            <span aria-hidden className="text-ink-muted">
                              ·
                            </span>
                            <span>{item}</span>
                          </span>
                        ))}
                      </span>
                    </span>

                    <span className="mt-7 block border-t border-foreground/10 pt-5">
                      <Line label="PROS · 优点" value={plan.pros} />
                      <Line label="CONS · 可能的问题" value={plan.cons} />
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </section>

        <section className="mt-16 w-full max-w-2xl border-t border-foreground/15 pt-10 text-center">
          <p className="text-[0.62rem] tracking-[0.28em] text-ink-muted">
            MY VERSION · 我的版本
          </p>
          <p className="mt-5 text-sm leading-7 text-ink-muted" aria-live="polite">
            {chosen.length > 0
              ? `当前选择：${chosenLabel}`
              : "还没有选。留一条也可以，几条合起来也可以。"}
          </p>
          <button
            type="button"
            onClick={() => setGenerated(true)}
            disabled={chosen.length === 0}
            className="mt-8 inline-flex items-center justify-center border border-foreground/80 px-8 py-3 text-[0.75rem] tracking-[0.12em] transition-colors enabled:hover:bg-foreground enabled:hover:text-background disabled:cursor-not-allowed disabled:border-foreground/25 disabled:text-ink-muted/70"
          >
            生成我的版本 Generate My Version →
          </button>
          {generated ? (
            <p className="mt-8 text-sm leading-7 text-ink-muted">
              已记下 {chosenLabel}。下一步会把它们合成一版属于你的行程，改哪里由你决定。
              <span className="mt-3 block text-[0.62rem] tracking-[0.16em] text-ink-muted/80">
                AI 合成还没接上 · COMING NEXT
              </span>
            </p>
          ) : null}
        </section>
      </main>

      <footer className="relative z-10 px-6 pb-10 pt-2 text-center sm:px-10">
        <p className="text-[0.7rem] tracking-[0.08em] text-ink-muted">
          One trip, several ways. 一次旅行，不止一种走法。
        </p>
      </footer>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-6 border-b border-foreground/10 py-3 last:border-0">
      <span className="text-[0.62rem] tracking-[0.2em] text-ink-muted">
        {label}
      </span>
      <span className="text-right text-sm">{value}</span>
    </div>
  );
}

function Line({ label, value }: { label: string; value: string }) {
  return (
    <span className="mt-4 block first:mt-0">
      <span className="block text-[0.6rem] tracking-[0.24em] text-ink-muted">
        {label}
      </span>
      <span className="mt-1 block text-sm leading-6">{value}</span>
    </span>
  );
}
