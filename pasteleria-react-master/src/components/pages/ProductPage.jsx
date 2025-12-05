import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Button, Badge } from 'react-bootstrap';
import axios from 'axios';

function ProductPage({ agregarAlCarrito }) {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:9090/api/productos/${id}`)
      .then(res => setProducto(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!producto) return <Container className="my-5"><h2>Cargando...</h2></Container>;

  return (
    <Container className="my-5">
      <Button as={Link} to="/" variant="outline-secondary" className="mb-4">
        ← Volver
      </Button>
      <Row>
        <Col md={6}>
          <img 
            src={producto.imagen} 
            alt={producto.nombre} 
            className="img-fluid rounded shadow" 
          />
        </Col>
        <Col md={6}>
          <h1 className="font-pacifico">{producto.nombre}</h1>
          <div className="mb-3">
             <Badge bg="info">{producto.categoria?.nombre}</Badge>
          </div>
          <p className="lead">{producto.descripcion}</p>
          <h3 className="text-price my-4">${producto.precio.toLocaleString('es-CL')}</h3>
          <Button 
            variant="success" 
            size="lg" 
            className="btn-custom-brown"
            onClick={() => agregarAlCarrito(producto)}
          >
            Agregar al Carrito
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductPage;