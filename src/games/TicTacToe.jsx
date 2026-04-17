import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ══════════════════════════════════════════
   GAME LOGIC
══════════════════════════════════════════ */

const WINNING_LINES = [
  [0,1,2],[3,4,5],[6,7,8], // rows
  [0,3,6],[1,4,7],[2,5,8], // cols
  [0,4,8],[2,4,6],          // diagonals
]

/** Returns { winner: 'X'|'O'|null, line: number[]|null } */
function checkWinner(squares) {
  for (const [a, b, c] of WINNING_LINES) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] }
    }
  }
  return { winner: null, line: null }
}

function isDraw(squares) {
  return squares.every(Boolean)
}

/* ── Minimax AI ── */
function minimax(squares, isMaximizing, depth = 0) {
  const { winner } = checkWinner(squares)
  if (winner === 'O') return  10 - depth  // AI wins
  if (winner === 'X') return -10 + depth  // Human wins
  if (isDraw(squares))  return 0

  if (isMaximizing) {
    let best = -Infinity
    for (let i = 0; i < 9; i++) {
      if (!squares[i]) {
        squares[i] = 'O'
        best = Math.max(best, minimax(squares, false, depth + 1))
        squares[i] = null
      }
    }
    return best
  } else {
    let best = Infinity
    for (let i = 0; i < 9; i++) {
      if (!squares[i]) {
        squares[i] = 'X'
        best = Math.min(best, minimax(squares, true, depth + 1))
        squares[i] = null
      }
    }
    return best
  }
}

function getBestMove(squares) {
  let bestVal = -Infinity
  let bestMove = -1
  for (let i = 0; i < 9; i++) {
    if (!squares[i]) {
      squares[i] = 'O'
      const val = minimax(squares, false)
      squares[i] = null
      if (val > bestVal) { bestVal = val; bestMove = i }
    }
  }
  return bestMove
}

/* ══════════════════════════════════════════
   COMPONENTS
══════════════════════════════════════════ */

