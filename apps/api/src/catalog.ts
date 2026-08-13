import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import pg from 'pg'

export type Locale = 'ru' | 'en'
export type Country = { id: number; nameEn: string; nameRu: string; phoneCode: string }
export type Service = { code: string; nameEn: string; nameRu: string }

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..')
const sqlDir = path.join(root, 'database', 'seeds')
const countryRx = /VALUES \((\d+), '((?:[^']|'')*)', '((?:[^']|'')*)', '([^']+)'\)/g
const serviceRx = /VALUES \('([^']+)', '((?:[^']|'')*)', '((?:[^']|'')*)'\)/g
const unescapeSql = (value: string) => value.replace(/''/g, "'").trim()

function fallbackCountries(): Country[] {
  const sql = fs.readFileSync(path.join(sqlDir, 'countries_seed.sql'), 'utf8')
  return [...sql.matchAll(countryRx)].map(m => ({ id: +m[1], nameEn: unescapeSql(m[2]), nameRu: unescapeSql(m[3]), phoneCode: m[4] }))
}
function fallbackServices(): Service[] {
  const sql = fs.readFileSync(path.join(sqlDir, 'services_seed.sql'), 'utf8')
  return [...sql.matchAll(serviceRx)].map(m => ({ code: m[1], nameEn: unescapeSql(m[2]), nameRu: unescapeSql(m[3]) }))
}

const countriesFallback = fallbackCountries()
const servicesFallback = fallbackServices()
export const pool = process.env.DATABASE_URL ? new pg.Pool({ connectionString: process.env.DATABASE_URL }) : null

export async function countries(): Promise<Country[]> {
  if (!pool) return countriesFallback
  try {
    const { rows } = await pool.query('SELECT id, name_en, name_ru, phone_code FROM countries ORDER BY id')
    return rows.map(r => ({ id: r.id, nameEn: r.name_en, nameRu: r.name_ru, phoneCode: r.phone_code }))
  } catch { return countriesFallback }
}
export async function services(): Promise<Service[]> {
  if (!pool) return servicesFallback
  try {
    const { rows } = await pool.query('SELECT code, name_en, name_ru FROM services ORDER BY code')
    return rows.map(r => ({ code: r.code, nameEn: r.name_en, nameRu: r.name_ru }))
  } catch { return servicesFallback }
}
