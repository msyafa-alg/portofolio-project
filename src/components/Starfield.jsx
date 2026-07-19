import { useMemo } from 'react'

function generateStars() {
  const stars = []

  // Layer 1: Tiny distant stars (~100) — 0.7-1.3px, low opacity, some blurred
  for (let i = 0; i < 100; i++) {
    stars.push({
      key: `t${i}`,
      x: Math.random() * 100,
      y: Math.random() * 100,
      s: Math.random() * 0.6 + 0.7,
      o1: Math.random() * 0.08 + 0.04,
      o2: Math.random() * 0.12 + 0.1,
      d: Math.random() * 14,
      du: Math.random() * 5 + 5,
      b: Math.random() > 0.5 ? 0.3 : 0,
    })
  }

  // Layer 2: Medium stars (~45) — 1.3-2.2px, medium opacity
  for (let i = 0; i < 45; i++) {
    stars.push({
      key: `m${i}`,
      x: Math.random() * 100,
      y: Math.random() * 100,
      s: Math.random() * 0.7 + 1.3,
      o1: Math.random() * 0.12 + 0.1,
      o2: Math.random() * 0.18 + 0.2,
      d: Math.random() * 16,
      du: Math.random() * 4 + 6,
      b: Math.random() > 0.3 ? 0.4 : 0,
    })
  }

  // Layer 3: Large soft-glowing stars (~12) — 2-3.5px, higher opacity, glow
  for (let i = 0; i < 12; i++) {
    stars.push({
      key: `l${i}`,
      x: Math.random() * 100,
      y: Math.random() * 100,
      s: Math.random() * 1 + 2,
      o1: Math.random() * 0.15 + 0.25,
      o2: Math.random() * 0.15 + 0.45,
      d: Math.random() * 18,
      du: Math.random() * 4 + 7,
      b: 0,
    })
  }

  return stars
}

export default function Starfield() {
  const stars = useMemo(generateStars, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" style={{ background: '#09090b' }}>
      {stars.map((star) => (
        <div
          key={star.key}
          className="absolute rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.s}px`,
            height: `${star.s}px`,
            background: '#fff',
            opacity: star.o1,
            filter: star.b ? `blur(${star.b}px)` : 'none',
            boxShadow:
              star.s > 2.5
                ? '0 0 6px rgba(255,255,255,0.12), 0 0 20px rgba(255,255,255,0.04)'
                : 'none',
            willChange: 'opacity',
            '--o1': star.o1,
            '--o2': star.o2,
            animation: `star-pulse ${star.du}s ease-in-out ${star.d}s infinite alternate`,
          }}
        />
      ))}
      <style>{`
        @keyframes star-pulse {
          0%   { opacity: var(--o1); }
          100% { opacity: var(--o2); }
        }
      `}</style>
    </div>
  )
}
