import profile from '../data/profile.json'
import Seo from '../components/Seo'

export default function AboutPage() {
  return (
    <>
      <Seo title="About | Muhammad Sobri Maulana" description="About page for Muhammad Sobri Maulana" />
      <section className="page-intro glass">
        <p className="hero-kicker">About</p>
        <h1>{profile.name}</h1>
        <p>{profile.about}</p>
      </section>

      <section className="detail-grid detail-grid-page">
        <article className="info-card">
          <h3>Professional Snapshot</h3>
          <ul>
            <li><strong>Headline:</strong> {profile.headline}</li>
            <li><strong>Affiliation:</strong> {profile.affiliation}</li>
            <li><strong>Location:</strong> {profile.location}</li>
            <li><strong>ORCID:</strong> {profile.orcid}</li>
          </ul>
        </article>
        <article className="info-card">
          <h3>Focus Areas</h3>
          <div className="chip-wrap">
            {profile.focusAreas.map((area) => (
              <span className="chip" key={area}>{area}</span>
            ))}
          </div>
          <p>This portfolio is organized to make it easier to review research output, projects, talks, recognitions, and public-facing work in one place.</p>
        </article>
      </section>
    </>
  )
}
