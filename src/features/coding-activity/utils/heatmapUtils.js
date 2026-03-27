// ============================================================
// utils/heatmapUtils.js
// Pure utility functions for the contribution heatmap grids.
// No React, no side effects — safe to import anywhere.
// ============================================================

/**
 * Maps a raw contribution count to a heat level 0–4.
 * Adjust thresholds to suit your activity volume.
 *
 * @param {number}   count
 * @param {number[]} thresholds  — [ignore, t1, t2, t3] upper bounds
 * @returns {0|1|2|3|4}
 */
export function countToLevel(count, thresholds = [0, 2, 5, 9]) {
  if (count === 0) return 0
  if (count <= thresholds[1]) return 1
  if (count <= thresholds[2]) return 2
  if (count <= thresholds[3]) return 3
  return 4
}

/**
 * Builds a 2D grid (array of weeks, each week = 7 day cells)
 * covering the last 52 weeks from today.
 *
 * @param {Object.<string, number>} contributionMap  — { 'YYYY-MM-DD': count }
 * @param {number[]}                [thresholds]
 * @returns {DayCell[][]}
 *
 * DayCell: { date: string|null, count: number, level: 0–4, isToday: boolean }
 */
export function buildHeatmapGrid(contributionMap = {}, thresholds) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const todayStr = toDateString(today)

  // Roll start back to the nearest past Sunday (~52 weeks ago)
  const startDate = new Date(today)
  startDate.setDate(today.getDate() - 364)
  startDate.setDate(startDate.getDate() - startDate.getDay())

  const weeks = []
  let currentWeek = []
  const cursor = new Date(startDate)

  while (cursor <= today) {
    const dateStr = toDateString(cursor)
    const count = contributionMap[dateStr] ?? 0

    currentWeek.push({
      date: dateStr,
      count,
      level: countToLevel(count, thresholds),
      isToday: dateStr === todayStr,
    })

    if (cursor.getDay() === 6) {
      // Saturday — complete week
      weeks.push(currentWeek)
      currentWeek = []
    }
    cursor.setDate(cursor.getDate() + 1)
  }

  // Pad and push the final partial week
  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) {
      currentWeek.push({ date: null, count: 0, level: -1, isToday: false })
    }
    weeks.push(currentWeek)
  }

  return weeks
}

/**
 * Returns month label objects for the column headers.
 * Only emits a label when the month changes between weeks.
 *
 * @param {DayCell[][]} weeks
 * @returns {{ weekIdx: number, label: string }[]}
 */
export function getMonthLabels(weeks) {
  const labels = []
  let prevMonth = null

  weeks.forEach((week, weekIdx) => {
    const firstReal = week.find(d => d.date !== null)
    if (!firstReal) return

    const month = firstReal.date.slice(0, 7) // 'YYYY-MM'
    if (month !== prevMonth) {
      const label = new Date(firstReal.date + 'T00:00:00')
        .toLocaleString('default', { month: 'short' })
      labels.push({ weekIdx, label })
      prevMonth = month
    }
  })

  return labels
}

/**
 * Computes total, thisYear, currentStreak, longestStreak
 * from a flat contribution map.
 *
 * @param {Object.<string, number>} contributionMap
 */
export function computeStats(contributionMap = {}) {
  const sortedDates = Object.keys(contributionMap).sort()
  const total = Object.values(contributionMap).reduce((s, v) => s + v, 0)

  const currentYear = new Date().getFullYear().toString()
  const thisYear = Object.entries(contributionMap)
    .filter(([d]) => d.startsWith(currentYear))
    .reduce((s, [, v]) => s + v, 0)

  // Current streak — walk backwards from today
  let currentStreak = 0
  const cur = new Date()
  while (true) {
    const d = toDateString(cur)
    if ((contributionMap[d] ?? 0) > 0) {
      currentStreak++
      cur.setDate(cur.getDate() - 1)
    } else {
      break
    }
  }

  // Longest streak — single pass
  let longest = 0
  let running = 0
  for (const d of sortedDates) {
    if ((contributionMap[d] ?? 0) > 0) {
      running++
      if (running > longest) longest = running
    } else {
      running = 0
    }
  }

  return { total, thisYear, currentStreak, longestStreak: longest }
}

/** Formats a Date as 'YYYY-MM-DD' without timezone drift */
export function toDateString(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}