import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Play } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function SnorkelingExperience({ locale }: { locale: 'en' | 'ru' }) {
  const ru = locale === 'ru', base = ru ? '/ru' : ''
  const t = ru ? {
    eyebrow: 'ПОД ПОВЕРХНОСТЬЮ · LOKAWNDR', title: 'Океан начинается здесь',
    intro: 'Вдохните, опустите лицо в воду — и откройте для себя мир кораллов, солнечных бликов и морских обитателей.',
    explore: 'Выбрать приключение', video: 'Смотреть видео', label: 'В СВОЁМ РИТМЕ', heading: 'Три способа открыть океан',
    sub: 'Ваш первый заплыв, встреча с удивительными животными или знакомство с ночным рифом — выберите то, что вдохновляет вас.',
    cards: [
      { number: '01', title: 'Научиться снорклингу', body: 'Всё начинается с уверенности в воде. Разберёмся с маской, трубкой и ластами и освоим основы снорклинга, чтобы вы могли наслаждаться подводным миром в своём темпе.', image: '/images/generated/snorkeling-ocean.webp', alt: 'Иллюстрация: снорклер над тропическим рифом' },
      { number: '02', title: 'Манты и китовые акулы', body: 'Отправьтесь на поиски мант и китовых акул и наблюдайте за ними в их естественной среде. Каждая встреча с океаном уникальна: дикие животные и условия непредсказуемы.', image: '/images/maldives-manta-preview.jpg', alt: 'Манта под водой' },
      { number: '03', title: 'Ночной риф в синем свете', body: 'После заката риф раскрывается по-новому. Ночной снорклинг с синим светом приглашает увидеть подводный мир в совершенно другом свете.', image: '/images/generated/ocean-reef.webp', alt: 'Иллюстрация подводного рифа' },
    ], note: 'Встречи с животными не гарантированы. Условия, места проведения и доступность могут меняться.',
    banner: 'ВАШЕ СЛЕДУЮЩЕЕ ПРИКЛЮЧЕНИЕ', cta: 'Готовы заглянуть под воду?', ctaText: 'Расскажите, что вас вдохновляет, и мы поможем разобраться с возможностями.', button: 'Обсудить приключение', art: 'Изображения океана созданы с помощью ИИ и служат иллюстрациями.',
  } : {
    eyebrow: 'BELOW THE SURFACE · LOKAWNDR', title: 'The ocean starts here',
    intro: 'Take a breath, look beneath the surface and discover a world of coral, sunlight and marine life.',
    explore: 'Find your experience', video: 'Watch the video', label: 'AT YOUR OWN PACE', heading: 'Three ways to explore',
    sub: 'Whether it’s your first time in the water, a wildlife encounter or a reef after dark, there’s a new perspective waiting for you.',
    cards: [
      { number: '01', title: 'Learn to snorkel', body: 'It all starts with feeling comfortable in the water. Get to know your mask, snorkel and fins, learn the basics and discover the underwater world at your own pace.', image: '/images/generated/snorkeling-ocean.webp', alt: 'Illustration of a snorkeler above a tropical reef' },
      { number: '02', title: 'Mantas & whale sharks', body: 'Head out in search of manta rays and whale sharks and watch these remarkable animals in their natural world. Every ocean encounter is different: wildlife and conditions are unpredictable.', image: '/images/maldives-manta-preview.jpg', alt: 'Manta ray underwater' },
      { number: '03', title: 'The reef after dark', body: 'As the sun goes down, the reef reveals another side. A blue-light night snorkeling experience offers a different way to see the underwater world.', image: '/images/generated/ocean-reef.webp', alt: 'Illustration of an underwater reef' },
    ], note: 'Wildlife sightings are never guaranteed. Conditions, locations and availability may change.',
    banner: 'YOUR NEXT ADVENTURE', cta: 'Ready to look beneath the surface?', ctaText: 'Tell us what inspires you and we’ll help you explore the possibilities.', button: 'Plan your adventure', art: 'Ocean illustrations are AI-generated.',
  }
  return <><Header/><main lang={locale} className='bg-[#06283a] text-white'>
    <section className='relative isolate flex min-h-[520px] items-center overflow-hidden md:min-h-[630px]'>
      <Image src='/images/generated/snorkeling-ocean.webp' alt='' fill priority sizes='100vw' className='-z-20 object-cover object-[62%_center]'/>
      <div className='absolute inset-0 -z-10 bg-gradient-to-r from-[#021d30]/95 via-[#03273a]/75 to-[#03273a]/30'/>
      <div className='mx-auto w-full max-w-[1480px] px-6 py-20 md:px-10'><p className='text-xs font-bold tracking-[.2em] text-cyan-200'>{t.eyebrow}</p><h1 className='mt-5 max-w-3xl text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl'>{t.title}</h1><p className='mt-6 max-w-xl text-lg leading-8 text-slate-100'>{t.intro}</p><div className='mt-8 flex flex-wrap gap-3'><a href='#experiences' className='inline-flex min-h-12 items-center gap-2 rounded-xl bg-cyan-100 px-6 py-3 font-bold text-[#062536]'>{t.explore}<ArrowRight size={18}/></a><a href='https://www.youtube.com/watch?v=ZnC4xG3lMlk' target='_blank' rel='noopener noreferrer' className='inline-flex min-h-12 items-center gap-2 rounded-xl border border-white/60 px-6 py-3 font-semibold text-white'><Play size={16} aria-hidden='true'/>{t.video}</a></div></div>
    </section>
    <section id='experiences' className='mx-auto max-w-[1480px] scroll-mt-24 px-6 py-16 md:px-10 md:py-24'><p className='text-xs font-bold tracking-[.2em] text-cyan-200'>{t.label}</p><h2 className='mt-4 text-3xl font-bold tracking-tight md:text-5xl'>{t.heading}</h2><p className='mt-5 max-w-2xl text-lg leading-8 text-slate-200'>{t.sub}</p>
      <div className='mt-10 grid gap-6 md:grid-cols-3'>{t.cards.map(card=><article key={card.number} className='overflow-hidden rounded-3xl border border-white/15 bg-[#0b3448]'><div className='relative aspect-[4/3] overflow-hidden'><Image src={card.image} alt={card.alt} fill sizes='(max-width: 768px) 100vw, 33vw' className='object-cover'/></div><div className='p-7'><span className='text-sm font-bold tracking-widest text-cyan-200'>{card.number}</span><h3 className='mt-3 text-2xl font-bold'>{card.title}</h3><p className='mt-4 leading-7 text-slate-200'>{card.body}</p></div></article>)}</div><p className='mt-6 text-sm leading-6 text-slate-300'>{t.note}</p><p className='mt-2 text-xs leading-5 text-slate-400'>{t.art}</p>
      <div className='mt-14 rounded-3xl border border-cyan-200/20 bg-[#0a3c50] p-8 md:p-12'><p className='text-xs font-bold tracking-[.2em] text-cyan-200'>{t.banner}</p><h2 className='mt-4 text-3xl font-bold md:text-4xl'>{t.cta}</h2><p className='mt-4 max-w-2xl leading-7 text-slate-200'>{t.ctaText}</p><Link href={base+'/contact'} className='mt-6 inline-flex min-h-12 items-center gap-2 rounded-xl bg-cyan-100 px-6 py-3 font-bold text-[#062536]'>{t.button}<ArrowRight size={18}/></Link></div>
    </section>
  </main><Footer/></>
}
