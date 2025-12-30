export async function getRandomByCategory(categoria: string) {
    const res = await fetch(`/api/${categoria}`)
    if (!res.ok) {
      throw new Error('Error del duende')
    }
    return res.json()
  }
  