import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { DemoProvider } from './demo/DemoProvider'
import { NpHome } from './NpHome'
import { NpLayout } from './NpLayout'
import { RequireRole } from './RequireRole'
import { NpAdmin } from './pages/NpAdmin'
import { NpBecome } from './pages/NpBecome'
import { NpBooking } from './pages/NpBooking'
import { NpDashboard } from './pages/NpDashboard'
import { NpDirectory } from './pages/NpDirectory'
import { NpNotFound } from './pages/NpNotFound'
import { NpOwnerDashboard } from './pages/NpOwnerDashboard'
import { NpProfile } from './pages/NpProfile'
import { NpSignIn } from './pages/NpSignIn'
import { ROUTES } from './routes'

/** Routes of the app. The two dashboards are for the signed-in demo person only (see RequireRole). */
export function App() {
  return (
    <DemoProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NpLayout />}>
            <Route index element={<NpHome />} />
            <Route path="caregivers" element={<NpDirectory />} />
            <Route path="caregivers/:id" element={<NpProfile />} />
            <Route path="book" element={<NpBooking />} />
            <Route path="become-a-caregiver" element={<NpBecome />} />
            <Route path="sign-in" element={<NpSignIn />} />
            <Route path="dashboard" element={<RequireRole role="owner"><NpOwnerDashboard /></RequireRole>} />
            <Route path="caregiver-dashboard" element={<RequireRole role="caregiver"><NpDashboard /></RequireRole>} />
            <Route path="booking-status" element={<Navigate to={ROUTES.dashboard} replace />} />
            <Route path="internal/admin" element={<NpAdmin />} />
            <Route path="*" element={<NpNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </DemoProvider>
  )
}
