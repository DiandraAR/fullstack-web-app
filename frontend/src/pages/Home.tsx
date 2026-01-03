import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import './Home.css'

export default function Home() {
  const [mostrarDuende, setMostrarDuende] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    audioRef.current = new Audio('/sonidos/duende.mp3')
    audioRef.current.volume = 0.4

    let timeoutInicial: number
    let timeoutOcultar: number
    let timeoutAparecer: number

    const detenerAudio = () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }
    }

    // Intentos aleatorios con probabilidad
    const intentarMostrar = () => {
      const probabilidad = Math.random()

      if (probabilidad < 0.3) {
        setMostrarDuende(true)
        audioRef.current?.play().catch(() => {})

        timeoutOcultar = window.setTimeout(() => {
          setMostrarDuende(false)
          detenerAudio()
        }, 3000)
      }

      const siguiente = Math.random() * (15000 - 7000) + 7000
      timeoutAparecer = window.setTimeout(intentarMostrar, siguiente)
    }

    //Aparición inicial obligatoria
    timeoutInicial = window.setTimeout(() => {
      setMostrarDuende(true)
      audioRef.current?.play().catch(() => {})

      //Visible 3s
      timeoutOcultar = window.setTimeout(() => {
        setMostrarDuende(false)
        detenerAudio()

        //Empieza la probabilidad
        timeoutAparecer = window.setTimeout(intentarMostrar, 7000)
      }, 3000)
    }, 6000)

    return () => {
      clearTimeout(timeoutInicial)
      clearTimeout(timeoutOcultar)
      clearTimeout(timeoutAparecer)
      detenerAudio()
    }
  }, [])

  return (
    <div className="home-container">
      <h1 className="home-title">Mis Buenos Presagios</h1>

      <div className="home-subtitle-wrapper">
        {mostrarDuende && (
          <img
            src="/imagenes/duende.png"
            alt="Duende"
            className="home-duende visible"
          />
        )}

        <p className="home-subtitle">It's lucky season</p>
      </div>

      <div className="home-buttons">
        <Link to="/magic"><button className="forest-btn">Mensaje</button></Link>
        <Link to="/lucky"><button className="forest-btn">Augurios</button></Link>
        <Link to="/naughty"><button className="forest-btn">Susurro Travieso</button></Link>
      </div>
    </div>
  )
}










