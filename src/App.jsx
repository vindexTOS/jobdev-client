import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Main from './page/Main'
import Register from './page/Register'
import FindDev from './page/FindDev'
import User from './page/User'
import IndividualDevFullInfo from './components/Saved_Dev_components/IndividualDevFullInfo'
import MyResume from './page/MyResume'
function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />}>
        <Route path="/" element={<FindDev />} />
        <Route path="upload" element={<Register />} />
        <Route path="myprofile" element={<User />} />
        <Route path="developer/:devId" element={<IndividualDevFullInfo />} />
        <Route path="user/:devId" element={<MyResume />} />
      </Route>
    </Routes>
  )
}

export default App
