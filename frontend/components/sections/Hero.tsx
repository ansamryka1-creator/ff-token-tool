'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { ArrowRight, Zap } from 'lucide-react'

export function Hero() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-dark to-darker pt-32 pb-20 px-4 sm:px-6 lg:px-8 flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center space-y-6 sm:space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-card-border bg-card-bg/50 mx-auto"
          >
            <Zap size={16} className="text-accent-purple" />
            <span className="text-sm text-gray-300">Welcome to FF Token Tool</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight">
              <span className="gradient-text">Professional Tools</span>
              <br />
              <span className="text-white">For Free Fire Players</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Generate tokens, create stunning bios, and access our premium bio library. Fast, secure, and easy to use.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-center gap-4 mt-8"
          >
            <Link href="/tools/token-generator">
              <Button size="lg" className="w-full sm:w-auto group">
                Get Started
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="#features">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                Learn More
              </Button>
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="absolute top-40 right-10 w-64 h-64 bg-accent-purple/20 rounded-full blur-3xl -z-10"
          animate={{ y: [0, 30, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-40 left-10 w-80 h-80 bg-accent-blue/20 rounded-full blur-3xl -z-10"
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      </div>
    </section>
  )
}