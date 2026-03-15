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
      <header className="topbar">
        <div className="brand">MSM Portfolio</div>
        <input
          className="global-search"
          placeholder="Global search"
          value={globalSearch}
          onChange={(e) => setGlobalSearch(e.target.value)}
        />
        <button onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}>Theme</button>
      </header>
      {globalSearch && (
        <div className="search-preview">
          {quickResults.map((item) => (
            <div key={item.id}>{item.title}</div>
          ))}
        </div>
      )}
      <nav>
        {navItems.map(([to, label]) => (
          <NavLink key={to} to={to} end={to === '/'}>
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
