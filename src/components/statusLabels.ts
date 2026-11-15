export type RequestStatus = 'requested' | 'more-info' | 'confirmed' | 'declined'

export const STATUS_LABELS: Record<RequestStatus, string> = {
  requested: 'Requested',
  'more-info': 'More information needed',
  confirmed: 'Confirmed',
  declined: 'Declined',
}
