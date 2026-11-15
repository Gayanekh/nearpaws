import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { BecomeCaregiverPage } from './pages/BecomeCaregiverPage'
import { AdminPage } from './pages/AdminPage'
import { BookingStatusPage } from './pages/BookingStatusPage'
import { CaregiverDashboardPage } from './pages/CaregiverDashboardPage'
import { BookingPage } from './pages/BookingPage'
import { DirectoryPage } from './pages/DirectoryPage'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { ProfilePage } from './pages/ProfilePage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/caregivers" element={<DirectoryPage />} />
          <Route path="/caregivers/:id" element={<ProfilePage />} />
          <Route path="/book" element={<BookingPage />} />
          <Route path="/become-a-caregiver" element={<BecomeCaregiverPage />} />
          <Route path="/booking-status" element={<BookingStatusPage />} />
          <Route path="/caregiver-dashboard" element={<CaregiverDashboardPage />} />
          <Route path="/internal/admin" element={<AdminPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
