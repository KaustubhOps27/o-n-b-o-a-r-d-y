import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, type ReactNode } from "react";
import {
  Sparkles,
  Rocket,
  ArrowRight,
  ArrowLeft,
  Palette,
  Code2,
  Megaphone,
  ShoppingBag,
  Zap,
  Snail,
  Mountain,
  FileSignature,
  Hammer,
  PartyPopper,
  FileText,
  FolderOpen,
  KanbanSquare,
  CalendarHeart,
  MessageCircleHeart,
  Trophy,
  Check,
  Smile,
  Building2,
  User,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Onboardy — Say Hello" },
      { name: "description", content: "A playful client onboarding portal that makes kickoff feel like a celebration." },
    ],
  }),
  component: Index,
});

type ProjectType = "brand" | "website" | "marketing" | "shop";
type Pace = "chill" | "steady" | "rocket";

function Index() {
  const [view, setView] = useState<"intake" | "mission">("intake");

  return view === "intake" ? (
    <Intake onLaunch={() => setView("mission")} />
  ) : (
    <Mission onRestart={() => setView("intake")} />
  );
}

/* ------------------------------ INTAKE ------------------------------ */

function Intake({ onLaunch }: { onLaunch: () => void }) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [projectType, setProjectType] = useState<ProjectType | null>(null);
  const [pace, setPace] = useState<Pace | null>(null);
  const [launching, setLaunching] = useState(false);

  const steps = ["hello", "project", "pace", "launch"] as const;
  const total = steps.length;

  const canNext =
    (step === 0 && name.trim().length > 0) ||
    (step === 1 && projectType !== null) ||
    (step === 2 && pace !== null) ||
    step === 3;

  const handleLaunch = () => {
    setLaunching(true);
    setTimeout(onLaunch, 900);
  };

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center px-5 py-10">
      <div className="w-full max-w-xl">
        {/* Brand */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="size-11 rounded-2xl bg-primary text-primary-foreground grid place-items-center shadow-float animate-bouncy">
            <Sparkles className="size-6" strokeWidth={2.5} />
          </div>
          <span className="font-display text-2xl font-extrabold tracking-tight">Onboardy</span>
        </div>

        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === step
                  ? "w-10 bg-primary"
                  : i < step
                    ? "w-2.5 bg-mint"
                    : "w-2.5 bg-border"
              }`}
            />
          ))}
        </div>

        {/* Card */}
        <div
          key={step}
          className="bg-card squircle-lg p-7 sm:p-9 shadow-float animate-pop-in border border-border/60"
        >
          {step === 0 && (
            <StepBlock
              eyebrow="Step 1 of 4"
              icon={<Smile className="size-7" strokeWidth={2.5} />}
              tint="coral"
              title="Say hello!"
              subtitle="We're so excited to meet you. Let's start with the basics."
            >
              <PlayfulInput
                icon={<User className="size-5" />}
                label="Your name"
                placeholder="Ada Lovelace"
                value={name}
                onChange={setName}
              />
              <PlayfulInput
                icon={<Building2 className="size-5" />}
                label="Company (optional)"
                placeholder="Difference Engines Co."
                value={company}
                onChange={setCompany}
              />
            </StepBlock>
          )}

          {step === 1 && (
            <StepBlock
              eyebrow="Step 2 of 4"
              icon={<Palette className="size-7" strokeWidth={2.5} />}
              tint="mint"
              title={`Nice to meet you, ${name.split(" ")[0] || "friend"}!`}
              subtitle="What kind of magic are we cooking up together?"
            >
              <div className="grid grid-cols-2 gap-3">
                <IconCard
                  selected={projectType === "brand"}
                  onClick={() => setProjectType("brand")}
                  tint="coral"
                  icon={<Palette className="size-8" strokeWidth={2.2} />}
                  label="Brand"
                  desc="Identity & visuals"
                />
                <IconCard
                  selected={projectType === "website"}
                  onClick={() => setProjectType("website")}
                  tint="mint"
                  icon={<Code2 className="size-8" strokeWidth={2.2} />}
                  label="Website"
                  desc="Design & build"
                />
                <IconCard
                  selected={projectType === "marketing"}
                  onClick={() => setProjectType("marketing")}
                  tint="tangerine"
                  icon={<Megaphone className="size-8" strokeWidth={2.2} />}
                  label="Marketing"
                  desc="Campaigns & ads"
                />
                <IconCard
                  selected={projectType === "shop"}
                  onClick={() => setProjectType("shop")}
                  tint="lilac"
                  icon={<ShoppingBag className="size-8" strokeWidth={2.2} />}
                  label="E-commerce"
                  desc="Sell beautifully"
                />
              </div>
            </StepBlock>
          )}

          {step === 2 && (
            <StepBlock
              eyebrow="Step 3 of 4"
              icon={<Zap className="size-7" strokeWidth={2.5} />}
              tint="tangerine"
              title="Pick your pace"
              subtitle="How fast should this rocket fly?"
            >
              <div className="grid grid-cols-1 gap-3">
                <IconCard
                  horizontal
                  selected={pace === "chill"}
                  onClick={() => setPace("chill")}
                  tint="mint"
                  icon={<Snail className="size-8" strokeWidth={2.2} />}
                  label="Chill mode"
                  desc="A calm 6–8 week journey"
                />
                <IconCard
                  horizontal
                  selected={pace === "steady"}
                  onClick={() => setPace("steady")}
                  tint="lilac"
                  icon={<Mountain className="size-8" strokeWidth={2.2} />}
                  label="Steady climb"
                  desc="Balanced 4 week sprint"
                />
                <IconCard
                  horizontal
                  selected={pace === "rocket"}
                  onClick={() => setPace("rocket")}
                  tint="coral"
                  icon={<Rocket className="size-8" strokeWidth={2.2} />}
                  label="Rocket fuel"
                  desc="Ship in 2 weeks flat"
                />
              </div>
            </StepBlock>
          )}

          {step === 3 && (
            <StepBlock
              eyebrow="Step 4 of 4"
              icon={<PartyPopper className="size-7" strokeWidth={2.5} />}
              tint="lilac"
              title="You're all set!"
              subtitle="Hit the big button and we'll start prepping your space."
            >
              <div className="bg-secondary squircle p-5 space-y-2.5 text-sm">
                <Summary label="Name" value={name || "—"} />
                <Summary label="Company" value={company || "—"} />
                <Summary label="Project" value={projectType ?? "—"} />
                <Summary label="Pace" value={pace ?? "—"} />
              </div>

              <button
                onClick={handleLaunch}
                disabled={launching}
                className="group mt-6 w-full bg-primary text-primary-foreground squircle py-5 px-6 font-display font-extrabold text-xl flex items-center justify-center gap-3 shadow-float transition-all duration-200 hover:-translate-y-1 hover:scale-[1.02] active:scale-95 disabled:opacity-80"
              >
                <Rocket
                  className={`size-7 transition-transform duration-500 ${
                    launching ? "-translate-y-20 rotate-12 opacity-0" : "group-hover:-translate-y-1 group-hover:rotate-12"
                  }`}
                  strokeWidth={2.5}
                />
                {launching ? "Launching…" : "Launch Project"}
              </button>
            </StepBlock>
          )}

          {/* Nav */}
          {step < 3 && (
            <div className="flex items-center justify-between mt-7">
              <button
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
                className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground disabled:opacity-30 px-3 py-2 rounded-full transition-colors font-semibold"
              >
                <ArrowLeft className="size-4" /> Back
              </button>
              <button
                onClick={() => canNext && setStep((s) => Math.min(total - 1, s + 1))}
                disabled={!canNext}
                className="flex items-center gap-2 bg-foreground text-background squircle px-5 py-3 font-display font-bold shadow-pop disabled:opacity-30 disabled:cursor-not-allowed hover:-translate-y-0.5 transition-transform"
              >
                Next <ArrowRight className="size-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

function StepBlock({
  eyebrow,
  icon,
  tint,
  title,
  subtitle,
  children,
}: {
  eyebrow: string;
  icon: ReactNode;
  tint: TintKey;
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-5">
      <div className="flex items-start gap-4">
        <div className={`size-14 rounded-2xl grid place-items-center shrink-0 ${tintBg(tint)} ${tintText(tint)} shadow-pop`}>
          {icon}
        </div>
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{eyebrow}</div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display leading-tight mt-0.5">{title}</h1>
          <p className="text-muted-foreground text-sm mt-1">{subtitle}</p>
        </div>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function PlayfulInput({
  icon,
  label,
  placeholder,
  value,
  onChange,
}: {
  icon: ReactNode;
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block group">
      <span className="text-sm font-bold ml-1 mb-1.5 block">{label}</span>
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
          {icon}
        </div>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-background squircle pl-12 pr-4 py-4 text-lg font-medium border-[3px] border-border outline-none transition-all duration-200 focus:border-primary focus:bg-card focus:shadow-pop placeholder:text-muted-foreground/60"
        />
      </div>
    </label>
  );
}

type TintKey = "coral" | "mint" | "tangerine" | "lilac" | "sky";
const tintBg = (t: TintKey) =>
  ({
    coral: "bg-coral",
    mint: "bg-mint",
    tangerine: "bg-tangerine",
    lilac: "bg-lilac",
    sky: "bg-sky",
  })[t];
const tintText = (t: TintKey) =>
  ({
    coral: "text-coral-foreground",
    mint: "text-mint-foreground",
    tangerine: "text-tangerine-foreground",
    lilac: "text-lilac-foreground",
    sky: "text-sky-foreground",
  })[t];

function IconCard({
  selected,
  onClick,
  tint,
  icon,
  label,
  desc,
  horizontal = false,
}: {
  selected: boolean;
  onClick: () => void;
  tint: TintKey;
  icon: ReactNode;
  label: string;
  desc: string;
  horizontal?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative text-left squircle p-4 border-[3px] transition-all duration-200 active:scale-95 hover:-translate-y-1 ${
        horizontal ? "flex items-center gap-4" : "flex flex-col gap-3"
      } ${
        selected
          ? "border-primary bg-card shadow-float"
          : "border-border bg-card/60 hover:border-foreground/30"
      }`}
    >
      <div className={`size-14 rounded-2xl grid place-items-center shrink-0 ${tintBg(tint)} ${tintText(tint)}`}>
        {icon}
      </div>
      <div className={horizontal ? "" : "mt-1"}>
        <div className="font-display font-extrabold text-base leading-tight">{label}</div>
        <div className="text-xs text-muted-foreground mt-0.5">{desc}</div>
      </div>
      {selected && (
        <div className="absolute top-2 right-2 size-6 rounded-full bg-primary text-primary-foreground grid place-items-center animate-pop-in">
          <Check className="size-3.5" strokeWidth={3} />
        </div>
      )}
    </button>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-bold capitalize">{value}</span>
    </div>
  );
}

