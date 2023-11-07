import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import './App.css'
import LandingPage from './components/pages/LandingPage/LandingPage'
import HomePage from './components/pages/HomePage/HomePage'
import DriverDetail from './components/pages/DriverDetail/DriverDetail'
import CreateForm from './components/CreateForm/CreateForm'

function App() {
  
  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/drivers/:id' element={<DriverDetail />} />
        <Route path='/create' element={<CreateForm />} />
      </Routes>
    </>
  )
}

export default App
