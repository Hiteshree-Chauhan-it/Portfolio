// ============================================
// Hero.jsx
// The first thing visitors see.
// Has: animated greeting, name, tagline, CTA.
// ============================================

import React from 'react'
import { personalInfo } from '../data/portfolioData'
import './Hero.css'

function Hero() {
  return (
    <section id="hero" className="hero section">
      {/* Decorative background blob */}
      <div className="hero__blob" aria-hidden="true" />

      <div className="hero__inner section__inner">
        {/* Animated content — staggered CSS animations */}
        <div className="hero__content">

          {/* Greeting label */}
          <span className="hero__greeting" style={{ animationDelay: '0.1s' }}>
            👋 Hello, I'm
          </span>

          {/* Name */}
          <h1 className="hero__name" style={{ animationDelay: '0.2s' }}>
            {personalInfo.name}
          </h1>

          {/* Title / Role */}
          <h2 className="hero__title" style={{ animationDelay: '0.3s' }}>
            {personalInfo.title}
          </h2>

          {/* Tagline */}
          <p className="hero__tagline" style={{ animationDelay: '0.4s' }}>
            {personalInfo.tagline}
          </p>

          {/* CTA Buttons */}
          <div className="hero__cta" style={{ animationDelay: '0.5s' }}>
            <a href="#projects" className="btn btn--primary">
              View My Work →
            </a>
            <a href="#contact" className="btn btn--outline">
              Get in Touch
            </a>
          </div>

          {/* Social quick links */}
          <div className="hero__social" style={{ animationDelay: '0.6s' }}>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hero__social-link"
            >
              GitHub
            </a>
            <span className="hero__social-divider">·</span>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hero__social-link"
            >
              LinkedIn
            </a>
            <span className="hero__social-divider">·</span>
            <a
              href={`mailto:${personalInfo.email}`}
              className="hero__social-link"
            >
              Email
            </a>
          </div>
        </div>

        {/* Avatar / Illustration placeholder */}
        <div className="hero__avatar" style={{ animationDelay: '0.3s' }}>
          <div className="hero__avatar-ring" />
          <div className="hero__avatar-initials">
            {personalInfo.avatarInitials}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero__scroll-hint">
        <div className="hero__scroll-line" />
        <span>scroll</span>
      </div>
    </section>
  )
}

export default Hero