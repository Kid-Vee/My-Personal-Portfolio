'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Menu,
  X,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Award,
  Target,
  Users,
  BarChart,
  BookOpen,
  GitBranch,
  FileText,
  Twitter,
  Cloud,
  Brain,
  Briefcase,
  Globe,
} from "lucide-react";

/*************************************************
 * Data (outside component to avoid re-creation)
 *************************************************/
const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "services", label: "Services" },
  { id: "portfolio", label: "Portfolio" },
  { id: "contact", label: "Contact" },
] as const;

const STATS = [
  { value: 25, label: "Feature Adoption Improvement", suffix: "%" },
  { value: 90, label: "On-time Delivery Rate", suffix: "%" },
  { value: 85, label: "Stakeholder Approval Rating", suffix: "%" },
  { value: 65, label: "User Satisfaction Increase", suffix: "%" },
] as const;

const SKILLS = [
  "Jira",
  "Figma",
  "Miro",
  "Mixpanel",
  "Firebase",
  "Scrum/Agile",
  "AWS",
  "Product Strategy",
  "User Research",
  "Stakeholder Management",
  "Data Analytics",
  "Roadmapping",
] as const;

const SERVICES = [
  {
    icon: Target,
    title: "Product Strategy & Roadmapping",
    description:
      "Develop comprehensive product strategies and quarterly roadmaps aligned with business objectives. Synthesize stakeholder feedback and market research into actionable plans.",
  },
  {
    icon: GitBranch,
    title: "Agile Product Management",
    description:
      "Facilitation of Scrum ceremonies including planning, standups, and retrospectives. Maintain high velocity and delivery consistency.",
  },
  {
    icon: BarChart,
    title: "User Research & Analytics",
    description:
      "Conduct research and leverage tools like Mixpanel, LogRocket, and Firebase to drive data-informed decisions.",
  },
  {
    icon: Users,
    title: "Stakeholder Management",
    description:
      "Enable clear communication across cross-functional teams and business stakeholders. Lead change management and drive buy‑in.",
  },
  {
    icon: FileText,
    title: "Product Backlog Management",
    description:
      "Prioritize complex backlogs based on business value. Create PRDs and user stories that guide delivery.",
  },
  {
    icon: BookOpen,
    title: "EdTech & AgTech Expertise",
    description:
      "Specialized experience building in EdTech and AgTech with deep understanding of user needs and market dynamics.",
  },
] as const;

const EXPERIENCES = [
  {
    title: "Lead Product Manager (Trade)",
    company: "AFEX",
    location: "Abuja",
    duration: "April 2022 - Present",
    achievements: [
      "Designed quarterly product roadmaps synthesizing initiatives from 10+ stakeholders, achieving 25% improvement in feature adoption rates",
      "Managed product backlog of 80+ user stories with 90% on-time delivery rate across 9 development sprints",
      "Led bi-weekly sprint planning sessions for 5-person development team with 90% sprint goal completion rate",
      "Facilitated communication with 20+ cross-functional business stakeholders across multiple departments",
      "Achieved 85% stakeholder approval rating through effective change management presentations",
      "Reduced revision cycles by 30% through efficient design reviews and stakeholder sign-offs",
    ],
  },
  {
    title: "Product Lead (IDSS)",
    company: "Educratic Technologies Limited",
    location: "Remote",
    duration: "May 2024 - April 2025",
    achievements: [
      "Led end-to-end product development for learning management platform serving exam class students and professionals",
      "Defined product vision and development roadmaps for 4 core modules (assessment, content delivery, analytics, and admin)",
      "Conducted extensive user research with 80+ teachers, students, and administrators",
      "Achieved 65% improvement in user satisfaction scores through user-centric design approach",
      "Managed complete sprint cycles including planning, execution, review, and retrospective activities",
      "Coordinated cross-functional collaboration between development, design, and business teams",
    ],
  },
] as const;