/** Single cell */
function Cell({ value, index, onClick, isWinning, disabled }) {
  return (
    <motion.button
      onClick={() => !disabled && !value && onClick(index)}
      whileHover={!value && !disabled ? { scale: 1.04 } : {}}
      whileTap={!value && !disabled ? { scale: 0.96 } : {}}
      className="relative flex items-center justify-center rounded-2xl text-3xl font-bold select-none transition-colors"
      style={{
        aspectRatio: '1',
        background: isWinning ? 'var(--bg-elevated)' : 'var(--bg-card)',
        border: `1px solid ${isWinning ? 'var(--border-strong)' : 'var(--border)'}`,
        cursor: value || disabled ? 'default' : 'pointer',
        boxShadow: isWinning ? 'var(--shadow-md)' : 'none',
        transition: 'background 0.2s, border-color 0.2s, box-shadow 0.2s',
      }}
    >
      <AnimatePresence>
        {value && (
          <motion.span
            key={value + index}
            initial={{ scale: 0, opacity: 0, rotate: -15 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            style={{
              color: value === 'X' ? 'var(--text-primary)' : 'var(--text-secondary)',
              fontFamily: 'Syne, sans-serif',
            }}
          >
            {value}
          </motion.span>
        )}
      </AnimatePresence>

      {/* Hover hint */}
      {!value && !disabled && (
        <span className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-20 transition-opacity text-2xl"
          style={{ color: 'var(--text-muted)' }}>·</span>
      )}
    </motion.button>
  )
}

/** Score badge */
function ScoreBadge({ label, score, active }) {
  return (
    <div className="flex flex-col items-center gap-1 px-5 py-3 rounded-xl transition-all"
      style={{
        background: active ? 'var(--bg-elevated)' : 'var(--bg-card)',
        border: `1px solid ${active ? 'var(--border-hover)' : 'var(--border)'}`,
        minWidth: 72,
      }}>
      <span className="text-xs font-semibold tracking-widest uppercase"
        style={{ color: 'var(--text-muted)' }}>{label}</span>
      <motion.span key={score}
        initial={{ scale: 1.3, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className="text-2xl font-bold font-display"
        style={{ color: 'var(--text-primary)' }}>
        {score}
      </motion.span>
    </div>
  )
}

/* ══════════════════════════════════════════
   MAIN GAME
══════════════════════════════════════════ */
export default function TicTacToe() {
  const [squares,   setSquares]   = useState(Array(9).fill(null))
  const [isX,       setIsX]       = useState(true)   // X = human, O = AI
  const [mode,      setMode]      = useState('pvp')  // 'pvp' | 'ai'
  const [scores,    setScores]    = useState({ X: 0, O: 0, draw: 0 })
  const [gameOver,  setGameOver]  = useState(false)
  const [resultMsg, setResultMsg] = useState('')

  const { winner, line } = checkWinner(squares)
  const draw = !winner && isDraw(squares)

  /* Handle a move */
  const handleClick = useCallback((i) => {
    if (squares[i] || gameOver) return

    const next = squares.slice()
    next[i] = isX ? 'X' : 'O'
    setSquares(next)

    const { winner: w } = checkWinner(next)
    if (w) {
      setGameOver(true)
      setResultMsg(w === 'X' ? (mode === 'ai' ? 'You win! 🎉' : 'X wins! 🎉') : (mode === 'ai' ? 'AI wins 🤖' : 'O wins! 🎉'))
      setScores(s => ({ ...s, [w]: s[w] + 1 }))
      return
    }
    if (isDraw(next)) {
      setGameOver(true)
      setResultMsg("It's a draw!")
      setScores(s => ({ ...s, draw: s.draw + 1 }))
      return
    }

    const nextIsX = !isX
    setIsX(nextIsX)

    // AI move
    if (mode === 'ai' && !nextIsX) {
      setTimeout(() => {
        const best = getBestMove(next.slice())
        if (best === -1) return
        const aiNext = next.slice()
        aiNext[best] = 'O'
        setSquares(aiNext)

        const { winner: aw } = checkWinner(aiNext)
        if (aw) {
          setGameOver(true)
          setResultMsg('AI wins 🤖')
          setScores(s => ({ ...s, O: s.O + 1 }))
          return
        }
        if (isDraw(aiNext)) {
          setGameOver(true)
          setResultMsg("It's a draw!")
          setScores(s => ({ ...s, draw: s.draw + 1 }))
          return
        }
        setIsX(true)
      }, 320)
    }
  }, [squares, isX, gameOver, mode])

  const reset = () => {
    setSquares(Array(9).fill(null))
    setIsX(true)
    setGameOver(false)
    setResultMsg('')
  }

  const resetAll = () => {
    reset()
    setScores({ X: 0, O: 0, draw: 0 })
  }

  const currentTurn = isX ? 'X' : 'O'
  const turnLabel   = mode === 'ai'
    ? (isX ? 'Your turn (X)' : 'AI thinking...')
    : `Player ${currentTurn}'s turn`

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8">
          <h1 className="font-display font-bold text-2xl mb-1"
            style={{ color: 'var(--text-primary)' }}>Tic Tac Toe</h1>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            A classic game — now with AI
          </p>
        </motion.div>

        {/* Mode selector */}
        <div className="flex gap-2 mb-6 p-1 rounded-xl"
          style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}>
          {[['pvp', 'Player vs Player'], ['ai', 'Player vs AI']].map(([m, label]) => (
            <button key={m} onClick={() => { setMode(m); resetAll() }}
              className="flex-1 py-2 rounded-lg text-xs font-semibold transition-all"
              style={{
                background: mode === m ? 'var(--bg-card)' : 'transparent',
                border: mode === m ? '1px solid var(--border-hover)' : '1px solid transparent',
                color: mode === m ? 'var(--text-primary)' : 'var(--text-muted)',
              }}>
              {label}
            </button>
          ))}
        </div>

        {/* Scores */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <ScoreBadge label={mode === 'ai' ? 'You' : 'X'} score={scores.X} active={!gameOver && isX} />
          <div className="flex flex-col items-center gap-1">
            <span className="text-[10px] font-semibold tracking-widest uppercase"
              style={{ color: 'var(--text-muted)' }}>Draw</span>
            <span className="text-lg font-bold" style={{ color: 'var(--text-muted)' }}>{scores.draw}</span>
          </div>
          <ScoreBadge label={mode === 'ai' ? 'AI' : 'O'} score={scores.O} active={!gameOver && !isX} />
        </div>

        {/* Status */}
        <div className="text-center mb-4 h-6">
          <AnimatePresence mode="wait">
            {gameOver ? (
              <motion.p key="result"
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm font-semibold"
                style={{ color: 'var(--text-primary)' }}>
                {resultMsg}
              </motion.p>
            ) : (
              <motion.p key="turn"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="text-xs"
                style={{ color: 'var(--text-muted)' }}>
                {turnLabel}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Board */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-2 mb-6"
          style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
          {squares.map((val, i) => (
            <Cell
              key={i}
              index={i}
              value={val}
              onClick={handleClick}
              isWinning={line?.includes(i) ?? false}
              disabled={gameOver || (mode === 'ai' && !isX)}
            />
          ))}
        </motion.div>

        {/* Actions */}
        <div className="flex gap-2">
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            onClick={reset}
            className="flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all"
            style={{
              background: 'var(--text-primary)', color: 'var(--bg)',
            }}>
            New Game
          </motion.button>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            onClick={resetAll}
            className="py-2.5 px-4 rounded-xl text-xs font-semibold transition-all"
            style={{
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border)',
              color: 'var(--text-secondary)',
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-hover)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}>
            Reset Score
          </motion.button>
        </div>

      </div>
    </div>
  )
}
