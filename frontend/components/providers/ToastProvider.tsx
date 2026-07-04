'use client'

import { ReactNode } from 'react'
import { Toaster } from 'sonner'

interface ToastProviderProps {
  children: ReactNode
}

export function ToastProvider({ children }: ToastProviderProps) {
  return (
    <>
      {children}

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
    </>
  )
}
