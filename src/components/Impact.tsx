'use client'
import { useEffect, useRef, useState } from 'react'

const achievements = [
  {
    id: '01',
    icon: '🐍',
    title: 'Python Liberado',
    desc: 'Consegui liberação para download de Python puro em Porto Real',
    impact: '100+ devs',
    color: '#7c3aed',
  },
  {
    id: '02',
    icon: '🔗',
    title: 'Proxy Exclusivo',
    desc: 'Criação de proxy exclusivo para config e instalação de libs Python nos PCs',
    impact: '↓ 80% tempo',
    color: '#06b6d4',
  },
  {
    id: '03',
    icon: '🖥️',
    title: 'IIS Server',
    desc: 'Servidor de aplicação criado para hospedar webapps com IIS',
    impact: '∞ Escalabilidade',
    color: '#8b5cf6',
  },
  {
    id: '04',
    icon: '⚙️',
    title: 'Dev Server Python',
    desc: 'Liberação de servidor de desenvolvimento Python para uso corporativo',
    impact: 'Futuro-ready',
    color: '#ec4899',
  },
]

function AchievementCard({ achievement, index }: { achievement: typeof achievements[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  const [hov, setHov] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setVis(true), { threshold: .2 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: 'relative',
        padding: '2.5rem',
        background: `linear-gradient(135deg, ${achievement.color}08, ${achievement.color}02)`,
        border: `1px solid ${achievement.color}20`,
        borderRadius: '12px',
        overflow: 'hidden',
        opacity: vis ? 1 : 0,
        transform: vis ? (hov ? 'translateY(-8px)' : 'translateY(0)') : 'translateY(32px)',
        transition: `all .7s var(--ease-expo) ${index * .1}s`,
        cursor: 'default',
      }}
    >
      {/* Gradient accent on top */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: `linear-gradient(90deg, ${achievement.color}, ${achievement.color}40)`,
          boxShadow: `0 0 12px ${achievement.color}60`,
          opacity: hov ? 1 : 0.5,
          transition: 'opacity .4s var(--ease-expo)',
        }}
      />

      {/* Corner accent dot */}
      <div
        style={{
          position: 'absolute',
          top: '-20px',
          right: '-20px',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${achievement.color}20, transparent)`,
          pointerEvents: 'none',
          transition: 'transform .5s var(--ease-expo)',
          transform: hov ? 'translate(-20px, 20px)' : 'translate(0)',
        }}
      />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Header row with number and icon */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1.5rem' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.7rem', letterSpacing: '.18em', color: achievement.color, textTransform: 'uppercase', opacity: .6 }}>
            {achievement.id}
          </span>
          <div
            style={{
              fontSize: '2.2rem',
              transition: 'transform .4s var(--ease-expo)',
              transform: hov ? 'scale(1.2) rotate(-10deg)' : 'scale(1)',
            }}
          >
            {achievement.icon}
          </div>
        </div>

        {/* Title */}
        <h3
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1.2rem',
            fontWeight: 600,
            color: 'var(--white)',
            marginBottom: '.75rem',
            transition: 'color .3s',
            color: hov ? achievement.color : 'var(--white)',
          }}
        >
          {achievement.title}
        </h3>

        {/* Description */}
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '.95rem',
            color: 'rgba(255,255,255,.7)',
            lineHeight: 1.6,
            marginBottom: '1.5rem',
          }}
        >
          {achievement.desc}
        </p>

        {/* Impact badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '.6rem',
            padding: '.6rem 1rem',
            background: `${achievement.color}15`,
            border: `1px solid ${achievement.color}30`,
            borderRadius: '6px',
            transition: 'all .3s var(--ease-expo)',
            transform: hov ? 'translateX(4px)' : 'translateX(0)',
          }}
        >
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: achievement.color }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.65rem', letterSpacing: '.1em', color: achievement.color, fontWeight: 600, textTransform: 'uppercase' }}>
            {achievement.impact}
          </span>
        </div>
      </div>
    </div>
  )
}

export default function Impact() {
  const headRef = useRef<HTMLDivElement>(null)
  const [headIn, setHeadIn] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setHeadIn(true), { threshold: .15 })
    if (headRef.current) obs.observe(headRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section
      id="impact"
      style={{
        background: 'linear-gradient(160deg, #0a0e27 0%, #0f1229 100%)',
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(6rem,11vw,11rem) clamp(1rem,4vw,4rem) clamp(5rem,10vw,10rem)',
      }}
    >
      {/* ── Header ── */}
      <div ref={headRef} style={{ marginBottom: '4rem' }}>
        <span
          className="s-tag"
          style={{ opacity: headIn ? 1 : 0, transition: 'opacity .5s' }}
        >
          03 — Impacto
        </span>
        <div style={{ maxWidth: '800px' }}>
          <h2
            className="s-h2"
            style={{
              opacity: headIn ? 1 : 0,
              transform: headIn ? 'none' : 'translateY(24px)',
              transition: 'all .8s var(--ease-expo) .1s',
            }}
          >
            Conquistas que <em>mudaram</em> o jogo
          </h2>
          <p
            className="body-lg"
            style={{
              marginTop: '1rem',
              opacity: headIn ? 1 : 0,
              transition: 'opacity .7s .35s',
            }}
          >
            Mais que projetos, implementei infraestrutura que liberou todo um time pra crescer com ferramentas modernas.
          </p>
        </div>
      </div>

      {/* ── Grid de Achievements ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {achievements.map((achievement, i) => (
          <AchievementCard key={achievement.id} achievement={achievement} index={i} />
        ))}
      </div>

      {/* ── CTA ── */}
      <div style={{ marginTop: '5rem', textAlign: 'center' }}>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1.05rem',
            color: 'rgba(255,255,255,.7)',
            marginBottom: '2rem',
          }}
        >
          Quer implementar mudanças assim no seu time?
        </p>
        <a href="#contact" className="glass-btn glass-btn-lime">
          Vamos conversar →
        </a>
      </div>
    </section>
  )
}
