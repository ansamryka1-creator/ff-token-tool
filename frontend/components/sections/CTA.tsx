'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Mail } from 'lucide-react'

export function CTA() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-darker/50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card className="p-8 sm:p-12 text-center border-accent-purple/30 hover:border-accent-purple/50 transition-all">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Need Help or Have Questions?</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto text-lg">Get in touch with our team to discuss your needs or report any issues.</p>
            <a href="mailto:contact@example.com">
              <Button size="lg" className="gap-2">
                <Mail size={20} />
                Contact Owner
              </Button>
            </a>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}