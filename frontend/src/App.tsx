import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Magic from './pages/Magic'
import Lucky from './pages/Lucky'
import Naughty from './pages/Naughty'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/magic" element={<Magic />} />
        <Route path="/lucky" element={<Lucky />} />
        <Route path="/naughty" element={<Naughty />} />
      </Routes>
    </BrowserRouter>
  )
}










