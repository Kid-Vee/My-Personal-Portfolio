'use client';

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Menu,
  X,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  FileText,
  Award,
  Target,
  Users,
  GitBranch,
  BookOpen,
  Cloud,
  Brain,
  Globe,
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  Rocket,
  LineChart,
  Layers,
  Compass,
  Wallet,
  Building2,
  GraduationCap,
  Zap,
  CheckCircle2,
  Map,
  Bot,
  type LucideIcon,
} from "lucide-react";

/*************************************************
 * Data (outside component to avoid re-creation)
 *************************************************/
const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "work", label: "Work" },
  { id: "certifications", label: "Certs" },
  { id: "contact", label: "Contact" },
] as const;

const SECTORS = ["Fintech", "EdTech", "Real Estate", "Commodities"] as const;

const MARQUEE = [
  "Product Strategy",
  "Roadmapping",
  "Agile / Scrum",
  "User Research",
  "Data-Driven Delivery",
  "Stakeholder Alignment",
  "Cross-Border Payments",
  "Marketplace Design",
  "Experimentation",
] as const;

const STATS = [
  { value: 4, label: "Years Leading Product", suffix: "+", accent: "cyan" },
  { value: 65, label: "User Satisfaction Lift", suffix: "%", accent: "magenta" },
  { value: 30, label: "Faster Delivery Cycles", suffix: "%", accent: "lime" },
  { value: 90, label: "On-Time Delivery Rate", suffix: "%", accent: "violet" },
] as const;

const SKILL_GROUPS = [
  {
    label: "Product & Delivery",
    icon: Compass,
    accent: "cyan",
    items: [
      "Product Strategy",
      "Roadmapping",
      "Agile / Scrum",
      "Backlog Management",
      "PRDs & User Stories",
      "Stakeholder Management",
    ],
  },
  {
    label: "Analytics & Research",
    icon: LineChart,
    accent: "magenta",
    items: [
      "Mixpanel",
      "PostHog",
      "LogRocket",
      "UXCam",
      "FormBricks",
      "Firebase Crashlytics",
    ],
  },
  {
    label: "Tools & Collaboration",
    icon: Layers,
    accent: "lime",
    items: ["Jira", "Linear", "Notion", "Miro", "Trello", "Slack", "ExcaliDraw"],
  },
] as const;

type Accent = "cyan" | "magenta" | "lime" | "violet";

const EXPERIENCES: {
  title: string;
  company: string;
  location: string;
  duration: string;
  current?: boolean;
  founder?: boolean;
  accent: Accent;
  achievements: string[];
}[] = [
  {
    title: "Founder & Product Lead",
    company: "BetaCV",
    location: "Remote",
    duration: "Jun 2026 — Present",
    current: true,
    founder: true,
    accent: "lime",
    achievements: [
      "Founded and built BetaCV — an AI conversational résumé builder (\"AI Resume Padi\") that chats with users and generates ATS-compliant, single-column résumés in real time.",
      "Architected the full-stack product end to end: a Vite + React + TypeScript frontend and an Express + TypeScript backend on Firebase (Auth + Firestore).",
      "Shipped AI generation with a tiered model strategy (Free / Pro / Pro Max) and a resilient fallback chain, later migrating the engine from Gemini to Claude.",
      "Built a one-time Pro paywall on Paystack with region-aware international USD pricing — live-verified and never touching card data.",
      "Delivered server-side PDF and editable .docx export, plus hardening: rate limiting, caching, history trimming, and structured logging.",
    ],
  },
  {
    title: "Product Lead",
    company: "WESOnline",
    location: "Lagos",
    duration: "Nov 2025 — Present",
    current: true,
    accent: "cyan",
    achievements: [
      "Implemented agile methodologies that reduced project delivery times by 30% and improved cross-functional collaboration.",
      "Led the complete redesign and full UI/UX revamp of the WESOnline Marketplace, incorporating modern design principles and user feedback.",
      "Directed onboarding of new tenants, customizing instances with tailored configurations and integrations to expand the user base.",
      "Oversaw development of core modules for assessments, courses, and additional functionality via a scalable modular architecture.",
      "Ran market analysis and competitor benchmarking to position WESOnline as a leader in online educational solutions.",
    ],
  },
  {
    title: "Product Manager",
    company: "Finarium · MMG",
    location: "Remote",
    duration: "Nov 2025 — Feb 2026",
    accent: "magenta",
    achievements: [
      "Led development of core cross-border remittance features, integrating multi-currency support and real-time exchange-rate APIs.",
      "Ran market research and user interviews across 3 countries, prioritizing instant settlement, exchange-rate switching, and fraud detection.",
      "Managed the product roadmap for web platforms, launching user-friendly admin and super-admin experiences.",
      "Facilitated cross-functional agile sprints, resolving bottlenecks and ensuring on-time feature delivery.",
    ],
  },
  {
    title: "Product Lead",
    company: "Vestate Agency",
    location: "Remote",
    duration: "Jun 2025 — Nov 2025",
    accent: "lime",
    achievements: [
      "Led end-to-end product for a dual-sided property marketplace serving both owners and renters.",
      "Designed quarterly roadmaps from stakeholder initiatives and user feedback, aligning market needs with business goals.",
      "Used Mixpanel and PostHog to monitor behavior and optimize feature adoption, improving engagement.",
      "Maintained a 90% on-time delivery rate and 85% stakeholder approval on development.",
    ],
  },
  {
    title: "Product Lead",
    company: "AFEX",
    location: "Abuja",
    duration: "Apr 2022 — Nov 2025",
    accent: "violet",
    achievements: [
      "Designed quarterly roadmaps synthesizing initiatives from 10+ stakeholders, driving a 25% improvement in feature adoption.",
      "Managed a backlog of 80+ user stories with a 90% on-time delivery rate across 9 development sprints.",
      "Delivered signed UAT at change-management presentations to 20+ team members, earning 85% stakeholder approval.",
      "Maintained 98% daily-scrum attendance and 92% velocity consistency while reducing blockers by 40%.",
      "Authored 12+ PRDs and reduced cross-team communication delays by 50%.",
    ],
  },
  {
    title: "Product Lead",
    company: "Educratic Technologies",
    location: "Remote",
    duration: "May 2024 — Apr 2025",
    accent: "cyan",
    achievements: [
      "Led end-to-end product for a learning-management platform serving exam-class students and organization-level professionals.",
      "Defined vision and roadmaps for 4 core modules: assessment, content delivery, analytics, and admin.",
      "Ran research with 80+ teachers, students, and administrators, lifting user satisfaction scores by 65%.",
      "Managed full sprint cycles — planning, execution, review, and retrospectives — across cross-functional teams.",
    ],
  },
];

