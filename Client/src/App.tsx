import  {} from 'react'
import Header from './Components/Header'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import Landingpage from './pages/Landingpage'
import Login from './pages/Login'
import Signup from './pages/Signup'
import MyNotes from './pages/MyNotes'
import Protectedroutes from './Components/Protectedroutes'
function App() {
  return (
    <div className="dark">
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path='/' element={<Landingpage/>}  />
          <Route path='/login' element={<Login/>}  />
          <Route path='/signup' element={<Signup/>}  />
          <Route path='/notes' element={<Protectedroutes>  <MyNotes/>  </Protectedroutes>}  />

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
