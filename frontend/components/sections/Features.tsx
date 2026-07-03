'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { Zap, Zag, BookOpen, Shield, Smartphone, Rocket } from 'lucide-react'

const features = [
  {
    icon: Zap,
    title: 'Fast Generation',
    description: 'Generate tokens in milliseconds with our optimized algorithms',
  },
  {
    icon: Shield,
    title: 'Secure & Safe',
    description: 'Your data is encrypted and never stored on our servers',
  },
  {
    icon: Smartphone,
    title: 'Mobile First',
    description: 'Perfect experience on all devices, from mobile to desktop',
  },
  {
    icon: BookOpen,
    title: 'Bio Library',
    description: 'Access thousands of pre-made bios ready to use',
  },
  {
    icon: Zag,
    title: 'Easy Editor',
    description: 'Powerful bio editor with real-time preview',
  },
  {
    icon: Rocket,
    title: 'Modern Design',
    description: 'Beautiful cyberpunk interface with smooth animations',
  },
]

export function Features() {
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-darker/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text">Why Choose Us?</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">Everything you need for Free Fire in one platform</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full p-6 sm:p-8 hover:border-accent-purple/50 transition-all group">
                  <div className="mb-4 p-3 w-fit rounded-lg bg-card-bg group-hover:bg-accent-purple/10 transition-all">
                    <Icon className="w-6 h-6 text-accent-purple" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}