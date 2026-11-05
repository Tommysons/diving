import type { Metadata } from 'next'
import LokaWndrAtlas from '@/components/LokaWndrAtlas'
export const metadata: Metadata = { title: 'Explore Earth | LokaWndr Atlas', description: 'Explore Koh Tao dive sites on the interactive LokaWndr Atlas.' }
export default function AtlasPage(){return <LokaWndrAtlas locale='en'/>}
