'use client'

interface Props {
  children: React.ReactNode
  as?: keyof JSX.IntrinsicElements
  color?: string
  speed?: string
  thickness?: number
  style?: React.CSSProperties
  className?: string
  href?: string
}

export default function StarBorder({
  children,
  as: Tag = 'div',
  color = '#c8ff00',
  speed = '4s',
  thickness = 1,
  style,
  className,
  href,
}: Props) {
  const keyframesId = `starborder-spin-${color.replace('#', '')}`

  const Comp = (href ? 'a' : Tag) as React.ElementType

  return (
    <>
      <style>{`
        @keyframes ${keyframesId} {
          from { --star-angle: 0deg; }
          to   { --star-angle: 360deg; }
        }
      `}</style>
      <Comp
        href={href}
        className={className}
        style={{
          position: 'relative',
          display: 'inline-block',
          borderRadius: 0,
          padding: `${thickness + 1}px`,
          background: `conic-gradient(
            from var(--star-angle, 0deg),
            transparent 0%,
            transparent 70%,
            ${color} 85%,
            white 92%,
            ${color} 98%,
            transparent 100%
          )`,
          animation: `${keyframesId} ${speed} linear infinite`,
          // @ts-expected-error
          '--star-angle': '0deg',
          textDecoration: 'none',
          ...style,
        }}
      >
        <span style={{
          display: 'block',
          background: 'var(--bg)',
          position: 'relative',
          zIndex: 1,
        }}>
          {children}
        </span>
      </Comp>
    </>
  )
}