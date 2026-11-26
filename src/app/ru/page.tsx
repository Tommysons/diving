import type { Metadata } from 'next'
import HomePage from '@/components/HomePage'
export const metadata:Metadata={title:"Дайвинг, снорклинг и океанские приключения",description:"Откройте подводный мир Таиланда и Мальдив с LokaWndr: дайвинг, снорклинг и истории из океана.",alternates:{canonical:'/ru',languages:{en:'/',ru:'/ru','x-default':'/'}},openGraph:{title:"Дайвинг, снорклинг и океанские приключения | LokaWndr",description:"Откройте подводный мир Таиланда и Мальдив с LokaWndr: дайвинг, снорклинг и истории из океана.",url:'/ru'}}
export default function Page(){return <HomePage/>}
