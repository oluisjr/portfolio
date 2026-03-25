'use client'
import { useEffect, useState, useCallback } from 'react'

const sections = [
  { id: 'hero',         label: 'Início'      },
  { id: 'about',        label: 'Sobre'        },
  { id: 'projects',     label: 'Projetos'     },
  { id: 'stack',        label: 'Stack'        },
  { id: 'publications', label: 'Publicações'  },
  { id: 'contact',      label: 'Contato'      },
]

export default function ScrollIndicator() {
  const [active, setActive]    = useState('hero')
  const [progress, setProgress] = useState(0)

  const onScroll = useCallback(() => {
    const scrollY = window.scrollY
    const total   = document.body.scrollHeight - window.innerHeight
    setProgress(total > 0 ? (scrollY / total) * 100 : 0)

    for (let i = sections.length - 1; i >= 0; i--) {
      const el = document.getElementById(sections[i].id)
      if (el && scrollY >= el.offsetTop - window.innerHeight / 2) {
        setActive(sections[i].id)
        break
      }
    }
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    const rafId = requestAnimationFrame(onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafId)
    }
  }, [onScroll])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="scroll-indicator">
      {/* Progress bar vertical */}
      <div style={{
        position: 'fixed',
        right: '1.5rem',
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: 0,
        zIndex: 800,
      }}>
        {/* Vertical track */}
        <div style={{ position: 'absolute', right: 3, top: 0, bottom: 0, width: 1, background: 'var(--border)', zIndex: -1 }} />
        <div style={{ position: 'absolute', right: 3, top: 0, width: 1, background: 'var(--lime)', height: `${progress}%`, transition: 'height .1s linear', zIndex: -1 }} />

        {sections.map((s, i) => (
          <div
            key={s.id}
            className={`scroll-section ${active === s.id ? 'active' : ''}`}
            onClick={() => scrollTo(s.id)}
            style={{ padding: '6px 0' }}
          >
            <span className="scroll-section-label">{s.label}</span>
            <div className="scroll-dot" />
          </div>
        ))}
      </div>
    </div>
  )
}