'use client'

import { Toaster } from 'sonner'

export function ToastProvider() {
  return (
    <Toaster
      position="bottom-right"
      theme="dark"
      toastOptions={{
        style: {
          background: '#0f1629',
          border: '1px solid #1a2a4a',
          color: '#fff',
        },
      }}
    />
  )
}