const SERVICES: { icon: LucideIcon; title: string; description: string; accent: Accent }[] = [
  {
    icon: Target,
    title: "Product Strategy & Roadmapping",
    description:
      "Translate stakeholder initiatives and market signals into quarterly roadmaps that ship — aligned to real business outcomes.",
    accent: "cyan",
  },
  {
    icon: GitBranch,
    title: "Agile Product Leadership",
    description:
      "Run the full Scrum cadence — planning, standups, reviews, retros — keeping velocity high and blockers low.",
    accent: "magenta",
  },
  {
    icon: LineChart,
    title: "Research & Analytics",
    description:
      "Mixpanel, PostHog, LogRocket and UXCam turned into decisions. Interviews and experiments that de-risk the roadmap.",
    accent: "lime",
  },
  {
    icon: Wallet,
    title: "Fintech & Payments",
    description:
      "Cross-border remittance, multi-currency flows, real-time FX, and fraud-aware product design built for trust at scale.",
    accent: "violet",
  },
  {
    icon: Users,
    title: "Stakeholder Management",
    description:
      "Clear communication across executives, engineering, and end-users — driving buy-in and signed-off change management.",
    accent: "cyan",
  },
  {
    icon: Layers,
    title: "Marketplace & Platform",
    description:
      "Dual-sided marketplaces and modular, multi-tenant platforms designed for scalable, seamless rollouts.",
    accent: "magenta",
  },
];

const PORTFOLIO_ITEMS: {
  title: string;
  company: string;
  description: string;
  tags: string[];
  icon: LucideIcon;
  accent: Accent;
  featured?: boolean;
  href?: string;
} [] = [
  {
    title: "BetaCV — AI Résumé Builder",
    company: "Founder · AI SaaS",
    description:
      "Founded and built an AI conversational résumé builder that generates ATS-compliant résumés in real time. Full-stack React + Express on Firebase, with tiered AI models, Paystack payments, and PDF/.docx export.",
    tags: ["Founder", "AI / LLM", "Full-Stack", "Paystack", "Firebase"],
    icon: Bot,
    accent: "lime",
    featured: true,
  },
  {
    title: "Marketplace Redesign",
    company: "WESOnline · EdTech",
    description:
      "Full UI/UX revamp and modular re-architecture of the WESOnline marketplace, cutting delivery times 30% while scaling multi-tenant onboarding.",
    tags: ["UI/UX Revamp", "Modular Architecture", "Multi-Tenant", "Agile"],
    icon: Rocket,
    accent: "cyan",
  },
  {
    title: "Cross-Border Remittance",
    company: "Finarium · Fintech",
    description:
      "Multi-currency remittance with real-time FX APIs, instant settlement, and fraud detection — informed by user research across 3 countries.",
    tags: ["Payments", "Multi-Currency", "Real-Time FX", "Fraud Detection"],
    icon: Wallet,
    accent: "magenta",
  },
  {
    title: "Commodities Trading Platform",
    company: "AFEX · Commodities",
    description:
      "Quarterly roadmaps from 10+ stakeholders driving 25% feature-adoption gains, 90% on-time delivery, and 40% fewer blockers.",
    tags: ["Product Strategy", "AgTech", "Stakeholders", "Scrum"],
    icon: Globe,
    accent: "lime",
  },
  {
    title: "Property Marketplace",
    company: "Vestate · Real Estate",
    description:
      "Dual-sided marketplace for owners and renters, optimized with Mixpanel and PostHog to lift engagement and feature adoption.",
    tags: ["Marketplace", "User Research", "PostHog", "Roadmapping"],
    icon: Building2,
    accent: "violet",
  },
  {
    title: "Learning Management System",
    company: "Educratic · EdTech",
    description:
      "4-module LMS for exam-class students and professionals; research with 80+ users lifted satisfaction scores by 65%.",
    tags: ["EdTech", "Assessment", "Analytics", "65% CSAT"],
    icon: BookOpen,
    accent: "cyan",
  },
  {
    title: "Analytics & Experimentation",
    company: "Cross-Portfolio",
    description:
      "A reusable measurement framework — Mixpanel, PostHog, LogRocket, UXCam, Firebase — turning behavior into prioritized roadmap bets.",
    tags: ["Mixpanel", "PostHog", "LogRocket", "Data Strategy"],
    icon: LineChart,
    accent: "magenta",
  },
];

