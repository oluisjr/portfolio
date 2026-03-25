'use client'
import { useEffect, useRef, useState } from 'react'
import Particles    from '@/components/effects/Particles'
import GradientText from '@/components/effects/GradientText'
import StarBorder   from '@/components/effects/StarBorder'

const socials = [
  { label: 'GitHub',   href: 'https://github.com/luisignacio' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/luisignacio' },
  { label: 'Email',    href: 'mailto:luis@email.com' },
]

export default function Contact() {
  const headRef  = useRef<HTMLDivElement>(null)
  const emailRef = useRef<HTMLDivElement>(null)
  const [headIn, setHeadIn] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setHeadIn(true), { threshold: .08 })
    if (headRef.current) obs.observe(headRef.current)
    return () => obs.disconnect()
  }, [])

  const onEmailMove = (e: React.MouseEvent) => {
    const el = emailRef.current!
    const rect = el.getBoundingClientRect()
    el.style.transform = `translate(${(e.clientX-rect.left-rect.width/2)*.4}px,${(e.clientY-rect.top-rect.height/2)*.4}px)`
  }
  const onEmailLeave = () => { if (emailRef.current) emailRef.current.style.transform = 'translate(0,0)' }

  return (
    <footer id="contact" style={{ background: 'var(--bg)', position: 'relative', overflow: 'hidden', minHeight: '85vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(6rem,11vw,11rem) clamp(1rem,4vw,4rem) clamp(4rem,6vw,6rem)' }}>
      <Particles count={65} color="180,255,0" speed={.28} size={1.2} connect style={{ zIndex: 0, opacity: .8 }} />

      <div style={{ position: 'absolute', bottom: '-.05em', left: '-.02em', fontFamily: 'var(--font-display)', fontSize: 'clamp(6rem,18vw,18rem)', color: 'rgba(180,255,0,.03)', lineHeight: .85, userSelect: 'none', pointerEvents: 'none', letterSpacing: '-.03em', zIndex: 0 }}>CONTATO</div>
      <div style={{ position: 'absolute', left: 'clamp(1rem,4vw,3rem)', top: 'clamp(6rem,11vw,11rem)', bottom: 'clamp(4rem,6vw,6rem)', width: 1, background: 'linear-gradient(to bottom,var(--lime),transparent)', opacity: .25, zIndex: 1 }} />

      <div ref={headRef} style={{ position: 'relative', zIndex: 2, paddingLeft: 'clamp(1.5rem,4vw,3.5rem)' }}>
        <span className="s-tag" style={{ opacity: headIn ? 1 : 0, transition: 'opacity .5s' }}>04 — Vamos conversar</span>

        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem,10vw,9rem)', lineHeight: .88, letterSpacing: '.01em', marginBottom: '4rem', maxWidth: 900 }}>
          {(['TEM UM','PROJETO'] as const).map((line, i) => (
            <div key={i} style={{ overflow: 'hidden', display: 'block' }}>
              <span style={{ display: 'inline-block', opacity: headIn ? 1 : 0, transform: headIn ? 'none' : 'translateY(110%)', transition: `all .75s var(--ease-expo) ${.08+i*.14}s` }}>{line}</span>
            </div>
          ))}
          <div style={{ overflow: 'hidden', display: 'block' }}>
            <span style={{ display: 'inline-block', opacity: headIn ? 1 : 0, transform: headIn ? 'none' : 'translateY(110%)', transition: 'all .75s var(--ease-expo) .36s' }}>
              <GradientText colors={['#B4FF00','#e8ff88','#ffffff','#B4FF00']} speed="3.5s">EM MENTE?</GradientText>
            </span>
          </div>
        </h2>

        {/* Magnetic email */}
        <div ref={emailRef} onMouseMove={onEmailMove} onMouseLeave={onEmailLeave}
          style={{ display: 'inline-block', marginBottom: '5rem', transition: 'transform .4s var(--ease-expo)', opacity: headIn ? 1 : 0, animation: headIn ? 'fadeUp .7s var(--ease-expo) .55s both' : 'none' }}>
          <StarBorder color="var(--lime)" speed="3s" href="mailto:luis@email.com">
            <span style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontFamily: 'var(--font-display)', fontSize: 'clamp(.85rem,2vw,1.3rem)', letterSpacing: '.12em', color: 'var(--lime)', padding: '1.1rem 2.5rem' }}>
              LUIS@EMAIL.COM <span style={{ fontSize: '1.4rem' }}>→</span>
            </span>
          </StarBorder>
        </div>

        {/* Social glass pills */}
        <div style={{ display: 'flex', gap: '.75rem', flexWrap: 'wrap', marginBottom: '4rem', opacity: headIn ? 1 : 0, transition: 'opacity .7s .65s' }}>
          {socials.map(s => (
            <a key={s.label} href={s.href} className="glass-btn">
              {s.label}
            </a>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '2rem', borderTop: '1px solid var(--border)', flexWrap: 'wrap', gap: '1rem', opacity: headIn ? 1 : 0, transition: 'opacity .7s .8s' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '.58rem', letterSpacing: '.12em', color: 'var(--gray-mid)', textTransform: 'uppercase' }}>
            © {new Date().getFullYear()} Luis Ignacio Jr. — Crafted with obsession
          </p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '.58rem', letterSpacing: '.12em', color: 'var(--gray-mid)', textTransform: 'uppercase' }}>
            Next.js · Vercel · Unicorn Studio
          </p>
        </div>
      </div>
    </footer>
  )
}