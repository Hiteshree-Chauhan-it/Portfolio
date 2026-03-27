// ============================================
// App.jsx — Root Component
// Assembles all sections in order.
// Also manages the dark/light theme.
// ============================================

import React from 'react'
import { useTheme } from './hooks/useTheme'

// Section components — each is its own file in /components
import Navbar   from './components/Navbar'
import Hero     from './components/Hero'
import About    from './components/About'
import Skills   from './components/Skills'
import Projects from './components/Projects'
import Contact  from './components/Contact'
import Footer   from './components/Footer'
import ActivityContainer from "./features/coding-activity/ActivityContainer";

function App() {
  const { theme, toggleTheme } = useTheme()

  return (
    // Pass theme info to Navbar for the toggle button
    <div className="app">
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      {/* Main content — each <section> has an id for smooth scroll */}
      <main>
        <Hero />
        <About />
        <Skills />
        <ActivityContainer />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}

export default App