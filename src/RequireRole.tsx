import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import type { Role } from './data/demo'
import { useDemo } from './demo/useDemo'
import { ROUTES } from './routes'

/**
 * Keeps a dashboard for the right kind of person. Signed out: to the sign-in page, and back here afterwards. Signed in as the
 * other kind of person: to their own dashboard.
 */
export function RequireRole({ role, children }: { role: Role; children: ReactNode }) {
  const { account } = useDemo()
  const location = useLocation()
  if (!account) return <Navigate to={`${ROUTES.signIn}?role=${role}&next=${encodeURIComponent(location.pathname)}`} replace />
  if (account.role !== role) return <Navigate to={account.role === 'owner' ? ROUTES.dashboard : ROUTES.caregiverDashboard} replace />
  return <>{children}</>
}
