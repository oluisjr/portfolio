'use client'
import { useRef } from 'react'

interface Props {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  glareColor?: string
  glareOpacity?: number
  glareSize?: number
  borderGlow?: boolean
  tilt?: boolean
  tiltAmount?: number
}

export default function GlareHover({
  children, className, style,
  glareColor = '255,255,255',
  glareOpacity = 0.08,
  glareSize = 400,
  borderGlow = true,
  tilt = true,
  tiltAmount = 10,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const glareRef     = useRef<HTMLDivElement>(null)

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el   = containerRef.current!
    const rect = el.getBoundingClientRect()
    const x    = e.clientX - rect.left
    const y    = e.clientY - rect.top
    const px   = x / rect.width
    const py   = y / rect.height

    // Glare position
    if (glareRef.current) {
      glareRef.current.style.background =
        `radial-gradient(circle ${glareSize}px at ${x}px ${y}px, rgba(${glareColor},${glareOpacity}) 0%, transparent 70%)`
    }

    // Tilt
    if (tilt) {
      const tx = (px - 0.5) * tiltAmount
      const ty = (py - 0.5) * -tiltAmount
      el.style.transform = `perspective(900px) rotateX(${ty}deg) rotateY(${tx}deg) translateZ(6px)`
    }
  }

  const onLeave = () => {
    const el = containerRef.current!
    if (tilt) el.style.transform = 'perspective(900px) rotateX(0) rotateY(0) translateZ(0)'
    if (glareRef.current) glareRef.current.style.background = 'transparent'
  }

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: 'relative',
        overflow: 'hidden',
        transformStyle: 'preserve-3d',
        transition: 'transform 0.12s ease, box-shadow 0.3s ease',
        ...style,
      }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onMouseEnter={() => {
        if (borderGlow && containerRef.current) {
          containerRef.current.style.boxShadow = '0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(200,255,0,0.2)'
        }
      }}
    >
      {children}
      {/* Glare layer */}
      <div
        ref={glareRef}
        style={{
          position: 'absolute', inset: 0,
          pointerEvents: 'none', zIndex: 10,
          borderRadius: 'inherit',
          transition: 'background 0.05s',
        }}
      />
    </div>
  )
}