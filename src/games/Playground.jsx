import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiPlay, FiRotateCcw, FiCommand, FiCode, FiGrid, FiX, FiChevronRight, FiZap } from 'react-icons/fi'
import TicTacToe from './TicTacToe'

/* ── Code templates ── */
const TEMPLATES = {
  hello: {
    label: 'Hello World',
    code: `// Hello World
console.log("Hello, World!");
console.log("Welcome to Syafa Dev Playground 🚀");`,
  },
  fizzbuzz: {
    label: 'FizzBuzz',
    code: `// FizzBuzz — classic interview problem
for (let i = 1; i <= 20; i++) {
  if (i % 15 === 0) console.log("FizzBuzz");
  else if (i % 3 === 0) console.log("Fizz");
  else if (i % 5 === 0) console.log("Buzz");
  else console.log(i);
}`,
  },
  fibonacci: {
    label: 'Fibonacci',
    code: `// Fibonacci sequence
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

for (let i = 0; i < 10; i++) {
  console.log(\`fib(\${i}) = \${fibonacci(i)}\`);
}`,
  },
}

const STORAGE_KEY = 'syafa-playground-code'

/* ── Console capture hook ── */
function useConsole() {
  const [logs, setLogs] = useState([])

  const run = useCallback((code) => {
    const output = []
    const customConsole = {
      log: (...args) => output.push({ type: 'log', text: args.map(a => {
        try { return typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a) }
        catch { return String(a) }
      }).join(' ') }),
      error: (...args) => output.push({ type: 'error', text: args.map(String).join(' ') }),
      warn: (...args) => output.push({ type: 'warn', text: args.map(String).join(' ') }),
    }

    try {
      // eslint-disable-next-line no-new-func
      const fn = new Function('console', code)
      fn(customConsole)
      setLogs(output)
    } catch (err) {
      setLogs([...output, { type: 'error', text: `❌ ${err.message}` }])
    }
  }, [])

  return { logs, run, clear: () => setLogs([]) }
}

