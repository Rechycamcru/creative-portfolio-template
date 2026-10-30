import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { z } from "zod";
import { site } from "@/content/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pachadigalandia — Juegos, cómics y videos" },
      { name: "description", content: "Descubre el mundo de Pachadigalandia: personajes, historias y aventuras fantásticas en juegos, videos y cómics." },
      { property: "og:title", content: "Pachadigalandia" },
      { property: "og:description", content: "Personajes, historias y aventuras fantásticas en juegos, videos y cómics." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e?.isIntersecting) { el.classList.add("is-visible"); io.disconnect(); }
    }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

function Png({ src, label = "PNG personalizable", className = "" }: { src: string; label?: string; className?: string }) {
  if (src) return <img src={src} alt="" loading="lazy" className={`h-full w-full object-contain ${className}`} />;
  return (
    <div className={`placeholder-box flex h-full w-full items-center justify-center rounded-lg p-2 text-center text-sm font-bold uppercase ${className}`}>
      {label}
    </div>
  );
}

function SectionHeader({ src, n }: { src: string; n: number }) {
  return (
    <Reveal className="mb-6 flex items-center gap-3">
      <div className="h-16 w-full max-w-sm sm:h-20"><Png src={src} label={`PNG personalizable (${n})`} /></div>
    </Reveal>
  );
}

function Divider() {
  return <hr className="my-10 border-t-[3px] border-dashed border-foreground/30" />;
}

