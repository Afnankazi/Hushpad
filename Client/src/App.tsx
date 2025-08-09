import  {} from 'react'
import Header from './Components/Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Landingpage from './pages/Landingpage'
import Login from './pages/Login'
import Signup from './pages/Signup'
import MyNotes from './pages/MyNotes'
import CreateNotes from "./pages/CreateNotes"
import Protectedroutes from './Components/Protectedroutes'
import Contact from './pages/Contact'
import About from './pages/About'
function App() {
  return (
    <div className="dark">
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path='/' element={<Landingpage/>}  />
          <Route path='/login' element={<Login/>}  />
          <Route path='/signup' element={<Signup/>}  />
          <Route path='/contact' element={<Contact/>}  />
           <Route path='/about' element={<About/>}  />




          <Route path='/notes' element={<Protectedroutes>  <MyNotes/>  </Protectedroutes>}  />
          <Route path='/create-notes' element={<Protectedroutes>  <CreateNotes/>  </Protectedroutes>}  />

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
