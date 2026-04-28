'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import ShapeBlur from '@/components/effects/ShapeBlur'

function useCountUp(target: number, dur = 1600) {
  const [val, setVal] = useState(0)
  const started = useRef(false)
  const start = useCallback(() => {
    if (started.current) return
    started.current = true
    const t0 = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - t0) / dur, 1)
      setVal(Math.floor((1 - Math.pow(1 - p, 3)) * target))
      if (p < 1) requestAnimationFrame(tick)
      else setVal(target)
    }
    requestAnimationFrame(tick)
  }, [target, dur])
  return { val, start }
}

function DashStatCard({ value, suffix = '', label, accent = 'var(--lime)', dotColor }: {
  value: number; suffix?: string; label: string; accent?: string; dotColor?: string
}) {
  const { val, start } = useCountUp(value)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && start(), { threshold: .6 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [start])

  return (
    <div ref={ref} className="glass glass-hover" style={{ flex: 1, minWidth: 140 }}>
      <div className="dash-header">
        <div className="dash-dots">
          <div className="dash-dot" style={{ background: dotColor ?? accent, opacity: .7 }} />
          <div className="dash-dot" style={{ background: 'var(--gray-mid)' }} />
          <div className="dash-dot" style={{ background: 'var(--gray-mid)' }} />
        </div>
        <span className="mono-sm">{label}</span>
      </div>
      <div className="dash-body">
        <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.4rem,4vw,3.5rem)', color: accent, lineHeight: 1, letterSpacing: '-.01em' }}>
          {val}{suffix}
        </p>
      </div>
    </div>
  )
}

