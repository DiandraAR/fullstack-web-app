import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getRandomByCategory } from '../api/frasesApi'
import { getDailyContent } from '../utils/dailyContent'
import '../styles/pageLayout.css'

export default function Naughty() {
  const navigate = useNavigate()

  const [texto, setTexto] = useState<string | null>(null)
  const [locked, setLocked] = useState(false)
  const [justLocked, setJustLocked] = useState(false)
  const [loading, setLoading] = useState(true)

  const config = {
    key: 'naughty',
    limit: 3,
    emptyMessage: 'El duende sonríe, pero ya no dice más.',
  }

  const cargar = async () => {
    setLoading(true)

    const result = await getDailyContent(config, () =>
      getRandomByCategory('naughty')
    )

    if (result.locked) {
      setTexto(result.message || null)
      setLocked(true)
      setJustLocked(true)
    } else {
      setTexto(result.data?.message || null)
      setLocked(false)
      setJustLocked(true) // 👈 aparece desde el primero
    }

    setLoading(false)
  }

  useEffect(() => {
    setTexto('Se oye una risa baja…')

    const timer = setTimeout(() => {
      cargar()
    }, 1800)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="page-container">
      <h1 className="page-title">Susurro Travieso</h1>

      {texto && (
        <p
          className={`page-text fade-text ${
            loading ? 'subtle' : locked ? 'muted' : ''
          }`}
        >
          {texto}
        </p>
      )}

      {justLocked && (
        <button className="back-btn" onClick={() => navigate('/')}>
          ← Volver
        </button>
      )}

      {!locked && !loading && (
        <button className="page-button" onClick={cargar}>
          Otro susurro
        </button>
      )}
    </div>
  )
}