const CERTIFICATIONS: {
  title: string;
  issuer: string;
  icon: LucideIcon;
  href?: string;
  accent: Accent;
}[] = [
  {
    title: "Certified Product Manager (CPM)",
    issuer: "AIPMM",
    icon: Award,
    href: "https://certificates.aipmm.com/e7039c87-ad2f-4e1a-8a2d-216dc9dad49f#acc.QjXTrEkP",
    accent: "cyan",
  },
  {
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    icon: Cloud,
    href: "https://www.credly.com/badges/4f92fbdc-f6a5-4701-acbb-cdcca944dc0b/public_url",
    accent: "magenta",
  },
  {
    title: "Product Manager Nanodegree",
    issuer: "Udacity",
    icon: GraduationCap,
    href: "https://www.udacity.com/certificate/e/c582a9d4-b93a-11ee-b642-1739e588702b",
    accent: "lime",
  },
  {
    title: "AI for Product Management",
    issuer: "Pendo × Mind the Product",
    icon: Brain,
    href: "https://www.credly.com/badges/267d90bc-0660-4300-8ebf-3c88317a8597/linked_in_profile",
    accent: "violet",
  },
  {
    title: "Product Roadmapping (PRC)",
    issuer: "Product School",
    icon: Map,
    accent: "cyan",
  },
  {
    title: "Scrum Fundamentals Certified (SFC)",
    issuer: "ScrumStudy",
    icon: GitBranch,
    href: "https://www.scrumstudy.com/certification/verify?type=SFC&number=973461",
    accent: "magenta",
  },
];

const ACCENT_VAR: Record<Accent, string> = {
  cyan: "var(--cyan)",
  magenta: "var(--magenta)",
  lime: "var(--lime)",
  violet: "var(--violet)",
};

/*************************************************
 * Utility hooks
 *************************************************/
function useDebouncedCallback<T extends (...args: unknown[]) => void>(cb: T, delay = 100) {
  const timeoutRef = useRef<number | null>(null);
  const memoCb = useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => cb(...args), delay);
    },
    [cb, delay]
  );
  useEffect(() => () => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
  }, []);
  return memoCb as T;
}

function useScrollSpy(ids: readonly string[]) {
  const [active, setActive] = useState(ids[0]);
  const handle = useDebouncedCallback(() => {
    const y = window.scrollY + 120;
    for (const id of ids) {
      const el = document.getElementById(id);
      if (!el) continue;
      const { offsetTop, offsetHeight } = el;
      if (y >= offsetTop && y < offsetTop + offsetHeight) {
        setActive(id);
        break;
      }
    }
  }, 40);
  useEffect(() => {
    handle();
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, [handle]);
  return active;
}

function useScr11() {
  const [scrolled, setScrolled] = useState(false);
  const onScroll = useDebouncedCallback(() => setScrolled(window.scrollY > 40), 40);
  useEffect(() => {
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);
  return scrolled;
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const onScroll = useDebouncedCallback(() => {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    setProgress(max > 0 ? (h.scrollTop / max) * 100 : 0);
  }, 16);
  useEffect(() => {
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);
  return progress;
}

/** Adds `.is-visible` to elements with `.reveal` once they enter the viewport. */
function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function useIntersection(
  ref: React.RefObject<Element | null>,
  onIntersect: () => void,
  options?: IntersectionObserverInit
) {
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => e.isIntersecting && onIntersect());
    }, options);
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, onIntersect, options]);
}

function smoothTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/*************************************************
 * Reusable UI bits
 *************************************************/
const Eyebrow: React.FC<{ children: React.ReactNode; accent?: Accent }> = ({
  children,
  accent = "cyan",
}) => (
  <span
    className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] font-mono"
    style={{
      color: ACCENT_VAR[accent],
      borderColor: ACCENT_VAR[accent],
      boxShadow: `0 0 24px -10px ${ACCENT_VAR[accent]}`,
      background: "rgba(255,255,255,0.02)",
    }}
  >
    <span
      className="h-1.5 w-1.5 rounded-full"
      style={{ background: ACCENT_VAR[accent], boxShadow: `0 0 8px ${ACCENT_VAR[accent]}` }}
    />
    {children}
  </span>
);

const SectionHeader: React.FC<{
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  accent?: Accent;
}> = ({ eyebrow, title, subtitle, accent = "cyan" }) => (
  <div className="reveal mx-auto mb-14 max-w-2xl text-center">
    <Eyebrow accent={accent}>{eyebrow}</Eyebrow>
    <h2 className="mt-5 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
      {title}
    </h2>
    {subtitle ? <p className="mt-4 text-lg text-muted">{subtitle}</p> : null}
  </div>
);

