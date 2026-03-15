export default function SearchFilterPanel({ filters, setFilters, items }) {
  const years = [...new Set(items.map((i) => i.year))].sort((a, b) => b - a)
  const categories = [...new Set(items.map((i) => i.category))]
  const tags = [...new Set(items.flatMap((i) => i.tags || []))]

  return (
    <div className="filter-panel">
      <input placeholder="Search..." value={filters.query} onChange={(e) => setFilters((f) => ({ ...f, query: e.target.value }))} />
      <select value={filters.year} onChange={(e) => setFilters((f) => ({ ...f, year: e.target.value }))}>
        <option value="">All Years</option>
        {years.map((year) => <option key={year}>{year}</option>)}
      </select>
      <select value={filters.category} onChange={(e) => setFilters((f) => ({ ...f, category: e.target.value }))}>
        <option value="">All Categories</option>
        {categories.map((cat) => <option key={cat}>{cat}</option>)}
      </select>
      <select value={filters.tag} onChange={(e) => setFilters((f) => ({ ...f, tag: e.target.value }))}>
        <option value="">All Tags</option>
        {tags.map((tag) => <option key={tag}>{tag}</option>)}
      </select>
      <select value={filters.sort} onChange={(e) => setFilters((f) => ({ ...f, sort: e.target.value }))}>
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="featured">Featured</option>
      </select>
    </div>
  )
}
