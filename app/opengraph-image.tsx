import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'
import { copy, site } from '@/lib/site'

export const alt = `WIMs — ${copy.heroTitle}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OpengraphImage() {
  const asset = async (...p: string[]) => `data:image/png;base64,${(await readFile(join(process.cwd(), 'public', ...p))).toString('base64')}`
  const [photo, globe] = await Promise.all([asset('wims-hero.png'), asset('brand', 'wims-globe.png')])
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', position: 'relative', background: '#000', color: '#fff', fontFamily: 'Arial, sans-serif' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photo} alt="" width={1200} height={630} style={{ position: 'absolute', top: 0, left: 0, width: 1200, height: 630, objectFit: 'cover', transform: 'scaleX(-1)' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, width: 1200, height: 630, display: 'flex', backgroundImage: 'linear-gradient(90deg, rgba(0,0,0,.92) 0%, rgba(0,0,0,.62) 52%, rgba(0,0,0,.1) 100%)' }} />
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', padding: 72 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 30, fontWeight: 700, letterSpacing: 2 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={globe} alt="" width={44} height={44} />WIMs
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', fontSize: 92, lineHeight: 1, letterSpacing: -2 }}>
            <span>{copy.heroLines[0]}</span>
            <span>{copy.heroLines[1]}</span>
          </div>
          <div style={{ display: 'flex', width: 620, borderTop: '1px solid rgba(201,164,92,.7)', paddingTop: 22, fontSize: 24, color: '#E8D5A6' }}>{site.legalName}</div>
        </div>
      </div>
    ),
    size,
  )
}
