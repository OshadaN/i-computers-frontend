import './App.css';
import HomePage from '../Pages/homePage';
import LoginPage from '../Pages/loginPage';
import RegisterPage from '../Pages/registerPage';
import AdminPage from '../Pages/adminPage';
import { Route, Routes } from 'react-router-dom';
import TestPage from '../Pages/testPage';

function App() {
  

  return(
    <div class="w-full h-screen">
      <Routes> 
          
          <Route path="/" element={<HomePage/>} />
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/admin/*" element={<AdminPage/>}/>
          <Route path="/test" element={<TestPage/>}/>


      </Routes>
      
    </div>
  )
}

export default App
