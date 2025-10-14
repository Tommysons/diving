import { diveSitesRU } from '@/lib/data/diveSites'
import DiveSiteDetail from '@/components/DiveSiteDetailPage'

interface Props {
  params: Promise<{ slug: string }>
}

export default async function Page({ params }: Props) {
  const { slug } = await params // ✅ Must await here
  const locale: 'ru' = 'ru'
  const site = diveSitesRU.find((s) => s.slug === slug)

  if (!site) return <div>Не найдено</div>

  return <DiveSiteDetail site={site} locale={locale} />
}
