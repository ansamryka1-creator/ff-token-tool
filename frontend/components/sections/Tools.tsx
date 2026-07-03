'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ArrowRight, Lock, Edit3, Library } from 'lucide-react'

const tools = [
  {
    icon: Lock,
    title: 'JWT/EAT Generator',
    description: 'Generate access tokens from Google, Facebook, VK, Huawei, Apple and more.',
    href: '/tools/token-generator',
    color: 'from-accent-purple to-neon-purple',
  },
  {
    icon: Edit3,
    title: 'Bio Editor',
    description: 'Create and style beautiful bios with formatting options and live preview.',
    href: '/tools/bio-editor',
    color: 'from-accent-blue to-accent-cyan',
  },
  {
    icon: Library,
    title: 'Bio Library',
    description: 'Access thousands of pre-made bio templates ready to copy and use.',
    href: '/tools/bio-library',
    color: 'from-accent-cyan to-accent-purple',
  },
]

export function Tools() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Our Tools</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">Explore our collection of powerful utilities</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {tools.map((tool, index) => {
            const Icon = tool.icon
            return (
              <motion.div key={index} variants={itemVariants}>
                <Link href={tool.href}>
                  <Card className="h-full p-8 hover:border-accent-purple/50 transition-all cursor-pointer group">
                    <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${tool.color} p-0.5 mb-6 group-hover:shadow-glow-purple transition-all`}>
                      <div className="w-full h-full rounded-lg bg-card-bg flex items-center justify-center">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold mb-3 group-hover:text-accent-purple transition-colors">
                      {tool.title}
                    </h3>
                    <p className="text-gray-400 mb-6 leading-relaxed">{tool.description}</p>

                    <div className="flex items-center text-accent-purple group-hover:gap-2 transition-all">
                      <span className="font-semibold">Explore</span>
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Card>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}