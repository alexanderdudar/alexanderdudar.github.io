"use client";
import { useEffect, useRef } from "react";

function useFadeIn() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); observer.disconnect(); } },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function FadeItem({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); observer.disconnect(); } },
      { threshold: 0.06 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`fade-up ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export function About() {
  const ref = useFadeIn();
  return (
    <section ref={ref} id="about" className="py-20 md:py-32 px-8 fade-up">
      <div className="max-w-[780px] mx-auto">
        <p className="text-[clamp(1.5rem,3vw,2.25rem)] font-semibold leading-snug tracking-tight text-[#1d1d1f]" style={{ letterSpacing: "-0.02em" }}>
          Computer Engineering student at UBC. I work on technical and business projects at the intersection
          of engineering, data, and finance — spanning cloud infrastructure, consulting,
          and derivatives trading on my own account.
        </p>

        <div className="mt-20 flex flex-col md:flex-row items-start gap-10 md:gap-12">
          <div className="shrink-0 w-full md:w-auto">
            <img
              src="/headshot.png"
              alt="Alexander Dudar"
              className="w-full md:w-72 h-[26rem] md:h-[22rem] object-cover grayscale rounded-[1.5rem]"
              style={{ objectPosition: "center 40%" }}
            />
          </div>
          <div className="flex-1 flex flex-col justify-between gap-8">
            <p className="text-base text-[#6e6e73] leading-relaxed">
              Outside of work, I race motorsport, play organ and piano, and have worked with digital music production (DAWs) and live lighting design. I have also cooked and bartended professionally.
              I actively trade derivatives on my own portfolio and speak English, Russian,
              French, and am currently learning Mandarin. I tend to go deep on whatever I pick up.
            </p>
            <div className="grid grid-cols-3 gap-4 md:gap-6 border-t border-[#f0f0f0] pt-8">
              <div>
                <p className="text-3xl font-semibold tracking-tight text-[#1d1d1f]">4+</p>
                <p className="text-sm text-[#6e6e73] mt-1">Years professional software experience</p>
              </div>
              <div>
                <p className="text-3xl font-semibold tracking-tight text-[#1d1d1f]">2+</p>
                <p className="text-sm text-[#6e6e73] mt-1">Years client-facing consulting</p>
              </div>
              <div>
                <p className="text-3xl font-semibold tracking-tight text-[#1d1d1f]">+113%</p>
                <p className="text-sm text-[#6e6e73] mt-1">Avg. annual investment return</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Skills() {
  const skills = {
    "Languages": ["C", "C++", "Python", "Java", "JavaScript", "TypeScript", "SQL", "R", "HTML/CSS", "Verilog", "ARM/x86 Assembly", "VBA", "ABAP"],
    "Frameworks & Libraries": ["React.js", "Node.js", "Express.js", "Three.js", "JUnit"],
    "Cloud & DevOps": ["AWS", "GCP", "Azure", "Docker", "Kubernetes", "Jenkins", "CI/CD", "Linux/Unix", "TCP/IP"],
    "Tools": ["Git", "Jira", "Confluence", "Figma", "Excel / Power Query", "VS Code", "IntelliJ", "Vim", "Bash / PowerShell"],
    "Finance & Analytics": ["Derivatives Trading", "Options Strategies", "Portfolio Management", "Financial Modeling", "KPI Dashboards"],
  };
  const ref = useFadeIn();
  return (
    <section ref={ref} id="skills" className="py-20 md:py-32 px-8 bg-[#fafafa] fade-up">
      <div className="max-w-[780px] mx-auto">
        <h2 className="text-[2rem] font-semibold tracking-tight text-[#1d1d1f] mb-16">
          Skills
        </h2>
        <div className="space-y-10">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className="grid grid-cols-[1fr_2fr] gap-8 border-t border-[#e8e8ed] pt-10">
              <p className="text-sm font-medium text-[#1d1d1f]">{category}</p>
              <p className="text-sm text-[#6e6e73] leading-relaxed">
                {items.join(" · ")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const experience = [
  {
    company: "SAP",
    role: "Software Developer Intern",
    location: "Vancouver, Canada",
    period: "Aug 2025 – Present",
    bullets: [
      "Delivered a leaked K8s cluster workflow improvement project across 70+ AWS, GCP, and Azure landscapes, authoring standardized multi-stage deletion automation for ENIs, subnets, IGWs, ElastiCache, and VPCs.",
      "Designed resource cleanup tooling in Java, Python, and shell scripting with pre-deletion validation, structured logging, and retry logic — directly preventing deletion of a production VPC affecting 40+ enterprise customers.",
      "Built and maintained Kubernetes-based automation for AWS workloads using Docker, Jenkins, and shell scripting, reducing manual operational effort by 70–80%.",
      "Validated and debugged Redis and HANA Cloud provisioning on Kyma for AWS and Azure environments, ensuring correct bindings, connectivity, and service readiness for downstream workloads.",
    ],
  },
  {
    company: "SAP",
    role: "Technical Project Manager Intern",
    location: "Vancouver, Canada",
    period: "Jan 2025 – Aug 2025",
    bullets: [
      "Coordinated Agile delivery in Jira and Confluence across 25+ global teams supporting SAP Business Data Cloud, managing release checkpoints, design reviews, and cross-team projects with 200–600 tracked subtasks.",
      "Directed 160+ HANA2 to HANA Cloud migrations (1,800+ tenants) across AWS/GCP/Azure, coordinating all internal SAP systems worldwide; designed white-glove pipelines for Fortune 500 customers.",
      "Analyzed 3 years of datacenter CPU/RAM utilization across 40+ landscapes, informing seven-figure capacity planning decisions.",
      "Automated intern hiring workflows using Excel, Power Query, Python, and shell scripting — tracking 500+ candidates per cycle and saving 600+ recruiting hours annually.",
    ],
  },
  {
    company: "The University of British Columbia",
    role: "Undergraduate Teaching Assistant",
    location: "Vancouver, Canada",
    period: "Sep 2024 – Dec 2024",
    bullets: [
      "Supported instruction for ELEC 201 (Circuit Analysis) — a 200+ student course covering DC/AC circuits, op-amps, and circuit theorems.",
      "Led laboratory sessions and coordinated examination logistics, providing hands-on guidance and technical support to students.",
    ],
  },
  {
    company: "The Best One (TBO)",
    role: "Technical Project Manager",
    location: "Calgary & Toronto, Canada",
    period: "May 2023 – Dec 2024",
    bullets: [
      "Engineered an automated extraction pipeline using shell scripting and Tekla Open API to transform structural steel BIM models into web-ready data, saving 300+ dev hours.",
      "Developed 200+ interactive React.js 3D BIM visualization tools, optimizing rendering and data loading for complex assemblies of 350K–2M components.",
      "Led data-driven UI/UX development using Figma and PowerPoint, designing 200+ interface components across desktop, tablet, and mobile.",
      "Built and optimized 500+ Excel Power Query workflows and financial/operational models supporting executive-level decision-making.",
    ],
  },
  {
    company: "The Best One (TBO)",
    role: "Structural Engineer Intern",
    location: "Calgary & Toronto, Canada",
    period: "May 2023 – Aug 2023",
    bullets: [
      "Performed structural steel detailing in Tekla Structures, designing and drafting custom connection and fabrication plans for a Calgary City Hall improvement project, coordinating geometry, member sizing, and construction-ready documentation.",
      "Built internal automation tooling and contributed to early-stage web development for the company's digital platform.",
    ],
  },
  {
    company: "UBC MAD",
    role: "Software Developer & Team Lead",
    location: "Vancouver, Canada",
    period: "Sep 2023 – Aug 2024",
    bullets: [
      "Led a 5-person software team across 5+ engineering projects, implementing GitHub workflows and CI pipelines that cut merge conflicts by 40%.",
      "Delivered production-quality C/C++, Python, and JavaScript code across 15+ hackathon and course projects.",
    ],
  },
  {
    company: "Helium",
    role: "Data Analyst",
    location: "Remote, USA & Canada",
    period: "Mar 2021 – Jul 2023",
    bullets: [
      "Researched Helium's Proof-of-Coverage protocol and LoRaWAN-based hotspot network, evaluating coverage verification and anti-gaming mechanisms across a 100K+ node decentralized wireless infrastructure.",
      "Analyzed on-chain network data to assess hotspot performance, reward distribution patterns, and protocol integrity across geographic regions.",
    ],
  },
];

export function Experience() {
  const ref = useFadeIn();

  // Group consecutive entries by company
  const groups: { company: string; location: string; jobs: typeof experience }[] = [];
  for (const job of experience) {
    const last = groups[groups.length - 1];
    if (last && last.company === job.company) {
      last.jobs.push(job);
    } else {
      groups.push({ company: job.company, location: job.location, jobs: [job] });
    }
  }

  return (
    <section ref={ref} id="experience" className="py-20 md:py-32 px-8 fade-up">
      <div className="max-w-[780px] mx-auto">
        <h2 className="text-[2rem] font-semibold tracking-tight text-[#1d1d1f] mb-16">
          Experience
        </h2>
        <div className="space-y-0">
          {groups.map((group, gi) => (
            <FadeItem key={gi} delay={gi * 80} className="border-t border-[#e8e8ed] py-14">
              {/* Company header */}
              <p className="text-base font-semibold text-[#1d1d1f] tracking-tight mb-8">{group.company}</p>
              {/* Roles */}
              <div className="space-y-10">
                {group.jobs.map((job, ji) => (
                  <div key={ji}>
                    <div className="flex items-start justify-between mb-4">
                      <p className="text-sm font-medium text-[#1d1d1f]">{job.role} · {job.location}</p>
                      <p className="text-sm text-[#6e6e73] shrink-0 ml-8">{job.period}</p>
                    </div>
                    <ul className="space-y-3">
                      {job.bullets.map((b, bi) => (
                        <li key={bi} className="text-sm text-[#6e6e73] leading-relaxed pl-4 border-l border-[#e8e8ed]">
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </FadeItem>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Education() {
  const courses = [
    "Computing Systems & Architecture",
    "Operating Systems",
    "Software Construction",
    "Algorithms & Data Structures",
    "Statistics & Data Analytics",
    "Algorithm Design & Analysis",
    "Relational Databases",
    "Machine Learning",
    "Artificial Intelligence",
    "Economics & Economic Theory",
  ];

  const ref = useFadeIn();
  return (
    <section ref={ref} id="education" className="py-20 md:py-32 px-8 bg-[#fafafa] fade-up">
      <div className="max-w-[780px] mx-auto">
        <h2 className="text-[2rem] font-semibold tracking-tight text-[#1d1d1f] mb-16">
          Education
        </h2>
        <div className="border-t border-[#e8e8ed] pt-14">
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-base font-semibold text-[#1d1d1f] tracking-tight">
                The University of British Columbia
              </p>
              <p className="text-sm text-[#6e6e73] mt-0.5">
                BASc, Computer Engineering · GPA 3.83 / 4.00
              </p>
            </div>
            <p className="text-sm text-[#6e6e73] shrink-0 ml-8">Expected Apr 2027</p>
          </div>
          <p className="text-sm text-[#6e6e73] leading-relaxed">
            {courses.join(" · ")}
          </p>
        </div>
      </div>
    </section>
  );
}

const projects = [
  {
    name: "Personal Investment Portfolio",
    tags: ["Derivatives", "Portfolio Management"],
    period: "Jan 2022 – Present",
    description:
      "Managing a mid 6-figure CA$ portfolio (with additional 6-figure margin exposure), trading derivatives across semiconductors, gold, silver, NASDAQ, and the S&P 500. +113.72% average annual returns; 32.18% return in the most recent quarter.",
  },
  {
    name: "debate.ai",
    tags: ["JavaScript", "Node.js", "OpenAI API"],
    period: "Oct – Dec 2024",
    description:
      "Full-stack AI debating app using Node.js, GPT-4 API, and vanilla JS/CSS/HTML. Developed a scoring algorithm evaluating argument coherence, tone, and accuracy, supporting concurrent multi-room sessions.",
  },
  {
    name: "Pinpoint",
    tags: ["React.js", "MongoDB", "Google Maps API", "Node.js"],
    period: "Jan 2024",
    description:
      "Geotagged social media app with the MERN stack and Google Maps & Places APIs. Instagram-style posts linked to real-world locations; interactive 3D maps for high-traffic areas using MappedIn API. Built at a hackathon.",
  },
];

export function Projects() {
  const ref = useFadeIn();
  return (
    <section ref={ref} id="projects" className="py-20 md:py-32 px-8 fade-up">
      <div className="max-w-[780px] mx-auto">
        <h2 className="text-[2rem] font-semibold tracking-tight text-[#1d1d1f] mb-16">
          Projects
        </h2>
        <div className="space-y-0">
          {projects.map((project, i) => (
            <FadeItem key={i} delay={i * 80} className="border-t border-[#e8e8ed] py-14">
              <div className="flex items-start justify-between mb-4">
                <p className="text-base font-semibold text-[#1d1d1f] tracking-tight">
                  {project.name}
                </p>
                <p className="text-sm text-[#6e6e73] shrink-0 ml-8">{project.period}</p>
              </div>
              <div className="flex flex-wrap gap-2 mb-5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-full bg-[#f0f0f0] text-[#6e6e73]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-sm text-[#6e6e73] leading-relaxed">{project.description}</p>
            </FadeItem>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  const ref = useFadeIn();
  return (
    <section ref={ref} id="contact" className="py-20 md:py-32 px-8 bg-[#fafafa] fade-up">
      <div className="max-w-[780px] mx-auto">
        <h2 className="text-[2rem] font-semibold tracking-tight text-[#1d1d1f] mb-16">
          Contact
        </h2>
        <div className="border-t border-[#e8e8ed] pt-14 space-y-0">
          {[
            { label: "Email", value: "1.alexander.dudar@gmail.com", href: "mailto:1.alexander.dudar@gmail.com" },
            { label: "LinkedIn", value: "linkedin.com/in/alexander-dudar", href: "https://www.linkedin.com/in/alexander-dudar" },
            { label: "GitHub", value: "github.com/alexanderdudar", href: "https://github.com/alexanderdudar" },
            { label: "Phone", value: "+1 (403) 903 9146", href: "tel:+14039039146" },
          ].map(({ label, value, href }) => (
            <div key={label} className="flex items-center justify-between py-2">
              <p className="text-sm font-medium text-[#1d1d1f]">{label}</p>
              <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="text-sm text-[#6e6e73] hover:text-[#1d1d1f] transition-colors"
              >
                {value}
              </a>
            </div>
          ))}
        </div>
        <p className="text-xs text-[#aeaeb2] mt-16">
          © {new Date().getFullYear()} Alexander Dudar
        </p>
      </div>
    </section>
  );
}
