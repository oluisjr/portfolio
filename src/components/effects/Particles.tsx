'use client'
import { useEffect, useRef } from 'react'

interface Props {
  count?: number
  color?: string
  speed?: number
  size?: number
  connect?: boolean
  connectDist?: number
  style?: React.CSSProperties
}

export default function Particles({
  count = 60,
  color = '200,255,0',
  speed = 0.4,
  size = 1.5,
  connect = true,
  connectDist = 120,
  style,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    let W = canvas.parentElement!.clientWidth
    let H = canvas.parentElement!.clientHeight
    canvas.width  = W
    canvas.height = H

    type Particle = { x: number; y: number; vx: number; vy: number; r: number; a: number }

    const particles: Particle[] = Array.from({ length: count }, () => ({
      x:  Math.random() * W,
      y:  Math.random() * H,
      vx: (Math.random() - 0.5) * speed,
      vy: (Math.random() - 0.5) * speed,
      r:  Math.random() * size + 0.5,
      a:  Math.random() * 0.5 + 0.3,
    }))

    let raf: number
    const draw = () => {
      ctx.clearRect(0, 0, W, H)

      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > W) p.vx *= -1
        if (p.y < 0 || p.y > H) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${color},${p.a})`
        ctx.fill()
      })

      if (connect) {
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx   = particles[i].x - particles[j].x
            const dy   = particles[i].y - particles[j].y
            const dist = Math.sqrt(dx * dx + dy * dy)
            if (dist < connectDist) {
              ctx.beginPath()
              ctx.moveTo(particles[i].x, particles[i].y)
              ctx.lineTo(particles[j].x, particles[j].y)
              ctx.strokeStyle = `rgba(${color},${0.12 * (1 - dist / connectDist)})`
              ctx.lineWidth = 0.5
              ctx.stroke()
            }
          }
        }
      }

      raf = requestAnimationFrame(draw)
    }

    draw()

    const onResize = () => {
      W = canvas.parentElement!.clientWidth
      H = canvas.parentElement!.clientHeight
      canvas.width  = W
      canvas.height = H
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [count, color, speed, size, connect, connectDist])

  return (
    <canvas ref={canvasRef} style={{
      position: 'absolute', inset: 0,
      width: '100%', height: '100%',
      pointerEvents: 'none',
      ...style,
    }} />
  )
}