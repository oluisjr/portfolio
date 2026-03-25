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
  { year: '2021', title: 'Primeiro script Python', desc: 'Automação de relatórios → 8h economizadas/semana' },
  { year: '2022', title: 'Power Platform', desc: 'Apps e fluxos em produção na empresa' },
  { year: '2023', title: 'Web & Dashboards', desc: 'Streamlit, HTML e primeiros projetos freelance' },
  { year: '2024', title: 'Full stack de dados', desc: 'ML, scraping, APIs e Next.js no arsenal' },
]

const tools = ['Python','Streamlit','Power BI','SQL','Next.js','Power Automate','Pandas','React','Azure','HTML/CSS','JavaScript','SharePoint']

export default function About() {
  const titleRef = useRef<HTMLDivElement>(null)
  const [titleIn, setTitleIn] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setTitleIn(true), { threshold: .08 })
    if (titleRef.current) obs.observe(titleRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="about" style={{ background: 'var(--bg-alt)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 80, background: 'var(--bg)', clipPath: 'polygon(0 0,100% 0,100% 100%,0 0)', zIndex: 1 }} />
      <ShapeBlur zIndex={0} />

      <div style={{ position: 'relative', zIndex: 2, padding: 'clamp(6rem,11vw,11rem) clamp(1rem,4vw,4rem) clamp(5rem,10vw,10rem)' }}>

        {/* ── Header ── */}
        <div ref={titleRef} style={{ marginBottom: '4rem' }}>
          <span className="s-tag" style={{ opacity: titleIn ? 1 : 0, transition: 'opacity .5s' }}>01 — Sobre mim</span>
          <div style={{ overflow: 'hidden' }}>
            {[
              { text: 'Construo', italic: false, dim: false },
              { text: 'coisas que', italic: true, dim: true },
              { text: 'funcionam.', italic: true, dim: false, lime: true },
            ].map((line, i) => (
              <div key={i} style={{ overflow: 'hidden', lineHeight: .92, marginBottom: '.06em' }}>
                <span style={{
                  fontFamily: 'var(--font-serif)', fontWeight: 900,
                  fontSize: 'clamp(2.8rem,6.5vw,6rem)',
                  fontStyle: line.italic ? 'italic' : 'normal',
                  color: line.lime ? 'var(--lime)' : line.dim ? 'var(--white-60)' : 'var(--white)',
                  display: 'inline-block',
                  opacity: titleIn ? 1 : 0,
                  transform: titleIn ? 'none' : 'translateY(110%)',
                  transition: `all .8s var(--ease-expo) ${.08 + i * .14}s`,
                }}>{line.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Dashboard grid ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '1.5rem', marginBottom: '3rem' }}>

          {/* Bio card */}
          <div className="glass glass-hover" style={{ gridColumn: 'span 2' }}>
            <div className="dash-header">
              <div className="dash-dots">
                <div className="dash-dot" style={{ background: '#ff5f57' }} />
                <div className="dash-dot" style={{ background: '#febc2e' }} />
                <div className="dash-dot" style={{ background: '#28c840' }} />
              </div>
              <span className="mono-sm">luis.bio</span>
            </div>
            <div className="dash-body" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <WordReveal delay={.15} text="Desenvolvedor com foco em dados, automação e interfaces que funcionam de verdade. Do scraper ao dashboard, da automação ao deploy." />
              <WordReveal delay={.4} text="Não me limito a uma stack — uso o que resolve o problema com elegância." />
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '.8rem', marginTop: '.25rem' }}>
                <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--lime)', animation: 'pulse 2s infinite', flexShrink: 0 }} />
                <span className="mono-sm" style={{ color: 'var(--lime)' }}>Disponível para projetos</span>
              </div>
            </div>
          </div>

          {/* Photo card */}
          <div className="glass glass-hover" style={{ minHeight: 280, display: 'flex', flexDirection: 'column' }}>
            <div className="dash-header">
              <div className="dash-dots">
                <div className="dash-dot" style={{ background: 'var(--lime)' }} />
                <div className="dash-dot" style={{ background: 'var(--gray-mid)' }} />
                <div className="dash-dot" style={{ background: 'var(--gray-mid)' }} />
              </div>
              <span className="mono-sm">foto.jpg</span>
            </div>
            <div style={{ flex: 1, position: 'relative', overflow: 'hidden', minHeight: 220, background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '.75rem' }}>
              {/* Replace with: <img src="/foto.jpg" style={{ width:'100%',height:'100%',objectFit:'cover',position:'absolute',inset:0 }} /> */}
              <div style={{ width: 72, height: 72, borderRadius: '50%', border: '1.5px solid rgba(180,255,0,.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(180,255,0,.06)' }}>
                <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '1.5rem', color: 'var(--lime)', opacity: .9 }}>LI</span>
              </div>
              <p className="mono-sm" style={{ opacity: .4, textAlign: 'center' }}>/public/foto.jpg</p>
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg,var(--lime),transparent)' }} />
            </div>
          </div>
        </div>

        {/* ── Stats row ── */}
        <div className="metrics-row" style={{ display: 'flex', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
          <DashStatCard value={20}  suffix="+" label="Projetos"      accent="var(--lime)"   dotColor="#28c840" />
          <DashStatCard value={3}   suffix="+" label="Anos de exp"   accent="#00d4ff"        dotColor="#00d4ff" />
          <DashStatCard value={100} suffix="%" label="Comprometimento" accent="var(--lime)"  dotColor="#28c840" />
          <DashStatCard value={999}            label="Commits"       accent="#b388ff"         dotColor="#b388ff" />
        </div>

        {/* ── Tools card ── */}
        <div className="glass glass-hover" style={{ marginBottom: '3rem' }}>
          <div className="dash-header">
            <div className="dash-dots">
              <div className="dash-dot" style={{ background: 'var(--lime)' }} />
              <div className="dash-dot" style={{ background: 'var(--gray-mid)' }} />
              <div className="dash-dot" style={{ background: 'var(--gray-mid)' }} />
            </div>
            <span className="mono-sm">stack principal</span>
          </div>
          <div className="dash-body">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.5rem' }}>
              {tools.map(t => (
                <span key={t} style={{
                  fontFamily: 'var(--font-mono)', fontSize: '.62rem', letterSpacing: '.1em', textTransform: 'uppercase',
                  padding: '.38rem .9rem', borderRadius: 'var(--r-pill)',
                  border: '1px solid var(--border-md)', color: 'var(--white-60)',
                  background: 'rgba(255,255,255,.03)', cursor: 'default',
                  transition: 'all .22s var(--ease-expo)',
                }}
                  onMouseEnter={e => { e.currentTarget.style.color='var(--lime)'; e.currentTarget.style.borderColor='var(--lime-20)'; e.currentTarget.style.background='var(--lime-10)' }}
                  onMouseLeave={e => { e.currentTarget.style.color='var(--white-60)'; e.currentTarget.style.borderColor='var(--border-md)'; e.currentTarget.style.background='rgba(255,255,255,.03)' }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Timeline ── */}
        <div className="glass glass-hover">
          <div className="dash-header">
            <div className="dash-dots">
              <div className="dash-dot" style={{ background: '#febc2e' }} />
              <div className="dash-dot" style={{ background: 'var(--gray-mid)' }} />
              <div className="dash-dot" style={{ background: 'var(--gray-mid)' }} />
            </div>
            <span className="mono-sm">trajetória</span>
          </div>
          <div className="dash-body" style={{ paddingLeft: '2.5rem', position: 'relative' }}>
            <div style={{ position: 'absolute', left: '1.5rem', top: '.5rem', bottom: '.5rem', width: 1, background: 'linear-gradient(to bottom,var(--lime),rgba(180,255,0,.1))' }} />
            {timeline.map((item, i) => (
              <TimelineRow key={item.year} item={item} index={i} last={i === timeline.length - 1} />
            ))}
          </div>
        </div>

        {/* ── CTAs ── */}
        <div style={{ display: 'flex', gap: '1rem', marginTop: '2.5rem', flexWrap: 'wrap' }}>
          <a href="#projects" className="glass-btn glass-btn-lime">Ver projetos →</a>
          <a href="mailto:luis@email.com" className="glass-btn">Falar comigo →</a>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 80, background: 'var(--bg)', clipPath: 'polygon(0 100%,100% 0,100% 100%)', zIndex: 1 }} />
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
      style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', padding: '1.5rem 0', borderBottom: last ? 'none' : '1px solid var(--border)', opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateX(-16px)', transition: `all .6s var(--ease-expo) ${index * .1}s`, cursor: 'default' }}>
      <div style={{ position: 'absolute', left: '1.25rem', marginTop: 8, width: 10, height: 10, borderRadius: '50%', background: hov ? 'var(--lime)' : 'var(--bg-card)', border: `2px solid ${hov ? 'var(--lime)' : 'var(--gray-mid)'}`, boxShadow: hov ? '0 0 14px var(--lime)' : 'none', transition: 'all .25s', flexShrink: 0 }} />
      <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '1rem', color: hov ? 'var(--lime)' : 'var(--gray-light)', letterSpacing: '-.01em', lineHeight: 1, width: 44, flexShrink: 0, transition: 'color .25s' }}>{item.year}</span>
      <div>
        <p style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '.95rem', color: 'var(--white)', marginBottom: '.35rem' }}>{item.title}</p>
        <p className="body-md" style={{ fontSize: '.85rem' }}>{item.desc}</p>
      </div>
    </div>
  )
}