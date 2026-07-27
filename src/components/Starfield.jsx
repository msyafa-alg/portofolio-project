import { useEffect, useRef } from 'react'

export default function Starfield() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId

    const isDark = () =>
      document.documentElement.getAttribute('data-theme') !== 'light'

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      init()
    }

    let stars = []

    const init = () => {
      const w = canvas.width, h = canvas.height
      stars = []

      for (let i = 0; i < 140; i++) {
        const layer = i < 80 ? 1 : i < 120 ? 2 : 3
        const size = layer === 1 ? Math.random() * 0.6 + 0.5
                   : layer === 2 ? Math.random() * 1 + 0.8
                   : Math.random() * 1.5 + 1.5
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: size,
          a1: layer === 1 ? Math.random() * 0.08 + 0.04
            : layer === 2 ? Math.random() * 0.12 + 0.12
            : Math.random() * 0.15 + 0.3,
          a2: layer === 1 ? Math.random() * 0.1 + 0.08
            : layer === 2 ? Math.random() * 0.15 + 0.2
            : Math.random() * 0.15 + 0.5,
          phase: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.008 + 0.003,
          blur: layer === 3 ? Math.random() * 2 + 1 : 0,
        })
      }
    }

    const draw = (time) => {
      const dark = isDark()
      canvas.style.background = dark ? '#09090b' : '#ffffff'
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const s of stars) {
        const alpha = s.a1 + (s.a2 - s.a1) * (Math.sin(time * s.speed + s.phase) * 0.5 + 0.5)
        const color = dark ? '255,255,255' : '0,0,0'
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${color},${alpha})`
        ctx.fill()

        if (s.blur > 0) {
          ctx.beginPath()
          ctx.arc(s.x, s.y, s.r + s.blur, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${color},${alpha * 0.15})`
          ctx.fill()
        }
      }

      animId = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    animId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  )
}
