import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/connexion/Login'
import Register from './pages/connexion/Register'
import PublierTrajet from './pages/PublierTrajet'
import Results from './pages/Results'
import PaymentPage from './pages/PaymentPage'


function App() {
 

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/publier-trajet' element={<PublierTrajet/>}/>
        <Route path="/results" element={<Results />} />   
        <Route path="/payment" element={<PaymentPage />} /> {/* Nouvelle route */}
      </Routes>
    </div>
  )
}

export default App
