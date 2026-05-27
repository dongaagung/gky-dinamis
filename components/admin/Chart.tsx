'use client'

import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

interface ChartDataPoint {
  name: string
  value: number
}

interface ChartProps {
  data: ChartDataPoint[]
  title?: string
}

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) {
  if (!active || !payload?.length) return null
  return (
    <div
      style={{
        background: '#fff',
        border: '1px solid #E5E7EB',
        borderRadius: '0.75rem',
        padding: '0.625rem 0.875rem',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        fontSize: '0.8125rem',
      }}
    >
      <p style={{ color: '#6B7280', margin: '0 0 0.25rem', fontWeight: 500 }}>{label}</p>
      <p style={{ color: '#6366F1', margin: 0, fontWeight: 700, fontSize: '1rem' }}>
        {payload[0].value}
      </p>
    </div>
  )
}

export function Chart({ data, title }: ChartProps) {
  return (
    <div
      style={{
        background: '#ffffff',
        borderRadius: '1rem',
        padding: '1.5rem',
        boxShadow: '0 1px 3px rgba(0,0,0,0.07), 0 1px 2px rgba(0,0,0,0.04)',
        border: '1px solid #F3F4F6',
      }}
    >
      {title && (
        <h3
          style={{
            fontSize: '0.9375rem',
            fontWeight: 600,
            color: '#111827',
            margin: '0 0 1.5rem',
            letterSpacing: '-0.01em',
          }}
        >
          {title}
        </h3>
      )}
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
          <defs>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#818CF8" />
              <stop offset="100%" stopColor="#6366F1" />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="0" stroke="#F3F4F6" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 11, fill: '#9CA3AF', fontWeight: 500 }}
            axisLine={false}
            tickLine={false}
            dy={8}
          />
          <YAxis
            tick={{ fontSize: 11, fill: '#9CA3AF', fontWeight: 500 }}
            axisLine={false}
            tickLine={false}
            allowDecimals={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#E5E7EB', strokeWidth: 1.5 }} />
          <Line
            type="monotone"
            dataKey="value"
            stroke="url(#lineGradient)"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 5, fill: '#6366F1', strokeWidth: 2, stroke: '#fff' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
