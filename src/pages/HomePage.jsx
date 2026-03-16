import profile from '../data/profile.json'
import links from '../data/links.json'
import { datasets, getCounts } from '../utils/content'
import SectionHeader from '../components/SectionHeader'
import ItemCard from '../components/ItemCard'
import Timeline from '../components/Timeline'
import Seo from '../components/Seo'
import { useState } from 'react'
import ItemModal from '../components/ItemModal'

export default function HomePage() {
  const counts = getCounts()
  const featured = Object.values(datasets).flat().filter((i) => i.featured).slice(0, 6)
  const recent = Object.values(datasets).flat().sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5)
  const [active, setActive] = useState(null)

  return (
    <>
      <Seo
        title="Home | Muhammad Sobri Maulana"
        description="Professional portfolio of Muhammad Sobri Maulana."
        schema={[{ '@context': 'https://schema.org', '@type': 'Person', name: profile.name, affiliation: profile.affiliation }]}
      />
      <section className="hero glass hero-grid">
        <div>
          <p className="hero-kicker">Welcome to my digital portfolio</p>
          <h1>{profile.name}</h1>
          <h2>{profile.headline}</h2>
          <p>{profile.shortBio}</p>
          <div className="cta-group">
            <a className="btn" href="/publications">View Publications</a>
            <a className="btn btn-soft" href="/contact">Contact Me</a>
          </div>
        </div>
        <div className="hero-card">
          <img src="/logo.svg" alt="MSM logo" />
          <p>Building impact across research, technology, cybersecurity, and innovation.</p>
        </div>
      </section>

      <section>
        <SectionHeader title="Key Stats" subtitle="Impact overview" />
        <div className="stats-grid">
          <div><strong>{counts.publications}</strong><span>Publications</span></div>
          <div><strong>{counts.talks}</strong><span>Talks</span></div>
          <div><strong>{counts.projects}</strong><span>Projects</span></div>
          <div><strong>{counts.awards}</strong><span>Awards</span></div>
        </div>
      </section>

      <section>
        <SectionHeader title="Featured Works" />
        <div className="grid">{featured.map((item) => <ItemCard key={item.id} item={item} onOpen={setActive} />)}</div>
      </section>

      <section>
        <SectionHeader title="Recent Activities" />
        <Timeline items={recent} />
      </section>

      <section>
        <SectionHeader title="Expertise" />
        <div className="chip-wrap">{profile.focusAreas.map((area) => <span className="chip" key={area}>{area}</span>)}</div>
      </section>

      <section>
        <SectionHeader title="External Profiles" />
        <div className="profile-links">{links.map((link) => <a key={link.id} href={link.url} target="_blank" rel="noreferrer">{link.icon} {link.label}</a>)}</div>
      </section>

      <section className="contact-cta glass">
        <h3>Interested in collaboration?</h3>
        <p>Open for interdisciplinary projects, speaking invitations, and research collaborations.</p>
        <a className="btn" href="/contact">Get in touch</a>
      </section>

      <ItemModal item={active} onClose={() => setActive(null)} />
    </>
  )
}
