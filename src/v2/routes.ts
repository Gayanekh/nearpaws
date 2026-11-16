/**
 * Paths of the redesigned pages while they live under /v2. When the redesign replaces the original site, these become
 * the root paths (the /v2 prefix is dropped in this one file and in the router).
 */
export const ROUTES = {
  home: '/v2',
  caregivers: '/v2/caregivers',
  caregiver: (id: string) => `/v2/caregivers/${id}`,
  book: '/v2/book',
  become: '/v2/become-a-caregiver',
  status: '/v2/booking-status',
  dashboard: '/v2/caregiver-dashboard',
} as const
