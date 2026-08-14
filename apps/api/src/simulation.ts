import type { Country, Service } from './catalog.js'

const hash = (input: string) => [...input].reduce((h, c) => Math.imul(h ^ c.charCodeAt(0), 16777619) >>> 0, 2166136261)
const rng = (seed: number) => () => ((seed = Math.imul(seed, 1664525) + 1013904223 >>> 0) / 4294967296)
const pick = <T>(items: T[], random: () => number) => items[Math.floor(random() * items.length)]

export function numberId(countryId: number, index: number, now = Date.now()) {
  const window = Math.floor(now / 3_600_000)
  return `${countryId}-${window.toString(36)}-${index}`
}
export function simulateNumbers(country: Country, serviceList: Service[], now = Date.now()) {
  return Array.from({ length: 8 }, (_, index) => {
    const id = numberId(country.id, index, now)
    const random = rng(hash(id))
    const digits = Array.from({ length: 9 }, () => Math.floor(random() * 10)).join('')
    const createdAt = new Date(Math.floor(now / 3_600_000) * 3_600_000 + index * 22_000)
    const expiresAt = new Date(createdAt.getTime() + 3_600_000)
    const count = 2 + Math.floor(random() * 7)
    const messages = Array.from({ length: count }, (_, msgIndex) => {
      const service = pick(serviceList.slice(0, Math.min(serviceList.length, 120)), random)
      const code = String(100000 + Math.floor(random() * 900000))
      return {
        id: `${id}-${msgIndex}`,
        serviceCode: service.code,
        serviceName: service.nameEn,
        text: `${service.nameEn}: verification code ${code}. Do not share this code.`,
        receivedAt: new Date(now - msgIndex * 240_000 - random() * 90_000).toISOString()
      }
    })
    return { id, phone: `${country.phoneCode} ${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`, countryId: country.id, status: random() > .22 ? 'active' : 'busy', createdAt: createdAt.toISOString(), expiresAt: expiresAt.toISOString(), messages }
  })
}
