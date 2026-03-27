// ============================================
// Navbar.jsx
// Features:
//  - Sticky + shrinks on scroll
//  - Smooth scroll nav links
//  - Mobile hamburger menu
//  - Dark/light mode toggle
// ============================================

import React, { useState, useEffect } from 'react'
import { navLinks, personalInfo } from '../data/portfolioData'
import './Navbar.css'

function Navbar({ theme, toggleTheme }) {
  const [scrolled,   setScrolled]   = useState(false)
  const [menuOpen,   setMenuOpen]   = useState(false)
  const [activeLink, setActiveLink] = useState('')

  // Add shadow + shrink effect when user scrolls down
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when screen resizes to desktop width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Close menu when a link is clicked (mobile UX)
  const handleLinkClick = (href) => {
    setActiveLink(href)
    setMenuOpen(false)
  }

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner">

        {/* Logo / Site name */}
        <a href="#hero" className="navbar__logo">
          {personalInfo.name.split(' ')[0]}
          <span>.</span>
        </a>

        {/* Desktop nav links */}
        <nav className={`navbar__nav ${menuOpen ? 'navbar__nav--open' : ''}`}>
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className={`navbar__link ${activeLink === link.href ? 'navbar__link--active' : ''}`}
              onClick={() => handleLinkClick(link.href)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right side: theme toggle + resume + hamburger */}
        <div className="navbar__actions">
          {/* Resume button — desktop only */}
          <a
            href={personalInfo.resumeLink}
            className="btn btn--outline navbar__resume--desktop"
            target="_blank"
            rel="noopener noreferrer"
          >
            Resume ↗
          </a>

          {/* Dark/Light mode toggle button */}
          <button
            className="navbar__theme-btn"
            onClick={toggleTheme}
            aria-label="Toggle dark/light mode"
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>

          {/* Hamburger menu — mobile only */}
          <button
            className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
            onClick={() => setMenuOpen(prev => !prev)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Backdrop — closes menu when clicking outside on mobile */}
      {menuOpen && (
        <div
          className="navbar__backdrop"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </header>
  )
}

export default Navbar