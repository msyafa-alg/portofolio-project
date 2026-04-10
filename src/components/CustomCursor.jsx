import { useEffect, useRef } from 'react'

// ── Dragon config ──────────────────────────────
const SEGS      = 32    // body segments
const SEG_DIST  = 14    // distance between segments
const LERP_HEAD = 0.28  // head follow speed

// Color palette — white / silver / ice
const COLORS = {
  bodyHead:  { r: 220, g: 230, b: 245 },  // ice white
  bodyTail:  { r: 70,  g: 80,  b: 100 },  // dark slate
  scaleEdge: 'rgba(255,255,255,0.22)',
  glowHead:  'rgba(210,225,255,0.6)',
  glowBody:  'rgba(180,200,240,0.18)',
  gold:      '#b0c4e0',
  goldBright:'#ffffff',
  eyeOuter:  '#ddeeff',
  eyeInner:  '#88aadd',
  fireA:     '#99ccff',
  fireB:     '#cce8ff',
  fireC:     '#ffffff',
  hornBase:  '#7788aa',
  hornTip:   '#ffffff',
  tongue:    '#88aacc',
}

export default function CustomCursor() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx    = canvas.getContext('2d')
    let   animId

    // resize
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)

    // mouse
    const mouse = { x: -500, y: -500 }
    const onMove = e => { mouse.x = e.clientX; mouse.y = e.clientY }
    window.addEventListener('mousemove', onMove)

    // body chain — each node {x,y,angle}
    const body = Array.from({ length: SEGS }, () => ({ x: -500, y: -500, angle: 0 }))

    // fire particles
    const fire = []
    const spawnFire = (x, y, angle) => {
      for (let i = 0; i < 2; i++) {
        fire.push({
          x, y,
          vx: Math.cos(angle) * (Math.random() * 3 + 2) + (Math.random() - 0.5),
          vy: Math.sin(angle) * (Math.random() * 3 + 2) + (Math.random() - 0.5),
          life: 1,
          decay: 0.055 + Math.random() * 0.04,
          r: Math.random() * 3 + 1.5,
          c: [COLORS.fireA, COLORS.fireB, COLORS.fireC][Math.floor(Math.random() * 3)],
        })
      }
    }

    // lerp helper
    const lerp = (a, b, t) => a + (b - a) * t

    let frame = 0

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      frame++

      // ── update chain ──────────────────────────
      body[0].x = lerp(body[0].x, mouse.x, LERP_HEAD)
      body[0].y = lerp(body[0].y, mouse.y, LERP_HEAD)

      for (let i = 1; i < SEGS; i++) {
        const prev = body[i - 1]
        const cur  = body[i]
        const dx   = prev.x - cur.x
        const dy   = prev.y - cur.y
        const d    = Math.hypot(dx, dy) || 1
        if (d > SEG_DIST) {
          cur.x += (dx / d) * (d - SEG_DIST)
          cur.y += (dy / d) * (d - SEG_DIST)
        }
        cur.angle = Math.atan2(dy, dx)
      }
      body[0].angle = Math.atan2(mouse.y - body[0].y, mouse.x - body[0].x)

      // ── spawn fire from mouth ──────────────────
      if (frame % 3 === 0) {
        const mouthX = body[0].x + Math.cos(body[0].angle) * 18
        const mouthY = body[0].y + Math.sin(body[0].angle) * 18
        spawnFire(mouthX, mouthY, body[0].angle)
      }

      // ── draw fire particles ────────────────────
      for (let i = fire.length - 1; i >= 0; i--) {
        const p = fire[i]
        p.x += p.vx; p.y += p.vy
        p.vx *= 0.92; p.vy *= 0.92
        p.life -= p.decay
        if (p.life <= 0) { fire.splice(i, 1); continue }
        ctx.save()
        ctx.globalAlpha = p.life * 0.9
        ctx.shadowColor = p.c
        ctx.shadowBlur  = 12
        ctx.fillStyle   = p.c
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r * p.life, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }

      // ── draw body (tail → head) ────────────────
      for (let i = SEGS - 1; i >= 1; i--) {
        const t     = i / (SEGS - 1)           // 0=head end, 1=tail
        const seg   = body[i]
        const prev  = body[i - 1]
        const angle = seg.angle

        // width: thick near head, tapers to point
        const w = lerp(11, 1.2, Math.pow(t, 0.7))

        const perp = angle + Math.PI / 2
        const cos  = Math.cos(perp)
        const sin  = Math.sin(perp)

        // body color gradient head→tail
        const r = Math.round(lerp(COLORS.bodyHead.r, COLORS.bodyTail.r, t))
        const g = Math.round(lerp(COLORS.bodyHead.g, COLORS.bodyTail.g, t))
        const b = Math.round(lerp(COLORS.bodyHead.b, COLORS.bodyTail.b, t))

        // draw segment quad
        ctx.save()
        ctx.shadowColor = COLORS.glowBody
        ctx.shadowBlur  = 8 * (1 - t)
        ctx.fillStyle   = `rgb(${r},${g},${b})`
        ctx.beginPath()
        ctx.moveTo(prev.x + cos * w * 0.85, prev.y + sin * w * 0.85)
        ctx.lineTo(prev.x - cos * w * 0.85, prev.y - sin * w * 0.85)
        ctx.lineTo(seg.x  - cos * w,        seg.y  - sin * w)
        ctx.lineTo(seg.x  + cos * w,        seg.y  + sin * w)
        ctx.closePath()
        ctx.fill()
        ctx.restore()

        // ── scales (arc detail every 3 segs) ──
        if (i % 3 === 0 && w > 3) {
          ctx.save()
          ctx.globalAlpha = 0.4 * (1 - t)
          ctx.strokeStyle = COLORS.scaleEdge
          ctx.lineWidth   = 0.8
          // top scale
          ctx.beginPath()
          ctx.arc(seg.x + cos * w * 0.4, seg.y + sin * w * 0.4, w * 0.55, angle + 0.3, angle + Math.PI - 0.3)
          ctx.stroke()
          // bottom scale
          ctx.beginPath()
          ctx.arc(seg.x - cos * w * 0.4, seg.y - sin * w * 0.4, w * 0.55, angle + Math.PI + 0.3, angle + Math.PI * 2 - 0.3)
          ctx.stroke()
          ctx.restore()
        }

        // ── spine ridge ──
        if (i < SEGS * 0.7 && w > 4) {
          ctx.save()
          ctx.globalAlpha = 0.5 * (1 - t)
          ctx.strokeStyle = COLORS.gold
          ctx.lineWidth   = 0.7
          ctx.shadowColor = COLORS.gold
          ctx.shadowBlur  = 4
          ctx.beginPath()
          ctx.moveTo(prev.x, prev.y)
          ctx.lineTo(seg.x, seg.y)
          ctx.stroke()
          ctx.restore()
        }
      }

      // ── draw head ─────────────────────────────
      const h     = body[0]
      const angle = h.angle

      ctx.save()
      ctx.translate(h.x, h.y)
      ctx.rotate(angle)

      // neck base
      ctx.fillStyle = `rgb(${COLORS.bodyHead.r},${COLORS.bodyHead.g},${COLORS.bodyHead.b})`
      ctx.shadowColor = COLORS.glowHead
      ctx.shadowBlur  = 22
      ctx.beginPath()
      ctx.ellipse(0, 0, 13, 10, 0, 0, Math.PI * 2)
      ctx.fill()

      // skull
      ctx.fillStyle = '#d8e4f5'
      ctx.beginPath()
      ctx.ellipse(8, 0, 14, 9, 0, 0, Math.PI * 2)
      ctx.fill()

      // snout — elongated
      ctx.fillStyle = '#c0d0e8'
      ctx.beginPath()
      ctx.ellipse(20, 0, 10, 6, 0, 0, Math.PI * 2)
      ctx.fill()

      // jaw lower
      ctx.fillStyle = '#8899bb'
      ctx.beginPath()
      ctx.moveTo(10, 3)
      ctx.quadraticCurveTo(20, 8, 28, 4)
      ctx.quadraticCurveTo(20, 5, 10, 3)
      ctx.fill()

      // ── horns ──
      // left horn
      const drawHorn = (sy, tipX, tipY) => {
        const grad = ctx.createLinearGradient(4, sy, tipX, tipY)
        grad.addColorStop(0, COLORS.hornBase)
        grad.addColorStop(1, COLORS.hornTip)
        ctx.fillStyle = grad
        ctx.shadowColor = COLORS.goldBright
        ctx.shadowBlur  = 6
        ctx.beginPath()
        ctx.moveTo(2, sy)
        ctx.lineTo(6, sy * 0.6)
        ctx.lineTo(tipX, tipY)
        ctx.lineTo(8, sy * 0.5)
        ctx.closePath()
        ctx.fill()
      }
      drawHorn(-8, 4, -22)
      drawHorn(8,  4,  22)

      // ── crest spines ──
      ctx.shadowBlur = 4
      for (let s = 0; s < 4; s++) {
        const sx = 2 + s * 3.5
        const sh = 6 - s * 1.2
        ctx.fillStyle = s === 0 ? COLORS.goldBright : COLORS.gold
        ctx.beginPath()
        ctx.moveTo(sx - 1.5, -8)
        ctx.lineTo(sx, -8 - sh)
        ctx.lineTo(sx + 1.5, -8)
        ctx.closePath()
        ctx.fill()
      }

      // ── eye ──
      // white sclera
      ctx.shadowBlur = 0
      ctx.fillStyle = '#ddeeff'
      ctx.beginPath()
      ctx.ellipse(12, -3.5, 4, 3, -0.2, 0, Math.PI * 2)
      ctx.fill()
      // slit pupil
      ctx.fillStyle = '#4477aa'
      ctx.beginPath()
      ctx.ellipse(12.5, -3.5, 1.5, 2.8, 0, 0, Math.PI * 2)
      ctx.fill()
      // eye shine
      ctx.fillStyle = 'rgba(255,255,255,0.7)'
      ctx.beginPath()
      ctx.arc(11.5, -4.5, 0.8, 0, Math.PI * 2)
      ctx.fill()

      // ── nostril ──
      ctx.fillStyle = '#6677aa'
      ctx.beginPath()
      ctx.ellipse(24, -2, 1.5, 1, 0.3, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.ellipse(24, 2, 1.5, 1, -0.3, 0, Math.PI * 2)
      ctx.fill()

      // ── tongue ──
      if (frame % 40 < 20) {
        ctx.strokeStyle = COLORS.tongue
        ctx.lineWidth   = 1.2
        ctx.shadowColor = COLORS.tongue
        ctx.shadowBlur  = 6
        ctx.lineCap     = 'round'
        ctx.beginPath()
        ctx.moveTo(28, 0)
        ctx.lineTo(34, 0)
        ctx.stroke()
        // fork
        ctx.beginPath()
        ctx.moveTo(34, 0)
        ctx.lineTo(38, -3)
        ctx.moveTo(34, 0)
        ctx.lineTo(38, 3)
        ctx.stroke()
      }

      // ── teeth ──
      ctx.fillStyle = '#eef4ff'
      ctx.shadowBlur = 0
      for (let t = 0; t < 3; t++) {
        const tx = 14 + t * 4
        ctx.beginPath()
        ctx.moveTo(tx, 5)
        ctx.lineTo(tx + 1.5, 9)
        ctx.lineTo(tx + 3, 5)
        ctx.fill()
      }

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

  return <canvas ref={ref} className="fixed inset-0 pointer-events-none z-[9999]" />
}
