import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';

function Footer() {
  const instagramLink = "https://www.instagram.com/ladanesapasteleria/";
  const whatsappLink = "https://api.whatsapp.com/message/BZUVUFDCB2ION1?autoload=1&app_absent=0";

  return (
    <footer className="bg-light text-center text-lg-start mt-auto py-3">
      <Container className="p-4">
        <Row>
          <Col lg={6} md={12} className="mb-4 mb-md-0 text-center text-md-start">
            <h5 className="text-uppercase font-pacifico">Pastelería Mil Sabores</h5>
            <p>
              Endulzando tus momentos desde 1974.
            </p>
          </Col>
          <Col lg={3} md={6} className="mb-4 mb-md-0 text-center">
            <h5 className="text-uppercase">Enlaces</h5>
            <ul className="list-unstyled mb-0">
              <li>
                <Nav.Link as={Link} to="/" className="text-dark">Inicio</Nav.Link>
              </li>
              <li>
                <Nav.Link as={Link} to="/registro" className="text-dark">Registro</Nav.Link>
              </li>
              <li>
                 <Nav.Link as={Link} to="/contacto" className="text-dark">Contacto</Nav.Link>
              </li>
            </ul>
          </Col>
          <Col lg={3} md={6} className="mb-4 mb-md-0 text-center">
            <h5 className="text-uppercase">Síguenos</h5>
            <a href={instagramLink} target="_blank" rel="noopener noreferrer" className="btn btn-outline-dark btn-floating m-1" role="button">
              {} Instagram
            </a>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn btn-outline-dark btn-floating m-1" role="button">
              {} WhatsApp
            </a>
          </Col>
        </Row>
      </Container>
      <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © 2025 Pastelería Mil Sabores
      </div>
    </footer>
  );
}
import { Link } from 'react-router-dom';
export default Footer;