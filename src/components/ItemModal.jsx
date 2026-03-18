import { useMemo, useState } from 'react'

export default function ItemModal({ item, onClose }) {
  const [copied, setCopied] = useState('')

  const citation = useMemo(() => {
    if (!item) return ''

    return `${(item.authors || item.collaborators || []).join(', ')} (${item.year}). ${item.title}. ${item.venue}.`
  }, [item])

  if (!item) return null

  const handleCopy = async (value, label) => {
    await navigator.clipboard.writeText(value)
    setCopied(label)
    window.setTimeout(() => setCopied(''), 1600)
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close btn btn-soft" type="button" onClick={onClose}>×</button>
        <div className="modal-meta-row">
          <span className="chip">{item.datasetLabel}</span>
          <span className="chip">{item.category}</span>
          <span className="chip">{item.status}</span>
        </div>
        <h3>{item.title}</h3>
        <p className="card-subtitle">{item.subtitle}</p>
        <p>{item.description}</p>

        <div className="detail-grid">
          <div>
            <strong>Venue / Organizer</strong>
            <p>{item.venue}</p>
          </div>
          <div>
            <strong>Date</strong>
            <p>{item.date}</p>
          </div>
          <div>
            <strong>Contributors</strong>
            <p>{(item.authors || item.collaborators || []).join(', ') || '-'}</p>
          </div>
          <div>
            <strong>Proof</strong>
            <p>{item.proofType || '-'}</p>
          </div>
        </div>

        <div className="modal-actions">
          {item.type === 'publication' && (
            <button className="btn" type="button" onClick={() => handleCopy(citation, 'Citation copied')}>
              Copy Citation
            </button>
          )}
          {item.links?.[0]?.url && (
            <button className="btn btn-soft" type="button" onClick={() => handleCopy(item.links[0].url, 'Link copied')}>
              Copy Primary Link
            </button>
          )}
          {copied && <span className="copy-feedback">{copied}</span>}
        </div>

        <div className="link-list">
          {item.links?.map((link) => (
            <a key={link.url} href={link.url} target="_blank" rel="noreferrer" className={link.verified ? 'verified' : ''}>
              {link.label} {link.verified ? '✓' : '↗'}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
