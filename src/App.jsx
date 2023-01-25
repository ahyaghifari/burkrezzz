import Header from './components/Header'
import Footer from './components/Footer'
import './App.css'
import './assets/css/style.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Burgers from './pages/Burgers'
import ViewBurgers  from './pages/burgers/ViewBurgers'
import NewBurgers from './pages/burgers/NewBurgers'
import EditBurgers from './pages/burgers/EditBurgers'
import About from './pages/About'
import EditAbout from './pages/about/EditAbout'
import Login from './pages/auth/Login'
import { useState, createContext, useContext } from 'react'
import ProtectedRoute from './service/ProtectedRoute'
import { auth } from './service/firebase'
import { onAuthStateChanged } from 'firebase/auth'

function App() {

  const [login, setLogin] = useState(false);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setLogin(true);
    }
  });

  return (
    <div className="App">
      <Header></Header>

      <Routes>
        <Route path="/" element={<Home />}></Route>

        <Route path='/burgers'>
          <Route index element={<Burgers login={login} />}></Route>
          <Route path=':id' element={<ViewBurgers login={login} />}></Route>
          <Route element={<ProtectedRoute login={login} />}>
            <Route path='new' element={<NewBurgers />}></Route>
            <Route path='edit/:id' element={<EditBurgers />}></Route>
          </Route>          
        </Route>
        
        <Route path='/about'>
          <Route index element={<About login={login} />}></Route>
          <Route element={<ProtectedRoute login={login} />}>
            <Route path='edit' element={<EditAbout />}></Route>
          </Route>
        </Route>
        
        <Route path='/login' element={<Login login={login} setLogin={setLogin} />}></Route>
        </Routes>

      <Footer login={login} setLogin={setLogin}></Footer>
    </div>
  )
}

export default App