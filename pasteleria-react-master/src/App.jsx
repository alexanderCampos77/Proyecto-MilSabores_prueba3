import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/pages/Home';
import RegisterPage from './components/pages/Registro'; 
import LoginPage from './components/pages/LoginPage';
import CarritoPage from './components/pages/CarritoPage'; 
import ProductPage from './components/pages/ProductPage';
import NotFound from './components/pages/NotFound';
import PerfilPage from './components/pages/PerfilPage';
import Contacto from './components/pages/Contacto';
import AdminPage from './components/pages/AdminPage';

function App() {
  const [carrito, setCarrito] = useState([]);
  const [usuarioActual, setUsuarioActual] = useState(null); 

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      setUsuarioActual(JSON.parse(usuarioGuardado));
    }
  }, []);

  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]);
    alert(`${producto.nombre} agregado al carrito! 🍰`);
  };

  const registrarUsuario = async (datosUsuario) => {
    try {
      await axios.post('http://localhost:9090/api/usuarios/registro', datosUsuario);
      alert("¡Cuenta creada exitosamente! Ahora puedes iniciar sesión.");
      window.location.href = "/login";
    } catch (error) {
      console.error("Error al registrar:", error);
      alert("Hubo un error al registrarse. Intenta con otro correo.");
    }
  };

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        
        <Header carrito={carrito} />

        <Routes>
          <Route path="/" element={<Home agregarAlCarrito={agregarAlCarrito} />} />
          
          <Route path="/registro" element={<RegisterPage registrarUsuario={registrarUsuario} />} />
          
          <Route path="/login" element={<LoginPage />} />
          
          <Route path="/carrito" element={<CarritoPage carrito={carrito} setCarrito={setCarrito} />} />
          
          <Route path="/perfil" element={<PerfilPage usuarioActual={usuarioActual} />} />
          
          <Route path="/contacto" element={<Contacto />} />

          <Route path="/admin" element={<AdminPage />} />
          
          <Route path="/producto/:id" element={<ProductPage agregarAlCarrito={agregarAlCarrito} />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;