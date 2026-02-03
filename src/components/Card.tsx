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
        rounded-2xl
        shadow-lg
        overflow-hidden
        bg-white
        transition-transform
        duration-300
        active:scale-[0.98]
        hover:scale-[1.02]
        flex
        flex-col
        h-full
        w-full
        mx-auto
      '
      style={{ minWidth: 0 }}
    >
      {/* IMAGE */}
      <div className='relative w-full h-52 flex items-center justify-center'>
        <Image
          src={card.image}
          alt={card.title}
          fill
          className='object-cover'
          loading='lazy'
          sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
        />
      </div>

      {/* CONTENT */}
      <div className='p-5 flex-grow flex flex-col justify-center items-center text-center'>
        <h3 className='text-xl font-semibold mb-2'>{card.title}</h3>

        <p className='text-gray-600 text-sm sm:text-base'>{card.shortDesc}</p>
      </div>
    </div>
  )
}
