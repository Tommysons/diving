import ThailandExperience from '@/components/ThailandExperience'
export const metadata = { title: 'Thailand Scuba Diving Guide | LokaWndr', description: 'Explore the best-known diving destinations in Thailand, including Koh Tao, Sail Rock and Richelieu Rock.', alternates: { canonical: '/destinations/thailand', languages: { en: '/destinations/thailand', ru: '/ru/destinations/thailand' } } }
export default function ThailandPage() { return <ThailandExperience locale='en' /> }
