/** Paths of the app, in one place so a page can move without touching its links. */
export const ROUTES = {
  home: '/',
  caregivers: '/caregivers',
  caregiver: (id: string) => `/caregivers/${id}`,
  book: '/book',
  become: '/become-a-caregiver',
  status: '/booking-status',
  dashboard: '/caregiver-dashboard',
  admin: '/internal/admin',
} as const
