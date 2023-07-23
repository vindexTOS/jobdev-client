import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Main from './page/main'
function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
    </Routes>
  )
}

export default App