'use client'

import { TokenGenerator } from '@/components/tools/TokenGenerator'

export default function TokenGeneratorPage() {
  return (
    <div className="min-h-screen bg-dark pt-20 pb-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <TokenGenerator />
      </div>
    </div>
  )
}