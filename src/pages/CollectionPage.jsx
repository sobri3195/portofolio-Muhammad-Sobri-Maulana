import { useMemo, useState } from 'react'
import SearchFilterPanel from '../components/SearchFilterPanel'
import SectionHeader from '../components/SectionHeader'
import ItemCard from '../components/ItemCard'
import ItemModal from '../components/ItemModal'
import Seo from '../components/Seo'
import { datasets, filterAndSort } from '../utils/content'

export default function CollectionPage({ title, dataset }) {
  const items = datasets[dataset] || []
  const [active, setActive] = useState(null)
  const [filters, setFilters] = useState({ query: '', year: '', category: '', tag: '', sort: 'newest' })

  const results = useMemo(() => filterAndSort(items, filters), [items, filters])

  return (
    <>
      <Seo title={`${title} | Muhammad Sobri Maulana`} description={`Browse ${title.toLowerCase()}`} />
      <SectionHeader title={title} subtitle="Search, filter, and review records" />
      <SearchFilterPanel filters={filters} setFilters={setFilters} items={items} />
      {!results.length ? <div className="empty-state">No entries match your current filters.</div> : <div className="grid">{results.map((item) => <ItemCard key={item.id} item={item} onOpen={setActive} />)}</div>}
      <ItemModal item={active} onClose={() => setActive(null)} />
    </>
  )
}
