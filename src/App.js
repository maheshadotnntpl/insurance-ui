import './App.css';
import { Navbar } from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import { CalculatePremium } from './components/CalculatePremium';
import { Login } from './components/Login';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './utils/auth';
import {RequireAuth} from './utils/RequireAuth';

function App() {
  return (
    <>
    <AuthProvider>
      <ToastContainer />
      <Navbar />
      <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/login' element={<Login />} />
        <Route path='calculate-premium' element={
          <RequireAuth>
          <CalculatePremium />
          </RequireAuth>
        } />
      </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
