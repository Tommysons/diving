'use client'

import { usePathname } from 'next/navigation'

export default function useLocale() {
  const pathname = usePathname() || '/'
  return pathname.startsWith('/ru') ? 'ru' : 'en'
}
