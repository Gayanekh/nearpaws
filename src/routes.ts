/** Paths of the app, in one place so a page can move without touching its links. */
export const ROUTES = {
  home: '/',
  caregivers: '/caregivers',
  caregiver: (id: string) => `/caregivers/${id}`,
  book: '/book',
  become: '/become-a-caregiver',
  signIn: '/sign-in',
  /** The pet owner's dashboard. */
  dashboard: '/dashboard',
  caregiverDashboard: '/caregiver-dashboard',
  /** The signed-in person's own profile. */
  profile: '/profile',
  admin: '/internal/admin',
} as const
