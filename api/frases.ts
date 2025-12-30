import { Pool } from "pg"

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

export default async function handler(req, res) {
  try {
    const { categoria } = req.query

    let result

    if (categoria) {
      // una frase aleatoria por categoría
      result = await pool.query(
        "SELECT texto, categoria FROM frases WHERE categoria = $1 ORDER BY RANDOM() LIMIT 1",
        [categoria]
      )
    } else {
      // todas las frases (por si lo necesitas)
      result = await pool.query(
        "SELECT texto, categoria FROM frases ORDER BY id ASC"
      )
    }

    res.status(200).json(result.rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Error al cargar frases" })
  }
}

