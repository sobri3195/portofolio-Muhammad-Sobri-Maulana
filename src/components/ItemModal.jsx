export default function ItemModal({ item, onClose }) {
  if (!item) return null

  const citation = `${(item.authors || item.collaborators || []).join(', ')} (${item.year}). ${item.title}. ${item.venue}.`

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close" onClick={onClose}>×</button>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <p><strong>Organizer/Venue:</strong> {item.venue}</p>
        <p><strong>Status:</strong> {item.status}</p>
        {item.type === 'publication' && (
          <button onClick={() => navigator.clipboard.writeText(citation)}>
            Copy Citation
          </button>
        )}
        <div className="link-list">
          {item.links?.map((link) => (
            <a key={link.url} href={link.url} target="_blank" rel="noreferrer" className={link.verified ? 'verified' : ''}>
              {link.label} {link.verified ? '✓' : ''}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
