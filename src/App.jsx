import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Audio from './Audio'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Audio />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App
