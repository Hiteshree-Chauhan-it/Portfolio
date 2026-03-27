// ============================================
// Skills.jsx
// Groups skills by category, animated bars
// ============================================

import React, { useRef, useEffect, useState } from 'react'
import { skills } from '../data/portfolioData'
import { useFadeIn } from '../hooks/useFadeIn'
import './Skills.css'

// Get unique categories from skills data
const categories = [...new Set(skills.map(s => s.category))]

function SkillBar({ name, level }) {
  const [animated, setAnimated] = useState(false)
  const barRef = useRef(null)

  // Animate bar width when it enters the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.5 }
    )
    if (barRef.current) observer.observe(barRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="skill-bar" ref={barRef}>
      <div className="skill-bar__header">
        <span className="skill-bar__name">{name}</span>
        <span className="skill-bar__level">{level}%</span>
      </div>
      <div className="skill-bar__track">
        {/* Width transitions from 0 to `level`% when animated=true */}
        <div
          className="skill-bar__fill"
          style={{ width: animated ? `${level}%` : '0%' }}
        />
      </div>
    </div>
  )
}

function Skills() {
  const [activeCategory, setActiveCategory] = useState('All')
  const ref = useFadeIn()

  // Filter skills by active tab
  const filteredSkills =
    activeCategory === 'All'
      ? skills
      : skills.filter(s => s.category === activeCategory)

  return (
    <section id="skills" className="skills section">
      <div className="section__inner">

        <div ref={ref} className="fade-in">
          <p className="section__tag">What I Know</p>
          <h2 className="section__title">Skills & Technologies</h2>

          {/* Category filter tabs */}
          <div className="skills__tabs">
            {['All', ...categories].map(cat => (
              <button
                key={cat}
                className={`skills__tab ${activeCategory === cat ? 'skills__tab--active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Skills grid */}
          <div className="skills__grid">
            {filteredSkills.map(skill => (
              <SkillBar key={skill.name} name={skill.name} level={skill.level} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills