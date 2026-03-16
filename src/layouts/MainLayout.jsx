import { NavLink, Outlet } from 'react-router-dom'
import { useMemo, useState } from 'react'
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

export default function MainLayout() {
  const [theme, setTheme] = useState('dark')
  const [globalSearch, setGlobalSearch] = useState('')

  const quickResults = useMemo(
    () => filterAndSort(allItems, { query: globalSearch, sort: 'newest' }).slice(0, 5),
    [globalSearch],
  )

  return (
    <div className={`app ${theme}`}>
      <header className="topbar glass">
        <div className="brand-wrap">
          <img className="brand-logo" src="/logo.svg" alt="MSM logo" />
          <div className="brand">MSM Portfolio</div>
        </div>
        <input
          className="global-search"
          placeholder="Global search"
          value={globalSearch}
          onChange={(e) => setGlobalSearch(e.target.value)}
        />
        <button className="btn btn-soft" onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}>
          {theme === 'dark' ? '☀ Light' : '🌙 Dark'}
        </button>
      </header>
      {globalSearch && (
        <div className="search-preview glass">
          {quickResults.length ? quickResults.map((item) => (
            <div key={item.id} className="search-item">{item.title}</div>
          )) : <div className="search-item">No matching records found.</div>}
        </div>
      )}
      <nav className="glass nav-wrap">
        {navItems.map(([to, label]) => (
          <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            {label}
          </NavLink>
        ))}
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
