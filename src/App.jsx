import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './page/Home';
import Editor from './page/Editor';
import Footer from './Components/Footer';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/editor/:roomId' element={<Editor />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
