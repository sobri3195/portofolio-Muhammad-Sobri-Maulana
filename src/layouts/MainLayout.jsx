import { NavLink, Outlet } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { allItems, filterAndSort } from '../utils/content'

const navItems = [
  ['/', 'Home'],
  ['/about', 'About'],
  ['/publications', 'Publications'],
  ['/projects', 'Projects'],
  ['/talks', 'Talks'],
  ['/awards', 'Awards'],
  ['/certificates', 'Certificates'],
  ['/media', 'Media'],
  ['/contact', 'Contact'],
]

const getInitialTheme = () => {
  if (typeof window === 'undefined') return 'dark'

  const storedTheme = window.localStorage.getItem('portfolio-theme')
  if (storedTheme) return storedTheme

  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

export default function MainLayout() {
  const [theme, setTheme] = useState(getInitialTheme)
  const [globalSearch, setGlobalSearch] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    window.localStorage.setItem('portfolio-theme', theme)
  }, [theme])

  const quickResults = useMemo(
    () => filterAndSort(allItems, { query: globalSearch, sort: 'featured' }).slice(0, 6),
    [globalSearch],
  )

  return (
    <div className={`app ${theme}`}>
      <div className="page-shell">
        <header className="topbar glass">
          <div className="brand-wrap">
            <img className="brand-logo" src="/logo.svg" alt="MSM logo" />
            <div>
              <div className="brand">MSM Portfolio</div>
              <div className="brand-subtitle">Research • Technology • Innovation</div>
            </div>
          </div>

          <div className="topbar-actions">
            <label className="search-box" aria-label="Global search">
              <span className="search-icon">⌕</span>
              <input
                className="global-search"
                placeholder="Search all works, talks, awards, and certificates"
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
              />
            </label>
            <button
              className="btn btn-soft"
              type="button"
              onClick={() => setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'))}
            >
              {theme === 'dark' ? '☀ Light mode' : '🌙 Dark mode'}
            </button>
            <button className="btn btn-soft nav-toggle" type="button" onClick={() => setMenuOpen((open) => !open)}>
              {menuOpen ? '✕ Menu' : '☰ Menu'}
            </button>
          </div>
        </header>

        {globalSearch && (
          <div className="search-preview glass">
            <div className="search-preview-header">
              <strong>Quick results</strong>
              <span>{quickResults.length ? `${quickResults.length} items found` : 'No results yet'}</span>
            </div>
            {quickResults.length ? (
              quickResults.map((item) => (
                <a key={item.id} className="search-item" href={item.path} onClick={() => setGlobalSearch('')}>
                  <div>
                    <span className="search-item-category">{item.datasetLabel}</span>
                    <strong>{item.title}</strong>
                    <p>{item.subtitle || item.description}</p>
                  </div>
                  <span className="search-item-year">{item.year}</span>
                </a>
              ))
            ) : (
              <div className="search-item search-item-empty">No matching records found.</div>
            )}
          </div>
        )}

        <nav className={`glass nav-wrap ${menuOpen ? 'open' : ''}`}>
          {navItems.map(([to, label]) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
