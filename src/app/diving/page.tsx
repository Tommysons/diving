import type { Metadata } from 'next'
import DivingOverview from '@/components/DivingOverview'
export const metadata: Metadata = { title: 'Diving: Fun Dives or Courses | LokaWndr', description: 'Choose guided fun diving for certified divers or scuba training, including Discover Scuba Diving (DSD) for beginners.' }
export default function Page(){return <DivingOverview locale='en'/>}
