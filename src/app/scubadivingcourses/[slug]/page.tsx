import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { scubaCourses, specialtyCourses } from '@/lib/data/scubaCourses'
const courses = [...scubaCourses, ...specialtyCourses]
export function generateStaticParams(){return courses.map(course=>({slug:course.slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
 const {slug}=await params
 const course=courses.find(c=>c.slug===slug)
 if(!course)notFound()
 const en='/scubadivingcourses/'+slug
 const ru='/ru'+en
 const canonical=en
 return {title:course.name,description:course.description,alternates:{canonical,languages:{en,ru,'x-default':en}},openGraph:{title:course.name+' | LokaWndr',description:course.description,url:canonical,images:[course.image]}}
}
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import ScubaCourseDetailClient from '@/components/ScubaCourseDetailClient'

export default async function Page({params}:{params:Promise<{slug:string}>}) {
 const {slug}=await params
 if(!courses.some(c=>c.slug===slug))notFound()
  return (
    <>
      <Header />
      <ScubaCourseDetailClient lang='en' />
      <Footer />
    </>
  )
}
