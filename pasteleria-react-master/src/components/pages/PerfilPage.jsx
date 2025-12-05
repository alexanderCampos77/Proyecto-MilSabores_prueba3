import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function PerfilPage({ usuarioActual }) {
  if (!usuarioActual) {
    return (
      <Container className="my-5 text-center">
        <h2>No has iniciado sesión</h2>
        <p>Por favor ingresa para ver tu perfil.</p>
        <Button as={Link} to="/login" variant="primary">Ir al Login</Button>
      </Container>
    );
  }

  return (
    <Container className="my-5 d-flex justify-content-center">
      <Card style={{ width: '100%', maxWidth: '500px' }} className="shadow">
        <Card.Header className="bg-custom-brown text-white text-center">
          <h3>Mi Perfil</h3>
        </Card.Header>
        <Card.Body className="text-center">
          <img 
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" 
            alt="Avatar" 
            style={{ width: '120px', marginBottom: '20px' }}
          />
          <h4>{usuarioActual.nombre}</h4>
          <p className="text-muted">{usuarioActual.email}</p>
          <hr />
          <div className="d-grid gap-2">
            <Button variant="outline-secondary" as={Link} to="/carrito">Ver mi Carrito</Button>
            <Button variant="danger" as={Link} to="/">Volver al Inicio</Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default PerfilPage;