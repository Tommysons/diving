import Image from 'next/image'

const photos = [
  { en: 'Coral reef and small fish at Udhdhoo Reef', ru: 'Коралловый риф и мелкие рыбы на Udhdhoo Reef' },
  { en: 'Branching coral at Udhdhoo Reef', ru: 'Ветвистый коралл на Udhdhoo Reef' },
  { en: 'A school of fish in the blue water at Udhdhoo Reef', ru: 'Стая рыб в открытой воде у Udhdhoo Reef' },
  { en: 'Fish swimming above the reef slope at Udhdhoo Reef', ru: 'Рыбы над рифовым склоном на Udhdhoo Reef' },
  { en: 'Coral and sandy seabed at Udhdhoo Reef', ru: 'Кораллы и песчаное дно на Udhdhoo Reef' },
]

export function UdhdhooCover({ locale }: { locale: 'en' | 'ru' }) {
  return <div className='relative aspect-video overflow-hidden rounded-xl'><Image src='/images/dive-sites/udhdhoo/reef-1.webp' alt={photos[0][locale]} fill sizes='(max-width: 1024px) 100vw, 50vw' className='object-cover'/></div>
}

export function UdhdhooGallery({ locale }: { locale: 'en' | 'ru' }) {
  return <div className='mt-3 grid grid-cols-3 gap-2'>{photos.map((photo, i) => <a key={photo.en} href={`/images/dive-sites/udhdhoo/reef-${i + 1}.webp`} target='_blank' rel='noopener noreferrer' aria-label={`${photo[locale]} — ${locale === 'ru' ? 'открыть фотографию' : 'open photo'}`} className='relative aspect-square overflow-hidden rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200'><Image src={`/images/dive-sites/udhdhoo/reef-${i + 1}.webp`} alt={photo[locale]} fill sizes='(max-width: 1024px) 30vw, 15vw' className='object-cover'/></a>)}</div>
}
