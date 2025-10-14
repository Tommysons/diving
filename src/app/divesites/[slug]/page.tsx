import { diveSites } from '@/lib/data/diveSites'
import DiveSiteDetail from '@/components/DiveSiteDetailPage'

interface Props {
  params: Promise<{ slug: string }>
}

export default async function Page({ params }: Props) {
  const { slug } = await params // ✅ Must await here

  const locale: 'en' = 'en'
  const site = diveSites.find((s) => s.slug === slug)

  if (!site) return <div>Not Found</div>

  return <DiveSiteDetail site={site} locale={locale} />
}
