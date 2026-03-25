'use client'
import { useEffect, useRef, useState } from 'react'
import MagnetLines  from '@/components/effects/MagnetLines'

const stacks = [
  { group: 'Data & Analytics',    icon: '◈', accent: '#B4FF00', items: ['Python','Pandas','NumPy','Plotly','Matplotlib','SQL','Jupyter'] },
  { group: 'Web & Interfaces',    icon: '◉', accent: '#00d4ff', items: ['Streamlit','HTML5','CSS3','JavaScript','React','Next.js','Tailwind'] },
  { group: 'Power Platform',      icon: '◫', accent: '#ff6b35', items: ['Power Apps','Power Automate','Power BI','SharePoint','Dataverse','Teams'] },
  { group: 'Infra & Ferramentas', icon: '◌', accent: '#b388ff', items: ['Git','GitHub','VS Code','Docker','Azure','REST APIs','Notion'] },
]

function Tag({ label, accent, delay }: { label: string; accent: string; delay: number }) {
  const [hover, setHover] = useState(false)
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { threshold: .4 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return (
    <span ref={ref} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '.82rem', cursor: 'default', display: 'inline-block', padding: '.4rem .9rem', border: `1px solid ${hover ? accent+'55' : 'var(--border-md)'}`, borderRadius: 'var(--r-pill)', color: hover ? accent : 'var(--white)', background: hover ? `${accent}10` : 'var(--lime-10)', transition: 'all .22s var(--ease-expo)', boxShadow: hover ? `0 0 20px ${accent}22` : 'none', opacity: visible ? 1 : 0, transform: visible ? 'scale(1)' : 'scale(.85)', transitionDelay: visible ? `${delay}s` : '0s' }}>
      {label}
    </span>
  )
}

export default function Stack() {
  const headRef = useRef<HTMLDivElement>(null)
  const [headIn, setHeadIn] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setHeadIn(true), { threshold: .08 })
    if (headRef.current) obs.observe(headRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="stack" style={{ background: 'var(--bg-alt)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 80, background: 'var(--bg)', clipPath: 'polygon(0 0,100% 0,100% 100%,0 0)', zIndex: 1 }} />

      {/* Header with MagnetLines */}
      <div style={{ position: 'relative', padding: 'clamp(8rem,11vw,11rem) clamp(1rem,4vw,4rem) 4rem', overflow: 'hidden' }}>
        <MagnetLines rows={8} cols={18} color="rgba(180,255,0,.12)" lineWidth={1} style={{ zIndex: 0 }} />
        <div ref={headRef} style={{ position: 'relative', zIndex: 1 }}>
          <span className="s-tag" style={{ opacity: headIn ? 1 : 0, transition: 'opacity .5s' }}>03 — Tecnologias</span>
          <h2 className="s-h2" style={{ opacity: headIn ? 1 : 0, transform: headIn ? 'none' : 'translateY(24px)', transition: 'all .8s var(--ease-expo) .1s' }}>
            Meu <em>arsenal</em>
          </h2>
        </div>
      </div>

      {/* Dashboard grid */}
      <div className="stack-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,280px),1fr))', gap: '1.5rem', padding: '0 clamp(1rem,4vw,4rem) clamp(5rem,10vw,10rem)' }}>
        {stacks.map((s, si) => (
          <div key={s.group} className="glass glass-hover"
            style={{ transition: 'border-color .3s,transform .3s var(--ease-expo)' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor=`${s.accent}30`; e.currentTarget.style.transform='translateY(-4px)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor='var(--dashboard-border)'; e.currentTarget.style.transform='translateY(0)' }}>
            <div className="dash-header">
              <div className="dash-dots">
                <div className="dash-dot" style={{ background: s.accent, opacity: .8 }} />
                <div className="dash-dot" style={{ background: 'var(--gray-mid)' }} />
                <div className="dash-dot" style={{ background: 'var(--gray-mid)' }} />
              </div>
              <span className="mono-sm" style={{ color: s.accent }}>{s.icon} {s.group}</span>
            </div>
            <div className="dash-body">
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.5rem' }}>
                {s.items.map((item, ii) => <Tag key={item} label={item} accent={s.accent} delay={si * .04 + ii * .035} />)}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 80, background: 'var(--bg)', clipPath: 'polygon(0 100%,100% 0,100% 100%)', zIndex: 1 }} />
    </section>
  )
}