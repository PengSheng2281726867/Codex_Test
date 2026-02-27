export type ThemeToken = {
  id: string
  name: string
  tokens: Record<`--${string}`, string>
}

export const themes: ThemeToken[] = [
  {
    id: 'minimal-light',
    name: '极简浅色',
    tokens: {
      '--bg-primary': '#f7f7f8',
      '--text-primary': '#111827',
      '--accent': '#3b82f6',
      '--card-opacity': '0.86',
      '--radius': '20px',
    },
  },
  {
    id: 'night-deep',
    name: '夜间深色',
    tokens: {
      '--bg-primary': '#0f172a',
      '--text-primary': '#e2e8f0',
      '--accent': '#38bdf8',
      '--card-opacity': '0.84',
      '--radius': '20px',
    },
  },
  {
    id: 'forest',
    name: '森系自然',
    tokens: {
      '--bg-primary': '#0b3d2e',
      '--text-primary': '#f0fdf4',
      '--accent': '#34d399',
      '--card-opacity': '0.82',
      '--radius': '20px',
    },
  },
]
