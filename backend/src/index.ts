import 'dotenv/config'
import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import { sql } from './db'

const app = new Hono()

app.get('/api/health', async (c) => {
  await sql`SELECT 1`
  return c.json({ ok: true })
})

app.get('/api/:tipo', async (c) => {
  const tipo = c.req.param('tipo')

  const rows = await sql`
    SELECT texto
    FROM frases
    WHERE categoria = ${tipo}
    ORDER BY random()
    LIMIT 1
  `

  if (rows.length === 0) {
    return c.json({ message: 'El duende guarda silencio hoy.' })
  }

  return c.json({ message: rows[0].texto })
})

serve({
  fetch: app.fetch,
  port: 3000,
})





