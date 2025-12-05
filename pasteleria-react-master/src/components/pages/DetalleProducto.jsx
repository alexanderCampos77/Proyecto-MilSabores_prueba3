import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, ListGroup, Spinner, Alert, Button } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import { getProductoById } from '../../db.js';

function DetalleProducto({ agregarAlCarrito }) {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    getProductoById(id)
      .then(data => {
        setProducto(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Producto no encontrado.');
        setLoading(false);
        console.error(err);
      });
  }, [id]);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} style={{ color: i < rating ? '#ffc107' : '#e4e5e9', fontSize: '1.2em' }}>
          ⭐
        </span>
      );
    }
    return stars;
  };

  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-5">
        <Alert variant="danger">{error}</Alert>
        <Link to="/">Volver a Productos</Link>
      </Container>
    );
  }

  if (!producto) {
    return null;
  }

  return (
    <Container className="my-5">
      <Row>
        <Col md={6}>
          <img src={producto.imagen} alt={producto.nombre} className="img-fluid rounded shadow-sm" />
        </Col>
        <Col md={6}>
          <h2 className="font-pacifico">{producto.nombre}</h2>
          <div className="mb-3">
            {renderStars(producto.estrellas)}
            <span className="ms-2 text-muted">({producto.reseñas.length} reseñas)</span>
          </div>
          <p>{producto.descripcion}</p>
          <h4 className="text-price mb-4">${producto.precio.toLocaleString('es-CL')}</h4>
          <Button
            variant="success"
            className="btn-custom-brown w-100 mb-3"
            onClick={() => agregarAlCarrito(producto)}
           >
             Agregar al Carrito
          </Button>
          <Link to="/" className="btn btn-outline-secondary w-100">Volver a Productos</Link>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col>
          <h3 className="font-pacifico">Reseñas</h3>
          {producto.reseñas && producto.reseñas.length > 0 ? (
            <ListGroup>
              {producto.reseñas.map((reseña) => (
                <ListGroup.Item key={reseña.id} className="d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">{reseña.autor || 'Anónimo'}</div>
                    {reseña.comentario}
                  </div>
                  {reseña.estrellas && (
                    <span className="badge bg-warning rounded-pill">
                      {reseña.estrellas} ⭐
                    </span>
                  )}
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <p>Todavía no hay reseñas para este producto.</p>
          )}
        </Col>
      </Row>
       {}
    </Container>
  );
}

export default DetalleProducto;