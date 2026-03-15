import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import CollectionPage from './pages/CollectionPage'
import MediaPage from './pages/MediaPage'
import ContactPage from './pages/ContactPage'
import NotFoundPage from './pages/NotFoundPage'

const routes = {
  publications: { title: 'Publications', dataset: 'publications' },
  projects: { title: 'Projects & Open Source', dataset: 'projects' },
  talks: { title: 'Talks, Conferences & Webinars', dataset: 'talks' },
  awards: { title: 'Awards & Competitions', dataset: 'awards' },
  certificates: { title: 'Certificates', dataset: 'certificates' },
}

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        {Object.entries(routes).map(([path, config]) => (
          <Route
            key={path}
            path={path}
            element={<CollectionPage title={config.title} dataset={config.dataset} />}
          />
        ))}
        <Route path="media" element={<MediaPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
