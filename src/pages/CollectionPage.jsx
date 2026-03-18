import { useMemo, useState } from 'react'
import SearchFilterPanel from '../components/SearchFilterPanel'
import SectionHeader from '../components/SectionHeader'
import ItemCard from '../components/ItemCard'
import ItemModal from '../components/ItemModal'
import Seo from '../components/Seo'
import { datasets, filterAndSort, getFilterSummary } from '../utils/content'

export default function CollectionPage({ title, dataset }) {
  const items = useMemo(() => datasets[dataset] || [], [dataset])
  const [active, setActive] = useState(null)
  const [filters, setFilters] = useState({ query: '', year: '', category: '', tag: '', sort: 'newest' })

  const results = useMemo(() => filterAndSort(items, filters), [items, filters])
  const summary = getFilterSummary(filters)

  return (
    <>
      <Seo title={`${title} | Muhammad Sobri Maulana`} description={`Browse ${title.toLowerCase()}`} />
      <SectionHeader title={title} subtitle="Search, filter, and review records with a more focused browsing experience." />

      <div className="collection-overview glass">
        <div>
          <strong>{items.length}</strong>
          <span>Total records</span>
        </div>
        <div>
          <strong>{items.filter((item) => item.featured).length}</strong>
          <span>Featured items</span>
        </div>
        <div>
          <strong>{new Set(items.map((item) => item.category)).size}</strong>
          <span>Categories</span>
        </div>
      </div>

      <SearchFilterPanel filters={filters} setFilters={setFilters} items={items} resultCount={results.length} />

      {summary.length > 0 && (
        <div className="active-filters">
          {summary.map((entry) => (
            <span key={entry.key} className="chip">{entry.key}: {entry.value}</span>
          ))}
        </div>
      )}

      {!results.length ? (
        <div className="empty-state">No entries match your current filters. Try resetting filters or broadening your keywords.</div>
      ) : (
        <div className="grid">{results.map((item) => <ItemCard key={item.id} item={item} onOpen={setActive} />)}</div>
      )}
      <ItemModal item={active} onClose={() => setActive(null)} />
    </>
  )
}
