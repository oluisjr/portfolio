'use client'
import { useEffect, useRef, useState } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*'

interface Props {
  text: string
  className?: string
  style?: React.CSSProperties
  trigger?: boolean      // external trigger
  speed?: number         // ms per frame
  sequential?: boolean   // reveal left to right
  onDone?: () => void
}

export default function DecryptedText({
  text, className, style, trigger = true,
  speed = 40, sequential = true, onDone,
}: Props) {
  const [display, setDisplay] = useState<string[]>(text.split('').map(() => ' '))
  const revealed = useRef<boolean[]>(text.split('').map(() => false))
  const raf = useRef<number>(0)

  useEffect(() => {
    if (!trigger) return
    revealed.current = text.split('').map(() => false)
    let frame = 0

    const tick = () => {
      frame++
      setDisplay(prev => {
        return prev.map((_, i) => {
          if (revealed.current[i]) return text[i]

          // sequential mode: reveal left-to-right after enough frames
          if (sequential && frame > i * 4) {
            // random chance to lock in
            if (Math.random() < 0.3) {
              revealed.current[i] = true
              return text[i]
            }
          } else if (!sequential && Math.random() < 0.08) {
            revealed.current[i] = true
            return text[i]
          }

          return text[i] === ' ' ? ' ' : CHARS[Math.floor(Math.random() * CHARS.length)]
        })
      })

      const allDone = revealed.current.every(Boolean)
      if (!allDone) {
        raf.current = window.setTimeout(tick, speed)
      } else {
        setDisplay(text.split(''))
        onDone?.()
      }
    }

    raf.current = window.setTimeout(tick, speed)
    return () => clearTimeout(raf.current)
  }, [trigger, text, speed, sequential, onDone])

  return (
    <span className={className} style={style}>
      {display.map((char, i) => (
        <span
          key={i}
          style={{
            color: revealed.current[i] ? undefined : 'var(--lime)',
            opacity: revealed.current[i] ? 1 : 0.7,
            transition: 'color 0.1s, opacity 0.1s',
            display: 'inline-block',
          }}
        >
          {char}
        </span>
      ))}
    </span>
  )
}