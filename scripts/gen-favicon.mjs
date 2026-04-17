import { writeFileSync } from 'node:fs'
import { deflateSync } from 'node:zlib'

const size = 256
const [r, g, b] = [0x6b, 0x53, 0x40]

const crcTable = (() => {
  const t = new Uint32Array(256)
  for (let i = 0; i < 256; i++) {
    let c = i
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    t[i] = c >>> 0
  }
  return t
})()

function crc32(buf) {
  let crc = 0xffffffff
  for (const byte of buf) crc = crcTable[(crc ^ byte) & 0xff] ^ (crc >>> 8)
  return (crc ^ 0xffffffff) >>> 0
}

function chunk(type, data) {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length, 0)
  const typeBuf = Buffer.from(type, 'ascii')
  const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0)
  return Buffer.concat([len, typeBuf, data, crc])
}

const ihdr = Buffer.alloc(13)
ihdr.writeUInt32BE(size, 0)
ihdr.writeUInt32BE(size, 4)
ihdr[8] = 8; ihdr[9] = 2; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0

const row = Buffer.alloc(1 + size * 3)
for (let i = 0; i < size; i++) {
  row[1 + i * 3] = r
  row[2 + i * 3] = g
  row[3 + i * 3] = b
}
const raw = Buffer.concat(Array(size).fill(row))
const idat = deflateSync(raw)

const png = Buffer.concat([
  Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
  chunk('IHDR', ihdr),
  chunk('IDAT', idat),
  chunk('IEND', Buffer.alloc(0)),
])

writeFileSync('public/favicon.png', png)
console.log(`wrote public/favicon.png (${png.length} bytes)`)
