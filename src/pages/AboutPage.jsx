import profile from '../data/profile.json'
import Seo from '../components/Seo'

export default function AboutPage() {
  return (
    <>
      <Seo title="About | Muhammad Sobri Maulana" description="About page for Muhammad Sobri Maulana" />
      <section>
        <h1>About</h1>
        <p>{profile.about}</p>
        <ul>
          <li><strong>Affiliation:</strong> {profile.affiliation}</li>
          <li><strong>Location:</strong> {profile.location}</li>
          <li><strong>ORCID:</strong> {profile.orcid}</li>
        </ul>
      </section>
    </>
  )
}