const PORTFOLIO_ITEMS = [
  {
    title: "Agricultural Trading Platform",
    company: "AFEX Trade Platform",
    description:
      "Led product development for AFEX's trade platform, managing quarterly roadmaps and achieving 25% improvement in feature adoption through data-driven prioritization.",
    tags: ["Product Strategy", "Agile/Scrum", "Stakeholder Management", "AgTech"],
    icon: Globe,
  },
  {
    title: "EdTech Platform (IDSS)",
    company: "Learning Management System",
    description:
      "Developed learning management platform with 4 core modules; conducted research with 80+ participants and achieved 65% improvement in user satisfaction.",
    tags: ["EdTech", "User Research", "Product Development", "Analytics"],
    icon: BookOpen,
  },
  {
    title: "Data-Driven Product Insights",
    company: "Product Analytics Dashboard",
    description:
      "Implemented analytics framework using Mixpanel, LogRocket, and Firebase Crashlytics to guide product decisions and optimize UX.",
    tags: ["Analytics", "Mixpanel", "Firebase", "Data Strategy"],
    icon: BarChart,
  },
  {
    title: "Sprint Management Excellence",
    company: "Agile Transformation",
    description:
      "Achieved 92% velocity consistency across development sprints while maintaining 98% daily scrum attendance and reducing blockers by 40%.",
    tags: ["Scrum Master", "Team Leadership", "Process Optimization", "Agile"],
    icon: GitBranch,
  },
  {
    title: "Comprehensive PRD Framework",
    company: "Product Documentation",
    description:
      "Developed 12+ PRDs and user stories, reducing revision cycles by 30% through effective stakeholder collaboration.",
    tags: ["Documentation", "Requirements", "User Stories", "Process"],
    icon: FileText,
  },
  {
    title: "Stakeholder Alignment Success",
    company: "Change Management",
    description:
      "Delivered change management presentations to 20+ team members, achieving 85% stakeholder approval rating through clear communication and effective UAT.",
    tags: ["Change Management", "Presentations", "UAT", "Communication"],
    icon: Users,
  },
] as const;

/*************************************************
 * Utility hooks
 *************************************************/
function useDebouncedCallback<T extends (...args: any[]) => void>(cb: T, delay = 100) {
  const timeoutRef = useRef<number | null>(null);
  const memoCb = useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => cb(...args), delay);
    },
    [cb, delay]
  );
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  return memoCb as T;
}

function useScrollSpy(ids: readonly string[]) {
  const [active, setActive] = useState(ids[0]);
  const handle = useDebouncedCallback(() => {
    const y = window.scrollY + 100;
    for (const id of ids) {
      const el = document.getElementById(id);
      if (!el) continue;
      const { offsetTop, offsetHeight } = el;
      if (y >= offsetTop && y < offsetTop + offsetHeight) {
        setActive(id);
        break;
      }
    }
  }, 50);

  useEffect(() => {
    handle();
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, [handle]);

  return active;
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

/*************************************************
 * Reusable UI bits
 *************************************************/
const SectionTitle: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <div className="text-center mb-12">
    <h2 className="text-4xl font-bold text-slate-900 mb-4">{title}</h2>
    {subtitle ? <p className="text-lg text-slate-600 max-w-2xl mx-auto">{subtitle}</p> : null}
  </div>
);

const AnimatedStat: React.FC<{ value: number; label: string; suffix?: string; run: boolean }> = ({
  value,
  label,
  suffix = "",
  run,
}) => {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!run) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setCount(value);
      return;
    }
    const duration = 900; // ms
    const start = performance.now();
    const startVal = 0;

    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      const next = Math.round(startVal + (value - startVal) * eased);
      setCount(next);
      if (t < 1) rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [run, value]);

  return (
    <div className="bg-slate-50 p-6 rounded-xl text-center">
      <div className="text-3xl font-bold text-slate-900 mb-2">
        {count}
        {suffix}
      </div>
      <div className="text-sm text-slate-600">{label}</div>
    </div>
  );
};

/*************************************************
 * Sections
 *************************************************/