/* ----------------------------- MISSION ----------------------------- */

const JOURNEY = [
  { id: 1, label: "Contract Signed", icon: FileSignature, tint: "mint" as TintKey, status: "done" },
  { id: 2, label: "Workspace Building", icon: Hammer, tint: "tangerine" as TintKey, status: "active" },
  { id: 3, label: "Ready to Kickoff", icon: PartyPopper, tint: "lilac" as TintKey, status: "todo" },
];

function Mission({ onRestart }: { onRestart: () => void }) {
  // Simulate n8n webhook latency
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className="min-h-screen w-full px-5 py-8 sm:py-10 max-w-6xl mx-auto">
      {/* Top bar */}
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <div className="size-10 rounded-2xl bg-primary text-primary-foreground grid place-items-center shadow-float">
            <Sparkles className="size-5" strokeWidth={2.5} />
          </div>
          <span className="font-display text-xl font-extrabold">Onboardy</span>
        </div>
        <button
          onClick={onRestart}
          className="text-sm font-bold text-muted-foreground hover:text-foreground rounded-full px-4 py-2 hover:bg-card transition-colors"
        >
          ↺ Restart demo
        </button>
      </header>

      {/* Greeting */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 bg-card squircle px-4 py-2 shadow-pop text-sm font-bold mb-3">
          <PartyPopper className="size-4 text-tangerine-foreground" /> Welcome to Mission Control
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold font-display leading-[1.05] tracking-tight">
          Hey there —<br />
          <span className="text-primary">your project is taking shape.</span>
        </h1>
      </div>

      {/* Journey path */}
      <section className="bg-card squircle-lg p-5 sm:p-7 shadow-float mb-6 border border-border/60">
        <div className="flex items-center gap-2 mb-5">
          <Trophy className="size-5 text-tangerine-foreground" strokeWidth={2.5} />
          <h2 className="font-display font-extrabold text-lg">Your Journey</h2>
        </div>

        <div className="relative">
          {/* dotted path */}
          <div
            className="absolute top-9 left-9 right-9 h-1 hidden sm:block"
            style={{
              backgroundImage:
                "radial-gradient(circle, var(--color-border) 2px, transparent 2.5px)",
              backgroundSize: "14px 4px",
              backgroundRepeat: "repeat-x",
            }}
          />
          <ol className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-3 relative">
            {JOURNEY.map((s) => {
              const Icon = s.icon;
              const done = s.status === "done";
              const active = s.status === "active";
              return (
                <li key={s.id} className="flex sm:flex-col items-center sm:text-center gap-3">
                  <div
                    className={`relative size-[72px] rounded-[26px] grid place-items-center shrink-0 transition-transform ${
                      active ? "animate-bouncy" : ""
                    } ${tintBg(s.tint)} ${tintText(s.tint)} ${
                      done || active ? "shadow-float" : "opacity-60"
                    }`}
                  >
                    <Icon className="size-8" strokeWidth={2.3} />
                    {done && (
                      <div className="absolute -top-1 -right-1 size-7 rounded-full bg-primary text-primary-foreground grid place-items-center shadow-pop">
                        <Check className="size-4" strokeWidth={3} />
                      </div>
                    )}
                    {active && (
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] font-extrabold uppercase tracking-wider rounded-full px-2.5 py-1 shadow-pop">
                        Now
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="font-display font-extrabold leading-tight">{s.label}</div>
                    <div className="text-xs text-muted-foreground capitalize">{s.status}</div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Bento */}
      <section className="grid grid-cols-6 auto-rows-[110px] gap-4">
        <BentoTile
          className="col-span-6 sm:col-span-4 row-span-3"
          tint="coral"
          loaded={loaded}
          icon={<FileText className="size-12 sm:size-16" strokeWidth={2.2} />}
          eyebrow="Paperwork"
          title="Your Contract"
          desc="Signed, sealed, delivered — open to review anytime."
          cta="Open document"
        />
        <BentoTile
          className="col-span-3 sm:col-span-2 row-span-2"
          tint="mint"
          loaded={loaded}
          icon={<FolderOpen className="size-10" strokeWidth={2.2} />}
          eyebrow="Files"
          title="Drive Hub"
          desc="All assets in one folder."
          cta="Open Drive"
        />
        <BentoTile
          className="col-span-3 sm:col-span-2 row-span-2"
          tint="tangerine"
          loaded={loaded}
          icon={<CalendarHeart className="size-10" strokeWidth={2.2} />}
          eyebrow="Kickoff"
          title="Book a call"
          desc="Pick a time for our hello."
          cta="Schedule"
        />
        <BentoTile
          className="col-span-6 sm:col-span-4 row-span-2"
          tint="lilac"
          loaded={loaded}
          icon={<KanbanSquare className="size-12" strokeWidth={2.2} />}
          eyebrow="Workflow"
          title="Project Board"
          desc="Track every task as it moves from idea to ship."
          cta="View board"
        />
        <BentoTile
          className="col-span-6 sm:col-span-2 row-span-2"
          tint="sky"
          loaded={loaded}
          icon={<MessageCircleHeart className="size-10" strokeWidth={2.2} />}
          eyebrow="Chat"
          title="Say hi to your team"
          desc="We reply fast — promise."
          cta="Open chat"
        />
      </section>

      <footer className="mt-10 text-center text-xs text-muted-foreground">
        Made with <span className="text-coral-foreground">♥</span> by your project team
      </footer>
    </main>
  );
}

function BentoTile({
  className = "",
  tint,
  loaded,
  icon,
  eyebrow,
  title,
  desc,
  cta,
}: {
  className?: string;
  tint: TintKey;
  loaded: boolean;
  icon: ReactNode;
  eyebrow: string;
  title: string;
  desc: string;
  cta: string;
}) {
  if (!loaded) {
    return (
      <div
        className={`${className} squircle-lg overflow-hidden bg-card shadow-pop border border-border/60 relative`}
      >
        <div className="absolute inset-0 animate-wave" />
        <div className="absolute inset-0 p-5 flex flex-col justify-between">
          <div className="size-12 rounded-2xl bg-foreground/10" />
          <div className="space-y-2">
            <div className="h-3 w-20 rounded-full bg-foreground/10" />
            <div className="h-5 w-3/4 rounded-full bg-foreground/15" />
            <div className="h-3 w-1/2 rounded-full bg-foreground/10" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <button
      className={`${className} group squircle-lg p-5 text-left shadow-pop border border-border/40 flex flex-col justify-between relative overflow-hidden transition-all duration-300 ease-out hover:-translate-y-2 hover:rotate-[-1.5deg] hover:shadow-float ${tintBg(tint)} ${tintText(tint)} animate-pop-in`}
    >
      <div className="relative z-10 flex items-start justify-between">
        <div className="bg-background/40 backdrop-blur-sm rounded-2xl p-2.5 shadow-pop transition-transform group-hover:scale-110 group-hover:rotate-6">
          {icon}
        </div>
        <ArrowRight className="size-5 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
      </div>
      <div className="relative z-10">
        <div className="text-[11px] font-extrabold uppercase tracking-wider opacity-70">{eyebrow}</div>
        <div className="font-display font-extrabold text-xl sm:text-2xl leading-tight mt-0.5">{title}</div>
        <div className="text-sm opacity-80 mt-1 line-clamp-2">{desc}</div>
        <div className="inline-flex items-center gap-1.5 mt-3 text-xs font-extrabold bg-background/50 rounded-full px-3 py-1.5">
          {cta} <ArrowRight className="size-3.5" />
        </div>
      </div>
      {/* decorative blob */}
      <div className="absolute -bottom-10 -right-10 size-40 rounded-full bg-background/20 blur-xl pointer-events-none" />
    </button>
  );
}
