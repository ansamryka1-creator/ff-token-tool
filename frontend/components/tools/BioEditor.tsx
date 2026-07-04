'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Copy, Trash2, Bold, Italic, Underline, Send } from 'lucide-react'
import { toast } from 'sonner'
import { api, getApiErrorMessage } from '@/lib/api'

export function BioEditor() {
  const [content, setContent] = useState('')
  const [isBold, setIsBold] = useState(false)
  const [isItalic, setIsItalic] = useState(false)
  const [isUnderline, setIsUnderline] = useState(false)
  const [selectedColor, setSelectedColor] = useState('#a855f7')
  const [jwtToken, setJwtToken] = useState('')
  const [updating, setUpdating] = useState(false)

  const colors = [
    '#a855f7',
    '#0ea5e9',
    '#06b6d4',
    '#ec4899',
    '#f97316',
    '#ef4444',
  ]

  const getFormattedContent = () => {
    let formatted = content
    if (isBold) formatted = `**${formatted}**`
    if (isItalic) formatted = `*${formatted}*`
    if (isUnderline) formatted = `__${formatted}__`
    return formatted
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(getFormattedContent())
    toast.success('Bio copied to clipboard!')
  }

  const handleClear = () => {
    setContent('')
    setIsBold(false)
    setIsItalic(false)
    setIsUnderline(false)
    toast.success('Bio cleared')
  }

  const handleApplyToAccount = async () => {
    if (!jwtToken.trim()) {
      toast.error('Please enter your JWT token')
      return
    }
    if (!content.trim()) {
      toast.error('Bio is empty')
      return
    }
    setUpdating(true)
    try {
      const { data } = await api.bio.update(jwtToken.trim(), content)
      if (data.success) {
        toast.success(data.message || 'Bio updated on your account!')
      } else {
        toast.error(data.message || 'Failed to update bio')
      }
    } catch (error) {
      toast.error(getApiErrorMessage(error))
    } finally {
      setUpdating(false)
    }
  }

  const maxChars = 100
  const charCount = content.length

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Bio Editor</h1>
        <p className="text-gray-400 text-lg">Create and style your Free Fire bio</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="p-8">
          <h2 className="text-2xl font-bold mb-6">Editor</h2>

          <div className="mb-6 p-4 bg-card-bg rounded-lg border border-card-border flex flex-wrap gap-2">
            <button
              onClick={() => setIsBold(!isBold)}
              className={`p-2 rounded transition-all ${
                isBold
                  ? 'bg-accent-purple text-white'
                  : 'hover:bg-accent-purple/20 text-gray-400 hover:text-white'
              }`}
              title="Bold"
            >
              <Bold size={18} />
            </button>
            <button
              onClick={() => setIsItalic(!isItalic)}
              className={`p-2 rounded transition-all ${
                isItalic
                  ? 'bg-accent-purple text-white'
                  : 'hover:bg-accent-purple/20 text-gray-400 hover:text-white'
              }`}
              title="Italic"
            >
              <Italic size={18} />
            </button>
            <button
              onClick={() => setIsUnderline(!isUnderline)}
              className={`p-2 rounded transition-all ${
                isUnderline
                  ? 'bg-accent-purple text-white'
                  : 'hover:bg-accent-purple/20 text-gray-400 hover:text-white'
              }`}
              title="Underline"
            >
              <Underline size={18} />
            </button>

            <div className="flex gap-2 ml-auto">
              {colors.map(color => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-6 h-6 rounded transition-all ${
                    selectedColor === color ? 'ring-2 ring-white' : ''
                  }`}
                  style={{ backgroundColor: color }}
                  title={`Color: ${color}`}
                />
              ))}
            </div>
          </div>

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value.slice(0, maxChars))}
            placeholder="Enter your bio here..."
            className="w-full h-48 p-4 rounded-lg bg-card-bg border border-card-border text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-purple resize-none mb-4"
          />

          <div className="flex justify-between items-center text-sm text-gray-400 mb-6">
            <span>{charCount} / {maxChars} characters</span>
            <div className="w-24 h-2 bg-card-bg rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-accent-purple to-accent-blue transition-all"
                style={{ width: `${(charCount / maxChars) * 100}%` }}
              />
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={handleCopy}
              disabled={!content.trim()}
              className="flex-1 gap-2"
            >
              <Copy size={18} />
              Copy
            </Button>
            <Button
              onClick={handleClear}
              variant="secondary"
              className="flex-1 gap-2"
            >
              <Trash2 size={18} />
              Clear
            </Button>
          </div>
        </Card>

        <Card className="p-8">
          <h2 className="text-2xl font-bold mb-6">Live Preview</h2>

          <Card variant="glow" className="p-6 min-h-48 mb-6">
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-3">Your Bio</p>
              </div>
              <div
                className="text-lg text-center p-4 rounded-lg bg-dark border border-card-border"
                style={{
                  color: selectedColor,
                  fontWeight: isBold ? 'bold' : 'normal',
                  fontStyle: isItalic ? 'italic' : 'normal',
                  textDecoration: isUnderline ? 'underline' : 'none',
                }}
              >
                {content || 'Your formatted bio will appear here'}
              </div>
            </div>
          </Card>

          <div className="space-y-3 text-sm text-gray-400 mb-6">
            <div>
              <p className="font-semibold text-white mb-2">Applied Formatting:</p>
              <div className="flex flex-wrap gap-2">
                {isBold && <span className="px-2 py-1 bg-card-bg rounded">Bold</span>}
                {isItalic && <span className="px-2 py-1 bg-card-bg rounded">Italic</span>}
                {isUnderline && <span className="px-2 py-1 bg-card-bg rounded">Underline</span>}
                {!isBold && !isItalic && !isUnderline && <span className="px-2 py-1 bg-card-bg rounded text-gray-600">No formatting</span>}
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-card-border">
            <p className="font-semibold text-white mb-2">Apply to your account (optional)</p>
            <p className="text-xs text-gray-500 mb-3">
              Paste your Free Fire JWT token to push this bio directly to your account.
            </p>
            <Input
              type="password"
              placeholder="JWT token"
              value={jwtToken}
              onChange={(e) => setJwtToken(e.target.value)}
              className="mb-3 font-mono text-sm"
            />
            <Button
              onClick={handleApplyToAccount}
              disabled={updating || !content.trim()}
              className="w-full gap-2"
            >
              {updating ? (
                <>
                  <span className="inline-block w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Update Bio on Account
                </>
              )}
            </Button>
          </div>
        </Card>
      </div>
    </motion.div>
  )
}