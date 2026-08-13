import 'dotenv/config'
import fs from 'node:fs/promises'
import path from 'node:path'
import pg from 'pg'
if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is required')
const client = new pg.Client({ connectionString: process.env.DATABASE_URL }); await client.connect()
for (const file of ['schema.sql','seeds/countries_seed.sql','seeds/services_seed.sql']) await client.query(await fs.readFile(path.resolve('../../database', file), 'utf8'))
await client.end(); console.log('Database seeded')
