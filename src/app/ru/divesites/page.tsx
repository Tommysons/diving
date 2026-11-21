import { permanentRedirect } from 'next/navigation'

// The Thailand destination page now contains the Koh Tao dive-site directory.
export default function RetiredDiveSitesIndex() {
  permanentRedirect('/ru/destinations/thailand')
}
