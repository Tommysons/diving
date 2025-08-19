import CardsGrid from './CardsGrid'
import { cards, CardData } from '../lib/data'

interface DiveSitesSectionProps {
  onCardClick: (card: CardData) => void
}

export default function DiveSitesSection({
  onCardClick,
}: DiveSitesSectionProps) {
  const diveSites = cards.filter((card) => card.id === 'diveSites')

  const handleBooking = async (siteName: string) => {
    const name = prompt('Enter your name:')
    const email = prompt('Enter your email:')
    const phone = prompt('Enter your phone number:')
    const date = prompt('Enter date (YYYY-MM-DD):')
    const time = prompt('Enter time (HH:MM):')
    if (!name || !email || !phone || !date || !time)
      return alert('All fields are required!')

    const res = await fetch('/api/book', {
      method: 'POST',
      headers: { 'Content-Type:': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        phone,
        date,
        time,
        site: siteName,
        bookingType: 'dive_trip',
        message: '',
      }),
    })

    const data = await res.json()
    if (!res.ok) alert('Booking failed: ' + data.error)
    else alert('Booking successful!')
  }

  return (
    <section id='divesites' className='my-12'>
      <h2 className='text-3xl font-bold mb-6 text-center'>Dive Sites</h2>
      <CardsGrid cards={diveSites} onCardClick={onCardClick} />
    </section>
  )
}
