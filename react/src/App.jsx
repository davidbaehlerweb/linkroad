import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/connexion/Login'
import Register from './pages/connexion/Register'
import PublierTrajet from './pages/PublierTrajet'


function App() {
 

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/publier-trajet' element={<PublierTrajet/>}/>
      </Routes>
    </div>
  )
}

export default App
