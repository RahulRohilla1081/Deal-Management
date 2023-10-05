import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Upload from './pages/Upload'
import Registration from './pages/Registration_form'

function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Upload/>} />
    <Route path='/resg' element={<Registration />} />
   </Routes>
   </BrowserRouter>
  )
}

export default App