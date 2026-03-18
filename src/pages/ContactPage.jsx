import profile from '../data/profile.json'
import links from '../data/links.json'
import Seo from '../components/Seo'

export default function ContactPage() {
  return (
    <>
      <Seo title="Contact | Muhammad Sobri Maulana" description="Contact Muhammad Sobri Maulana" />
      <section className="page-intro glass">
        <p className="hero-kicker">Contact</p>
        <h1>Let&apos;s collaborate</h1>
        <p>Available for research collaboration, speaking invitations, product validation, and interdisciplinary innovation initiatives.</p>
      </section>

      <section className="detail-grid detail-grid-page">
        <article className="info-card">
          <h3>Primary Contact</h3>
          <p>Email: <a href={`mailto:${profile.email}`}>{profile.email}</a></p>
          <p>Location: {profile.location}</p>
          <p>Affiliation: {profile.affiliation}</p>
        </article>
        <article className="info-card">
          <h3>Find me online</h3>
          <div className="profile-links compact-links">
            {links.map((link) => (
              <a key={link.id} href={link.url} target="_blank" rel="noreferrer">{link.icon} {link.label}</a>
            ))}
          </div>
        </article>
      </section>
    </>
  )
}
