// ============================================================
// components/StatCard.jsx
// Reusable stat tile matching the existing .about__stat-card pattern.
// Uses .ca-stat-card BEM classes — defined in CodingActivity.css.
// ============================================================

import React from 'react'

/**
 * @param {string}  label       — uppercase label below value
 * @param {string}  value       — main numeric/text display
 * @param {string}  [subtitle]  — small tertiary line
 * @param {string}  [icon]      — emoji icon
 * @param {string}  [accent]    — CSS class for value colour:
 *                                'green' | 'orange' | 'yellow' | 'blue'
 *                                Maps to .ca-stat-card__value--{accent}
 * @param {boolean} [loading]
 */
export default function StatCard({
  label,
  value,
  subtitle,
  icon,
  accent,        // 'green' | 'orange' | 'yellow' | 'blue' | undefined
  loading = false,
}) {
  const valueClass = [
    'ca-stat-card__value',
    accent ? `ca-stat-card__value--${accent}` : '',
  ].filter(Boolean).join(' ')

  return (
    <div className={`ca-stat-card${loading ? ' ca-stat-card--loading' : ''}`}>
      {icon && <span className="ca-stat-card__icon">{icon}</span>}

      {/* Loading shimmer is applied via CSS when --loading class is present */}
      <span className={valueClass}>{loading ? '' : value}</span>

      <span className="ca-stat-card__label">{label}</span>

      {subtitle && !loading && (
        <span className="ca-stat-card__sub">{subtitle}</span>
      )}
    </div>
  )
}