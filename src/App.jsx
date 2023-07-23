import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Main from './page/main'
import Register from './page/Register'
import Header from './components/Header'
import FindDev from './page/FindDev'
function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />}>
        <Route path="/" element={<FindDev />} />
        <Route path="upload" element={<Register />} />
      </Route>
    </Routes>
  )
}

export default App
