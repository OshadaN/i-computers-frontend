import './App.css';
import HomePage from "./Pages/homePage";
import LoginPage from './Pages/loginPage';
import RegisterPage from './Pages/registerPage';
import AdminPage from './Pages/adminPage';
import { Route, Routes } from 'react-router-dom';
import TestPage from './Pages/testPage';
import toast, { Toaster } from 'react-hot-toast';
import { useState, useEffect } from 'react';
import api from './lib/api';
import UserContext from './context/userContext';
function App() {

  const [user, setUser] = useState(null)
  const [userLoadingFinished, setUserLoadingFinished] = useState(false);

  useEffect(
    () => {
      const token = localStorage.getItem("token")


      api.get("/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }).then((res) => {
        setUser(res.data.user)
        setUserLoadingFinished(true)

      }).catch(() => {
        toast.error("Please login again")
        localStorage.removeItem("token")
        setUser(null);
        setUserLoadingFinished(true)
      })
    }
    , []
  )

  return (

    <UserContext value={
      {
        user: user,
        setUser: setUser,
        userLoadingFinished: userLoadingFinished,
      }
    }>
      <div className="w-full h-screen bg-primary">
        <Toaster position='top-right' />

        <Routes>
          <Route path="/*" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin/*" element={<AdminPage />} />
          <Route path="/test" element={<TestPage />} />
        </Routes>
      </div>
    </UserContext>
  )
}

export default App
