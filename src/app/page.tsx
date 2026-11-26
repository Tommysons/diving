import type { Metadata } from 'next'
import HomePage from '@/components/HomePage'
export const metadata:Metadata={title:"Scuba Diving, Snorkeling & Ocean Adventures",description:"Explore scuba diving, snorkeling, marine life and real ocean stories from Thailand and the Maldives with LokaWndr.",alternates:{canonical:'/',languages:{en:'/',ru:'/ru','x-default':'/'}},openGraph:{title:"Scuba Diving, Snorkeling & Ocean Adventures | LokaWndr",description:"Explore scuba diving, snorkeling, marine life and real ocean stories from Thailand and the Maldives with LokaWndr.",url:'/'}}
export default function Page(){return <HomePage/>}
