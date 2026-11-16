import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { NpHome } from './NpHome'
import { NpLayout } from './NpLayout'
import { NpBecome } from './pages/NpBecome'
import { NpBooking } from './pages/NpBooking'
import { NpBookingStatus } from './pages/NpBookingStatus'
import { NpDashboard } from './pages/NpDashboard'
import { NpDirectory } from './pages/NpDirectory'
import { NpProfile } from './pages/NpProfile'
import { NpAdmin } from './pages/NpAdmin'
import { NpNotFound } from './pages/NpNotFound'

/** Routes of the redesign. They grow until the redesign covers the whole site. */
export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/v2" element={<NpLayout />}>
          <Route index element={<NpHome />} />
          <Route path="caregivers" element={<NpDirectory />} />
          <Route path="caregivers/:id" element={<NpProfile />} />
          <Route path="book" element={<NpBooking />} />
          <Route path="become-a-caregiver" element={<NpBecome />} />
          <Route path="booking-status" element={<NpBookingStatus />} />
          <Route path="caregiver-dashboard" element={<NpDashboard />} />
          <Route path="internal/admin" element={<NpAdmin />} />
          <Route path="*" element={<NpNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
