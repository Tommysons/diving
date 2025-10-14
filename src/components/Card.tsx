import Image from 'next/image'
import { CardData } from '../lib/data'

interface CardProps {
  card: CardData
  onClick: (card: CardData) => void
}

export default function Card({ card, onClick }: CardProps) {
  return (
    <div
      onClick={() => onClick(card)}
      className='
cursor-pointer
        rounded-lg
        shadow-lg
        overflow-hidden
        bg-white
        hover:scale-105
        transform
        transition-transform
        duration-300
        flex
        flex-col
        h-full
        w-96
      '
      style={{ minWidth: 0 }}
    >
      <div className='relative w-full h-48'>
        <Image
          src={card.image}
          alt={card.title}
          fill
          style={{ objectFit: 'cover' }}
          loading='lazy'
          sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
        />
      </div>
      <div className='p-4 flex-grow flex flex-col justify-center'>
        <h3 className='text-xl font-semibold mb-2'>{card.title}</h3>
        <p className='text-gray-600'>{card.shortDesc}</p>
      </div>
    </div>
  )
}
