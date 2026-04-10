import { useState, useEffect } from 'react'

/**
 * Cycles through an array of strings with a typewriter effect.
 * @param {string[]} words
 * @param {number} typeSpeed  ms per char
 * @param {number} deleteSpeed ms per char delete
 * @param {number} pause      ms to pause at full word
 */
export default function useTyping(words, typeSpeed = 80, deleteSpeed = 45, pause = 1800) {
  const [displayed, setDisplayed] = useState('')
  const [wordIdx,   setWordIdx]   = useState(0)
  const [charIdx,   setCharIdx]   = useState(0)
  const [deleting,  setDeleting]  = useState(false)

  useEffect(() => {
    const current = words[wordIdx]

    if (!deleting && charIdx < current.length) {
      const t = setTimeout(() => setCharIdx(i => i + 1), typeSpeed)
      return () => clearTimeout(t)
    }

    if (!deleting && charIdx === current.length) {
      const t = setTimeout(() => setDeleting(true), pause)
      return () => clearTimeout(t)
    }

    if (deleting && charIdx > 0) {
      const t = setTimeout(() => setCharIdx(i => i - 1), deleteSpeed)
      return () => clearTimeout(t)
    }

    if (deleting && charIdx === 0) {
      setDeleting(false)
      setWordIdx(i => (i + 1) % words.length)
    }
  }, [charIdx, deleting, wordIdx, words, typeSpeed, deleteSpeed, pause])

  useEffect(() => {
    setDisplayed(words[wordIdx].slice(0, charIdx))
  }, [charIdx, wordIdx, words])

  return displayed
}
