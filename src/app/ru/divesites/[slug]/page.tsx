import { diveSitesRU } from '@/lib/data/diveSites'
import DiveSiteDetailPage from '../../../divesites/[slug]/page'

export default function RussianDiveSitePage(props: any) {
  return <DiveSiteDetailPage locale='ru' data={diveSitesRU} {...props} />
}
