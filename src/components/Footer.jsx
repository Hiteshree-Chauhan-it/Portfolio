// ============================================
// Footer.jsx
// Simple, clean footer with nav links + socials
// ============================================

import React from 'react'
import { personalInfo, navLinks } from '../data/portfolioData'
import './Footer.css'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer__inner section__inner">
        {/* Bottom row: copyright + socials */}
        <div className="footer__bottom">
          <p className="footer__copy">
            © {currentYear} {personalInfo.name}. Built with React + Vite.
          </p>

          <div className="footer__socials">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-link"
              aria-label="GitHub"
            >
              GitHub
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-link"
              aria-label="LinkedIn"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="footer__social-link"
              aria-label="Email"
            >
              Email
            </a>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer