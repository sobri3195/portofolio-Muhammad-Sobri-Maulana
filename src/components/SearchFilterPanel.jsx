export default function SearchFilterPanel({ filters, setFilters, items, resultCount }) {
  const years = [...new Set(items.map((i) => i.year))].sort((a, b) => b - a)
  const categories = [...new Set(items.map((i) => i.category))]
  const tags = [...new Set(items.flatMap((i) => i.tags || []))]

  const resetFilters = () => setFilters({ query: '', year: '', category: '', tag: '', sort: 'newest' })

  return (
    <div className="filter-panel-wrap">
      <div className="filter-panel">
        <label>
          <span>Search</span>
          <input placeholder="Search by title, venue, tag, author..." value={filters.query} onChange={(e) => setFilters((f) => ({ ...f, query: e.target.value }))} />
        </label>
        <label>
          <span>Year</span>
          <select value={filters.year} onChange={(e) => setFilters((f) => ({ ...f, year: e.target.value }))}>
            <option value="">All Years</option>
            {years.map((year) => <option key={year}>{year}</option>)}
          </select>
        </label>
        <label>
          <span>Category</span>
          <select value={filters.category} onChange={(e) => setFilters((f) => ({ ...f, category: e.target.value }))}>
            <option value="">All Categories</option>
            {categories.map((cat) => <option key={cat}>{cat}</option>)}
          </select>
        </label>
        <label>
          <span>Tag</span>
          <select value={filters.tag} onChange={(e) => setFilters((f) => ({ ...f, tag: e.target.value }))}>
            <option value="">All Tags</option>
            {tags.map((tag) => <option key={tag}>{tag}</option>)}
          </select>
        </label>
        <label>
          <span>Sort</span>
          <select value={filters.sort} onChange={(e) => setFilters((f) => ({ ...f, sort: e.target.value }))}>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="featured">Featured first</option>
            <option value="title">Title A–Z</option>
          </select>
        </label>
      </div>
      <div className="filter-toolbar">
        <p>{resultCount} record(s) shown.</p>
        <button className="btn btn-soft" type="button" onClick={resetFilters}>Reset filters</button>
      </div>
    </div>
  )
}
