"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Leaf, Package, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AUTOPLAY_MS, getActiveSlides, HeroSlide, HeroTheme } from "@/data/heroSlides";

const themes: Record<HeroTheme, {
  section: string;
  eyebrow: string;
  headline: string;
  accent: string;
  description: string;
  perks: string;
  perkIcon: string;
  primary: string;
  secondary: string;
  badge: string;
  dot: string;
  dotActive: string;
  arrow: string;
  countdownLabel: string;
  countdownValue: string;
  callout: string;
}> = {
  warm: {
    section: "bg-background-image-gradient-warm text-foreground",
    eyebrow: "text-muted-foreground",
    headline: "text-foreground",
    accent: "text-accent",
    description: "text-muted-foreground",
    perks: "text-muted-foreground",
    perkIcon: "text-accent",
    primary: "",
    secondary: "",
    badge: "bg-accent text-accent-foreground",
    dot: "bg-foreground/25",
    dotActive: "bg-foreground",
    arrow: "bg-background/80 text-foreground hover:bg-background",
    countdownLabel: "text-muted-foreground",
    countdownValue: "text-foreground border-border",
    callout: "bg-background/95 text-foreground",
  },
  festive: {
    section: "bg-[hsl(18_55%_42%)] text-[hsl(40_40%_96%)]",
    eyebrow: "text-[hsl(40_40%_96%)]/70",
    headline: "text-[hsl(40_40%_96%)]",
    accent: "text-[hsl(45_85%_70%)]",
    description: "text-[hsl(40_40%_96%)]/80",
    perks: "text-[hsl(40_40%_96%)]/70",
    perkIcon: "text-[hsl(45_85%_70%)]",
    primary: "bg-[hsl(45_85%_70%)] text-[hsl(24_20%_15%)] hover:bg-[hsl(45_85%_75%)]",
    secondary: "border-[hsl(40_40%_96%)]/40 text-[hsl(40_40%_96%)] hover:bg-[hsl(40_40%_96%)]/10",
    badge: "bg-[hsl(45_85%_70%)] text-[hsl(24_20%_15%)]",
    dot: "bg-[hsl(40_40%_96%)]/30",
    dotActive: "bg-[hsl(45_85%_70%)]",
    arrow: "bg-[hsl(40_40%_96%)]/15 text-[hsl(40_40%_96%)] hover:bg-[hsl(40_40%_96%)]/25",
    countdownLabel: "text-[hsl(40_40%_96%)]/70",
    countdownValue: "text-[hsl(40_40%_96%)] border-[hsl(40_40%_96%)]/30",
    callout: "bg-[hsl(40_40%_96%)] text-[hsl(24_20%_15%)]",
  },
  dark: {
    section: "bg-[hsl(24_14%_10%)] text-[hsl(40_33%_95%)]",
    eyebrow: "text-[hsl(40_33%_95%)]/60",
    headline: "text-[hsl(40_33%_95%)]",
    accent: "text-[hsl(18_75%_60%)]",
    description: "text-[hsl(40_33%_95%)]/70",
    perks: "text-[hsl(40_33%_95%)]/60",
    perkIcon: "text-[hsl(18_75%_60%)]",
    primary: "bg-[hsl(18_75%_55%)] text-[hsl(40_33%_95%)] hover:bg-[hsl(18_75%_60%)]",
    secondary: "border-[hsl(40_33%_95%)]/30 text-[hsl(40_33%_95%)] hover:bg-[hsl(40_33%_95%)]/10",
    badge: "bg-[hsl(18_75%_55%)] text-[hsl(40_33%_95%)]",
    dot: "bg-[hsl(40_33%_95%)]/25",
    dotActive: "bg-[hsl(18_75%_60%)]",
    arrow: "bg-[hsl(40_33%_95%)]/10 text-[hsl(40_33%_95%)] hover:bg-[hsl(40_33%_95%)]/20",
    countdownLabel: "text-[hsl(40_33%_95%)]/60",
    countdownValue: "text-[hsl(40_33%_95%)] border-[hsl(40_33%_95%)]/25",
    callout: "bg-[hsl(24_14%_10%)] text-[hsl(40_33%_95%)] border border-[hsl(40_33%_95%)]/15",
  },
  light: {
    section: "bg-background text-foreground",
    eyebrow: "text-muted-foreground",
    headline: "text-foreground",
    accent: "text-accent",
    description: "text-muted-foreground",
    perks: "text-muted-foreground",
    perkIcon: "text-accent",
    primary: "",
    secondary: "",
    badge: "bg-foreground text-background",
    dot: "bg-foreground/20",
    dotActive: "bg-foreground",
    arrow: "bg-secondary text-foreground hover:bg-secondary/80",
    countdownLabel: "text-muted-foreground",
    countdownValue: "text-foreground border-border",
    callout: "bg-background border border-border text-foreground",
  },
};

