'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { Copy, Check } from 'lucide-react'
import { toast } from 'sonner'

const platforms = [
  { id: 'google', label: 'Google', color: 'from-red-500 to-yellow-500' },
  { id: 'facebook', label: 'Facebook', color: 'from-blue-600 to-blue-800' },
  { id: 'vk', label: 'VK', color: 'from-blue-500 to-indigo-600' },
  { id: 'huawei', label: 'Huawei', color: 'from-red-600 to-orange-500' },
  { id: 'apple', label: 'Apple', color: 'from-gray-400 to-black' },
  { id: 'twitter', label: 'Twitter', color: 'from-blue-400 to-blue-600' },
]

interface TokenResult {
  accessToken: string
  jwt: string
  uid: string
  expiration: string
}

export function TokenGenerator() {
  const [selectedPlatform, setSelectedPlatform] = useState<string>('google')
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<TokenResult | null>(null)
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const handleGenerate = async () => {
    if (!url.trim()) {
      toast.error('Please enter a valid URL')
      return
    }

    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setResult({
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
        jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ',
        uid: 'FF_1234567890',
        expiration: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      })
      toast.success('Token generated successfully!')
    } catch (error) {
      toast.error('Failed to generate token. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    toast.success('Copied to clipboard!')
    setTimeout(() => setCopiedField(null), 2000)
  }

  const handleCopyAll = () => {
    if (!result) return
    const allText = `Access Token: ${result.accessToken}\n\nJWT: ${result.jwt}\n\nUID: ${result.uid}\n\nExpiration: ${result.expiration}`
    navigator.clipboard.writeText(allText)
    toast.success('All tokens copied to clipboard!')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">JWT/EAT Token Generator</h1>
        <p className="text-gray-400 text-lg">Generate access tokens from multiple platforms</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="p-8">
          <h2 className="text-2xl font-bold mb-6">Configuration</h2>
          
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-3 text-accent-purple">Select Platform</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {platforms.map(platform => (
                <button
                  key={platform.id}
                  onClick={() => setSelectedPlatform(platform.id)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    selectedPlatform === platform.id
                      ? 'border-accent-purple bg-accent-purple/20'
                      : 'border-card-border hover:border-accent-purple/50'
                  }`}
                >
                  <span className="text-sm font-semibold">{platform.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold mb-3 text-accent-blue">Account URL</label>
            <Input
              type="url"
              placeholder="https://example.com/account"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
            />
          </div>

          <Button
            onClick={handleGenerate}
            disabled={loading}
            size="lg"
            className="w-full"
          >
            {loading ? (
              <>
                <span className="inline-block w-4 h-4 mr-2 rounded-full border-2 border-white border-t-transparent animate-spin" />
                Generating...
              </>
            ) : (
              'Generate Token'
            )}
          </Button>
        </Card>

        <div className="space-y-4">
          {loading ? (
            <Card className="p-12 flex items-center justify-center min-h-96">
              <LoadingSpinner message="Generating tokens..." />
            </Card>
          ) : result ? (
            <>
              <Button
                onClick={handleCopyAll}
                variant="secondary"
                className="w-full gap-2"
                size="md"
              >
                <Copy size={18} />
                Copy All
              </Button>

              <Card className="p-6">
                <div className="space-y-1 mb-3">
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Access Token</p>
                  <p className="text-sm font-mono break-all text-accent-purple">{result.accessToken}</p>
                </div>
                <button
                  onClick={() => handleCopy(result.accessToken, 'accessToken')}
                  className="flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-colors"
                >
                  {copiedField === 'accessToken' ? (
                    <><Check size={14} /> Copied</>
                  ) : (
                    <><Copy size={14} /> Copy</>
                  )}
                </button>
              </Card>

              <Card className="p-6">
                <div className="space-y-1 mb-3">
                  <p className="text-xs text-gray-500 uppercase tracking-wide">JWT</p>
                  <p className="text-sm font-mono break-all text-accent-blue">{result.jwt}</p>
                </div>
                <button
                  onClick={() => handleCopy(result.jwt, 'jwt')}
                  className="flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-colors"
                >
                  {copiedField === 'jwt' ? (
                    <><Check size={14} /> Copied</>
                  ) : (
                    <><Copy size={14} /> Copy</>
                  )}
                </button>
              </Card>

              <Card className="p-6">
                <div className="space-y-1 mb-3">
                  <p className="text-xs text-gray-500 uppercase tracking-wide">UID</p>
                  <p className="text-sm font-mono break-all text-accent-cyan">{result.uid}</p>
                </div>
                <button
                  onClick={() => handleCopy(result.uid, 'uid')}
                  className="flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-colors"
                >
                  {copiedField === 'uid' ? (
                    <><Check size={14} /> Copied</>
                  ) : (
                    <><Copy size={14} /> Copy</>
                  )}
                </button>
              </Card>

              <Card className="p-6 border-orange-500/30">
                <div className="space-y-1 mb-3">
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Expiration</p>
                  <p className="text-sm font-mono break-all text-orange-400">
                    {new Date(result.expiration).toLocaleString()}
                  </p>
                </div>
              </Card>
            </>
          ) : (
            <Card className="p-12 flex items-center justify-center min-h-96 border-dashed">
              <div className="text-center text-gray-500">
                <p>Generate a token to see results here</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </motion.div>
  )
}
