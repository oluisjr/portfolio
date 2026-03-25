'use client'

interface Props {
  children: React.ReactNode
  colors?: string[]
  speed?: string
  style?: React.CSSProperties
  className?: string
}

export default function GradientText({
  children,
  colors = ['#c8ff00', '#ffffff', '#c8ff00', '#88ff00', '#ffffff'],
  speed = '5s',
  style,
  className,
}: Props) {
  const id = `gt-${speed.replace('s', '')}`
  const gradient = colors.join(', ')

  return (
    <>
      <style>{`
        @keyframes ${id}-shift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .${id} {
          background: linear-gradient(90deg, ${gradient});
          background-size: 300% 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: ${id}-shift ${speed} ease infinite;
          display: inline-block;
        }
      `}</style>
      <span className={`${id} ${className ?? ''}`} style={style}>
        {children}
      </span>
    </>
  )
}