const useCountdown = (target?: string) => {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!target) return;
    const i = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(i);
  }, [target]);
  if (!target) return null;
  const diff = Math.max(0, new Date(target).getTime() - now);
  const d = Math.floor(diff / 86_400_000);
  const h = Math.floor((diff % 86_400_000) / 3_600_000);
  const m = Math.floor((diff % 3_600_000) / 60_000);
  const s = Math.floor((diff % 60_000) / 1000);
  return { d, h, m, s, ended: diff === 0 };
};

const Countdown = ({ target, theme }: { target: string; theme: typeof themes[HeroTheme] }) => {
  const t = useCountdown(target);
  if (!t || t.ended) return null;
  const cell = (n: number, l: string) => (
    <div className="text-center">
      <div className={cn("min-w-[44px] border px-2 py-1.5 font-serif text-lg leading-none tabular-nums", theme.countdownValue)}>
        {String(n).padStart(2, "0")}
      </div>
      <p className={cn("mt-1 text-[9px] uppercase tracking-[0.2em]", theme.countdownLabel)}>{l}</p>
    </div>
  );
  return (
    <div className="mt-6 flex items-end gap-2">
      {cell(t.d, "Days")}{cell(t.h, "Hrs")}{cell(t.m, "Min")}{cell(t.s, "Sec")}
    </div>
  );
};

