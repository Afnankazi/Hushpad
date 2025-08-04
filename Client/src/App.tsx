import  {} from 'react'
import Header from './Components/Header'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import Landingpage from './pages/Landingpage'
function App() {
  return (
    <div className="dark">
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path='/' element={<Landingpage/>}  />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
