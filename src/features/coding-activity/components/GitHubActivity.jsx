// ============================================================
// components/GitHubActivity.jsx
// GitHub panel showing:
//   • Username input
//   • 4 stat cards (total, this year, current streak, longest streak)
//   • 52-week contribution heatmap
//   • 14-day activity bar chart
// ============================================================

import React, { useMemo } from 'react'
import { useGitHubData }       from '../hooks/useGitHubData'
import ContributionHeatmap     from './ContributionHeatmap'
import StatCard                from './StatCard'
import UsernameInput           from './UsernameInput'
import { toDateString }        from '../utils/heatmapUtils'

/** Returns the last N days as [{ date, count }] oldest → newest */
function getRecentDays(contributionMap, n = 14) {
  const days  = []
  const today = new Date()
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    const date = toDateString(d)
    days.push({ date, count: contributionMap[date] ?? 0 })
  }
  return days
}

export default function GitHubActivity() {
  const {
    username, setUsername,
    contributionMap, stats,
    loading, error, usingMock,
  } = useGitHubData()

  const recentDays = useMemo(() => getRecentDays(contributionMap, 14), [contributionMap])
  const maxCount   = Math.max(...recentDays.map(d => d.count), 1)

  return (
    <div>
      {/* ── Panel header ── */}
      <div className="ca-panel__header">
        <div className="ca-panel__title-group">
          <div className="ca-panel__icon-title">
            {/* GitHub Octocat SVG icon */}
            <svg
              viewBox="0 0 16 16"
              width="20" height="20"
              style={{ fill: 'var(--color-text)', flexShrink: 0 }}
              aria-hidden
            >
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
            </svg>
            <h3 className="ca-panel__title">GitHub Contributions</h3>
          </div>
          <p className="ca-panel__desc">
            My real GitHub activity
          </p>
        </div>

      </div>

      {/* ── Stat cards ── */}
      <div className="ca-stats-grid">
        <StatCard
          icon="⬡"
          value={loading ? '' : stats.total.toLocaleString()}
          label="Total Contributions"
          accent="green"
          loading={loading}
        />
        <StatCard
          icon="📅"
          value={loading ? '' : stats.thisYear.toLocaleString()}
          label="This Year"
          accent="green"
          loading={loading}
        />
        <StatCard
          icon="🔥"
          value={loading ? '' : `${stats.currentStreak}d`}
          label="Current Streak"
          accent="orange"
          loading={loading}
        />
        <StatCard
          icon="⚡"
          value={loading ? '' : `${stats.longestStreak}d`}
          label="Longest Streak"
          accent="yellow"
          loading={loading}
        />
      </div>

      {/* ── Contribution heatmap card ── */}
      <div className="ca-card">
        <div className="ca-card__inner">
          <div className="ca-card__head">
            <span className="ca-card__heading">Contribution Graph</span>
          </div>
          <ContributionHeatmap
            contributionMap={contributionMap}
            colorScheme="github"
            loading={loading}
          />
        </div>
      </div>

      {/* ── Recent 14-day bar chart card ── */}
      <div className="ca-card">
        <div className="ca-card__inner">
          <div className="ca-card__head">
            <span className="ca-card__heading">Last 14 Days</span>
          </div>

          {loading ? (
            /* Skeleton bars */
            <div className="ca-bars">
              {Array.from({ length: 14 }).map((_, i) => (
                <div key={i} className="ca-bars__col">
                  <div className="ca-bars__bar-wrap">
                    <div
                      className="ca-bars__bar ca-bars__bar--skeleton"
                      style={{ height: `${20 + (i * 13) % 80}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div
              className="ca-bars"
              role="img"
              aria-label="Recent 14-day contribution bar chart"
            >
              {recentDays.map(({ date, count }) => {
                const heightPct = (count / maxCount) * 100
                const shortDate = date.slice(5) // MM-DD
                const isEmpty   = count === 0

                return (
                  <div
                    key={date}
                    className="ca-bars__col"
                    title={`${count} contribution${count !== 1 ? 's' : ''} on ${date}`}
                  >
                    <div className="ca-bars__bar-wrap">
                      <div
                        className={`ca-bars__bar ${isEmpty ? 'ca-bars__bar--empty' : 'ca-bars__bar--github'}`}
                        style={{ height: isEmpty ? '3px' : `${Math.max(heightPct, 8)}%` }}
                      />
                    </div>
                    <span className="ca-bars__date">{shortDate}</span>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}