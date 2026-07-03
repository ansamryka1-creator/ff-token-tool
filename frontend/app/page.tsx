'use client'

import { Hero } from '@/components/sections/Hero'
import { Features } from '@/components/sections/Features'
import { Tools } from '@/components/sections/Tools'
import { CTA } from '@/components/sections/CTA'
import { Footer } from '@/components/layout/Footer'

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Tools />
      <CTA />
      <Footer />
    </>
  )
}