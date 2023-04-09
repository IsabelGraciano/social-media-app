import Login from "./components/Login"
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Signup from "./components/Signup"
import HomePage from "./components/HomePage"
import Profile from "./components/Profile"
import Settings from "./components/Settings"

function App() {
  return (
    <Router>
      <div className='container p-2'>
        <Routes>
          <Route path='/signup' element={<Signup/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/home' element={<HomePage/>} />
          <Route path='/profile' element={<Profile/>} />
          <Route path='/settings' element={<Settings/>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
