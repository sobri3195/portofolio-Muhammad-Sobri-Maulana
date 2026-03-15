import Badge from './Badge'

export default function ItemCard({ item, onOpen }) {
  const people = item.authors || item.collaborators || []
  return (
    <article className="card" onClick={() => onOpen(item)}>
      <div className="meta-row">
        <Badge>{item.type}</Badge>
        <span>{item.year}</span>
      </div>
      <h3>{item.title}</h3>
      <p>{item.subtitle}</p>
      <p className="line-clamp">{item.description}</p>
      <div className="chip-wrap">
        {item.tags?.map((tag) => (
          <span key={tag} className="chip">#{tag}</span>
        ))}
      </div>
      <small>{people.join(', ')}</small>
    </article>
  )
}
