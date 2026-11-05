import type { Metadata } from 'next'
import LokaWndrAtlas from '@/components/LokaWndrAtlas'
export const metadata: Metadata = { title: 'Исследовать Землю | LokaWndr Atlas', description: 'Исследуйте дайв-сайты Ко Тао в интерактивном атласе LokaWndr.' }
export default function AtlasPage(){return <LokaWndrAtlas locale='ru'/>}