const Navbar: React.FC<{
  active: string;
  isOpen: boolean;
  setOpen: (v: boolean) => void;
}> = ({ active, isOpen, setOpen }) => {
  const scrolled = useScrollShadow();
  const onClickLink = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-lg" : "bg-white/95 backdrop-blur-md"
      }`}
      role="navigation"
      aria-label="Primary"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <a href="#home" onClick={onClickLink("home")} className="font-bold text-xl text-slate-900">
              VISION OLUFEAGBA
            </a>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={onClickLink(item.id)}
                className={`text-sm font-medium transition-all duration-200 relative py-2 ${
                  active === item.id ? "text-slate-900" : "text-slate-600 hover:text-slate-900"
                }`}
                aria-current={active === item.id ? "page" : undefined}
              >
                {item.label}
                {active === item.id && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-slate-900" />
                )}
              </a>
            ))}
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-6 h-6 text-slate-900" /> : <Menu className="w-6 h-6 text-slate-900" />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 shadow-lg">
          <div className="px-4 py-2 space-y-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={onClickLink(item.id)}
                className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  active === item.id
                    ? "text-slate-900 bg-slate-100"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
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

function useScrollShadow() {
  const [scrolled, setScrolled] = useState(false);
  const onScroll = useDebouncedCallback(() => setScrolled(window.scrollY > 50), 50);
  useEffect(() => {
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);
  return scrolled;
}

const Hero: React.FC = () => (
  <section id="home" className="min-h-screen flex items-center bg-slate-900 text-white pt-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-4xl">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">Gideon Vision Olufeagba</h1>
        <p className="text-2xl font-semibold mb-2 text-slate-300">Product Manager</p>
        <p className="text-lg mb-6 text-slate-400">Certified Product Manager (CPM) | AWS Certified Cloud Practitioner</p>
        <p className="text-lg mb-8 text-slate-300 leading-relaxed">
          Results-driven Product Manager with expertise in end-to-end product development, strategic roadmap planning, and
          cross-functional leadership. Proven success designing quarterly roadmaps, managing complex backlogs, and facilitating Agile
          methodologies across EdTech and AgTech.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="#portfolio"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-3 bg-white text-slate-900 rounded-lg font-semibold hover:bg-slate-100 transition-colors text-center"
          >
            View My Work
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-slate-900 transition-colors text-center"
          >
            Let&apos;s Connect
          </a>
        </div>
      </div>
    </div>
  </section>
);

const About: React.FC<{ statsRef: React.RefObject<HTMLDivElement | null>; statsRun: boolean } & { skills: readonly string[] }> = ({
  statsRef,
  statsRun,
  skills,
}) => (
  <section id="about" className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionTitle title="About Me" subtitle="Discover my journey in product management and passion for creating impactful digital solutions" />
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h3 className="text-2xl font-bold text-slate-900 mb-4">Results-Driven Product Leader</h3>
          <p className="text-slate-600 mb-4">
            I&apos;m a passionate Product Manager based in Abuja, Nigeria, specializing in end-to-end product development across EdTech and AgTech.
            My approach blends data-driven decision making with user-centric design and clear stakeholder alignment.
          </p>
          <p className="text-slate-600 mb-8">
            With certifications in Product Management, AWS Cloud, and Scrum fundamentals, I bring both strategic vision and technical understanding to every project.
          </p>
          <div ref={statsRef} className="grid grid-cols-2 gap-4 mb-8">
            {STATS.map((s, i) => (
              <AnimatedStat key={i} value={s.value} label={s.label} suffix={s.suffix} run={statsRun} />
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span key={skill} className="px-4 py-2 bg-slate-900 text-white rounded-full text-sm font-medium">
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div className="bg-slate-100 rounded-2xl h-96 flex items-center justify-center">
          <div className="text-center text-slate-500">
            <Briefcase className="w-16 h-16 mx-auto mb-4" />
            <p className="text-lg">Professional Photo</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Experience: React.FC = () => (
  <section id="experience" className="py-20 bg-slate-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionTitle title="Professional Experience" subtitle="My journey in product management across EdTech and AgTech" />
      <div className="max-w-4xl mx-auto space-y-8">
        {EXPERIENCES.map((exp) => (
          <article key={exp.title} className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">{exp.title}</h3>
            <div className="text-lg font-semibold text-slate-700 mb-1">
              {exp.company} - {exp.location}
            </div>
            <div className="text-sm text-slate-500 mb-4">{exp.duration}</div>
            <ul className="space-y-3 list-disc pl-5">
              {exp.achievements.map((ach) => (
                <li key={ach} className="text-slate-600 leading-relaxed">
                  {ach}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  </section>
);

const Services: React.FC = () => (
  <section id="services" className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionTitle title="Services" subtitle="Comprehensive product management solutions to drive your business forward" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {SERVICES.map((s) => (
          <div
            key={s.title}
            className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="w-12 h-12 bg-slate-900 text-white rounded-lg flex items-center justify-center mb-4">
              {React.createElement(s.icon, { className: "w-6 h-6" })}
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">{s.title}</h3>
            <p className="text-slate-600 leading-relaxed">{s.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const PortfolioGrid: React.FC = () => (
  <section id="portfolio" className="py-20 bg-slate-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionTitle title="Portfolio" subtitle="Key projects and outcomes" />
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
        {PORTFOLIO_ITEMS.map((item) => (
          <div
            key={item.title}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
          >
            <div className="h-40 bg-slate-900 flex items-center justify-center text-white">
              {React.createElement(item.icon, { className: "w-10 h-10" })}
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-sm text-slate-500 mb-3">{item.company}</p>
              <p className="text-slate-600 mb-4 flex-1">{item.description}</p>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate async submission
    setTimeout(() => {
            alert(`Thank you, ${formData.name}! Your message has been sent successfully.`);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsSubmitting(false);
    }, 1200);
  };

  return (
    <section id="contact" className="py-20 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Get In Touch" subtitle="Let&apos;s discuss your product needs and move your roadmap forward" />
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-4">Let&apos;s Work Together</h3>
            <p className="text-slate-300 mb-8">
              I help teams build exceptional products through clear strategy, user‑centered design, and data‑informed decisions.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a href="mailto:visiongideon@gmail.com" className="flex items-center p-3 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors">
                <Mail className="w-5 h-5 mr-3 text-slate-400" />
                <div>
                  <div className="font-semibold text-sm">Email</div>
                  <div className="text-slate-300 text-sm">visiongideon@gmail.com</div>
                </div>
              </a>
              <a href="tel:+2349158312438" className="flex items-center p-3 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors">
                <Phone className="w-5 h-5 mr-3 text-slate-400" />
                <div>
                  <div className="font-semibold text-sm">Phone</div>
                  <div className="text-slate-300 text-sm">(+234) 9158312438</div>
                </div>
              </a>
              <a
                href="https://www.linkedin.com/in/vision-olufeagba/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-3 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"
              >
                <Linkedin className="w-5 h-5 mr-3 text-slate-400" />
                <div>
                  <div className="font-semibold text-sm">LinkedIn</div>
                  <div className="text-slate-300 text-sm">vision-olufeagba</div>
                </div>
              </a>
              <a
                href="https://x.com/SimplyVision_"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-3 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"
              >
                <Twitter className="w-5 h-5 mr-3 text-slate-400" />
                <div>
                  <div className="font-semibold text-sm">X (Twitter)</div>
                  <div className="text-slate-300 text-sm">@visionolufeagba</div>
                </div>
              </a>
              <a
                href="https://medium.com/@SimplyVision_"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-3 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"
              >
                <FileText className="w-5 h-5 mr-3 text-slate-400" />
                <div>
                  <div className="font-semibold text-sm">Medium</div>
                  <div className="text-slate-300 text-sm">@visionolufeagba</div>
                </div>
              </a>
              <div className="flex items-center p-3 bg-slate-800 rounded-lg">
                <MapPin className="w-5 h-5 mr-3 text-slate-400" />
                <div>
                  <div className="font-semibold text-sm">Location</div>
                  <div className="text-slate-300 text-sm">Abuja, Nigeria</div>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={onSubmit} className="bg-slate-800 rounded-xl p-8" noValidate>
            <div className="mb-6">
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:border-white text-white"
                autoComplete="name"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:border-white text-white"
                autoComplete="email"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="subject" className="block text-sm font-medium mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                required
                value={formData.subject}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:border-white text-white"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                required
                value={formData.message}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell me about your product management needs..."
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:border-white text-white placeholder-slate-400"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-8 py-3 bg-white text-slate-900 rounded-lg font-semibold hover:bg-slate-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

const Footer: React.FC = () => (
  <footer className="bg-slate-950 text-white py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        <div>
          <h3 className="text-lg font-bold mb-4">Gideon Vision Olufeagba (CPM)</h3>
          <p className="text-slate-400 text-sm mb-4">
            Results-driven Product Manager specializing in end-to-end product development, strategic planning, and cross-functional leadership.
          </p>
          <div className="flex space-x-3">
            <a
              href="https://www.linkedin.com/in/vision-olufeagba/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-slate-700 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://x.com/SimplyVision_"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-slate-700 transition-colors"
              aria-label="X (Twitter)"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href="https://medium.com/@SimplyVision_"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-slate-700 transition-colors"
              aria-label="Medium"
            >
              <FileText className="w-4 h-4" />
            </a>
            <a
              href="mailto:visiongideon@gmail.com"
              className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-slate-700 transition-colors"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4">Expertise</h3>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>Product Strategy & Roadmapping</li>
            <li>Agile Product Management</li>
            <li>User Research & Analytics</li>
            <li>Stakeholder Management</li>
            <li>EdTech & AgTech Solutions</li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm text-slate-400">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="hover:text-white transition-colors"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4">Certifications</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="https://certificates.aipmm.com/e7039c87-ad2f-4e1a-8a2d-216dc9dad49f#acc.QjXTrEkP"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-slate-400 hover:text-white transition-colors"
              >
                <Award className="w-4 h-4 mr-2 flex-shrink-0" />
                <span>Certified Product Manager (CPM)</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.credly.com/badges/4f92fbdc-f6a5-4701-acbb-cdcca944dc0b/public_url"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-slate-400 hover:text-white transition-colors"
              >
                <Cloud className="w-4 h-4 mr-2 flex-shrink-0" />
                <span>AWS Certified Cloud Practitioner</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.udacity.com/certificate/e/c582a9d4-b93a-11ee-b642-1739e588702b"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-slate-400 hover:text-white transition-colors"
              >
                <BookOpen className="w-4 h-4 mr-2 flex-shrink-0" />
                <span>Product Manager Nanodegree</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.scrumstudy.com/certification/verify?type=SFC&number=973461"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-slate-400 hover:text-white transition-colors"
              >
                <GitBranch className="w-4 h-4 mr-2 flex-shrink-0" />
                <span>Scrum Fundamentals Certified</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.credly.com/badges/267d90bc-0660-4300-8ebf-3c88317a8597/linked_in_profile"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-slate-400 hover:text-white transition-colors"
              >
                <Brain className="w-4 h-4 mr-2 flex-shrink-0" />
                <span>AI for Product Management</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-800 pt-8 text-center">
        <p className="text-sm text-slate-400">© {new Date().getFullYear()} Gideon Vision Olufeagba (CPM). All rights reserved.</p>
      </div>
    </div>
  </footer>
);

/*************************************************
 * Root component
 *************************************************/
const Portfolio: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsRun, setStatsRun] = useState(false);

  const activeSection = useScrollSpy(NAV_ITEMS.map((n) => n.id));
  useIntersection(statsRef, () => setStatsRun(true), { threshold: 0.3 });

  // Memoize skills to a plain array for mapping (types are readonly)
  const skills = useMemo(() => [...SKILLS], []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar active={activeSection} isOpen={menuOpen} setOpen={setMenuOpen} />
      <Hero />
      <About statsRef={statsRef} statsRun={statsRun} skills={skills} />
      <Experience />
      <Services />
      <PortfolioGrid />
      <Contact />
      <Footer />
    </div>
  );
};

export default Portfolio;
