'use client'
import Header from '../components/Header'
import Footer from '../components/Footer'
import HeroSection from '@/components/hero/HeroSection'
import WhySection from '@/components/sections/WhySection'
import PathSection from '@/components/sections/PathSection'
import BlogSection from '@/components/sections/BlogSection'
import useLocale from '@/hooks/useLocale'

export default function HomePage() {
  const locale = useLocale()

  return (
    <>
      <Header />

      <main>
        <HeroSection locale={locale} />
        <WhySection locale={locale} />
        <PathSection locale={locale} />
        <BlogSection locale={locale} />
      </main>

      <Footer />
    </>
  )
}
