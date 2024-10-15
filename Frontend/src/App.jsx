import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import MainPage from './Pages/MainPage'
import SignUp from './Components/SignUp'
import SignIn from './Components/SignIn'
import OtpVerify from './Components/OtpVerify'
import { io } from 'socket.io-client';
const socket = io('http://localhost:8000', { transports: ['websocket'] });
console.log("socket is:", socket);

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/logo/:id" element={<MainPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/otp-verify/:id" element={<OtpVerify />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
