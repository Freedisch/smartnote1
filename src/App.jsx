import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Audio from './Audio'
import Note from './Note';
import Summary from './Summary';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Audio />} />
      <Route path='/notes' element={<Note />} />
      <Route path='/questions' element={<Summary />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App
