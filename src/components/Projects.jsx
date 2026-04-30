// ============================================
// Projects.jsx
// Grid of project cards with GitHub + demo links
// ============================================

import React from 'react'
import { projects } from '../data/portfolioData'
import { useFadeIn } from '../hooks/useFadeIn'
import './Projects.css'

// ---- ProjectCard: reusable single project card ----
function ProjectCard({ project }) {
  return (
    <article className="project-card fade-in-child">
      {/* Decorative top accent line */}
      <div className="project-card__accent" />

      <div className="project-card__body">
        {/* Title */}
        <h3 className="project-card__title">{project.title}</h3>

        {/* Description */}
        <p className="project-card__desc">{project.description}</p>

        {/* Tech tags */}
        <div className="project-card__tags">
          {project.tags.map(tag => (
            <span key={tag} className="project-card__tag">{tag}</span>
          ))}
        </div>
      </div>

      {/* Links */}
      <div className="project-card__links">
        <a
          href={project.githubLink}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn--outline project-card__link"
        >
          GitHub ↗
        </a>
      </div>
    </article>
  )
}

// ---- Main Projects Section ----
function Projects() {
  const ref = useFadeIn()

  return (
    <section id="projects" className="projects section">
      <div className="section__inner">

        <div ref={ref} className="fade-in">
          <p className="section__tag">My Work</p>
          <h2 className="section__title">Featured Projects</h2>
          <p className="section__subtitle">
            A selection of things I've built. Each project taught me something new.
          </p>

          {/* Projects grid */}
          <div className="projects__grid">
            {projects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {/* Link to GitHub profile */}
          <div className="projects__more">
            <p className="projects__more-text">
              Want to see more? All my projects are on GitHub.
            </p>
            <a
              href="https://github.com/Hiteshree-Chauhan-it"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--outline"
            >
              View All on GitHub ↗ 
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}

export default Projects