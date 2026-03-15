import profile from '../data/profile.json'
import links from '../data/links.json'
import Seo from '../components/Seo'

export default function ContactPage() {
  return (
    <>
      <Seo title="Contact | Muhammad Sobri Maulana" description="Contact Muhammad Sobri Maulana" />
      <section>
        <h1>Contact</h1>
        <p>Email: <a href={`mailto:${profile.email}`}>{profile.email}</a></p>
        <div className="profile-links">
          {links.map((link) => (
            <a key={link.id} href={link.url} target="_blank" rel="noreferrer">{link.label}</a>
          ))}
        </div>
      </section>
    </>
  )
}
