'use client'

import Link from 'next/link'
import { Heart, Mail, Github } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-card-border bg-darker/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold gradient-text mb-2">FF Token Tool</h3>
            <p className="text-gray-400 text-sm">Professional utilities for Free Fire players</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-accent-purple">Tools</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/tools/token-generator" className="hover:text-white transition-colors">Token Generator</Link></li>
              <li><Link href="/tools/bio-editor" className="hover:text-white transition-colors">Bio Editor</Link></li>
              <li><Link href="/tools/bio-library" className="hover:text-white transition-colors">Bio Library</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-accent-blue">Contact Owner</h4>
            <div className="flex gap-4">
              <a href="mailto:contact@example.com" className="p-2 rounded-lg hover:bg-card-bg transition-all" title="Email">
                <Mail size={20} />
              </a>
              <a href="#" className="p-2 rounded-lg hover:bg-card-bg transition-all" title="GitHub">
                <Github size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-card-border pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <p>© {currentYear} FF Token Tool. All rights reserved.</p>
            <div className="flex items-center gap-1">
              Made with <Heart size={16} className="text-red-500" /> by Developers
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}