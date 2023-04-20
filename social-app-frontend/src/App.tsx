import Login from "./components/Login"
import { useState } from "react"
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Signup from "./components/Signup"
import HomePage from "./components/HomePage"
import Profile from "./components/Profile"
import Settings from "./components/Settings"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div className='container p-2'>
        <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login setIsAuthenticated={setIsAuthenticated} />} />

          <Route
            path="/home"
            element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <HomePage />
            </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Profile />
            </ProtectedRoute>
            }
          />

          <Route
            path="/settings"
            element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Settings />
            </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;