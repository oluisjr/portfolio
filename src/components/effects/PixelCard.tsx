'use client'
import { useRef, useState, useEffect } from 'react'

interface Props {
  children: React.ReactNode
  accentColor?: string
  style?: React.CSSProperties
  className?: string
}

export default function PixelCard({ children, accentColor = '#c8ff00', style, className }: Props) {
  const canvasRef   = useRef<HTMLCanvasElement>(null)
  const containerRef= useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    const cont   = containerRef.current
    if (!canvas || !cont) return
    const ctx = canvas.getContext('2d')!

    const W = cont.clientWidth
    const H = cont.clientHeight
    canvas.width  = W
    canvas.height = H

    const PIXEL = 12
    const cols = Math.ceil(W / PIXEL)
    const rows = Math.ceil(H / PIXEL)

    // Parse accent color to rgb
    const hex = accentColor.replace('#', '')
    const r   = parseInt(hex.substring(0, 2), 16)
    const g   = parseInt(hex.substring(2, 4), 16)
    const b   = parseInt(hex.substring(4, 6), 16)

    let progress = 0
    let raf: number
    let dir = 0

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      if (progress <= 0) return

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const delay = (col + row) / (cols + rows)
          if (delay > progress) continue

          const alpha = Math.min(1, (progress - delay) * 3)
          const x = col * PIXEL
          const y = row * PIXEL

          // Slight jitter
          const jx = (Math.random() - 0.5) * 2
          const jy = (Math.random() - 0.5) * 2

          ctx.fillStyle = `rgba(${r},${g},${b},${alpha * 0.06})`
          ctx.fillRect(x + jx, y + jy, PIXEL - 1, PIXEL - 1)

          // Edge pixel
          if (alpha > 0.7 && Math.random() < 0.3) {
            ctx.fillStyle = `rgba(${r},${g},${b},${alpha * 0.25})`
            ctx.fillRect(x, y, PIXEL - 1, PIXEL - 1)
          }
        }
      }

      if (dir > 0 && progress < 1) {
        progress = Math.min(1, progress + 0.025)
        raf = requestAnimationFrame(draw)
      } else if (dir < 0 && progress > 0) {
        progress = Math.max(0, progress - 0.04)
        raf = requestAnimationFrame(draw)
      }
    }

    if (hovered) {
      dir = 1
      raf = requestAnimationFrame(draw)
    } else {
      dir = -1
      raf = requestAnimationFrame(draw)
    }

    return () => cancelAnimationFrame(raf)
  }, [hovered, accentColor])

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ position: 'relative', overflow: 'hidden', ...style }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
      <canvas ref={canvasRef} style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 5,
      }} />
    </div>
  )
}