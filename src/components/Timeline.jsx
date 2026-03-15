export default function Timeline({ items }) {
  return (
    <div className="timeline">
      {items.map((item) => (
        <div key={item.id} className="timeline-item">
          <div className="timeline-dot" />
          <div>
            <strong>{item.date}</strong>
            <p>{item.title}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
