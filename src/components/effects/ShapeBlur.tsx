'use client'

interface Orb {
  size: number
  x: string
  y: string
  color: string
  duration: string
  delay: string
  blur: number
}

const orbs: Orb[] = [
  { size: 600, x: '10%',  y: '20%', color: 'rgba(200,255,0,0.06)',   duration: '18s', delay: '0s',    blur: 100 },
  { size: 400, x: '70%',  y: '60%', color: 'rgba(200,255,0,0.04)',   duration: '22s', delay: '-6s',   blur: 80  },
  { size: 300, x: '40%',  y: '80%', color: 'rgba(120,200,0,0.05)',   duration: '15s', delay: '-3s',   blur: 90  },
  { size: 250, x: '80%',  y: '10%', color: 'rgba(200,255,0,0.03)',   duration: '20s', delay: '-10s',  blur: 70  },
  { size: 200, x: '25%',  y: '50%', color: 'rgba(255,255,255,0.025)',duration: '25s', delay: '-8s',   blur: 60  },
]

export default function ShapeBlur({ zIndex = -1 }: { zIndex?: number }) {
  return (
    <>
      <style>{`
        @keyframes orbFloat {
          0%,100% { transform: translate(0, 0) scale(1); }
          33%      { transform: translate(30px, -40px) scale(1.05); }
          66%      { transform: translate(-20px, 20px) scale(0.97); }
        }
      `}</style>
      <div style={{
        position: 'absolute', inset: 0,
        zIndex, pointerEvents: 'none', overflow: 'hidden',
      }}>
        {orbs.map((orb, i) => (
          <div key={i} style={{
            position: 'absolute',
            left: orb.x, top: orb.y,
            width: orb.size, height: orb.size,
            borderRadius: '50%',
            background: orb.color,
            filter: `blur(${orb.blur}px)`,
            transform: 'translate(-50%, -50%)',
            animation: `orbFloat ${orb.duration} ease-in-out ${orb.delay} infinite`,
          }} />
        ))}
      </div>
    </>
  )
}