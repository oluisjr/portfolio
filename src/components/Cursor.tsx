'use client'
import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mx = 0, my = 0, rx = 0, ry = 0
    let isHov = false, raf: number

    const move = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY
      dot.style.left  = `${mx}px`
      dot.style.top   = `${my}px`
    }
    const down  = () => ring.classList.add('is-clicking')
    const up    = () => ring.classList.remove('is-clicking')

    const checkHov = (e: MouseEvent) => {
      const el = (e.target as Element).closest('a,button,[data-cursor]')
      if (el && !isHov) {
        isHov = true
        ring.classList.add('is-hovering')
        dot.style.width  = '0px'
        dot.style.height = '0px'
      } else if (!el && isHov) {
        isHov = false
        ring.classList.remove('is-hovering')
        dot.style.width  = '6px'
        dot.style.height = '6px'
      }
    }

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t
    const tick = () => {
      rx = lerp(rx, mx, .1)
      ry = lerp(ry, my, .1)
      ring.style.left = `${rx}px`
      ring.style.top  = `${ry}px`
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mousemove', checkHov)
    window.addEventListener('mousedown', down)
    window.addEventListener('mouseup',   up)
    tick()

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousemove', checkHov)
      window.removeEventListener('mousedown', down)
      window.removeEventListener('mouseup',   up)
      cancelAnimationFrame(raf)
    }
  }, [])

  // Ring SVG: two half-arcs forming a full clockwise circle → text reads correctly
  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring">
        <svg
          width="60" height="60"
          viewBox="0 0 60 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: 'block' }}
        >
          <style>{`
            @keyframes cursor-spin {
              from { transform: rotate(0deg);   transform-origin: 30px 30px; }
              to   { transform: rotate(360deg); transform-origin: 30px 30px; }
            }
            .ctg { animation: cursor-spin 7s linear infinite; }
          `}</style>
          <defs>
            {/* Two clockwise half-arcs = full circle, text reads left→right clockwise */}
            <path id="cp" d="M30 5a25 25 0 0 1 0 50a25 25 0 0 1 0-50" />
          </defs>
          <circle cx="30" cy="30" r="25" stroke="var(--lime)" strokeWidth="0.4" opacity="0.25" />
          <g className="ctg">
            <text
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '5px',
                letterSpacing: '2.2px',
                fill: 'var(--lime)',
              }}
            >
              <textPath href="#cp" startOffset="0%">
                LUIS IGNACIO JR. · LUIS IGNACIO JR. ·{' '}
              </textPath>
            </text>
          </g>
        </svg>
      </div>
    </>
  )
}