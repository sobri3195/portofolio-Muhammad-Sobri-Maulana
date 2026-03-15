import publications from '../data/publications.json'
import projects from '../data/projects.json'
import talks from '../data/talks.json'
import awards from '../data/awards.json'
import certificates from '../data/certificates.json'
import media from '../data/media.json'

export const datasets = { publications, projects, talks, awards, certificates, media }

export const allItems = Object.values(datasets).flat()

export const getCounts = () => ({
  publications: publications.length,
  talks: talks.length,
  projects: projects.length,
  awards: awards.length,
})

export const filterAndSort = (items, filters) => {
  const { query, year, category, tag, sort } = filters
  let result = [...items]

  if (query) {
    const q = query.toLowerCase()
    result = result.filter((item) =>
      [item.title, item.subtitle, item.description, ...(item.tags || [])]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
        .includes(q),
    )
  }
  if (year) result = result.filter((item) => String(item.year) === String(year))
  if (category) result = result.filter((item) => item.category === category)
  if (tag) result = result.filter((item) => (item.tags || []).includes(tag))

  result.sort((a, b) => {
    if (sort === 'oldest') return new Date(a.date) - new Date(b.date)
    if (sort === 'featured') return Number(b.featured) - Number(a.featured) || new Date(b.date) - new Date(a.date)
    return new Date(b.date) - new Date(a.date)
  })

  return result
}
