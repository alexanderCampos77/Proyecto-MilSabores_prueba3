import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav, Button, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function Header({ carrito = [] }) {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    } else {
      setUsuario(null);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    setUsuario(null);
    navigate('/login');
  };

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/" className="font-pacifico text-primary">
          🍰 Pastelería Mil Sabores
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/productos">Productos</Nav.Link>
            <Nav.Link as={Link} to="/contacto">Contacto</Nav.Link>
          </Nav>
          
          <Nav className="align-items-center gap-2">
            {usuario ? (
              <>
                <span className="text-muted fw-bold">Hola, {usuario.nombre}!</span>
                
                <Button variant="outline-info" size="sm" as={Link} to="/perfil" className="me-1">
                  👤 Mi Perfil
                </Button>

                <Button variant="outline-danger" size="sm" onClick={handleLogout}>
                  Salir
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline-primary" size="sm" as={Link} to="/login" className="me-2">
                  Iniciar Sesión
                </Button>
                <Button variant="primary" size="sm" as={Link} to="/registro">
                  Registrarse
                </Button>
              </>
            )}

            <Button variant="success" size="sm" as={Link} to="/carrito" className="ms-2">
              🛒 Carrito <Badge bg="light" text="dark">{carrito.length}</Badge>
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;