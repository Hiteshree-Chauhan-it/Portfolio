// components/ActivityContainer.jsx
import React, { useState } from 'react'
import GitHubActivity from "./components/GitHubActivity";
import LeetCodeActivity from "./components/LeetCodeActivity";
import { useFadeIn } from "../../hooks/useFadeIn";  // reuse project's existing hook
import "./Codingactivity.css";

const TABS = [
  { id: 'github',   label: 'GitHub',   icon: '🐙' },
  { id: 'leetcode', label: 'LeetCode', icon: '📝' },
]

export default function ActivityContainer() {
  const [active, setActive] = useState('github')
  const ref = useFadeIn()

  return (
    <section id="coding" className="ca-section section">
      <div className="section__inner">
        <div ref={ref} className="fade-in">

          {/* Section heading — matches section__tag + section__title pattern */}
          <p className="section__tag"></p>
          <h2 className="section__title">Coding Activity</h2>

          {/* Tab bar */}
          <div className="ca-tabs">
            {TABS.map(tab => (
              <button
                key={tab.id}
                className={`ca-tab${active === tab.id ? ' ca-tab--active' : ''}`}
                onClick={() => setActive(tab.id)}
                aria-selected={active === tab.id}
              >
                <span className="ca-tab__icon">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Panels — hidden not unmounted so data persists on tab switch */}
          <div style={{ display: active === 'github'   ? 'block' : 'none' }}>
            <GitHubActivity />
          </div>
          <div style={{ display: active === 'leetcode' ? 'block' : 'none' }}>
            <LeetCodeActivity />
          </div>

        </div>
      </div>
    </section>
  )
}