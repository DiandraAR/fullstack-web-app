export async function getRandomByCategory(categoria: string) {
  const res = await fetch(`/api/frases?categoria=${categoria}`)

  if (!res.ok) {
    throw new Error('Error del duende')
  }

  return res.json()
}

  