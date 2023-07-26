import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Main from './page/Main'
import Register from './page/Register'
import FindDev from './page/FindDev'
import User from './page/User'
import IndividualDevFullInfo from './components/Saved_Dev_components/IndividualDevFullInfo'
function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />}>
        <Route path="/" element={<FindDev />} />
        <Route path="upload" element={<Register />} />
        <Route path="user" element={<User />} />
        <Route path="developer/:devId" element={<IndividualDevFullInfo />} />
      </Route>
    </Routes>
  )
}

export default App
