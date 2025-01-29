import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Create from './components/create'
import Read from './components/Read'
import View from './components/View'
import Settlement from './components/Settlement'


function App() {
 

  return (
   <>
   <BrowserRouter>
   <Navbar/>
   <Routes>
    <Route exact path='/' element={<Create/>}/>
    <Route path='/read' element={<Read/>}/>
    <Route path='/view' element={<View/>}/>
    <Route path='/analytics' element={<Settlement/>}/>
   
   </Routes>
   </BrowserRouter>
   
   </>
  )
}

export default App
