'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { ThemeProvider } from '@/components/ThemeContext'
import Loader           from '@/components/Loader'
import Cursor           from '@/components/Cursor'
import Navbar           from '@/components/Navbar'
import About            from '@/components/About'
import Impact           from '@/components/Impact'
import Projects         from '@/components/Projects'
import Stack            from '@/components/Stack'
import Publications     from '@/components/Publications'
import Contact          from '@/components/Contact'
import ParallaxLayer    from '@/components/ParallaxLayer'
import ScrollIndicator  from '@/components/ScrollIndicator'
import DecryptedText    from '@/components/effects/DecryptedText'
import GradientText     from '@/components/effects/GradientText'

const UnicornScene = dynamic(() => import('unicornstudio-react'), { ssr: false })

function SplitText({ text, baseDelay = 0, color }: { text: string; baseDelay?: number; color?: string }) {
  return (
    <span style={{ color }}>
      {text.split('').map((char, i) => (
        <span key={i} className="split-char" style={{ animationDelay: `${baseDelay + i * .05}s` }}>
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  )
}

const marqueeA = ['Python','Streamlit','Power Platform','HTML/CSS','Next.js','Pandas','SQL','Automação','Dados','Power BI']
const marqueeB = ['Developer','Data Analyst','Automação','Dashboards','APIs','Web Scraping','Power BI','Next.js']

function PageContent() {
  const [loaded, setLoaded]       = useState(false)
  const [heroReady, setHeroReady] = useState(false)
  const [tagReady, setTagReady]   = useState(false)
  const heroTextRef = useRef<HTMLDivElement>(null)

  const onLoaderDone = useCallback(() => {
    setLoaded(true)
    setTimeout(() => setHeroReady(true), 80)
    setTimeout(() => setTagReady(true), 1700)
  }, [])

  useEffect(() => {
    if (!loaded) return
    const fn = () => {
      if (heroTextRef.current)
        heroTextRef.current.style.transform = `translateY(${window.scrollY * .22}px)`
    }
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [loaded])

  return (
    <>
      <Cursor />
      <Loader onDone={onLoaderDone} />
      <Navbar visible={loaded} />
      <ParallaxLayer />
      <ScrollIndicator />

      {/* ══ HERO — Unicorn fills 100%, zero vignette overlay ══ */}
      <section id="hero" style={{ position: 'relative', width: '100vw', height: '100svh', overflow: 'hidden' }}>

        {/* Unicorn — absolute fill, z=0 */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <UnicornScene
            projectId="1sVW2jx7mBhISxh8hD4d"
            width="100%" height="100%"
            scale={1} dpi={1.5}
            sdkUrl="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@2.1.4/dist/unicornStudio.umd.js"
          />
        </div>

        {/* Only a very subtle bottom fade so content flows into next section */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '25%', background: 'linear-gradient(to top,var(--bg),transparent)', zIndex: 1, pointerEvents: 'none' }} />

        {/* Hero text — z=2, sits on top of Unicorn */}
        <div ref={heroTextRef} style={{
          position: 'absolute', inset: 0, zIndex: 2,
          display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-end',
          padding: '0 2rem 6rem 4rem',
          textAlign: 'left',
        }}>
          {/* Pill eyebrow */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '.9rem', background: 'rgba(0,0,0,0.35)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 'var(--r-pill)', padding: '.55rem 1.5rem', marginBottom: '1.5rem', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', animation: heroReady ? 'fadeIn .9s var(--ease-expo) .1s both' : 'none' }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--lime)', boxShadow: '0 0 10px var(--lime)', animation: 'pulse 2s infinite', flexShrink: 0 }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.6rem', letterSpacing: '.24em', color: 'rgba(255,255,255,0.75)', textTransform: 'uppercase' }}>
              Developer &amp; Data Analyst
            </span>
          </div>

          {/* Name */}
          {heroReady && (
            <h1 style={{ lineHeight: .88, letterSpacing: '-.01em', textShadow: '0 2px 40px rgba(0,0,0,.5)' }}>
              <span style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: 'clamp(3.5rem,10vw,9rem)', color: '#ffffff' }}>
                <SplitText text="LUIS" baseDelay={.3} />
              </span>
              <span className="gradient-name" style={{
                display: 'block',
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontWeight: 900,
                fontSize: 'clamp(2.8rem,11vw,10rem)',
                letterSpacing: '-.02em',
                lineHeight: .9,
              }}>
                <SplitText text="IGNACIO JR." baseDelay={.52} />
              </span>
            </h1>
          )}

          {/* Blink cursor */}
          <div style={{ width: 2, height: 'clamp(1.5rem,3vw,2.5rem)', alignSelf: 'flex-start', background: 'var(--lime)', marginTop: '.5rem', boxShadow: '0 0 14px var(--lime)', animation: heroReady ? 'blink 1.1s ease-in-out 2s infinite' : 'none', opacity: heroReady ? 1 : 0 }} />

          {/* Tagline */}
          <div style={{ marginTop: '1.5rem', animation: heroReady ? 'fadeUp .8s var(--ease-expo) 1.3s both' : 'none' }}>
            <DecryptedText text="Dados. Automação. Interfaces que funcionam." trigger={tagReady} speed={35} sequential
              style={{ fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: 'clamp(.85rem,1.4vw,1.1rem)', color: 'rgba(255,255,255,0.65)', letterSpacing: '.04em', textShadow: '0 1px 10px rgba(0,0,0,.5)' }} />
          </div>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: '1rem', marginTop: '2.5rem', flexWrap: 'wrap', justifyContent: 'center', animation: heroReady ? 'fadeUp .9s var(--ease-expo) 1.6s both' : 'none' }}>
            <a href="#projects" className="glass-btn glass-btn-lime">Ver Projetos</a>
            <a href="#contact"  className="glass-btn">Contato</a>
          </div>
        </div>

        {/* Scroll line */}
        <div style={{ position: 'absolute', bottom: '2rem', left: '3rem', zIndex: 3, animation: heroReady ? 'fadeIn 1s var(--ease-expo) 2.2s both' : 'none' }}>
          <div style={{ width: 1, height: 52, background: 'linear-gradient(to bottom,transparent,var(--lime))', animation: 'scrollLine 2s ease-in-out infinite' }} />
        </div>

        {/* Vertical socials */}
        <div className="hero-socials" style={{ position: 'absolute', bottom: '2rem', right: '3rem', zIndex: 3, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '1.3rem', animation: heroReady ? 'fadeIn 1s var(--ease-expo) 2.4s both' : 'none' }}>
          {['GitHub','LinkedIn','Email'].map(s => (
            <a key={s} href="#" style={{ fontFamily: 'var(--font-mono)', fontSize: '.55rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,.5)', textDecoration: 'none', writingMode: 'vertical-rl', transition: 'color .2s,letter-spacing .25s' }}
              onMouseEnter={e => { e.currentTarget.style.color='var(--lime)'; e.currentTarget.style.letterSpacing='.3em' }}
              onMouseLeave={e => { e.currentTarget.style.color='rgba(255,255,255,.5)'; e.currentTarget.style.letterSpacing='.2em' }}>
              {s}
            </a>
          ))}
        </div>
      </section>

      {/* ══ MARQUEE ══ */}
      <div style={{ background: 'var(--lime)', padding: '.65rem 0', overflow: 'hidden', position: 'relative', zIndex: 2 }}>
        <div className="marquee-track">
          {[...marqueeA,...marqueeA].map((item, i) => (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '1.4rem', fontFamily: 'var(--font-mono)', fontSize: '.72rem', letterSpacing: '.18em', color: 'var(--bg)', padding: '0 1.5rem', whiteSpace: 'nowrap', textTransform: 'uppercase' }}>
              {item}
              <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(0,0,0,.3)', flexShrink: 0 }} />
            </span>
          ))}
        </div>
      </div>
      <div style={{ background: 'var(--bg-card)', borderBottom: '1px solid var(--border)', padding: '.6rem 0', overflow: 'hidden', position: 'relative', zIndex: 2 }}>
        <div className="marquee-track-rev">
          {[...marqueeB,...marqueeB].map((item, i) => (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '1.6rem', fontFamily: 'var(--font-mono)', fontSize: '.6rem', letterSpacing: '.24em', color: 'var(--gray-light)', padding: '0 2rem', whiteSpace: 'nowrap', textTransform: 'uppercase' }}>
              {item}
              <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--lime)', opacity: .5, flexShrink: 0 }} />
            </span>
          ))}
        </div>
      </div>

      {/* ══ SECTIONS ══ */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <About />
        <Impact />
        <Projects />
        <Stack />
        <Publications />
        <Contact />
      </div>
    </>
  )
}

export default function Home() {
  return (
    <ThemeProvider>
      <PageContent />
    </ThemeProvider>
  )
}
