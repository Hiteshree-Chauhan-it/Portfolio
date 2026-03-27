// ============================================================
// components/ContributionHeatmap.jsx
// 52-week contribution heatmap grid.
//
// Colors are driven by CSS variables (--hm-0 … --hm-4) defined
// in CodingActivity.css, scoped to .ca-heatmap and
// .ca-heatmap--leetcode, with [data-theme="dark"] overrides.
// No inline colour styles, no Tailwind.
// ============================================================

import React, { useMemo, useState } from 'react'
import { buildHeatmapGrid, getMonthLabels } from '../utils/heatmapUtils'

// Day-of-week label column (only Mon/Wed/Fri shown to save space)
const DOW_LABELS = ['', 'Mon', '', 'Wed', '', 'Fri', '']

// Cell width + gap — used to position month labels above columns
const CELL_W = 12
const CELL_GAP = 3
const COL_STEP = CELL_W + CELL_GAP // 15px per column

/**
 * @param {Object.<string, number>} contributionMap
 * @param {'github'|'leetcode'}     colorScheme
 * @param {boolean}                 loading
 */
export default function ContributionHeatmap({
  contributionMap = {},
  colorScheme = 'github',
  loading = false,
}) {
  const [tooltip, setTooltip] = useState(null) // { x, y, text }

  const weeks      = useMemo(() => buildHeatmapGrid(contributionMap), [contributionMap])
  const monthLabels = useMemo(() => getMonthLabels(weeks), [weeks])

  // BEM modifier for the colour scheme
  const schemeClass = colorScheme === 'leetcode' ? ' ca-heatmap--leetcode' : ''
  const loadingClass = loading ? ' ca-heatmap--loading' : ''

  // Day-of-week label column left offset = 28px
  const DOW_WIDTH = 28

  if (loading) {
    // Skeleton — render grey cells
    return (
      <div className={`ca-heatmap${schemeClass}${loadingClass}`}>
        <div className="ca-heatmap__inner">
          <div className="ca-heatmap__grid">
            <div className="ca-heatmap__dow-col">
              {DOW_LABELS.map((lbl, i) => (
                <div key={i} className="ca-heatmap__dow-label" />
              ))}
            </div>
            <div className="ca-heatmap__weeks">
              {Array.from({ length: 53 }).map((_, w) => (
                <div key={w} className="ca-heatmap__week">
                  {Array.from({ length: 7 }).map((_, d) => (
                    <div
                      key={d}
                      className="ca-heatmap__day"
                      data-level="0"
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`ca-heatmap${schemeClass}`}
      style={{ position: 'relative' }}
    >
      <div className="ca-heatmap__inner">

        {/* ── Month labels ── */}
        <div
          className="ca-heatmap__months"
          style={{ paddingLeft: DOW_WIDTH }}
        >
          {monthLabels.map(({ weekIdx, label }) => (
            <span
              key={`${weekIdx}-${label}`}
              className="ca-heatmap__month-label"
              style={{ left: weekIdx * COL_STEP }}
            >
              {label}
            </span>
          ))}
        </div>

        {/* ── Grid ── */}
        <div className="ca-heatmap__grid">

          {/* Day-of-week label column */}
          <div className="ca-heatmap__dow-col">
            {DOW_LABELS.map((lbl, i) => (
              <div key={i} className="ca-heatmap__dow-label">{lbl}</div>
            ))}
          </div>

          {/* Week columns */}
          <div className="ca-heatmap__weeks">
            {weeks.map((week, weekIdx) => (
              <div key={weekIdx} className="ca-heatmap__week">
                {week.map((cell, dayIdx) => {
                  // Empty padding cells (end of last week)
                  if (!cell.date || cell.level === -1) {
                    return (
                      <div
                        key={dayIdx}
                        className="ca-heatmap__day ca-heatmap__day--empty"
                      />
                    )
                  }

                  return (
                    <div
                      key={dayIdx}
                      className={[
                        'ca-heatmap__day',
                        cell.isToday ? 'ca-heatmap__day--today' : '',
                      ].filter(Boolean).join(' ')}
                      data-level={cell.level}
                      title={
                        cell.count === 0
                          ? `No activity on ${cell.date}`
                          : `${cell.count} contribution${cell.count !== 1 ? 's' : ''} on ${cell.date}`
                      }
                      onMouseEnter={e => {
                        const parentRect = e.currentTarget
                          .closest('.ca-heatmap')
                          .getBoundingClientRect()
                        const cellRect = e.currentTarget.getBoundingClientRect()
                        setTooltip({
                          x: cellRect.left - parentRect.left + CELL_W / 2,
                          y: cellRect.top  - parentRect.top  - 36,
                          text:
                            cell.count === 0
                              ? `No activity · ${cell.date}`
                              : `${cell.count} contribution${cell.count !== 1 ? 's' : ''} · ${cell.date}`,
                        })
                      }}
                      onMouseLeave={() => setTooltip(null)}
                    />
                  )
                })}
              </div>
            ))}
          </div>
        </div>

        {/* ── Legend ── */}
        <div className="ca-heatmap__legend">
          <span className="ca-heatmap__legend-label">Less</span>
          {[0, 1, 2, 3, 4].map(lvl => (
            <div key={lvl} className="ca-heatmap__legend-cell" data-level={lvl} />
          ))}
          <span className="ca-heatmap__legend-label">More</span>
        </div>

      </div>

      {/* Floating tooltip */}
      {tooltip && (
        <div
          className="ca-heatmap__tooltip"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          {tooltip.text}
        </div>
      )}
    </div>
  )
}