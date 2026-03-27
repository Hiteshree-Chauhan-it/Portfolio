// ============================================================
// data/mockData.js
// Realistic mock data that mirrors real API response shapes.
// Swapping mock → real is a one-line change in each hook.
// ============================================================

import { toDateString } from '../utils/heatmapUtils'

// ── Seeded pseudo-random (reproducible across renders) ──────
function seededRand(seed) {
  let s = seed
  return function () {
    s = (s * 16807 + 0) % 2147483647
    return (s - 1) / 2147483646
  }
}

/**
 * Generates a realistic contribution map for the last `days` days.
 * Pattern: more active on weekdays, occasional burst weeks.
 *
 * @param {number} days
 * @param {number} seed       — for reproducibility
 * @param {number} maxDaily   — max contributions on a single day
 * @returns {Object.<string, number>}
 */
function generateContributions(days = 365, seed = 42, maxDaily = 12) {
  const rand = seededRand(seed)
  const map = {}
  const today = new Date()

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    const dateStr = toDateString(d)
    const dow = d.getDay() // 0=Sun, 6=Sat

    const isWeekend = dow === 0 || dow === 6
    const baseProbability = isWeekend ? 0.3 : 0.7

    // Every 8th week is a "burst" week with higher activity
    const weekNum = Math.floor(i / 7)
    const isBurst = weekNum % 8 === 3
    const probability = isBurst
      ? Math.min(baseProbability + 0.25, 0.95)
      : baseProbability

    if (rand() < probability) {
      const base = isBurst ? maxDaily * 0.5 : maxDaily * 0.25
      map[dateStr] = Math.max(1, Math.round(rand() * base + rand() * base))
    } else {
      map[dateStr] = 0
    }
  }

  return map
}

// ── GitHub mock ─────────────────────────────────────────────
// Shape mirrors: https://github-contributions-api.jogruber.de/v4/{user}?y=last
export const MOCK_GITHUB_DATA = (() => {
  const contributionMap = generateContributions(365, 42, 14)
  const total = Object.values(contributionMap).reduce((s, v) => s + v, 0)

  const contributions = Object.entries(contributionMap).map(([date, count]) => ({
    date,
    count,
    level: count === 0 ? 0 : count <= 3 ? 1 : count <= 6 ? 2 : count <= 10 ? 3 : 4,
  }))

  return {
    total: { lastYear: total, [new Date().getFullYear()]: total },
    contributions,
    contributionMap, // convenience key — not in real API
  }
})()

// ── LeetCode stats mock ──────────────────────────────────────
// Shape mirrors: https://leetcode-stats-api.herokuapp.com/{user}
export const MOCK_LEETCODE_STATS = {
  status: 'success',
  totalSolved: 247,
  totalQuestions: 2817,
  easySolved: 98,
  totalEasy: 756,
  mediumSolved: 124,
  totalMedium: 1583,
  hardSolved: 25,
  totalHard: 478,
  acceptanceRate: 61.4,
  ranking: 48320,
  contributionPoints: 512,
  reputation: 0,
}

// ── LeetCode submission calendar mock ───────────────────────
// Real API requires authentication; this mock matches the shape.
// Replace MOCK_LEETCODE_CALENDAR in useLeetCodeData.js to swap in
// a real authenticated endpoint.
export const MOCK_LEETCODE_CALENDAR = generateContributions(365, 99, 6)