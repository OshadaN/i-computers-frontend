import { Route, Routes } from 'react-router-dom';
import './App.css'
import ProductCard from '../Pages/productCard'
import HomePage from './pages/homePage';
import LoginPage from './pages/loginPage';
import RegisterPage from './pages/registerPage';

import { FaHome } from "react-icons/fa";

function App() {
  


  return(
    <div class="w-full h-screen border-2">
      <Routes> 
          
          <Route path="/" element={<HomePage/>} />
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/regsiter" element={<RegisterPage/>}/>

      </Routes>
      
    </div>
  )
}

export default App