/* ── Command Palette ── */
function CommandPalette({ open, onClose, onAction }) {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)
  const inputRef = useRef(null)

  const commands = [
    { id: 'playground', label: 'Switch to Playground', icon: <FiCode size={14} />, shortcut: '1' },
    { id: 'tictactoe',  label: 'Switch to Tic Tac Toe', icon: <FiGrid size={14} />, shortcut: '2' },
    { id: 'clear',      label: 'Clear Console Output',  icon: <FiRotateCcw size={14} />, shortcut: 'C' },
    { id: 'run',        label: 'Run Code',              icon: <FiPlay size={14} />, shortcut: '↵' },
    { id: 'hello',      label: 'Load: Hello World',     icon: <FiZap size={14} /> },
    { id: 'fizzbuzz',   label: 'Load: FizzBuzz',        icon: <FiZap size={14} /> },
    { id: 'fibonacci',  label: 'Load: Fibonacci',       icon: <FiZap size={14} /> },
  ]

  const filtered = commands.filter(c =>
    query === '' || c.label.toLowerCase().includes(query.toLowerCase())
  )

  useEffect(() => {
    if (open) { setQuery(''); setSelected(0); setTimeout(() => inputRef.current?.focus(), 50) }
  }, [open])

  useEffect(() => { setSelected(0) }, [query])

  const handleKey = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setSelected(s => Math.min(s + 1, filtered.length - 1)) }
    if (e.key === 'ArrowUp')   { e.preventDefault(); setSelected(s => Math.max(s - 1, 0)) }
    if (e.key === 'Enter')     { if (filtered[selected]) { onAction(filtered[selected].id); onClose() } }
    if (e.key === 'Escape')    { onClose() }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-start justify-center pt-24 px-4"
          style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
          onClick={onClose}>
          <motion.div initial={{ opacity: 0, scale: 0.95, y: -10 }} animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-md rounded-2xl overflow-hidden"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border-hover)', boxShadow: '0 24px 80px rgba(0,0,0,0.8)' }}
            onClick={e => e.stopPropagation()}>
            {/* Search input */}
            <div className="flex items-center gap-3 px-4 py-3" style={{ borderBottom: '1px solid var(--border)' }}>
              <FiCommand size={14} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
              <input ref={inputRef} value={query} onChange={e => setQuery(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Type a command..."
                className="flex-1 bg-transparent outline-none text-sm"
                style={{ color: 'var(--text-primary)', fontFamily: 'inherit' }} />
              <kbd className="text-[10px] px-1.5 py-0.5 rounded"
                style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}>
                ESC
              </kbd>
            </div>
            {/* Results */}
            <div className="py-1 max-h-72 overflow-y-auto">
              {filtered.length === 0 ? (
                <p className="px-4 py-3 text-xs" style={{ color: 'var(--text-muted)' }}>No commands found</p>
              ) : filtered.map((cmd, i) => (
                <button key={cmd.id}
                  onClick={() => { onAction(cmd.id); onClose() }}
                  onMouseEnter={() => setSelected(i)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors"
                  style={{
                    background: i === selected ? 'var(--bg-elevated)' : 'transparent',
                    color: i === selected ? 'var(--text-primary)' : 'var(--text-secondary)',
                  }}>
                  <span style={{ color: 'var(--text-muted)' }}>{cmd.icon}</span>
                  <span className="flex-1 text-sm">{cmd.label}</span>
                  {cmd.shortcut && (
                    <kbd className="text-[10px] px-1.5 py-0.5 rounded"
                      style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}>
                      {cmd.shortcut}
                    </kbd>
                  )}
                  {i === selected && <FiChevronRight size={12} style={{ color: 'var(--text-muted)' }} />}
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ── JS Editor + Console ── */
function JSPlayground({ paletteRef }) {
  const saved = localStorage.getItem(STORAGE_KEY) || TEMPLATES.hello.code
  const [code, setCode] = useState(saved)
  const [autoRun, setAutoRun] = useState(false)
  const { logs, run, clear } = useConsole()
  const textareaRef = useRef(null)

  // Save to localStorage on change
  useEffect(() => { localStorage.setItem(STORAGE_KEY, code) }, [code])

  // Auto-run
  useEffect(() => { if (autoRun) run(code) }, [code, autoRun, run])

  // Expose run/clear to parent via ref
  useEffect(() => {
    if (paletteRef) paletteRef.current = { run: () => run(code), clear }
  }, [code, run, clear, paletteRef])

  const loadTemplate = (key) => {
    if (TEMPLATES[key]) setCode(TEMPLATES[key].code)
  }

  // Tab key in textarea
  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault()
      const start = e.target.selectionStart
      const end = e.target.selectionEnd
      const newCode = code.substring(0, start) + '  ' + code.substring(end)
      setCode(newCode)
      setTimeout(() => { e.target.selectionStart = e.target.selectionEnd = start + 2 }, 0)
    }
  }

  const logColor = (type) => {
    if (type === 'error') return '#f87171'
    if (type === 'warn')  return '#fbbf24'
    return 'var(--text-secondary)'
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Templates */}
        <div className="flex gap-1.5">
          {Object.entries(TEMPLATES).map(([key, t]) => (
            <button key={key} onClick={() => loadTemplate(key)}
              className="px-2.5 py-1 rounded-lg text-xs font-medium transition-colors"
              style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.borderColor = 'var(--border-hover)' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border)' }}>
              {t.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 ml-auto">
          {/* Auto-run toggle */}
          <label className="flex items-center gap-1.5 text-xs cursor-pointer"
            style={{ color: 'var(--text-muted)' }}>
            <div onClick={() => setAutoRun(v => !v)}
              className="w-7 h-4 rounded-full relative transition-colors"
              style={{ background: autoRun ? 'var(--text-primary)' : 'var(--bg-elevated)', border: '1px solid var(--border)' }}>
              <div className="absolute top-0.5 w-3 h-3 rounded-full transition-all"
                style={{ background: autoRun ? 'var(--bg)' : 'var(--text-muted)', left: autoRun ? '14px' : '2px' }} />
            </div>
            Auto-run
          </label>

          {/* Clear */}
          <button onClick={() => { setCode(''); clear() }}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-colors"
            style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.borderColor = 'var(--border-hover)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border)' }}>
            <FiRotateCcw size={11} /> Clear
          </button>

          {/* Run */}
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={() => run(code)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold"
            style={{ background: 'var(--text-primary)', color: 'var(--bg)' }}>
            <FiPlay size={11} /> Run
          </motion.button>
        </div>
      </div>

      {/* Editor */}
      <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
        <div className="flex items-center gap-2 px-4 py-2" style={{ background: 'var(--bg-elevated)', borderBottom: '1px solid var(--border)' }}>
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'var(--border-strong)' }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'var(--border-strong)' }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'var(--border-strong)' }} />
          </div>
          <span className="text-xs ml-2" style={{ color: 'var(--text-muted)' }}>script.js</span>
        </div>
        <textarea
          ref={textareaRef}
          value={code}
          onChange={e => setCode(e.target.value)}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          className="w-full resize-none outline-none p-4 text-sm leading-relaxed"
          style={{
            background: 'var(--bg-card)',
            color: 'var(--text-primary)',
            fontFamily: '"Fira Code", "Cascadia Code", "JetBrains Mono", monospace',
            fontSize: '13px',
            minHeight: '220px',
            tabSize: 2,
          }}
          rows={12}
        />
      </div>

      {/* Console output */}
      <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
        <div className="flex items-center justify-between px-4 py-2"
          style={{ background: 'var(--bg-elevated)', borderBottom: '1px solid var(--border)' }}>
          <span className="text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>Console Output</span>
          <button onClick={clear} className="text-xs transition-colors"
            style={{ color: 'var(--text-muted)' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
            Clear
          </button>
        </div>
        <div className="p-4 min-h-[100px] max-h-48 overflow-y-auto"
          style={{ background: 'var(--bg-card)', fontFamily: 'monospace', fontSize: '12px' }}>
          {logs.length === 0 ? (
            <p style={{ color: 'var(--text-muted)' }}>// Output will appear here after running code</p>
          ) : logs.map((log, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
              className="flex items-start gap-2 mb-1">
              <span style={{ color: 'var(--text-muted)', flexShrink: 0 }}>›</span>
              <span style={{ color: logColor(log.type), whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                {log.text}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Main Playground Page ── */
const tabs = [
  { id: 'playground', label: 'Playground', icon: <FiCode size={13} /> },
  { id: 'tictactoe',  label: 'Tic Tac Toe', icon: <FiGrid size={13} /> },
]

const pageAnim = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, y: -6, transition: { duration: 0.18 } },
}

export default function Playground() {
  const [activeTab, setActiveTab] = useState('playground')
  const [paletteOpen, setPaletteOpen] = useState(false)
  const playgroundRef = useRef({})

  // Ctrl+K to open palette
  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setPaletteOpen(v => !v)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const handleAction = (id) => {
    if (id === 'playground' || id === 'tictactoe') setActiveTab(id)
    else if (id === 'clear') playgroundRef.current?.clear?.()
    else if (id === 'run')   playgroundRef.current?.run?.()
    else if (TEMPLATES[id]) {
      setActiveTab('playground')
      // template loading handled inside JSPlayground via ref
    }
  }

  return (
    <div className="px-6 md:px-8 pt-8 pb-12">
      {/* Command Palette */}
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} onAction={handleAction} />

      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display font-bold text-2xl mb-1" style={{ color: 'var(--text-primary)' }}>
            Syafa Dev Playground
          </h1>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            A space to experiment, build, and play with code
          </p>
        </div>
        <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          onClick={() => setPaletteOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium flex-shrink-0"
          style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
          <FiCommand size={12} />
          <span className="hidden sm:inline">Command</span>
          <kbd className="text-[10px] px-1 py-0.5 rounded"
            style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}>
            ⌘K
          </kbd>
        </motion.button>
      </div>

      {/* Tab bar */}
      <div className="flex gap-1 mb-6 p-1 rounded-xl w-fit"
        style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}>
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className="relative flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-colors"
            style={{ color: activeTab === tab.id ? 'var(--text-primary)' : 'var(--text-muted)' }}>
            {activeTab === tab.id && (
              <motion.div layoutId="playground-tab"
                className="absolute inset-0 rounded-lg"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border-hover)' }}
                transition={{ type: 'spring', stiffness: 400, damping: 32 }} />
            )}
            <span className="relative z-10">{tab.icon}</span>
            <span className="relative z-10">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        {activeTab === 'playground' && (
          <motion.div key="playground" {...pageAnim}>
            <JSPlayground paletteRef={playgroundRef} />
          </motion.div>
        )}
        {activeTab === 'tictactoe' && (
          <motion.div key="tictactoe" {...pageAnim}>
            <TicTacToe />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
