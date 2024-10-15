import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import MainPage from './Pages/MainPage'
import SignUp from './Components/SignUp'
import SignIn from './Components/SignIn'
import OtpVerify from './Components/OtpVerify'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/otp-verify/:id" element={<OtpVerify />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
