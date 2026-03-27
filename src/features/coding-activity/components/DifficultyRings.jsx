// ============================================================
// components/DifficultyRings.jsx
// SVG circular progress rings for Easy / Medium / Hard.
// SVG stroke colours are JS constants (can't use CSS vars inside
// SVG stroke attributes). Surrounding layout uses BEM CSS classes.
// ============================================================

import React from 'react'
import { useIsDarkTheme } from '../hooks/useIsDarkTheme'

const RING_RADIUS = 32
const RING_STROKE = 6
const CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS // ≈ 201
const RING_SIZE = (RING_RADIUS + RING_STROKE) * 2 // 76px

// Colour tokens per difficulty, per theme
const COLOURS = {
  easy: {
    light: { fill: '#3a9e5f', track: '#d4f0e0' },
    dark:  { fill: '#4eca7f', track: '#14532d' },
  },
  medium: {
    light: { fill: '#d4902a', track: '#fef3c7' },
    dark:  { fill: '#f0b050', track: '#451a03' },
  },
  hard: {
    light: { fill: '#c0392b', track: '#fee2e2' },
    dark:  { fill: '#e57373', track: '#450a0a' },
  },
}

/**
 * A single SVG ring.
 */
function Ring({ solved, total, colourKey, label }) {
  const isDark   = useIsDarkTheme()
  const palette  = COLOURS[colourKey][isDark ? 'dark' : 'light']
  const percent  = total > 0 ? Math.min(solved / total, 1) : 0
  const filled   = percent * CIRCUMFERENCE

  return (
    <div className="ca-rings__item">
      <div className="ca-rings__svg-wrap" style={{ width: RING_SIZE, height: RING_SIZE }}>
        {/* SVG ring */}
        <svg
          width={RING_SIZE}
          height={RING_SIZE}
          viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`}
          style={{ transform: 'rotate(-90deg)', display: 'block' }}
          aria-hidden
        >
          {/* Track */}
          <circle
            cx={RING_SIZE / 2}
            cy={RING_SIZE / 2}
            r={RING_RADIUS}
            fill="none"
            stroke={palette.track}
            strokeWidth={RING_STROKE}
          />
          {/* Filled arc */}
          <circle
            cx={RING_SIZE / 2}
            cy={RING_SIZE / 2}
            r={RING_RADIUS}
            fill="none"
            stroke={palette.fill}
            strokeWidth={RING_STROKE}
            strokeLinecap="round"
            strokeDasharray={`${filled} ${CIRCUMFERENCE - filled}`}
            style={{ transition: 'stroke-dasharray 1s cubic-bezier(0.4, 0, 0.2, 1)' }}
          />
        </svg>

        {/* Centred text */}
        <div className="ca-rings__center">
          <span
            className="ca-rings__solved"
            style={{ color: palette.fill }}
          >
            {solved}
          </span>
          <span className="ca-rings__total">/{total}</span>
        </div>
      </div>

      {/* Difficulty label */}
      <span
        className="ca-rings__label"
        style={{ color: palette.fill }}
      >
        {label}
      </span>
    </div>
  )
}

/**
 * @param {number}  easySolved   mediumSolved   hardSolved
 * @param {number}  totalEasy    totalMedium    totalHard
 * @param {boolean} loading
 */
export default function DifficultyRings({
  easySolved   = 0, totalEasy   = 0,
  mediumSolved = 0, totalMedium = 0,
  hardSolved   = 0, totalHard   = 0,
  loading      = false,
}) {
  if (loading) {
    return (
      <div className="ca-rings__skeleton">
        {['easy', 'medium', 'hard'].map(k => (
          <div key={k} className="ca-rings__skeleton-ring" />
        ))}
      </div>
    )
  }

  return (
    <div className="ca-rings__row">
      <Ring label="Easy"   colourKey="easy"   solved={easySolved}   total={totalEasy} />
      <Ring label="Medium" colourKey="medium" solved={mediumSolved} total={totalMedium} />
      <Ring label="Hard"   colourKey="hard"   solved={hardSolved}   total={totalHard} />
    </div>
  )
}