import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import MainPage from './Pages/MainPage'
import SignUp from './Components/SignUp'
import SignIn from './Components/SignIn'
function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
