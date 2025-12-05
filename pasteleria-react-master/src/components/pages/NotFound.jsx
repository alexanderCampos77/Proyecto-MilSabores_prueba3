import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <Container className="text-center my-5">
      <h1 className="display-1">404</h1>
      <h2>Página no encontrada</h2>
      <p>Lo sentimos, el pastel que buscas ya se lo comieron.</p>
      <Button as={Link} to="/" variant="primary" className="btn-custom-brown mt-3">
        Volver al Inicio
      </Button>
    </Container>
  );
}

export default NotFound;