'use client'
import { useEffect, useRef } from 'react'

const shapes = [
  { x: '8%',  y: '10%', size: 300, speed: 0.12, opacity: 0.04, type: 'circle' },
  { x: '88%', y: '20%', size: 200, speed: 0.18, opacity: 0.05, type: 'ring'   },
  { x: '15%', y: '45%', size: 180, speed: 0.08, opacity: 0.04, type: 'ring'   },
  { x: '75%', y: '55%', size: 260, speed: 0.14, opacity: 0.04, type: 'circle' },
  { x: '50%', y: '70%', size: 150, speed: 0.20, opacity: 0.05, type: 'ring'   },
  { x: '92%', y: '80%', size: 220, speed: 0.10, opacity: 0.04, type: 'circle' },
  { x: '5%',  y: '88%', size: 180, speed: 0.16, opacity: 0.05, type: 'ring'   },
  // Grid lines
  { x: '30%', y: '25%', size: 80,  speed: 0.22, opacity: 0.06, type: 'grid'   },
  { x: '65%', y: '75%', size: 80,  speed: 0.13, opacity: 0.05, type: 'grid'   },
]

export default function ParallaxLayer() {
  const refs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const onScroll = () => {
      const sy = window.scrollY
      shapes.forEach((s, i) => {
        const el = refs.current[i]
        if (!el) return
        el.style.transform = `translateY(${-sy * s.speed}px)`
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none', overflow: 'hidden' }}>
      {shapes.map((s, i) => (
        <div
          key={i}
          ref={el => { refs.current[i] = el }}
          style={{
            position: 'absolute',
            left: s.x,
            top: s.y,
            width: s.size,
            height: s.size,
            transform: 'translateY(0)',
            willChange: 'transform',
          }}
        >
          {s.type === 'circle' && (
            <div style={{
              width: '100%', height: '100%',
              borderRadius: '50%',
              background: `radial-gradient(circle, var(--lime) 0%, transparent 70%)`,
              opacity: s.opacity,
              filter: 'blur(40px)',
            }} />
          )}
          {s.type === 'ring' && (
            <div style={{
              width: '100%', height: '100%',
              borderRadius: '50%',
              border: `1px solid var(--lime)`,
              opacity: s.opacity,
            }} />
          )}
          {s.type === 'grid' && (
            <div style={{
              width: '100%', height: '100%',
              backgroundImage: `linear-gradient(var(--lime) 1px, transparent 1px), linear-gradient(90deg, var(--lime) 1px, transparent 1px)`,
              backgroundSize: '16px 16px',
              opacity: s.opacity,
            }} />
          )}
        </div>
      ))}
    </div>
  )
}