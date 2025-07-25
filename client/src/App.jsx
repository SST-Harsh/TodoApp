import './App.css'
import Main_Page from './Pages/Main_Page'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
 

  return (
    <>
     <Router>
      <Routes>
        <Route path="/" element={<Main_Page />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
