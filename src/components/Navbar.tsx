'use client'
import { useEffect, useRef, useState } from 'react'
import { useTheme } from '@/components/ThemeContext'

const links = [
  { label: 'Sobre',      href: '#about'        },
  { label: 'Projetos',   href: '#projects'      },
  { label: 'Stack',      href: '#stack'         },
  { label: 'Publicações',href: '#publications'  },
  { label: 'Contato',    href: '#contact'       },
]

export default function Navbar({ visible }: { visible: boolean }) {
  const [scrolled, setScrolled] = useState(false)
  const ctaRef = useRef<HTMLAnchorElement>(null)
  const { theme, toggle } = useTheme()

  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    const raf = window.requestAnimationFrame(() => setMounted(true))
    return () => window.cancelAnimationFrame(raf)
  }, [])

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const onCtaMove = (e: React.MouseEvent) => {
    const el = ctaRef.current!
    const rect = el.getBoundingClientRect()
    el.style.transform = `translate(${(e.clientX-rect.left-rect.width/2)*.38}px,${(e.clientY-rect.top-rect.height/2)*.38}px)`
  }

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 7000,
      padding: '0 2.5rem', height: 64,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: scrolled ? 'var(--bg-glass)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px) saturate(1.5)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(1.5)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border)' : 'none',
      transition: 'all .5s var(--ease-expo)',
      opacity: visible ? 1 : 0,
      transform: visible ? 'none' : 'translateY(-20px)',
    }}>
      {/* Logo */}
      <a href="#" style={{ textDecoration: 'none' }}>
        <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', fontWeight: 700, color: 'var(--white)', letterSpacing: '-.01em' }}>
          Luis <em style={{ fontStyle: 'italic', color: 'var(--lime)' }}>Ignacio Jr.</em>
        </span>
      </a>

      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        {/* Links */}
        <ul className="nav-links" style={{ display: 'flex', gap: '2rem', listStyle: 'none' }}>
          {links.map(l => (
            <li key={l.label}>
              <a href={l.href} style={{ fontFamily: 'var(--font-mono)', fontSize: '.6rem', letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--gray-light)', textDecoration: 'none', transition: 'color .2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--lime)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--gray-light)')}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Theme toggle — render null until mounted to avoid hydration mismatch */}
        <button
          onClick={toggle}
          className="theme-toggle"
          aria-label="Toggle theme"
          style={{ flexShrink: 0, width: 36, height: 36 }}
        >
          {mounted && (theme === 'dark' ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--lime)" strokeWidth="1.5" strokeLinecap="round">
              <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--lime)" strokeWidth="1.5" strokeLinecap="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          ))}
        </button>

        {/* CTA */}
        <a ref={ctaRef} href="mailto:luis@email.com" className="nav-cta glass-btn glass-btn-lime"
          onMouseMove={onCtaMove}
          onMouseLeave={() => { if (ctaRef.current) ctaRef.current.style.transform = 'translate(0,0)' }}
          style={{ fontSize: '.62rem', padding: '.5rem 1.2rem', letterSpacing: '.14em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', transition: 'all .3s var(--ease-expo)' }}>
          Contato
        </a>
      </div>
    </nav>
  )
}