function WordReveal({ text, delay = 0 }: { text: string; delay?: number }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setOn(true), { threshold: .2 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return (
    <p ref={ref} className="body-lg">
      {text.split(' ').map((w, i) => (
        <span key={i} style={{ display: 'inline-block', marginRight: '.32em', opacity: on ? 1 : 0, transform: on ? 'none' : 'translateY(10px)', transition: `all .5s var(--ease-expo) ${delay + i * .025}s` }}>{w}</span>
      ))}
    </p>
  )
}

const timeline = [
  { year: '2022', title: 'Primeiro script Python', desc: 'Automação de relatórios → 8h economizadas/semana' },
  { year: '2023', title: 'Power Platform', desc: 'Apps e fluxos em produção na empresa' },
  { year: '2024', title: 'Web & Dashboards', desc: 'Streamlit, HTML e primeiros projetos freelance' },
  { year: '2025', title: 'Full stack de dados', desc: 'ML, scraping, APIs e Next.js no arsenal' },
]

const tools = ['Python','Streamlit','Power BI','Qlik Cloud','SQL','Next.js','Power Automate','Pandas','React','Azure','HTML/CSS','JavaScript','SharePoint']

export default function About() {
  const titleRef = useRef<HTMLDivElement>(null)
  const [titleIn, setTitleIn] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setTitleIn(true), { threshold: .08 })
    if (titleRef.current) obs.observe(titleRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="about" style={{ background: 'linear-gradient(160deg, #0f1229 0%, #0a0e27 100%)', position: 'relative', overflow: 'hidden' }}>
      <ShapeBlur zIndex={0} />

      <div style={{ position: 'relative', zIndex: 2, padding: 'clamp(6rem,11vw,11rem) clamp(1rem,4vw,4rem) clamp(5rem,10vw,10rem)' }}>

        {/* ── Header Editorial ── */}
        <div ref={titleRef} style={{ marginBottom: '6rem' }}>
          <span className="s-tag" style={{ opacity: titleIn ? 1 : 0, transition: 'opacity .5s' }}>01 — Sobre mim</span>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start', maxWidth: '100%' }}>
            <div style={{ overflow: 'hidden' }}>
              <h2 className="s-h2" style={{ opacity: titleIn ? 1 : 0, transform: titleIn ? 'none' : 'translateY(24px)', transition: 'all .8s var(--ease-expo) .1s' }}>
                Dev focado em <em>dados</em> &amp; <em>automação</em>
              </h2>
            </div>
            <WordReveal delay={.25} text="Desenvolvo soluções práticas: from Python scripts que economizam 8h/semana até dashboards full-stack e apps integrados. Não paro até funcionar." />
          </div>
        </div>

        {/* ── 3 Pilares ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginBottom: '5rem' }}>
          {[
            { icon: '⚡', title: 'Automação', desc: 'Scripts, fluxos e pipelines que transformam processos manuais em automação', accent: '#06b6d4' },
            { icon: '📊', title: 'Dados', desc: 'SQL, Pandas, BI tools — transformo dados brutos em insights acionáveis', accent: '#7c3aed' },
            { icon: '🎨', title: 'Interfaces', desc: 'Web apps, dashboards e UIs que são bonitas E funcionam de verdade', accent: '#8b5cf6' },
          ].map((pillar, i) => (
            <div key={i} style={{
              padding: '2rem',
              background: `linear-gradient(135deg, ${pillar.accent}08, ${pillar.accent}02)`,
              border: `1px solid ${pillar.accent}20`,
              borderRadius: '12px',
              opacity: titleIn ? 1 : 0,
              transform: titleIn ? 'none' : 'translateY(32px)',
              transition: `all .7s var(--ease-expo) ${.15 + i * .1}s`,
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{pillar.icon}</div>
              <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '1.2rem', fontWeight: 600, color: 'var(--white)', marginBottom: '.5rem' }}>{pillar.title}</h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '.95rem', color: 'rgba(255,255,255,.7)', lineHeight: 1.6 }}>{pillar.desc}</p>
              <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: `1px solid ${pillar.accent}25` }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '.5rem' }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: pillar.accent }} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.65rem', letterSpacing: '.12em', color: pillar.accent, textTransform: 'uppercase' }}>Expertise</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Stats ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '5rem' }}>
          <DashStatCard value={20}  suffix="+" label="Projetos Entregues" accent="#06b6d4" dotColor="#06b6d4" />
          <DashStatCard value={3}   suffix="+" label="Anos de Experiência" accent="#7c3aed" dotColor="#7c3aed" />
          <DashStatCard value={8}   suffix="h" label="Tempo Economizado/Semana" accent="#8b5cf6" dotColor="#8b5cf6" />
        </div>

        {/* ── Tech Stack ── */}
        <div style={{
          padding: '2.5rem',
          background: 'linear-gradient(135deg, rgba(6,182,212,0.08), rgba(6,182,212,0.02))',
          border: '1px solid rgba(6,182,212,0.15)',
          borderRadius: '12px',
          marginBottom: '5rem',
        }}>
          <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '.65rem', letterSpacing: '.18em', color: '#06b6d4', textTransform: 'uppercase', marginBottom: '1.5rem' }}>🛠 Stack Principal</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.7rem' }}>
            {tools.map(t => (
              <span key={t} style={{
                fontFamily: 'var(--font-mono)', fontSize: '.7rem', letterSpacing: '.08em', textTransform: 'uppercase',
                padding: '.5rem 1rem', borderRadius: '6px',
                border: '1px solid rgba(6,182,212,0.3)', color: '#06b6d4',
                background: 'rgba(6,182,212,0.1)', cursor: 'default',
                transition: 'all .22s var(--ease-expo)',
              }}
                onMouseEnter={e => { e.currentTarget.style.color='#f0ede6'; e.currentTarget.style.borderColor='#06b6d4'; e.currentTarget.style.background='rgba(6,182,212,0.25)'; e.currentTarget.style.boxShadow='0 0 12px rgba(6,182,212,0.3)' }}
                onMouseLeave={e => { e.currentTarget.style.color='#06b6d4'; e.currentTarget.style.borderColor='rgba(6,182,212,0.3)'; e.currentTarget.style.background='rgba(6,182,212,0.1)'; e.currentTarget.style.boxShadow='' }}>
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* ── Timeline ── */}
        <div style={{ marginBottom: '3rem' }}>
          <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '.65rem', letterSpacing: '.18em', color: '#06b6d4', textTransform: 'uppercase', marginBottom: '2rem' }}>📍 Trajetória</h3>
          <div style={{ position: 'relative', paddingLeft: '3rem' }}>
            {/* Vertical line */}
            <div style={{ position: 'absolute', left: '10px', top: 0, bottom: 0, width: '2px', background: 'linear-gradient(to bottom, #06b6d4, #06b6d460)', opacity: .3 }} />
            {timeline.map((item, i) => (
              <TimelineRow key={item.year} item={item} index={i} last={i === timeline.length - 1} />
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <a href="#projects" className="glass-btn glass-btn-lime">Ver projetos →</a>
          <a href="mailto:luis87091@gmail.com" className="glass-btn">Falar comigo</a>
        </div>
      </div>
    </section>
  )
}

function TimelineRow({ item, index, last }: { item: typeof timeline[0]; index: number; last: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  const [hov, setHov] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setVis(true), { threshold: .3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return (
    <div ref={ref} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ 
        display: 'flex', 
        gap: '2.5rem', 
        alignItems: 'flex-start', 
        padding: '1.5rem 0', 
        borderBottom: last ? 'none' : '1px solid rgba(6,182,212,0.1)',
        opacity: vis ? 1 : 0, 
        transform: vis ? 'none' : 'translateX(-16px)', 
        transition: `all .6s var(--ease-expo) ${index * .1}s`, 
        cursor: 'default',
        position: 'relative',
      }}>
      {/* Dot on timeline */}
      <div style={{ 
        position: 'absolute', 
        left: '-21px', 
        marginTop: '6px',
        width: '12px', 
        height: '12px', 
        borderRadius: '50%', 
        background: hov ? '#06b6d4' : 'var(--bg-card)', 
        border: `2px solid ${hov ? '#06b6d4' : 'rgba(6,182,212,0.3)'}`, 
        boxShadow: hov ? '0 0 14px #06b6d460' : 'none', 
        transition: 'all .25s', 
        flexShrink: 0,
      }} />
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.7rem', letterSpacing: '.12em', color: hov ? '#06b6d4' : 'rgba(255,255,255,.5)', fontWeight: 600, width: 50, flexShrink: 0, transition: 'color .25s', textTransform: 'uppercase' }}>{item.year}</span>
      <div style={{ flex: 1 }}>
        <h4 style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '1rem', color: 'var(--white)', marginBottom: '.35rem' }}>{item.title}</h4>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '.9rem', color: 'rgba(255,255,255,.65)', lineHeight: 1.6 }}>{item.desc}</p>
      </div>
    </div>
  )
}
