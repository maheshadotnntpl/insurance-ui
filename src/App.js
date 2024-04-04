import './App.css';
import { Navbar } from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import { CalculatePremium } from './components/CalculatePremium';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path='calculate-premium' element={
          <CalculatePremium />
        } />
      </Routes>
    </>
  );
}

export default App;
