import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Home({ agregarAlCarrito }) {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    axios.get('http://localhost:9090/api/productos')
      .then(response => {
        console.log("Datos recibidos del backend:", response.data);
        setProductos(response.data);
      })
      .catch(error => {
        console.error("Error conectando con el backend:", error);
      });
  }, []);

  const productosFiltrados = productos.filter(producto =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div>
      <div className="bg-light p-5 text-center mb-5">
        <Container>
          <h1 className="display-4 font-pacifico">¡Bienvenidos a Mil Sabores!</h1>
          <p className="lead">La mejor pastelería artesanal de la ciudad.</p>
        </Container>
      </div>

      <Container>
        <h2 className="my-4 font-pacifico">Nuestros Productos Frescos </h2>
        
        <Form className="mb-4">
            <Form.Control 
                type="text" 
                placeholder="Buscar pastel..." 
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
            />
        </Form>

        <Row>
          {productosFiltrados.map((producto) => (
            <Col key={producto.id} sm={6} md={4} lg={3} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Img 
                    variant="top" 
                    src={producto.imagen} 
                    alt={producto.nombre} 
                    style={{ height: '200px', objectFit: 'cover' }}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="h5">{producto.nombre}</Card.Title>
                  
                  <div className="mb-2">
                    <Badge bg="info">{producto.categoria?.nombre}</Badge>
                  </div>

                  <Card.Text>{producto.descripcion}</Card.Text>
                  
                  <h5 className="text-price mt-auto">${producto.precio.toLocaleString('es-CL')}</h5>
                </Card.Body>
                <Card.Footer className="d-flex flex-column gap-2">
                   <Button 
                        variant="success" 
                        className="w-100 btn-custom-brown"
                        onClick={() => agregarAlCarrito(producto)}
                    >
                    Agregar al Carrito
                  </Button>
                  <Link to={`/producto/${producto.id}`} className="w-100 btn btn-outline-secondary btn-sm">
                      Ver Detalles
                  </Link>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Home;