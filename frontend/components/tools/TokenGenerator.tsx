'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { Copy, Check } from 'lucide-react'
import { toast } from 'sonner'
import { api, getApiErrorMessage } from '@/lib/api'

type Mode = 'jwt' | 'eat' | 'guest'

const modes: { id: Mode; label: string; description: string }[] = [
  { id: 'jwt', label: 'Access → JWT', description: 'Extract a JWT from a Free Fire Access Token' },
  { id: 'eat', label: 'EAT → Access', description: 'Convert an EAT token (or login URL) to an Access Token' },
  { id: 'guest', label: 'Guest → Access', description: 'Get an Access Token from a guest account (UID + password)' },
]

interface ResultField {
  label: string
  value: string
}

export function TokenGenerator() {
  const [mode, setMode] = useState<Mode>('jwt')
  const [accessToken, setAccessToken] = useState('')
  const [eatToken, setEatToken] = useState('')
  const [uid, setUid] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<ResultField[] | null>(null)
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const resetInputs = () => {
    setResults(null)
  }

  const handleGenerate = async () => {
    setLoading(true)
    setResults(null)
    try {
      if (mode === 'jwt') {
        if (!accessToken.trim()) {
          toast.error('Please enter an Access Token')
          return
        }
        const { data } = await api.token.extractJwt(accessToken.trim())
        setResults([
          { label: 'JWT', value: data.jwt },
          { label: 'Access Token', value: data.accessToken },
          { label: 'Expiration', value: new Date(data.expiration).toLocaleString() },
        ])
      } else if (mode === 'eat') {
        if (!eatToken.trim()) {
          toast.error('Please enter an EAT token or URL')
          return
        }
        const { data } = await api.token.eatToAccess(eatToken.trim())
        setResults([
          { label: 'Access Token', value: data.access_token },
          { label: 'Account Name', value: data.account_name },
        ])
      } else {
        if (!uid.trim() || !password.trim()) {
          toast.error('Please enter both UID and password')
          return
        }
        const { data } = await api.token.guestToken(uid.trim(), password.trim())
        setResults([
          { label: 'Access Token', value: data.access_token },
          { label: 'Open ID', value: data.open_id },
        ])
      }
      toast.success('Done!')
    } catch (error) {
      toast.error(getApiErrorMessage(error))
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

  const activeMode = modes.find(m => m.id === mode)!

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">JWT / EAT Token Generator</h1>
        <p className="text-gray-400 text-lg">Generate and convert Free Fire tokens</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="p-8">
          <h2 className="text-2xl font-bold mb-6">Configuration</h2>

          <div className="mb-6">
            <label className="block text-sm font-semibold mb-3 text-accent-purple">Mode</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {modes.map(m => (
                <button
                  key={m.id}
                  onClick={() => {
                    setMode(m.id)
                    resetInputs()
                  }}
                  className={`p-3 rounded-lg border-2 transition-all text-sm font-semibold ${
                    mode === m.id
                      ? 'border-accent-purple bg-accent-purple/20'
                      : 'border-card-border hover:border-accent-purple/50'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-3">{activeMode.description}</p>
          </div>

          {mode === 'jwt' && (
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-3 text-accent-blue">Access Token</label>
              <textarea
                placeholder="Paste your Free Fire Access Token"
                value={accessToken}
                onChange={(e) => setAccessToken(e.target.value)}
                className="w-full h-32 p-4 rounded-lg bg-card-bg border border-card-border text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-purple resize-none font-mono text-sm"
              />
            </div>
          )}

          {mode === 'eat' && (
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-3 text-accent-blue">EAT Token or URL</label>
              <textarea
                placeholder="Paste your EAT token or login URL"
                value={eatToken}
                onChange={(e) => setEatToken(e.target.value)}
                className="w-full h-32 p-4 rounded-lg bg-card-bg border border-card-border text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-purple resize-none font-mono text-sm"
              />
            </div>
          )}

          {mode === 'guest' && (
            <div className="mb-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-3 text-accent-blue">UID</label>
                <Input
                  type="text"
                  placeholder="Account UID"
                  value={uid}
                  onChange={(e) => setUid(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-3 text-accent-blue">Password</label>
                <Input
                  type="password"
                  placeholder="Account password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          )}

          <Button
            onClick={handleGenerate}
            disabled={loading}
            size="lg"
            className="w-full"
          >
            {loading ? (
              <>
                <span className="inline-block w-4 h-4 mr-2 rounded-full border-2 border-white border-t-transparent animate-spin" />
                Processing...
              </>
            ) : (
              'Generate'
            )}
          </Button>
        </Card>

        <div className="space-y-4">
          {loading ? (
            <Card className="p-12 flex items-center justify-center min-h-96">
              <LoadingSpinner message="Contacting Free Fire servers..." />
            </Card>
          ) : results ? (
            results.map(field => (
              <Card key={field.label} className="p-6">
                <div className="space-y-1 mb-3">
                  <p className="text-xs text-gray-500 uppercase tracking-wide">{field.label}</p>
                  <p className="text-sm font-mono break-all text-accent-purple">{field.value}</p>
                </div>
                <button
                  onClick={() => handleCopy(field.value, field.label)}
                  className="flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-colors"
                >
                  {copiedField === field.label ? (
                    <><Check size={14} /> Copied</>
                  ) : (
                    <><Copy size={14} /> Copy</>
                  )}
                </button>
              </Card>
            ))
          ) : (
            <Card className="p-12 flex items-center justify-center min-h-96 border-dashed">
              <div className="text-center text-gray-500">
                <p>Results will appear here</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </motion.div>
  )
}
