import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CartWidget from './CartWidget.jsx'; // <--- ¡AQUÍ ESTABA EL ERROR, YA CORREGIDO!

function Header({ carrito, usuario, cerrarSesion }) {
  return (
    <Navbar bg="light" expand="lg" className="shadow-sm mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src="/images/Captura de pantalla 2025-09-03 172212.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="Logo Pastelería Mil Sabores"
          />
          {' '}
          Pastelería Mil Sabores
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/">Productos</Nav.Link>
            {!usuario && <Nav.Link as={Link} to="/registro">Registro</Nav.Link>}
            <Nav.Link as={Link} to="/contacto">Contacto</Nav.Link>
          </Nav>
          <Nav className="align-items-center">
            {usuario ? (
              <>
                <Navbar.Text className="me-3">
                  Hola, {usuario.nombre}!
                </Navbar.Text>
                 <Button as={Link} to="/perfil" variant="outline-info" className="me-3">
                  Mi Perfil
                 </Button>
                <Button variant="outline-secondary" onClick={cerrarSesion} className="me-3">
                  Cerrar Sesión
                </Button>
              </>
            ) : (
              <>
                <Button as={Link} to="/login" variant="outline-primary" className="me-2 mb-2 mb-lg-0">
                  Iniciar Sesión
                </Button>
                <Button as={Link} to="/registro" variant="primary" className="me-3 mb-2 mb-lg-0">
                  Crear Cuenta
                </Button>
              </>
            )}
             <CartWidget carrito={carrito} />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;