import { Link } from 'react-router-dom'
import './Home.css'

export default function Home() {
  return (
    <div className="home-container">
      <h1 className="home-title">Mis Buenos Presagios</h1>

      <p className="home-subtitle">
      It's lucky season
      </p>

      <div className="home-buttons">
        <Link to="/magic">
          <button className="forest-btn">Mensaje</button>
        </Link>

        <Link to="/lucky">
          <button className="forest-btn">Augurios</button>
        </Link>

        <Link to="/naughty">
          <button className="forest-btn">Susurro Travieso</button>
        </Link>
      </div>
    </div>
  )
}



