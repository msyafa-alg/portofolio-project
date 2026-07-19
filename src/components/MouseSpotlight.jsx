import { useRef, useCallback, useEffect } from 'react'

export default function MouseSpotlight() {
  const ref = useRef(null)

  const handleMouse = useCallback((e) => {
    if (!ref.current) return
    ref.current.style.background =
      `radial-gradient(800px circle at ${e.clientX}px ${e.clientY}px, rgba(99,102,241,0.06) 0%, transparent 40%)`
  }, [])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouse, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [handleMouse])

  return (
    <div
      ref={ref}
      className="fixed inset-0 pointer-events-none z-[1]"
    />
  )
}
