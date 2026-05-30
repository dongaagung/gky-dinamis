import React from 'react'

export function BeforeLogin() {
  return (
    <div
      style={{
        textAlign: 'center',
        padding: '2.25rem 2.25rem 1.25rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
      }}
    >
      {/* Logo */}
      <div
        style={{
          width: '76px',
          height: '76px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #EEF4FA, #D6E8F5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          border: '2px solid rgba(0, 94, 155, 0.18)',
          boxShadow: '0 4px 16px rgba(0, 94, 155, 0.12)',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo-gky.png"
          alt="GKY Balikpapan"
          width={56}
          height={56}
          style={{ objectFit: 'contain' }}
        />
      </div>

      {/* Church name */}
      <div>
        <h1
          style={{
            fontSize: '1.3125rem',
            fontWeight: 700,
            color: '#005E9B',
            margin: 0,
            letterSpacing: '-0.02em',
          }}
        >
          GKY Balikpapan
        </h1>
        <p
          style={{
            fontSize: '0.8125rem',
            color: '#6B7280',
            margin: '0.25rem 0 0',
            fontWeight: 400,
          }}
        >
          Portal Admin Gereja
        </p>
      </div>

      {/* Divider */}
      <div
        style={{
          width: '100%',
          height: '1px',
          background: 'linear-gradient(to right, transparent, #D1E4F0, transparent)',
        }}
      />
    </div>
  )
}
