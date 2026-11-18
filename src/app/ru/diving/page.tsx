import type { Metadata } from 'next'
import DivingOverview from '@/components/DivingOverview'
export const metadata: Metadata = { title: 'Дайвинг: фан-дайвинг или курсы | LokaWndr', description: 'Выберите фан-дайвинг для сертифицированных дайверов или обучение, включая Discover Scuba Diving (DSD) для новичков.' }
export default function Page(){return <DivingOverview locale='ru'/>}