const AnimatedStat: React.FC<{
  value: number;
  label: string;
  suffix?: string;
  accent: Accent;
  run: boolean;
}> = ({ value, label, suffix = "", accent, run }) => {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!run) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(value);
      return;
    }
    const duration = 1100;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(value * eased));
      if (t < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [run, value]);

  return (
    <div
      className="group relative overflow-hidden rounded-2xl border glass p-6 text-center transition-transform duration-300 hover:-translate-y-1"
      style={{ borderColor: "var(--border)" }}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ boxShadow: `inset 0 0 40px -16px ${ACCENT_VAR[accent]}` }}
      />
      <div
        className="font-display text-4xl font-bold sm:text-5xl animate-pulse-glow"
        style={{ color: ACCENT_VAR[accent] }}
      >
        {count}
        {suffix}
      </div>
      <div className="mt-2 text-sm text-muted">{label}</div>
    </div>
  );
};

/*************************************************
 * Background orbs (fixed, decorative)
 *************************************************/
const Backdrop: React.FC = () => (
  <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
    <div
      className="absolute -left-32 top-[-10%] h-[42rem] w-[42rem] rounded-full opacity-[0.18] blur-[120px] animate-float-slow"
      style={{ background: "radial-gradient(circle, var(--cyan), transparent 60%)" }}
    />
    <div
      className="absolute right-[-10%] top-[30%] h-[36rem] w-[36rem] rounded-full opacity-[0.16] blur-[120px] animate-float-slow-2"
      style={{ background: "radial-gradient(circle, var(--magenta), transparent 60%)" }}
    />
    <div
      className="absolute bottom-[-15%] left-[25%] h-[34rem] w-[34rem] rounded-full opacity-[0.12] blur-[120px] animate-float-slow"
      style={{ background: "radial-gradient(circle, var(--violet), transparent 60%)" }}
    />
  </div>
);

/*************************************************
 * Navbar
 *************************************************/
const Navbar: React.FC<{
  active: string;
  isOpen: boolean;
  setOpen: (v: boolean) => void;
}> = ({ active, isOpen, setOpen }) => {
  const scrolled = useScr11();
  const progress = useScrollProgress();
  const onClickLink = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    smoothTo(id);
    setOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "glass border-b" : "border-b border-transparent"
      }`}
      style={{ borderColor: scrolled ? "var(--border)" : "transparent" }}
      role="navigation"
      aria-label="Primary"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <a
            href="#home"
            onClick={onClickLink("home")}
            className="group flex items-center gap-2 font-display text-lg font-bold tracking-tight"
          >
            <span
              className="grid h-8 w-8 place-items-center rounded-lg font-mono text-sm text-bg"
              style={{ background: "linear-gradient(135deg, var(--cyan), var(--magenta))" }}
            >
              GV
            </span>
            <span className="text-foreground">
              Gideon<span className="text-gradient">.</span>
            </span>
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {NAV_ITEMS.map((item) => {
              const isActive = active === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={onClickLink(item.id)}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive ? "text-foreground" : "text-muted hover:text-foreground"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span
                      className="absolute inset-x-2 -bottom-px h-px"
                      style={{
                        background: "linear-gradient(90deg, transparent, var(--cyan), transparent)",
                        boxShadow: "0 0 10px var(--cyan)",
                      }}
                    />
                  )}
                </a>
              );
            })}
            <a
              href="#contact"
              onClick={onClickLink("contact")}
              className="ml-2 inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold text-bg transition-transform hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(135deg, var(--cyan), var(--violet))",
                boxShadow: "0 0 24px -8px var(--cyan)",
              }}
            >
              Let&apos;s talk <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          <button
            onClick={() => setOpen(!isOpen)}
            className="rounded-lg p-2 text-foreground transition-colors hover:bg-white/5 md:hidden"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* scroll progress bar */}
      <div
        className="h-px origin-left"
        style={{
          transform: `scaleX(${progress / 100})`,
          background: "linear-gradient(90deg, var(--cyan), var(--magenta), var(--lime))",
        }}
      />

      {isOpen && (
        <div className="glass border-t md:hidden" style={{ borderColor: "var(--border)" }}>
          <div className="space-y-1 px-4 py-3">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={onClickLink(item.id)}
                className={`block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  active === item.id
                    ? "bg-white/5 text-foreground"
                    : "text-muted hover:bg-white/5 hover:text-foreground"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

/*************************************************
 * Hero
 *************************************************/
