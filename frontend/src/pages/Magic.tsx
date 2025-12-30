import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getDailyContent } from '../utils/dailyContent'
import '../styles/pageLayout.css'

type TrebolTipo = 3 | 4 | 5

export default function Magic() {
  const navigate = useNavigate()

  const [texto, setTexto] = useState<string | null>(null)
  const [locked, setLocked] = useState(false)
  const [loading, setLoading] = useState(true)

  const [mostrarTrebol, setMostrarTrebol] = useState(false)
  const [trebolTipo, setTrebolTipo] = useState<TrebolTipo | null>(null)

  const config = {
    key: 'magic',
    limit: 1,
    emptyMessage: 'El duende ya habló hoy.',
  }

  const elegirTrebol = (): TrebolTipo => {
    // ultra raro el de 5 hojas
    const r = Math.random()
    if (r < 0.05) return 5     // 5%
    if (r < 0.35) return 4     // 30%
    return 3                  // 65%
  }

  const cargarMensaje = async () => {
    setLoading(true)

    const result = await getDailyContent(config, async () => {
      const res = await fetch('/api/magic')
      return res.json()
    })

    if (result.locked) {
      setTexto(result.message ?? null)
      setLocked(true)

      // SOLO si ya habló hoy → preparar trébol
      const hoy = new Date().toDateString()
      const guardado = localStorage.getItem('trebol-magic')

      if (!guardado || JSON.parse(guardado).date !== hoy) {
        const tipo = elegirTrebol()
        localStorage.setItem(
          'trebol-magic',
          JSON.stringify({ date: hoy, tipo })
        )
        setTrebolTipo(tipo)
      } else {
        setTrebolTipo(JSON.parse(guardado).tipo)
      }

      // esperar 3s, ocultar texto y mostrar trébol
      setTimeout(() => {
        setTexto(null)
        setMostrarTrebol(true)

        // ocultar trébol tras 10s
        setTimeout(() => {
          setMostrarTrebol(false)
        }, 10000)
      }, 3000)

    } else if (result.data) {
      setTexto(result.data.message)
      setLocked(false)
    }

    setLoading(false)
  }

  useEffect(() => {
    setTexto('El bosque guarda silencio…')

    const timer = setTimeout(() => {
      cargarMensaje()
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="page-container">
      <h1 className="page-title">Mensaje</h1>

      {/* TEXTO */}
      {texto && (
        <p
          className={`page-text ${
            loading ? 'subtle' : locked ? 'muted fade-text' : 'fade-text'
          }`}
        >
          {texto}
        </p>
      )}

      {/* BOTÓN REINTENTAR */}
      {!locked && !loading && (
        <button className="page-button" onClick={cargarMensaje}>
          Escuchar otra vez
        </button>
      )}

      {/* TRÉBOL */}
      {mostrarTrebol && trebolTipo && (
        <div className="fade-text" style={{ marginTop: '2rem' }}>
          <img
            src={`/treboles/trebol-${trebolTipo}.png`}
            alt={`Trébol de ${trebolTipo} hojas`}
            style={{ width: '160px' }}
          />
          <p style={{ fontSize: '0.85rem', opacity: 0.7, marginTop: '0.5rem' }}>
            Has encontrado un trébol de {trebolTipo} hojas
          </p>
        </div>
      )}

      {/* VOLVER */}
      {!loading && (
        <button className="back-btn" onClick={() => navigate('/')}>
          ← Volver
        </button>
      )}
    </div>
  )
}









