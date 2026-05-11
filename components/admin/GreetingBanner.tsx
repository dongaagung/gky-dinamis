'use client'

import React, { useEffect, useState } from 'react'

interface Props {
  userName: string
}

function getGreeting(hour: number): { text: string; emoji: string; bg: string } {
  if (hour >= 5 && hour < 11)
    return { text: 'Selamat Pagi', emoji: '☀️', bg: 'linear-gradient(135deg, #F59E0B 0%, #EF4444 60%, #EC4899 100%)' }
  if (hour >= 11 && hour < 15)
    return { text: 'Selamat Siang', emoji: '🌤️', bg: 'linear-gradient(135deg, #3B82F6 0%, #6366F1 60%, #8B5CF6 100%)' }
  if (hour >= 15 && hour < 19)
    return { text: 'Selamat Sore', emoji: '🌅', bg: 'linear-gradient(135deg, #F97316 0%, #EF4444 50%, #7C3AED 100%)' }
  return { text: 'Selamat Malam', emoji: '🌙', bg: 'linear-gradient(135deg, #1E1B4B 0%, #312E81 50%, #4338CA 100%)' }
}

export function GreetingBanner({ userName }: Props) {
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    setNow(new Date())
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const hour = now?.getHours() ?? 12
  const { text: greetingText, emoji, bg } = getGreeting(hour)

  const dateStr = now?.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }) ?? '—'

  const timeStr = now?.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }) ?? '—'

  return (
    <div
      style={{
        position: 'relative',
        background: bg,
        borderRadius: '1rem',
        padding: '2rem',
        overflow: 'hidden',
        color: '#fff',
        boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
        minHeight: '268px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      {/* Decorative blobs */}
      <div
        style={{
          position: 'absolute',
          top: '-3rem',
          right: '-3rem',
          width: '13rem',
          height: '13rem',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.08)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-4rem',
          right: '4rem',
          width: '16rem',
          height: '16rem',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.05)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '1rem',
          left: '-2rem',
          width: '8rem',
          height: '8rem',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.04)',
          pointerEvents: 'none',
        }}
      />

      {/* Watermark cross */}
      <div
        style={{
          position: 'absolute',
          bottom: '0.5rem',
          right: '1.5rem',
          fontSize: '9rem',
          opacity: 0.07,
          lineHeight: 1,
          userSelect: 'none',
          pointerEvents: 'none',
          fontWeight: 700,
        }}
      >
        ✝
      </div>

      {/* Top: greeting */}
      <div>
        <div style={{ fontSize: '2.75rem', lineHeight: 1, marginBottom: '0.75rem' }}>
          {emoji}
        </div>
        <p
          style={{
            fontSize: '1rem',
            fontWeight: 500,
            color: 'rgba(255,255,255,0.72)',
            margin: '0 0 0.25rem',
            letterSpacing: '0.01em',
          }}
        >
          {greetingText},
        </p>
        <h2
          style={{
            fontSize: '1.75rem',
            fontWeight: 800,
            color: '#fff',
            margin: 0,
            letterSpacing: '-0.03em',
            textShadow: '0 1px 8px rgba(0,0,0,0.15)',
          }}
        >
          {userName} 👋
        </h2>
      </div>

      {/* Bottom: timestamp */}
      <div>
        <div
          style={{
            width: '2.5rem',
            height: '2px',
            background: 'rgba(255,255,255,0.3)',
            marginBottom: '0.875rem',
            borderRadius: '9999px',
          }}
        />
        <p
          style={{
            fontSize: '1.5rem',
            color: '#fff',
            margin: '0 0 0.25rem',
            fontWeight: 700,
            letterSpacing: '0.04em',
            fontVariantNumeric: 'tabular-nums',
            textShadow: '0 1px 6px rgba(0,0,0,0.2)',
          }}
        >
          {timeStr}
        </p>
        <p
          style={{
            fontSize: '0.8125rem',
            color: 'rgba(255,255,255,0.65)',
            margin: 0,
            fontWeight: 500,
          }}
        >
          {dateStr}
        </p>
      </div>
    </div>
  )
}
