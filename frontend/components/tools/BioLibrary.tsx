'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Copy, Check } from 'lucide-react'
import { toast } from 'sonner'
import { api } from '@/lib/api'
import type { BioResponse } from '@/types/api'

const FALLBACK_BIOS: BioResponse[] = [
  { id: 1, text: '★ 𝐊𝐢𝐥𝐥𝐞𝐫 ★ | FF Player | 💀', category: 'Gaming' },
  { id: 2, text: '🎮 Pro Gamer 🎮 | Always Online | 🔥', category: 'Gaming' },
  { id: 3, text: '✨ Aesthetic Bio ✨ | Dreamer | 💫', category: 'Aesthetic' },
  { id: 4, text: '👑 King of FF 👑 | Never Surrender | 🏆', category: 'Gaming' },
  { id: 5, text: '🌙 Night Owl 🌙 | Chill Vibes | ✨', category: 'Chill' },
  { id: 6, text: '⚡ Lightning Fast ⚡ | Speed Demon | 🚀', category: 'Gaming' },
  { id: 7, text: '🎭 Creative Soul 🎭 | Artist | 🎨', category: 'Creative' },
  { id: 8, text: '💎 Diamond Player 💎 | Legendary | 👑', category: 'Gaming' },
  { id: 9, text: '🌸 Flower Power 🌸 | Nature Lover | 🌺', category: 'Aesthetic' },
  { id: 10, text: '🔥 Fire Keeper 🔥 | Hot Shots | 💥', category: 'Gaming' },
  { id: 11, text: '🎵 Music Lover 🎵 | Vibe Check | 🎶', category: 'Creative' },
  { id: 12, text: '🌊 Ocean Breeze 🌊 | Chill Mode | 🏖️', category: 'Aesthetic' },
]

export function BioLibrary() {
  const [bios, setBios] = useState<BioResponse[]>(FALLBACK_BIOS)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [copiedId, setCopiedId] = useState<number | null>(null)

  useEffect(() => {
    api.bio
      .getLibrary()
      .then(({ data }) => {
        if (Array.isArray(data) && data.length > 0) setBios(data)
      })
      .catch(() => {
        // Keep the fallback list if the backend is unreachable.
      })
  }, [])

  const categories = ['All', ...Array.from(new Set(bios.map(b => b.category)))]

  const filteredBios = selectedCategory === 'All'
    ? bios
    : bios.filter(bio => bio.category === selectedCategory)

  const handleCopy = (text: string, id: number) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    toast.success('Bio copied to clipboard!')
    setTimeout(() => setCopiedId(null), 2000)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Bio Library</h1>
        <p className="text-gray-400 text-lg">Explore and copy pre-made bio templates</p>
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg transition-all ${
              selectedCategory === category
                ? 'bg-accent-purple text-white shadow-glow-purple'
                : 'bg-card-bg text-gray-300 hover:text-white border border-card-border'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {filteredBios.map(bio => (
          <motion.div key={bio.id} variants={itemVariants}>
            <Card className="p-6 h-full flex flex-col justify-between group hover:border-accent-purple/50 transition-all">
              <div className="mb-4">
                <div className="text-sm text-gray-500 mb-2 uppercase tracking-wide">
                  {bio.category}
                </div>
                <p className="text-lg font-semibold text-white group-hover:text-accent-purple transition-colors mb-3">
                  {bio.text}
                </p>
              </div>

              <Button
                onClick={() => handleCopy(bio.text, bio.id)}
                variant="secondary"
                className="w-full gap-2"
                size="sm"
              >
                {copiedId === bio.id ? (
                  <>
                    <Check size={16} />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    Copy
                  </>
                )}
              </Button>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {filteredBios.length === 0 && (
        <Card className="p-12 text-center">
          <p className="text-gray-400">No bios found in this category</p>
        </Card>
      )}
    </motion.div>
  )
}