import { ImageResponse } from 'next/og'
import { profile } from '@/data/profile'

export const alt = `${profile.name} | ${profile.headline}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: 'linear-gradient(135deg, #090d14 0%, #0f1520 60%, #0b2a24 100%)',
          color: '#e6edf6',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 64,
              height: 64,
              borderRadius: 14,
              border: '2px solid rgba(52,211,153,0.6)',
              color: '#34d399',
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            GN
          </div>
          <div style={{ fontSize: 26, color: '#8b98ad' }}>gnicolaides.vercel.app</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 76, fontWeight: 800, letterSpacing: -2 }}>{profile.name}</div>
          <div style={{ fontSize: 40, color: '#34d399', marginTop: 12 }}>{profile.headline}</div>
        </div>
        <div style={{ display: 'flex', gap: 14, fontSize: 24, color: '#8b98ad' }}>
          {['Software', 'Security', 'DevOps', 'AI automation'].map(t => (
            <div key={t} style={{ display: 'flex', padding: '8px 18px', border: '1px solid #1f2a3c', borderRadius: 999 }}>
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  )
}
