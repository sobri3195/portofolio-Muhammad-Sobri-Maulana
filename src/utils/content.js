import publications from '../data/publications.json'
import projects from '../data/projects.json'
import talks from '../data/talks.json'
import awards from '../data/awards.json'
import certificates from '../data/certificates.json'
import media from '../data/media.json'

const datasetConfig = {
  publications: { label: 'Publications', path: '/publications' },
  projects: { label: 'Projects', path: '/projects' },
  talks: { label: 'Talks', path: '/talks' },
  awards: { label: 'Awards', path: '/awards' },
  certificates: { label: 'Certificates', path: '/certificates' },
  media: { label: 'Media', path: '/media' },
}

const annotateItems = (items, datasetKey) =>
  items.map((item) => ({
    ...item,
    datasetKey,
    datasetLabel: datasetConfig[datasetKey].label,
    path: datasetConfig[datasetKey].path,
    searchText: [
      item.title,
      item.subtitle,
      item.description,
      item.venue,
      ...(item.tags || []),
      ...(item.authors || []),
      ...(item.collaborators || []),
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase(),
  }))

export const datasets = {
  publications: annotateItems(publications, 'publications'),
  projects: annotateItems(projects, 'projects'),
  talks: annotateItems(talks, 'talks'),
  awards: annotateItems(awards, 'awards'),
  certificates: annotateItems(certificates, 'certificates'),
  media: annotateItems(media, 'media'),
}

export const allItems = Object.values(datasets).flat()

export const getCounts = () => ({
  publications: datasets.publications.length,
  talks: datasets.talks.length,
  projects: datasets.projects.length,
  awards: datasets.awards.length,
  certificates: datasets.certificates.length,
  media: datasets.media.length,
})

export const getHighlights = () => {
  const items = allItems

  return {
    totalRecords: items.length,
    featuredCount: items.filter((item) => item.featured).length,
    activeYearSpan: `${Math.min(...items.map((item) => item.year))}–${Math.max(...items.map((item) => item.year))}`,
    categories: new Set(items.map((item) => item.category)).size,
  }
}

export const filterAndSort = (items, filters) => {
  const { query, year, category, tag, sort } = filters
  let result = [...items]

  if (query) {
    const q = query.toLowerCase()
    result = result.filter((item) => item.searchText.includes(q))
  }

  if (year) result = result.filter((item) => String(item.year) === String(year))
  if (category) result = result.filter((item) => item.category === category)
  if (tag) result = result.filter((item) => (item.tags || []).includes(tag))

  result.sort((a, b) => {
    if (sort === 'oldest') return new Date(a.date) - new Date(b.date)
    if (sort === 'title') return a.title.localeCompare(b.title)
    if (sort === 'featured') return Number(b.featured) - Number(a.featured) || new Date(b.date) - new Date(a.date)

    return new Date(b.date) - new Date(a.date)
  })

  return result
}

export const getFilterSummary = (filters) =>
  Object.entries(filters)
    .filter(([, value]) => value && value !== 'newest')
    .map(([key, value]) => ({ key, value }))
