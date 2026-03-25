'use client'
import { useEffect, useRef } from 'react'

interface Props {
  rows?: number
  cols?: number
  color?: string
  lineWidth?: number
  maxAngle?: number
  style?: React.CSSProperties
}

export default function MagnetLines({
  rows = 34, cols = 34,
  color = 'rgba(200,255,0,0.18)',
  lineWidth = 1.2,
  maxAngle = 55,
  style,
}: Props) {
  const svgRef = useRef<SVGSVGElement>(null)
  const mouse  = useRef({ x: -9999, y: -9999 })

  useEffect(() => {
    const svg  = svgRef.current
    if (!svg) return

    const lines: SVGLineElement[] = []

    // Build grid of lines
    const W = svg.clientWidth  || 800
    const H = svg.clientHeight || 400
    const cellW = W / cols
    const cellH = H / rows

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const cx = cellW * c + cellW / 2
        const cy = cellH * r + cellH / 2
        const half = Math.min(cellW, cellH) * 0.38

        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
        line.setAttribute('stroke', color)
        line.setAttribute('stroke-width', String(lineWidth))
        line.setAttribute('stroke-linecap', 'round')
        line.dataset.cx = String(cx)
        line.dataset.cy = String(cy)
        line.dataset.half = String(half)
        svg.appendChild(line)
        lines.push(line)
      }
    }

    const update = () => {
      const rect = svg.getBoundingClientRect()
      const mx   = mouse.current.x - rect.left
      const my   = mouse.current.y - rect.top

      lines.forEach(line => {
        const cx   = parseFloat(line.dataset.cx!)
        const cy   = parseFloat(line.dataset.cy!)
        const half = parseFloat(line.dataset.half!)

        const dx     = mx - cx
        const dy     = my - cy
        const dist   = Math.sqrt(dx * dx + dy * dy)
        const angle  = dist < 400 ? Math.atan2(dy, dx) : Math.PI / 4
        const cosA   = Math.cos(angle)
        const sinA   = Math.sin(angle)

        line.setAttribute('x1', String(cx - cosA * half))
        line.setAttribute('y1', String(cy - sinA * half))
        line.setAttribute('x2', String(cx + cosA * half))
        line.setAttribute('y2', String(cy + sinA * half))
      })
    }

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
    }

    // init
    lines.forEach(line => {
      const cx   = parseFloat(line.dataset.cx!)
      const cy   = parseFloat(line.dataset.cy!)
      const half = parseFloat(line.dataset.half!)
      line.setAttribute('x1', String(cx - half * 0.707))
      line.setAttribute('y1', String(cy - half * 0.707))
      line.setAttribute('x2', String(cx + half * 0.707))
      line.setAttribute('y2', String(cy + half * 0.707))
    })

    let raf: number
    const loop = () => { update(); raf = requestAnimationFrame(loop) }
    loop()
    window.addEventListener('mousemove', onMove)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      lines.forEach(l => l.remove())
    }
  }, [rows, cols, color, lineWidth, maxAngle])

  return (
    <svg ref={svgRef} style={{
      position: 'absolute', inset: 0,
      width: '100%', height: '100%',
      pointerEvents: 'none',
      ...style,
    }} />
  )
}