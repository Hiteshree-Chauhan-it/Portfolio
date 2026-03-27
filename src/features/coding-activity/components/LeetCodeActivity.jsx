// ============================================================
// components/LeetCodeActivity.jsx
// LeetCode panel showing:
//   • Username input
//   • 4 stat cards (total, rank, acceptance, contributions)
//   • Difficulty rings + horizontal bar breakdown
//   • Submission calendar heatmap (amber, always mock)
// ============================================================

import React from "react";
import { useLeetCodeData } from "../hooks/useLeetCodeData";
import DifficultyRings from "./DifficultyRings";
import ContributionHeatmap from "./ContributionHeatmap";
import StatCard from "./StatCard";
import UsernameInput from "./UsernameInput";

function fmt(n) {
  if (n == null) return "—";
  return Number(n).toLocaleString();
}

function fmtRate(rate) {
  if (rate == null) return "—";
  return `${Number(rate).toFixed(1)}%`;
}

export default function LeetCodeActivity() {
  const {
    username,
    setUsername,
    stats,
    calendarMap,
    loading,
    error,
    usingMock,
  } = useLeetCodeData();

  // Horizontal breakdown bars config
  const breakdownRows = stats
    ? [
        {
          key: "easy",
          label: "Easy",
          solved: stats.easySolved,
          total: stats.totalEasy,
        },
        {
          key: "medium",
          label: "Medium",
          solved: stats.mediumSolved,
          total: stats.totalMedium,
        },
        {
          key: "hard",
          label: "Hard",
          solved: stats.hardSolved,
          total: stats.totalHard,
        },
      ]
    : [];

  return (
    <div>
      {/* ── Panel header ── */}
      <div className="ca-panel__header">
        <div className="ca-panel__title-group">
          <div className="ca-panel__icon-title">
            {/* LeetCode bracket icon */}
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "1.2rem",
                color: "#d4902a",
              }}
              aria-hidden
            >
              {"{}"}
            </span>
            <h3 className="ca-panel__title">LeetCode Activity</h3>
          </div>
          <p className="ca-panel__desc">
            My problem solving stats on LeetCode.
          </p>
        </div>

      </div>

      {/* ── Stat cards ── */}
      <div className="ca-stats-grid">
        <StatCard
          icon="✅"
          value={loading || !stats ? "" : fmt(stats.totalSolved)}
          label="Problems Solved"
          subtitle={stats ? `of ${fmt(stats.totalQuestions)} total` : undefined}
          accent="orange"
          loading={loading || !stats}
        />
        <StatCard
          icon="🏆"
          value={loading || !stats ? "" : `#${fmt(stats.ranking)}`}
          label="Global Rank"
          accent="yellow"
          loading={loading || !stats}
        />
      </div>

      {/* ── Difficulty breakdown card ── */}
      <div className="ca-card">
        <div className="ca-card__inner">
          <div className="ca-card__head">
            <span className="ca-card__heading">Difficulty Breakdown</span>
          </div>

          <div className="ca-rings">
            {/* Rings + bar chart side by side */}
            <div className="ca-rings__row">
              {/* SVG rings */}
              <DifficultyRings
                easySolved={stats?.easySolved ?? 0}
                totalEasy={stats?.totalEasy ?? 0}
                mediumSolved={stats?.mediumSolved ?? 0}
                totalMedium={stats?.totalMedium ?? 0}
                hardSolved={stats?.hardSolved ?? 0}
                totalHard={stats?.totalHard ?? 0}
                loading={loading || !stats}
              />

              {/* Horizontal progress bars */}
              {stats && !loading && (
                <div className="ca-rings__bars">
                  {breakdownRows.map(({ key, label, solved, total }) => {
                    const pct = total > 0 ? (solved / total) * 100 : 0;
                    return (
                      <div key={key} className="ca-rings__bar-row">
                        <div className="ca-rings__bar-head">
                          <span className="ca-rings__bar-label">{label}</span>
                          <span className="ca-rings__bar-count">
                            {solved} / {total}
                          </span>
                        </div>
                        <div className="ca-rings__bar-track">
                          <div
                            className={`ca-rings__bar-fill ca-rings__bar-fill--${key}`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Submission activity heatmap card ── */}
      <div className="ca-card">
        <div className="ca-card__inner">
          <div className="ca-card__head">
            <span className="ca-card__heading">Submission Activity</span>
            <span className="ca-card__badge">simulated calendar</span>
          </div>
          {calendarMap && Object.keys(calendarMap).length > 0 && (
            <ContributionHeatmap
              contributionMap={calendarMap}
              colorScheme="leetcode"
              loading={loading}
            />
          )}
        </div>
      </div>
    </div>
  );
}
