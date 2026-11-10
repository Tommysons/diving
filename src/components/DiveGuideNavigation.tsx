import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'

type GuideLink = { href: string; name: string }
export default function DiveGuideNavigation({locale,previous,next}:{locale:'en'|'ru';previous:GuideLink;next:GuideLink}) {
 const ru=locale==='ru'
 return <nav aria-label={ru?'Другие дайв-сайты':'Other dive sites'} className='mt-10 flex flex-wrap justify-between gap-3'>
  <Link href={previous.href} className='inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-cyan-100 hover:underline'><ArrowLeft size={16}/><span>{ru?'Предыдущий дайв-сайт':'Previous dive site'}: {previous.name}</span></Link>
  <Link href={next.href} className='ml-auto inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-cyan-100 hover:underline'><span>{ru?'Следующий дайв-сайт':'Next dive site'}: {next.name}</span><ArrowRight size={16}/></Link>
 </nav>
}
