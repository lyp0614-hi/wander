import Image from "next/image";
import Link from "next/link";

const HERO_PHOTO =
  "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=2400&q=80";

export default function Home() {
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
            href="#journeys"
            className="whitespace-nowrap text-[0.58rem] tracking-[0.16em] text-ink-muted transition-colors hover:text-foreground sm:text-[0.7rem] sm:tracking-[0.22em]"
          >
            MY JOURNEYS
          </Link>
          <Link
            href="#memory"
            className="whitespace-nowrap text-[0.58rem] tracking-[0.16em] text-ink-muted transition-colors hover:text-foreground sm:text-[0.7rem] sm:tracking-[0.22em]"
          >
            TRAVEL MEMORY
          </Link>
        </nav>
      </header>

      <main className="relative z-10 flex flex-1 flex-col">
        <section className="flex flex-col items-center px-6 pt-16 pb-14 text-center sm:px-10 sm:pt-24 sm:pb-20 md:px-16 lg:px-24">
          <p className="text-[0.68rem] tracking-[0.42em] text-ink-muted">
            WHERE NEXT?
          </p>
          <h1 className="mt-6 max-w-[14em] text-[2.35rem] font-medium leading-[1.15] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-[4.25rem]">
            下一站，去哪里？
          </h1>
          <p className="mt-7 max-w-md text-[0.95rem] leading-8 text-ink-muted sm:text-base sm:leading-9">
            还没有想好下一站？告诉我你的时间、预算和想要的感觉。
          </p>
          <Link
            href="/create"
            className="mt-10 inline-flex max-w-full items-center justify-center border border-foreground/80 px-5 py-3 text-center text-[0.75rem] tracking-[0.08em] text-foreground transition-colors hover:bg-foreground hover:text-background sm:px-9 sm:text-[0.85rem] sm:tracking-[0.12em]"
          >
            ＋ 开始一次旅行 ＋ Start a Journey
          </Link>
        </section>

        <section className="px-6 pb-16 sm:px-10 md:px-16 lg:px-24">
          <figure className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[16/9]">
            <Image
              src={HERO_PHOTO}
              alt="暖色调的旅行街景"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 92vw"
              className="object-cover object-[center_62%] contrast-[1.05] saturate-[0.9]"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(44,36,22,0.08)_0%,rgba(44,36,22,0.18)_55%,rgba(44,36,22,0.42)_100%)] mix-blend-multiply"
              aria-hidden
            />
            <figcaption className="absolute bottom-5 left-5 text-[0.8rem] italic tracking-wide text-[#faf7f2] sm:bottom-8 sm:left-8 sm:text-[0.95rem]">
              Five days of getting lost.
            </figcaption>
          </figure>
        </section>
      </main>

      <footer className="relative z-10 px-6 pb-10 pt-2 text-center sm:px-10 md:px-16">
        <p className="text-[0.7rem] leading-6 tracking-[0.08em] text-ink-muted">
          Your personal travel world.
          <span className="mx-2 text-foreground/30">·</span>
          你的个人旅行世界。
        </p>
      </footer>
    </div>
  );
}