function Index() {
  const { hero, about, section1, section2, section3, subscribe } = site;
  const sideStyle = site.sideBackground ? { backgroundImage: `url(${site.sideBackground})`, backgroundSize: "cover", backgroundAttachment: "fixed" } : undefined;

  return (
    <div className="relative min-h-screen overflow-x-hidden" style={sideStyle}>
      {/* estrellitas del fondo */}
      <div aria-hidden className="pointer-events-none fixed inset-0">
        {Array.from({ length: 18 }).map((_, i) => (
          <span key={i} className="animate-twinkle absolute h-2 w-2 rounded-full bg-accent"
            style={{ left: `${(i * 53) % 100}%`, top: `${(i * 37) % 100}%`, animationDelay: `${(i % 6) * 0.5}s` }} />
        ))}
      </div>

      <main className="relative mx-auto min-h-screen max-w-5xl bg-background px-4 py-8 shadow-2xl sm:px-10 sm:py-12 lg:border-x-4 lg:border-foreground">
        {/* PORTADA */}
        <section id="inicio">
          <div className="relative -mx-4 -mt-8 h-72 overflow-hidden sm:-mx-10 sm:-mt-12 sm:h-[28rem]">
            <div className="absolute inset-0">
              <Png src={hero.banner} label="PNG personalizable (título)" className="rounded-none object-cover" />
            </div>
            <Reveal className="relative z-10 ml-4 mt-8 h-14 w-40 sm:ml-10 sm:mt-12 sm:h-16 sm:w-56"><div className="animate-bounce-pulse h-full w-full"><Png src={hero.logo} /></div></Reveal>
          </div>
          <Divider />
          <Reveal className="space-y-4 text-center text-lg font-semibold sm:text-xl">
            {hero.texts.map((t, i) => <p key={i}>{t}</p>)}
          </Reveal>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {hero.buttons.map((b, i) => (
              <Reveal key={i} delay={i * 120}>
                <a href={`#${b.target}`} className="pop-card group block overflow-hidden">
                  <div className="aspect-square p-3"><Png src={b.image} className="transition-transform duration-300 group-hover:scale-105" /></div>
                  <div className="border-t-[3px] border-foreground bg-primary py-3 text-center font-display text-2xl text-primary-foreground transition-colors group-hover:bg-secondary group-hover:text-secondary-foreground">
                    {b.label} <span className="text-base">({i + 1})</span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
          <Divider />
          <Reveal className="mx-auto max-w-2xl space-y-4 text-center">
            <h2 className="text-4xl text-primary sm:text-5xl">{about.title}</h2>
            {about.texts.map((t, i) => <p key={i} className="text-lg">{t}</p>)}
          </Reveal>
        </section>

        <Divider />

        {/* (1) */}
        <section id="seccion-1" className="scroll-mt-6">
          <SectionHeader src={section1.header} n={1} />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {section1.cards.map((c, i) => (
              <Reveal key={i} delay={i * 120}>
                <a href={c.link} target="_blank" rel="noreferrer" className="pop-card group block overflow-hidden">
                  <div className="aspect-[3/4] p-3"><Png src={c.image} /></div>
                  <div className="border-t-[3px] border-foreground bg-accent py-3 text-center font-display text-xl text-accent-foreground">{c.label}</div>
                </a>
              </Reveal>
            ))}
          </div>
        </section>

        <Divider />

        {/* (2) */}
        <section id="seccion-2" className="scroll-mt-6">
          <SectionHeader src={section2.header} n={2} />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {section2.videos.map((v, i) => (
              <Reveal key={i} delay={i * 120}>
                <a href={v.link} target="_blank" rel="noreferrer" className="pop-card group relative block aspect-video overflow-hidden">
                  <Png src={v.image} label="PNG con enlace editable" className="rounded-none" />
                  <span className="animate-pulse-ring absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[3px] border-foreground bg-primary text-2xl text-primary-foreground transition-transform group-hover:scale-125">▶</span>
                </a>
              </Reveal>
            ))}
          </div>
        </section>

        <Divider />

        {/* (3) */}
        <section id="seccion-3" className="scroll-mt-6">
          <SectionHeader src={section3.header} n={3} />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {section3.items.map((it, i) => (
              <Reveal key={i}>
                <a href={it.link} target="_blank" rel="noreferrer" className="pop-card group relative block aspect-video overflow-hidden">
                  <Png src={it.image} label="PNG con enlace editable" className="rounded-none" />
                </a>
              </Reveal>
            ))}
          </div>
        </section>

        <Divider />

        {/* SUSCRIPCIÓN */}
        <section id="suscribirse" className="grid items-center gap-8 sm:grid-cols-2">
          <Reveal><SubscribeForm /></Reveal>
          <Reveal delay={150} className="animate-floaty h-56 sm:h-72"><Png src={subscribe.sideImage} label="Fondo PNG personalizable" /></Reveal>
        </section>

        <footer className="mt-16 flex flex-col items-center gap-3 text-sm text-muted-foreground">
          <a href="#inicio" className="pop-card px-4 py-2 font-display text-base text-foreground">↑ Volver arriba</a>
          <p>{site.footer}</p>
        </footer>
      </main>
    </div>
  );
}

const emailSchema = z.string().trim().email().max(255);

function SubscribeForm() {
  const { subscribe } = site;
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "ok" | "error">("idle");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const r = emailSchema.safeParse(email);
    if (!r.success) return setState("error");
    const list: string[] = JSON.parse(localStorage.getItem("suscriptores") || "[]");
    if (!list.includes(r.data)) list.push(r.data);
    localStorage.setItem("suscriptores", JSON.stringify(list));
    setEmail("");
    setState("ok");
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <h2 className="text-2xl leading-snug text-primary sm:text-3xl">{subscribe.text}</h2>
      <input type="email" value={email} onChange={(e) => { setEmail(e.target.value); setState("idle"); }}
        placeholder={subscribe.placeholder} maxLength={255}
        className="w-full rounded-full border-[3px] border-foreground bg-card px-5 py-3 text-lg outline-none transition focus:ring-4 focus:ring-ring/40" />
      <button type="submit" className="pop-card rounded-full bg-primary px-8 py-3 font-display text-xl text-primary-foreground">
        {subscribe.button}
      </button>
      {state === "ok" && <p className="animate-in fade-in font-bold text-secondary">{subscribe.success}</p>}
      {state === "error" && <p className="animate-in fade-in font-bold text-destructive">Escribe un correo válido 🙏</p>}
    </form>
  );
}
