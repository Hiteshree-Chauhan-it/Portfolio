// ============================================
// About.jsx
// Two-column layout: text + stats grid
// Animates in when scrolled into view
// ============================================

import React from 'react'
import { aboutText, personalInfo } from '../data/portfolioData'
import { useFadeIn } from '../hooks/useFadeIn'
import './About.css'

function About() {
  const ref = useFadeIn()

  return (
    <section id="about" className="about section">
      <div className="section__inner">

        <div ref={ref} className="about__grid fade-in">

          {/* ---- Left: Text content ---- */}
          <div className="about__text fade-in-child">
            <p className="section__tag">About Me</p>
            <h2 className="section__title">A little bit about who I am</h2>

            {/* Paragraphs from data file */}
            {aboutText.paragraphs.map((para, i) => (
              <p key={i} className="about__para">
                {para}
              </p>
            ))}

            {/* Contact info pills */}
            <div className="about__contact-row">
              <span className="about__pill">📍 {personalInfo.location}</span>
              <a href={`mailto:${personalInfo.email}`} className="about__pill about__pill--link">
                ✉️ {personalInfo.email}
              </a>
            </div>
          </div>

          {/* ---- Right: Stats grid ---- */}
          <div className="about__stats fade-in-child">
            {aboutText.facts.map((fact, i) => (
              <div key={i} className="about__stat-card">
                <span className="about__stat-value">{fact.value}</span>
                <span className="about__stat-label">{fact.label}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}

export default About