const Hero: React.FC = () => (
  <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-16">
    <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="max-w-4xl">
        <div className="reveal">
          <Eyebrow accent="lime">Product Manager · CPM</Eyebrow>
        </div>

        <h1 className="reveal mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-7xl">
          <span className="text-foreground">Gideon Vision</span>
          <br />
          <span className="text-gradient text-glow-cyan">Olufeagba</span>
        </h1>

        <p className="reveal mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
          Certified Product Manager with{" "}
          <span className="font-semibold text-foreground">4+ years</span> leading end-to-end
          product across{" "}
          <span className="font-semibold" style={{ color: "var(--cyan)" }}>
            fintech, edtech, real estate
          </span>{" "}
          and{" "}
          <span className="font-semibold" style={{ color: "var(--magenta)" }}>
            commodities
          </span>{" "}
          — turning research and strategy into products that ship and scale.
        </p>

        <div className="reveal mt-8 flex flex-col gap-4 sm:flex-row">
          <a
            href="#work"
            onClick={(e) => {
              e.preventDefault();
              smoothTo("work");
            }}
            className="group inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-base font-semibold text-bg transition-transform hover:-translate-y-0.5"
            style={{
              background: "linear-gradient(135deg, var(--cyan), var(--violet))",
              boxShadow: "0 0 32px -8px var(--cyan)",
            }}
          >
            View My Work
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              smoothTo("contact");
            }}
            className="inline-flex items-center justify-center gap-2 rounded-xl border px-7 py-3.5 text-base font-semibold text-foreground transition-colors hover:bg-white/5"
            style={{ borderColor: "var(--border)" }}
          >
            <Sparkles className="h-5 w-5" style={{ color: "var(--lime)" }} />
            Let&apos;s Connect
          </a>
        </div>

        <div className="reveal mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted">
          <span className="font-mono uppercase tracking-widest text-xs">Sectors</span>
          {SECTORS.map((s) => (
            <span key={s} className="inline-flex items-center gap-2">
              <Zap className="h-3.5 w-3.5" style={{ color: "var(--lime)" }} />
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>

    {/* scroll hint */}
    <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted sm:flex">
      <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
      <span className="h-10 w-px animate-pulse" style={{ background: "var(--cyan)" }} />
    </div>
  </section>
);

/*************************************************
 * Marquee strip
 *************************************************/
const MarqueeStrip: React.FC = () => {
  const items = [...MARQUEE, ...MARQUEE];
  return (
    <div
      className="relative overflow-hidden border-y py-5"
      style={{ borderColor: "var(--border)", background: "rgba(255,255,255,0.015)" }}
    >
      <div className="flex w-max animate-marquee gap-10 pr-10">
        {items.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-10 font-display text-lg text-muted">
            {item}
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--magenta)" }} />
          </span>
        ))}
      </div>
    </div>
  );
};

/*************************************************
 * About
 *************************************************/
