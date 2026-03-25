'use client'
import { useEffect, useState } from 'react'

export default function Loader({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0)
  const [done, setDone]   = useState(false)

  useEffect(() => {
    const duration = 2200
    const start    = performance.now()

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      // ease out quart
      const eased = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(eased * 100))

      if (progress < 1) {
        requestAnimationFrame(tick)
      } else {
        setCount(100)
        setTimeout(() => {
          setDone(true)
          setTimeout(onDone, 900)
        }, 200)
      }
    }

    requestAnimationFrame(tick)
  }, [onDone])

  return (
    <div className={`loader ${done ? 'loaded' : ''}`}>
      <div className="loader-bar-wrap">
        <div className="loader-bar" style={{ width: `${count}%` }} />
      </div>

      {/* Corner labels */}
      <div style={{
        position: 'absolute', top: '2rem', left: '2.5rem',
        fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
        letterSpacing: '0.2em', color: 'var(--gray-mid)', textTransform: 'uppercase',
      }}>
        Portfolio — 2025
      </div>
      <div style={{
        position: 'absolute', top: '2rem', right: '2.5rem',
        fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
        letterSpacing: '0.2em', color: 'var(--gray-mid)', textTransform: 'uppercase',
      }}>
        Loading
      </div>

      {/* Counter */}
      <div style={{ textAlign: 'center' }}>
        <div className="loader-count">
          {String(count).padStart(3, '0')}
          <span>%</span>
        </div>
        <div className="loader-label">Preparando experiência</div>
      </div>

      {/* Bottom line */}
      <div style={{
        position: 'absolute', bottom: '2rem',
        left: '2.5rem', right: '2.5rem',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.55rem',
          letterSpacing: '0.15em', color: 'var(--gray)',
          textTransform: 'uppercase',
        }}>
          Dev · Data · Automação
        </div>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.55rem',
          letterSpacing: '0.15em', color: 'var(--gray)',
          textTransform: 'uppercase',
        }}>
          Next.js · Vercel
        </div>
      </div>
    </div>
  )
}