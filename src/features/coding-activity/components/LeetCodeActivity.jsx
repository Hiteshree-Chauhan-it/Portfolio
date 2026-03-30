// ============================================================
// components/LeetCodeActivity.jsx
// LeetCode panel — displays the official leetcard stats card
// (which includes the heatmap) and links to the real profile.
//
// No data-fetching needed: the card is a self-contained SVG
// served by leetcard.jacoblin.cool and always up-to-date.
// ============================================================

import React from "react";

const USERNAME    = "Hiteshree_chauhan_it";
const PROFILE_URL = `https://leetcode.com/${USERNAME}/`;

// The card auto-updates; theme=light keeps it readable in both
// site themes since the SVG has its own white background.
const CARD_URL =
  `https://leetcard.jacoblin.cool/${USERNAME}?theme=light&font=Inter&ext=heatmap`;

export default function LeetCodeActivity() {
  return (
    <div>
      {/* ── Panel header ── */}
      <div className="ca-panel__header">
        <div className="ca-panel__title-group">
          <div className="ca-panel__icon-title">
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
            My problem-solving stats on LeetCode.
          </p>
        </div>
      </div>

      {/* ── Stats card (leetcard embed) ── */}
      <div className="ca-card">
        <div className="ca-card__inner" style={{ padding: "var(--space-sm)" }}>
          <img
            src={CARD_URL}
            alt={`LeetCode stats for ${USERNAME}`}
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "var(--radius-sm)",
              display: "block",
            }}
            loading="lazy"
          />
        </div>
      </div>

      {/* ── Profile link ── */}
      <div style={{ textAlign: "center", marginBottom: "var(--space-md)" }}>
        <a
          href={PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn--primary"
        >
          View My LeetCode Profile →
        </a>
      </div>
    </div>
  );
}