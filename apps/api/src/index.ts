import 'dotenv/config'
import crypto from 'node:crypto'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { rateLimit } from 'express-rate-limit'
import { articles, reviews } from './content.js'
import { countries, pool, services } from './catalog.js'
import { simulateNumbers } from './simulation.js'

const app = express()
const port = Number(process.env.API_PORT || 4000)
app.set('trust proxy', 1)
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }))
app.use(cors({ origin: true }))
app.use(express.json({ limit: '32kb' }))
app.use((_req, res, next) => { res.set('Cache-Control', 'public, max-age=30, stale-while-revalidate=60'); next() })

app.get('/health', (_req, res) => res.json({ status: 'ok', database: pool ? 'configured' : 'seed-fallback' }))
app.get('/catalog/countries', async (_req, res) => res.json(await countries()))
app.get('/catalog/services', async (_req, res) => res.json(await services()))
app.get('/catalog/countries/:id', async (req, res) => {
  const all = await countries(); const country = all.find(c => c.id === Number(req.params.id))
  if (!country) return res.status(404).json({ error: 'Country not found' })
  res.json(country)
})
app.get('/catalog/services/:code', async (req, res) => {
  const all = await services(); const service = all.find(s => s.code === req.params.code)
  if (!service) return res.status(404).json({ error: 'Service not found' })
  res.json(service)
})
app.get('/numbers', async (req, res) => {
  const [allCountries, allServices] = await Promise.all([countries(), services()])
  const country = allCountries.find(c => c.id === Number(req.query.country)) || allCountries[0]
  res.json(simulateNumbers(country, allServices))
})
app.get('/numbers/:id', async (req, res) => {
  const [countryId] = req.params.id.split('-'); const [allCountries, allServices] = await Promise.all([countries(), services()])
  const country = allCountries.find(c => c.id === Number(countryId)); if (!country) return res.status(404).json({ error: 'Number not found' })
  const number = simulateNumbers(country, allServices).find(n => n.id === req.params.id)
  if (!number) return res.status(410).json({ error: 'Number expired' }); res.json(number)
})
app.get('/content/articles', (_req, res) => res.json(articles))
app.get('/content/articles/:slug', (req, res) => { const item = articles.find(a => a.slug === req.params.slug); item ? res.json(item) : res.status(404).json({ error: 'Article not found' }) })
app.get('/content/reviews', (_req, res) => res.json(reviews))

const media = new Set(['premium_page','premium_card','number_expired','sms_timeout','header','footer','api_access'])
const redirectLimit = rateLimit({ windowMs: 60_000, limit: 30, standardHeaders: 'draft-8', legacyHeaders: false })
app.get('/go/:medium', redirectLimit, async (req, res) => {
  const medium = Array.isArray(req.params.medium) ? req.params.medium[0] : req.params.medium
  if (!media.has(medium)) return res.status(400).json({ error: 'Unknown medium' })
  const target = process.env.PARTNER_URL || 'https://simdrop.me/'
  try { new URL(target) } catch { return res.status(500).json({ error: 'Invalid premium destination' }) }
  if (pool) void pool.query('INSERT INTO redirect_events(medium, locale, referer, ip_hash) VALUES($1,$2,$3,$4)', [medium, req.query.lang, req.get('referer'), crypto.createHash('sha256').update(`${req.ip}:${process.env.IP_HASH_SALT || 'local'}`).digest('hex')]).catch(() => {})
  res.set('Cache-Control', 'no-store').redirect(302, target)
})
app.use((_req, res) => res.status(404).json({ error: 'Not found' }))
app.listen(port, () => console.log(`API listening on http://localhost:${port}`))
