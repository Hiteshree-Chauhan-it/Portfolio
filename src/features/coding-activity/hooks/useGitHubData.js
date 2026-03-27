import { useState, useEffect } from 'react'
import { computeStats } from '../utils/heatmapUtils'

const API_BASE = 'https://github-contributions-api.jogruber.de/v4'

// 🔥 PUT YOUR USERNAME HERE
const GITHUB_USERNAME = "Hiteshree-Chauhan-it"

function toContributionMap(contributions = []) {
  return contributions.reduce((acc, { date, count }) => {
    acc[date] = count
    return acc
  }, {})
}

export function useGitHubData() {
  const [contributionMap, setContributionMap] = useState({})
  const [stats, setStats] = useState({
    total: 0, thisYear: 0, currentStreak: 0, longestStreak: 0,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      setError(null)

      try {
        const res = await fetch(`${API_BASE}/${GITHUB_USERNAME}?y=last`)
        if (!res.ok) throw new Error("GitHub fetch failed")

        const json = await res.json()
        const map = toContributionMap(json.contributions)

        setContributionMap(map)
        setStats(computeStats(map))

      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  return {
    contributionMap,
    stats,
    loading,
    error,
    usingMock: false
  }
}