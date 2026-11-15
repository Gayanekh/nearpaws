import { AlertTriangle, ArrowRight, Car, Check, Clock, Heart, House, KeyRound, Menu, MapPin, PawPrint, ShieldCheck, X } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export type IconName =
  | 'paw' | 'home' | 'key' | 'car' | 'check' | 'pin' | 'menu' | 'close' | 'alert' | 'arrow' | 'shield' | 'heart' | 'clock'

const ICONS: Record<IconName, LucideIcon> = {
  paw: PawPrint,
  home: House,
  key: KeyRound,
  car: Car,
  check: Check,
  pin: MapPin,
  menu: Menu,
  close: X,
  alert: AlertTriangle,
  arrow: ArrowRight,
  shield: ShieldCheck,
  heart: Heart,
  clock: Clock,
}

interface IconProps {
  name: IconName
  size?: number
}

/** Decorative Lucide icon. Always pair it with visible text or an aria-label on the parent. */
export function Icon({ name, size = 22 }: IconProps) {
  const Component = ICONS[name]
  return <Component size={size} strokeWidth={2} aria-hidden="true" focusable="false" />
}
