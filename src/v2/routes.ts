/**
 * Paths of the redesigned pages while they live under /v2. When the redesign replaces the original site, these become
 * the root paths (the /v2 prefix is dropped in this one file and in the router).
 */
export const ROUTES = {
  home: '/v2',
  caregivers: '/v2/caregivers',
} as const
