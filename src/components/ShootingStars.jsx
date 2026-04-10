import { useEffect, useRef } from 'react'

export default function ShootingStars() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Static star field
    const STAR_COUNT = 120
    const stars = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 0.9 + 0.1,
      alpha: Math.random() * 0.5 + 0.1,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      twinkleDir: Math.random() > 0.5 ? 1 : -1,
    }))

    // Shooting stars pool
    const MAX_SHOOTING = 4
    const shootingStars = []

    const spawnShooting = () => {
      if (shootingStars.length >= MAX_SHOOTING) return
      const angle = (Math.random() * 30 + 20) * (Math.PI / 180) // 20–50 deg
      const speed = Math.random() * 6 + 4
      shootingStars.push({
        x: Math.random() * canvas.width * 0.8,
        y: Math.random() * canvas.height * 0.4,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        len: Math.random() * 120 + 60,
        alpha: 1,
        width: Math.random() * 1.2 + 0.4,
        trail: [],
      })
    }

    // Spawn interval
    const spawnInterval = setInterval(() => {
      if (Math.random() > 0.3) spawnShooting()
    }, 1200)

    const getAccentColor = () => {
      const theme = document.documentElement.getAttribute('data-theme')
      return theme === 'light' ? 'rgba(0,0,0,' : 'rgba(255,255,255,'
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const colorBase = getAccentColor()

      // Twinkle static stars
      stars.forEach(s => {
        s.alpha += s.twinkleSpeed * s.twinkleDir
        if (s.alpha >= 0.7 || s.alpha <= 0.05) s.twinkleDir *= -1
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `${colorBase}${s.alpha})`
        ctx.fill()
      })

      // Shooting stars
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i]
        s.trail.push({ x: s.x, y: s.y })
        if (s.trail.length > 18) s.trail.shift()

        s.x += s.vx
        s.y += s.vy
        s.alpha -= 0.018

        if (s.alpha <= 0 || s.x > canvas.width + 100 || s.y > canvas.height + 100) {
          shootingStars.splice(i, 1)
          continue
        }

        // Draw trail
        if (s.trail.length > 1) {
          const grad = ctx.createLinearGradient(
            s.trail[0].x, s.trail[0].y, s.x, s.y
          )
          grad.addColorStop(0, `${colorBase}0)`)
          grad.addColorStop(1, `${colorBase}${s.alpha})`)
          ctx.beginPath()
          ctx.moveTo(s.trail[0].x, s.trail[0].y)
          s.trail.forEach(p => ctx.lineTo(p.x, p.y))
          ctx.lineTo(s.x, s.y)
          ctx.strokeStyle = grad
          ctx.lineWidth = s.width
          ctx.lineCap = 'round'
          ctx.stroke()
        }

        // Head glow
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.width * 1.5, 0, Math.PI * 2)
        ctx.fillStyle = `${colorBase}${s.alpha * 0.8})`
        ctx.fill()
      }

      animId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animId)
      clearInterval(spawnInterval)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.7 }}
    />
  )
}