const Slide = ({ slide }: { slide: HeroSlide }) => {
  const t = themes[slide.theme ?? "warm"];
  return (
    <div className={cn("relative overflow-hidden transition-colors duration-500", t.section)}>
      <div className="container-page grid gap-10 lg:grid-cols-2 lg:gap-16 py-16 lg:py-24 items-center">
        <div className="order-2 lg:order-1 max-w-xl animate-fade-up">
          {(slide.eyebrow || slide.badge) && (
            <div className="flex flex-wrap items-center gap-3">
              {slide.badge && (
                <span className={cn("inline-flex items-center px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em]", t.badge)}>
                  {slide.badge}
                </span>
              )}
              {slide.eyebrow && (
                <p className={cn("inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.32em]", t.eyebrow)}>
                  <span className="h-px w-8 bg-current opacity-40" />
                  {slide.eyebrow}
                </p>
              )}
            </div>
          )}
          <h1 className={cn("mt-6 font-serif text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight text-balance", t.headline)}>
            {slide.headline}
            {slide.accent && (
              <>
                <br />
                <span className={cn("italic", t.accent)}>{slide.accent}</span>
              </>
            )}
          </h1>
          <p className={cn("mt-6 max-w-md text-base leading-relaxed", t.description)}>{slide.description}</p>

          {slide.endsAt && <Countdown target={slide.endsAt} theme={t} />}

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className={cn("rounded-none px-8 text-[11px] tracking-[0.22em] uppercase", t.primary)}>
              <Link href={slide.primaryCta.href}>
                {slide.primaryCta.label} <ArrowRight className="ml-2 h-3.5 w-3.5" />
              </Link>
            </Button>
            {slide.secondaryCta && (
              <Button asChild variant="outline" size="lg" className={cn("rounded-none px-8 text-[11px] tracking-[0.22em] uppercase", t.secondary)}>
                <Link className="text-black" href={slide.secondaryCta.href}>{slide.secondaryCta.label}</Link>
              </Button>
            )}
          </div>

          <ul className={cn("mt-10 grid grid-cols-3 gap-4 max-w-md text-[11px] uppercase tracking-[0.18em]", t.perks)}>
            <li className="flex items-center gap-2"><Leaf className={cn("h-3.5 w-3.5", t.perkIcon)} /> Natural fibers</li>
            <li className="flex items-center gap-2"><Package className={cn("h-3.5 w-3.5", t.perkIcon)} /> Free $35+</li>
            <li className="flex items-center gap-2"><RotateCcw className={cn("h-3.5 w-3.5", t.perkIcon)} /> 14-day returns</li>
          </ul>
        </div>

        <div className="order-1 lg:order-2 relative">
          <div className="relative aspect-[4/5] max-h-[680px] overflow-hidden rounded-sm bg-secondary">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={slide.image}
              alt={slide.imageAlt}
              width={1024}
              height={1280}
              className="h-full w-full object-cover"
            />
            {slide.callout && (
              <div className={cn("absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-[260px] backdrop-blur p-4 shadow-soft", t.callout)}>
                <p className="text-[10px] uppercase tracking-[0.25em] opacity-70">{slide.callout.label}</p>
                <p className="mt-1 font-serif text-base">{slide.callout.title}</p>
                <Link href={slide.callout.href} className="mt-2 inline-flex items-center gap-1 text-xs font-medium underline-offset-4 hover:underline">
                  {slide.callout.cta ?? "Shop the look"} <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const HeroSection = () => {
  const slides = useMemo(() => getActiveSlides(), []);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStart = useRef<number | null>(null);

  const go = (next: number) => setIndex(((next % slides.length) + slides.length) % slides.length);
  const next = () => go(index + 1);
  const prev = () => go(index - 1);

  useEffect(() => {
    if (slides.length <= 1 || paused) return;
    timer.current = setInterval(() => setIndex((i) => (i + 1) % slides.length), AUTOPLAY_MS);
    return () => { if (timer.current) clearInterval(timer.current); };
  }, [slides.length, paused, index]);

  const t = themes[slides[index].theme ?? "warm"];
  const single = slides.length === 1;

  return (
    <section
      className="relative"
      aria-roledescription="carousel"
      aria-label="Featured promotions"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => { touchStart.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (touchStart.current == null) return;
        const dx = e.changedTouches[0].clientX - touchStart.current;
        if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
        touchStart.current = null;
      }}
    >
      <div className="relative">
        {slides.map((s, i) => (
          <div
            key={s.id}
            className={cn(
              "transition-opacity duration-700",
              i === index ? "opacity-100" : "opacity-0 pointer-events-none absolute inset-0",
            )}
            aria-hidden={i !== index}
          >
            <Slide slide={s} />
          </div>
        ))}
      </div>

      {!single && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Previous slide"
            className={cn(
              "hidden md:grid absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 place-items-center rounded-full backdrop-blur transition-colors",
              t.arrow,
            )}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next slide"
            className={cn(
              "hidden md:grid absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 place-items-center rounded-full backdrop-blur transition-colors",
              t.arrow,
            )}
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2">
            {slides.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => go(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index}
                className="group relative h-1.5 w-8 overflow-hidden"
              >
                <span className={cn("absolute inset-0 transition-colors", i === index ? t.dotActive : t.dot)} />
                {i === index && !paused && (
                  <span
                    key={`progress-${index}`}
                    className={cn("absolute inset-y-0 left-0 origin-left", t.dotActive)}
                    style={{ animation: `hero-progress ${AUTOPLAY_MS}ms linear forwards` }}
                  />
                )}
              </button>
            ))}
          </div>
        </>
      )}

      <style>{`@keyframes hero-progress { from { transform: scaleX(0); } to { transform: scaleX(1); } }`}</style>
    </section>
  );
};

export default HeroSection;