const About: React.FC<{
  statsRef: React.RefObject<HTMLDivElement | null>;
  statsRun: boolean;
}> = ({ statsRef, statsRun }) => (
  <section id="about" className="relative py-24">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="About"
        title={<>Product leadership, <span className="text-gradient">measured in outcomes</span></>}
        subtitle="A builder who blends user research, data, and tight stakeholder alignment to ship products people actually adopt."
        accent="cyan"
      />

      <div className="grid items-start gap-12 lg:grid-cols-5">
        <div className="reveal lg:col-span-3">
          <p className="text-lg leading-relaxed text-muted">
            I&apos;m a Product Manager based in Nigeria, leading end-to-end development across
            fintech, edtech, real estate, and commodities. My approach pairs{" "}
            <span className="text-foreground">data-driven decisions</span> with{" "}
            <span className="text-foreground">user-centered design</span> and clear stakeholder
            alignment — so the right things get built, on time.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            From cross-border remittance at Finarium to a full marketplace revamp at WESOnline,
            I&apos;ve consistently cut delivery times, lifted adoption, and raised satisfaction
            scores. Certified in Product Management, AWS Cloud, and Scrum.
          </p>

          <div ref={statsRef} className="mt-10 grid grid-cols-2 gap-4">
            {STATS.map((s) => (
              <AnimatedStat
                key={s.label}
                value={s.value}
                label={s.label}
                suffix={s.suffix}
                accent={s.accent as Accent}
                run={statsRun}
              />
            ))}
          </div>
        </div>

        {/* Skill groups */}
        <div className="reveal space-y-4 lg:col-span-2">
          {SKILL_GROUPS.map((group) => {
            const accent = group.accent as Accent;
            return (
              <div
                key={group.label}
                className="rounded-2xl border glass p-5"
                style={{ borderColor: "var(--border)" }}
              >
                <div className="mb-3 flex items-center gap-3">
                  <span
                    className="grid h-9 w-9 place-items-center rounded-lg"
                    style={{
                      color: ACCENT_VAR[accent],
                      background: "rgba(255,255,255,0.04)",
                      boxShadow: `0 0 20px -8px ${ACCENT_VAR[accent]}`,
                    }}
                  >
                    <group.icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-base font-semibold text-foreground">
                    {group.label}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border px-3 py-1 text-xs text-muted transition-colors hover:text-foreground"
                      style={{ borderColor: "var(--border)" }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </section>
);

/*************************************************
 * Experience timeline
 *************************************************/
const Experience: React.FC = () => (
  <section id="experience" className="relative py-24" style={{ background: "var(--bg-soft)" }}>
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Experience"
        title={<>The <span className="text-gradient">journey</span> so far</>}
        subtitle="Founder of an AI résumé startup and product roles across fintech, edtech, real estate, and commodities."
        accent="magenta"
      />

      <div className="relative">
        {/* vertical line */}
        <div
          className="absolute left-4 top-2 hidden h-full w-px sm:block"
          style={{ background: "linear-gradient(var(--cyan), var(--magenta), transparent)" }}
        />

        <div className="space-y-6">
          {EXPERIENCES.map((exp) => (
            <article
              key={`${exp.company}-${exp.duration}`}
              className="reveal group relative rounded-2xl border glass p-6 transition-transform duration-300 hover:-translate-y-1 sm:ml-12 sm:p-8"
              style={{ borderColor: "var(--border)" }}
            >
              {/* node */}
              <span
                className="absolute -left-12 top-8 hidden h-3 w-3 rounded-full sm:block"
                style={{
                  background: ACCENT_VAR[exp.accent],
                  boxShadow: `0 0 16px ${ACCENT_VAR[exp.accent]}, 0 0 0 4px var(--bg-soft)`,
                }}
              />
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="font-display text-xl font-bold text-foreground sm:text-2xl">
                    {exp.title}
                  </h3>
                  <div
                    className="mt-1 text-base font-semibold"
                    style={{ color: ACCENT_VAR[exp.accent] }}
                  >
                    {exp.company}
                  </div>
                </div>
                <div className="text-right">
                  <div className="mb-1 flex flex-wrap items-center justify-end gap-1.5">
                    {exp.founder && (
                      <span
                        className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold font-mono text-bg"
                        style={{
                          background: "linear-gradient(135deg, var(--cyan), var(--lime))",
                          boxShadow: "0 0 18px -6px var(--lime)",
                        }}
                      >
                        <Sparkles className="h-3 w-3" />
                        Founder
                      </span>
                    )}
                    {exp.current && (
                      <span
                        className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-medium font-mono"
                        style={{
                          color: "var(--lime)",
                          background: "rgba(163,230,53,0.1)",
                          border: "1px solid rgba(163,230,53,0.3)",
                        }}
                      >
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ background: "var(--lime)" }} />
                        Current
                      </span>
                    )}
                  </div>
                  <div className="font-mono text-xs text-muted">{exp.duration}</div>
                  <div className="flex items-center justify-end gap-1 text-xs text-muted">
                    <MapPin className="h-3 w-3" /> {exp.location}
                  </div>
                </div>
              </div>

              <ul className="mt-5 space-y-2.5">
                {exp.achievements.map((ach) => (
                  <li key={ach} className="flex gap-3 text-sm leading-relaxed text-muted">
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 flex-shrink-0"
                      style={{ color: ACCENT_VAR[exp.accent] }}
                    />
                    <span>{ach}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </div>
  </section>
);

/*************************************************
 * Services / Expertise
 *************************************************/
const Services: React.FC = () => (
  <section id="services" className="relative py-24">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="What I Do"
        title={<>Expertise that <span className="text-gradient-lime">ships</span></>}
        subtitle="End-to-end product capability — from strategy and research to delivery and growth."
        accent="lime"
      />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s) => (
          <div
            key={s.title}
            className="reveal group relative overflow-hidden rounded-2xl border glass p-6 transition-transform duration-300 hover:-translate-y-1.5"
            style={{ borderColor: "var(--border)" }}
          >
            <div
              className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{ boxShadow: `inset 0 0 60px -24px ${ACCENT_VAR[s.accent]}` }}
            />
            <span
              className="grid h-12 w-12 place-items-center rounded-xl"
              style={{
                color: ACCENT_VAR[s.accent],
                background: "rgba(255,255,255,0.04)",
                boxShadow: `0 0 28px -10px ${ACCENT_VAR[s.accent]}`,
              }}
            >
              <s.icon className="h-6 w-6" />
            </span>
            <h3 className="mt-5 font-display text-lg font-bold text-foreground">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{s.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/*************************************************
 * Work / Portfolio
 *************************************************/
const Work: React.FC = () => (
  <section id="work" className="relative py-24" style={{ background: "var(--bg-soft)" }}>
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Selected Work"
        title={<>Products I&apos;ve <span className="text-gradient">shipped</span></>}
        subtitle="A snapshot of platforms and outcomes across the portfolio."
        accent="cyan"
      />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PORTFOLIO_ITEMS.map((item) => (
          <article
            key={item.title}
            className={`reveal group relative flex flex-col overflow-hidden rounded-2xl border glass transition-transform duration-300 hover:-translate-y-1.5 ${
              item.featured ? "sm:col-span-2 lg:col-span-2" : ""
            }`}
            style={{
              borderColor: item.featured ? `${ACCENT_VAR[item.accent]}66` : "var(--border)",
              boxShadow: item.featured ? `0 0 50px -20px ${ACCENT_VAR[item.accent]}` : undefined,
            }}
          >
            {/* Founder ribbon */}
            {item.featured && (
              <span
                className="absolute right-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold font-mono text-bg"
                style={{
                  background: "linear-gradient(135deg, var(--cyan), var(--lime))",
                  boxShadow: "0 0 20px -6px var(--lime)",
                }}
              >
                <Sparkles className="h-3 w-3" /> Founder · Built by me
              </span>
            )}

            {/* header band */}
            <div
              className={`relative flex items-center justify-center overflow-hidden ${
                item.featured ? "h-40" : "h-32"
              }`}
              style={{
                background: `linear-gradient(135deg, ${ACCENT_VAR[item.accent]}22, transparent 70%)`,
              }}
            >
              <div
                className="absolute inset-0 opacity-40"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              />
              <span
                className={`relative grid place-items-center rounded-2xl text-bg transition-transform duration-300 group-hover:scale-110 ${
                  item.featured ? "h-16 w-16" : "h-14 w-14"
                }`}
                style={{
                  background: ACCENT_VAR[item.accent],
                  boxShadow: `0 0 32px -6px ${ACCENT_VAR[item.accent]}`,
                }}
              >
                <item.icon className={item.featured ? "h-8 w-8" : "h-7 w-7"} />
              </span>
            </div>

            <div className="flex flex-1 flex-col p-6">
              <p className="font-mono text-xs uppercase tracking-wider" style={{ color: ACCENT_VAR[item.accent] }}>
                {item.company}
              </p>
              <h3
                className={`mt-1 font-display font-bold text-foreground ${
                  item.featured ? "text-xl sm:text-2xl" : "text-lg"
                }`}
              >
                {item.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{item.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border px-2.5 py-1 text-[11px] text-muted"
                    style={{ borderColor: "var(--border)" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

/*************************************************
 * Certifications
 *************************************************/
const Certifications: React.FC = () => (
  <section id="certifications" className="relative py-24">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Credentials"
        title={<>Certified &amp; <span className="text-gradient-lime">always learning</span></>}
        subtitle="Six certifications spanning product, cloud, AI, and agile."
        accent="lime"
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CERTIFICATIONS.map((cert) => {
          const inner = (
            <>
              <span
                className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-xl"
                style={{
                  color: ACCENT_VAR[cert.accent],
                  background: "rgba(255,255,255,0.04)",
                  boxShadow: `0 0 22px -8px ${ACCENT_VAR[cert.accent]}`,
                }}
              >
                <cert.icon className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <h3 className="font-display text-sm font-semibold text-foreground">{cert.title}</h3>
                <p className="text-xs text-muted">{cert.issuer}</p>
              </div>
              {cert.href && (
                <ArrowUpRight className="ml-auto h-4 w-4 flex-shrink-0 text-muted transition-colors group-hover:text-foreground" />
              )}
            </>
          );
          const cls =
            "reveal group flex items-center gap-4 rounded-2xl border glass p-5 transition-transform duration-300 hover:-translate-y-1";
          return cert.href ? (
            <a
              key={cert.title}
              href={cert.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cls}
              style={{ borderColor: "var(--border)" }}
            >
              {inner}
            </a>
          ) : (
            <div key={cert.title} className={cls} style={{ borderColor: "var(--border)" }}>
              {inner}
            </div>
          );
        })}
      </div>

      {/* Education */}
      <div
        className="reveal mt-8 flex flex-col items-start gap-4 rounded-2xl border glass p-6 sm:flex-row sm:items-center"
        style={{ borderColor: "var(--border)" }}
      >
        <span
          className="grid h-12 w-12 place-items-center rounded-xl"
          style={{
            color: "var(--violet)",
            background: "rgba(255,255,255,0.04)",
            boxShadow: "0 0 24px -8px var(--violet)",
          }}
        >
          <GraduationCap className="h-6 w-6" />
        </span>
        <div>
          <h3 className="font-display text-base font-semibold text-foreground">
            B.Sc. Biochemistry
          </h3>
          <p className="text-sm text-muted">
            University of Agriculture, Makurdi · Benue State · 2015 – 2019
          </p>
        </div>
      </div>
    </div>
  </section>
);

/*************************************************
 * Contact
 *************************************************/
const CONTACTS = [
  { icon: Mail, label: "Email", value: "visiongideon@gmail.com", href: "mailto:visiongideon@gmail.com", accent: "cyan" as Accent },
  { icon: Phone, label: "Phone", value: "(+234) 915 831 2438", href: "tel:+2349158312438", accent: "magenta" as Accent },
  { icon: Linkedin, label: "LinkedIn", value: "vision-olufeagba", href: "https://www.linkedin.com/in/vision-olufeagba/", accent: "cyan" as Accent },
  { icon: Twitter, label: "X (Twitter)", value: "@SimplyVision_", href: "https://x.com/SimplyVision_", accent: "violet" as Accent },
  { icon: FileText, label: "Medium", value: "@SimplyVision_", href: "https://medium.com/@SimplyVision_", accent: "lime" as Accent },
];

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Open the user's mail client with a prefilled message.
    setTimeout(() => {
      const body = `Hi Gideon,%0D%0A%0D%0A${encodeURIComponent(formData.message)}%0D%0A%0D%0A— ${encodeURIComponent(
        formData.name
      )} (${encodeURIComponent(formData.email)})`;
      window.location.href = `mailto:visiongideon@gmail.com?subject=${encodeURIComponent(
        formData.subject || "Portfolio enquiry"
      )}&body=${body}`;
      setIsSubmitting(false);
      setSent(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 600);
  };

  const field =
    "w-full rounded-xl border bg-white/[0.02] px-4 py-2.5 text-foreground placeholder-muted transition-colors focus:outline-none";

  return (
    <section id="contact" className="relative py-24" style={{ background: "var(--bg-soft)" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Contact"
          title={<>Let&apos;s build something <span className="text-gradient">worth shipping</span></>}
          subtitle="Open to product roles and collaborations. Drop a line — I reply fast."
          accent="magenta"
        />

        <div className="grid gap-10 lg:grid-cols-5">
          <div className="reveal space-y-3 lg:col-span-2">
            {CONTACTS.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group flex items-center gap-4 rounded-xl border glass p-4 transition-transform duration-300 hover:-translate-y-0.5"
                style={{ borderColor: "var(--border)" }}
              >
                <span
                  className="grid h-10 w-10 place-items-center rounded-lg"
                  style={{
                    color: ACCENT_VAR[c.accent],
                    background: "rgba(255,255,255,0.04)",
                    boxShadow: `0 0 20px -8px ${ACCENT_VAR[c.accent]}`,
                  }}
                >
                  <c.icon className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-xs font-medium uppercase tracking-wider text-muted">{c.label}</div>
                  <div className="text-sm text-foreground">{c.value}</div>
                </div>
                <ArrowUpRight className="ml-auto h-4 w-4 text-muted transition-colors group-hover:text-foreground" />
              </a>
            ))}
            <div
              className="flex items-center gap-4 rounded-xl border glass p-4"
              style={{ borderColor: "var(--border)" }}
            >
              <span
                className="grid h-10 w-10 place-items-center rounded-lg"
                style={{ color: "var(--lime)", background: "rgba(255,255,255,0.04)" }}
              >
                <MapPin className="h-5 w-5" />
              </span>
              <div>
                <div className="text-xs font-medium uppercase tracking-wider text-muted">Location</div>
                <div className="text-sm text-foreground">Nigeria · Open to Remote</div>
              </div>
            </div>
          </div>

          <form
            onSubmit={onSubmit}
            className="reveal rounded-2xl border glass p-6 sm:p-8 lg:col-span-3"
            style={{ borderColor: "var(--border)" }}
            noValidate
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-foreground">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={field}
                  style={{ borderColor: "var(--border)" }}
                  autoComplete="name"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={field}
                  style={{ borderColor: "var(--border)" }}
                  autoComplete="email"
                />
              </div>
            </div>
            <div className="mt-5">
              <label htmlFor="subject" className="mb-2 block text-sm font-medium text-foreground">
                Subject
              </label>
              <input
                id="subject"
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className={field}
                style={{ borderColor: "var(--border)" }}
              />
            </div>
            <div className="mt-5">
              <label htmlFor="message" className="mb-2 block text-sm font-medium text-foreground">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell me about your product, team, or role..."
                className={`${field} resize-none`}
                style={{ borderColor: "var(--border)" }}
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-base font-semibold text-bg transition-transform hover:-translate-y-0.5 disabled:opacity-60"
              style={{
                background: "linear-gradient(135deg, var(--cyan), var(--violet))",
                boxShadow: "0 0 28px -8px var(--cyan)",
              }}
            >
              {isSubmitting ? "Opening mail…" : sent ? "Message ready ✓" : "Send Message"}
              {!isSubmitting && !sent && <ArrowUpRight className="h-5 w-5" />}
            </button>
            {sent && (
              <p className="mt-3 text-center text-xs text-muted">
                Your mail app should have opened. If not, email{" "}
                <span style={{ color: "var(--cyan)" }}>visiongideon@gmail.com</span> directly.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

/*************************************************
 * Footer
 *************************************************/
const SOCIALS = [
  { icon: Linkedin, href: "https://www.linkedin.com/in/vision-olufeagba/", label: "LinkedIn" },
  { icon: Twitter, href: "https://x.com/SimplyVision_", label: "X (Twitter)" },
  { icon: FileText, href: "https://medium.com/@SimplyVision_", label: "Medium" },
  { icon: Mail, href: "mailto:visiongideon@gmail.com", label: "Email" },
];

const Footer: React.FC = () => (
  <footer className="relative border-t py-12" style={{ borderColor: "var(--border)" }}>
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="flex items-center gap-3">
          <span
            className="grid h-9 w-9 place-items-center rounded-lg font-mono text-sm text-bg"
            style={{ background: "linear-gradient(135deg, var(--cyan), var(--magenta))" }}
          >
            GV
          </span>
          <div>
            <div className="font-display font-bold text-foreground">Gideon Vision Olufeagba</div>
            <div className="text-xs text-muted">Product Manager · CPM</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
              aria-label={s.label}
              className="grid h-10 w-10 place-items-center rounded-full border text-muted transition-all duration-300 hover:-translate-y-0.5 hover:text-foreground"
              style={{ borderColor: "var(--border)" }}
            >
              <s.icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>

      <div
        className="mt-8 flex flex-col items-center justify-between gap-2 border-t pt-6 text-center text-xs text-muted sm:flex-row"
        style={{ borderColor: "var(--border)" }}
      >
        <p>© {new Date().getFullYear()} Gideon Vision Olufeagba. All rights reserved.</p>
        <p className="font-mono">Built with Next.js · Designed in the dark.</p>
      </div>
    </div>
  </footer>
);

/*************************************************
 * Root
 *************************************************/
const Portfolio: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsRun, setStatsRun] = useState(false);

  const activeSection = useScrollSpy(NAV_ITEMS.map((n) => n.id));
  useIntersection(statsRef, () => setStatsRun(true), { threshold: 0.3 });
  useReveal();

  return (
    <div className="relative min-h-screen">
      <Backdrop />
      <div className="relative z-10">
        <Navbar active={activeSection} isOpen={menuOpen} setOpen={setMenuOpen} />
        <Hero />
        <MarqueeStrip />
        <About statsRef={statsRef} statsRun={statsRun} />
        <Experience />
        <Services />
        <Work />
        <Certifications />
        <Contact />
        <Footer />
      </div>
    </div>
  );
};

export default Portfolio;
