import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const isDark = theme === 'dark'

  return (
    <motion.button
      onClick={toggle}
      whileTap={{ scale: 0.92 }}
      aria-label="Toggle theme"
      className="theme-toggle flex items-center"
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <motion.div
        className="theme-toggle-thumb"
        animate={{ left: isDark ? '3px' : '23px' }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />
      {/* Sun icon */}
      <motion.span
        animate={{ opacity: isDark ? 0.3 : 1, scale: isDark ? 0.7 : 1 }}
        className="absolute right-1.5 text-[9px]"
      >☀️</motion.span>
      {/* Moon icon */}
      <motion.span
        animate={{ opacity: isDark ? 1 : 0.3, scale: isDark ? 1 : 0.7 }}
        className="absolute left-1.5 text-[9px]"
      >🌙</motion.span>
    </motion.button>
  )
}

