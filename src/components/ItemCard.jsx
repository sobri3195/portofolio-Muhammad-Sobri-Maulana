import Badge from './Badge'

export default function ItemCard({ item, onOpen }) {
  const people = item.authors || item.collaborators || []

  return (
    <article className="card" onClick={() => onOpen(item)}>
      <div className="meta-row">
        <Badge>{item.type}</Badge>
        <span>{item.year}</span>
        {item.featured && <span className="chip chip-featured">Featured</span>}
      </div>
      <h3>{item.title}</h3>
      <p className="card-subtitle">{item.subtitle}</p>
      <p className="line-clamp">{item.description}</p>
      <div className="chip-wrap">
        {item.tags?.map((tag) => (
          <span key={tag} className="chip">#{tag}</span>
        ))}
      </div>
      <div className="card-footer">
        <small>{people.join(', ') || item.venue}</small>
        <span className="card-action">View details →</span>
      </div>
    </article>
  )
}
