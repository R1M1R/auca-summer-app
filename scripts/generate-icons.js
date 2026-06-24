/**
 * Generates PWA PNG icons from public/icon.svg (single source of truth).
 * Run: npm run generate:icons
 */
import sharp from 'sharp'
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = join(__dirname, '..', 'public')
const iconSvgPath = join(publicDir, 'icon.svg')

const OUTPUTS = [
  { file: 'icon-192x192.png', size: 192 },
  { file: 'icon-512x512.png', size: 512 },
  { file: 'apple-touch-icon.png', size: 180 },
]

async function main() {
  if (!existsSync(iconSvgPath)) {
    console.error('❌ Missing public/icon.svg')
    process.exit(1)
  }

  const svgBuffer = readFileSync(iconSvgPath)
  writeFileSync(join(publicDir, 'icon-source.svg'), svgBuffer.toString().trim())
  console.log('✓ icon-source.svg (copy of icon.svg)')

  for (const { file, size } of OUTPUTS) {
    const outPath = join(publicDir, file)
    await sharp(svgBuffer)
      .resize(size, size, { fit: 'cover' })
      .png({ compressionLevel: 9, quality: 100 })
      .toFile(outPath)
    console.log(`✓ ${file} (${size}×${size})`)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
