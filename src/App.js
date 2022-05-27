import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css'
import { AuthProvider } from './context/AuthContext'
import Home from "./pages/home/Home";
import About from "./pages/about/about";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import CreatePost from './pages/createPost/CreatePost'
import Dashboard from "./pages/dashboard/Dashboard";

import {onAuthStateChanged} from "firebase/auth"
import { useState, useEffect } from "react"
import useAuthentication from "./hooks/useAuthentication"
import Search from "./pages/search/Search";
import Post from "./pages/post/Post";
//pages

function App() {
  

  const [user, setUser] = useState(undefined)
  const {auth} = useAuthentication()

  const loadingUser = user === undefined
  
  useEffect(() => {

    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
  }, [auth])

  if (loadingUser) {
    return (<p> Loading...</p>)
  }


  return (
    <div className="App">
      <AuthProvider value={ {user}}>
        <BrowserRouter>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/search" element={<Search />} />
               <Route path="/posts/:id" element={<Post />} />
              <Route path="/login" element={!user ? <Login /> : <Navigate  to='/' /> }/>
              <Route path="/register" element={!user ? <Register /> : <Navigate  to='/' /> } />
              <Route path='/posts/create' element={user ? <CreatePost/> : <Navigate  to='/login' /> } />
              <Route path= '/dashboard' element={user ? <Dashboard /> : <Navigate  to='/login' /> } />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    
    </div>
  );
}

export default App;
