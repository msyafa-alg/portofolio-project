import { useEffect, useRef } from 'react'

// Draw a 4-point star shape
function drawStar(ctx, x, y, size, rotation = 0) {
  ctx.save()
  ctx.translate(x, y)
  ctx.rotate(rotation)
  ctx.beginPath()
  for (let i = 0; i < 4; i++) {
    const outerAngle = (i * Math.PI) / 2
    const innerAngle = outerAngle + Math.PI / 4
    if (i === 0) ctx.moveTo(Math.cos(outerAngle) * size, Math.sin(outerAngle) * size)
    else         ctx.lineTo(Math.cos(outerAngle) * size, Math.sin(outerAngle) * size)
    ctx.lineTo(Math.cos(innerAngle) * size * 0.38, Math.sin(innerAngle) * size * 0.38)
  }
  ctx.closePath()
  ctx.restore()
}

export default function CustomCursor() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')
    let   animId

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)

    const mouse = { x: -200, y: -200 }
    const onMove = e => { mouse.x = e.clientX; mouse.y = e.clientY }
    window.addEventListener('mousemove', onMove)

    // Trail particles
    const stars = []

    const spawn = () => {
      const spread = 6
      stars.push({
        x:    mouse.x + (Math.random() - 0.5) * spread,
        y:    mouse.y + (Math.random() - 0.5) * spread,
        size: Math.random() * 7 + 3,
        life: 1,
        decay: Math.random() * 0.03 + 0.025,
        rot:  Math.random() * Math.PI,
        rotSpeed: (Math.random() - 0.5) * 0.08,
        vx:   (Math.random() - 0.5) * 0.6,
        vy:   (Math.random() - 0.5) * 0.6,
        // mix of white and very subtle silver-blue
        hue:  Math.random() > 0.7 ? 210 : 0,
        sat:  Math.random() > 0.7 ? 30  : 0,
      })
    }

    const getStarColor = (hue, sat, alpha) => {
      const isDark = document.documentElement.getAttribute('data-theme') !== 'light'
      if (isDark) {
        return hue === 0
          ? `rgba(255,255,255,${alpha})`
          : `hsla(${hue},${sat}%,90%,${alpha})`
      } else {
        // dark stars for light mode
        return hue === 0
          ? `rgba(30,30,40,${alpha})`
          : `hsla(220,40%,25%,${alpha})`
      }
    }

    const getGlowColor = () => {
      const isDark = document.documentElement.getAttribute('data-theme') !== 'light'
      return isDark ? 'rgba(255,255,255,0.6)' : 'rgba(30,30,60,0.4)'
    }

    const getCursorColor = () => {
      const isDark = document.documentElement.getAttribute('data-theme') !== 'light'
      return isDark ? '#ffffff' : '#1a1a2e'
    }

    let frame = 0

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      frame++

      // Spawn 1–2 stars per frame
      spawn()
      if (frame % 2 === 0) spawn()

      // Update + draw trail stars
      for (let i = stars.length - 1; i >= 0; i--) {
        const s = stars[i]
        s.life -= s.decay
        s.rot  += s.rotSpeed
        s.x    += s.vx
        s.y    += s.vy
        s.size *= 0.985

        if (s.life <= 0) { stars.splice(i, 1); continue }

        const alpha = s.life * 0.85
        const color = getStarColor(s.hue, s.sat, alpha)

        ctx.save()
        ctx.globalAlpha = alpha
        ctx.fillStyle   = color
        ctx.shadowColor = getGlowColor()
        ctx.shadowBlur  = s.size * 1.8
        drawStar(ctx, s.x, s.y, s.size, s.rot)
        ctx.fill()
        ctx.restore()
      }

      // Main cursor dot
      ctx.save()
      ctx.globalAlpha = 1
      ctx.fillStyle   = getCursorColor()
      ctx.shadowColor = getGlowColor()
      ctx.shadowBlur  = 12
      drawStar(ctx, mouse.x, mouse.y, 5, frame * 0.02)
      ctx.fill()
      ctx.restore()

      animId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[9999]" />
}
