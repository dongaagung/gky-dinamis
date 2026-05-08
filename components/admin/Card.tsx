import React from 'react'

interface CardProps {
  title: string
  value: string | number
  description?: string
  icon?: string
  accentColor?: string
  accentBg?: string
}

export function Card({ title, value, description, icon, accentColor = '#6366F1', accentBg = '#EEF2FF' }: CardProps) {
  return (
    <div
      style={{
        background: '#ffffff',
        borderRadius: '1rem',
        padding: '1.5rem',
        boxShadow: '0 1px 3px rgba(0,0,0,0.07), 0 1px 2px rgba(0,0,0,0.04)',
        border: '1px solid #F3F4F6',
        transition: 'box-shadow 0.2s ease',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div style={{ flex: 1 }}>
          <p
            style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              color: '#6B7280',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              margin: 0,
            }}
          >
            {title}
          </p>
          <p
            style={{
              fontSize: '2.25rem',
              fontWeight: 700,
              color: '#111827',
              margin: '0.5rem 0 0.25rem',
              lineHeight: 1,
              letterSpacing: '-0.025em',
            }}
          >
            {value}
          </p>
          {description && (
            <p style={{ fontSize: '0.8125rem', color: '#9CA3AF', margin: 0 }}>{description}</p>
          )}
        </div>
        {icon && (
          <div
            style={{
              width: '2.75rem',
              height: '2.75rem',
              borderRadius: '0.75rem',
              background: accentBg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.25rem',
              flexShrink: 0,
              color: accentColor,
            }}
          >
            {icon}
          </div>
        )}
      </div>
    </div>
  )
}
