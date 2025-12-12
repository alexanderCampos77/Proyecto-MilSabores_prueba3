import React, { useState } from 'react';
import { Container, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:9090/api/usuarios/login', {
        email: email,
        password: password
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        
        const usuarioRecibido = response.data.usuario || response.data;

        const usuarioData = {
            email: email,
            nombre: usuarioRecibido.nombre || email.split('@')[0], 
            id: usuarioRecibido.id,
            rol: usuarioRecibido.rol,
            edad: usuarioRecibido.edad
        };
        
        localStorage.setItem('usuario', JSON.stringify(usuarioData));

        window.location.href = "/"; 
      } else {
        setError('El servidor no devolvió un token.');
      }

    } catch (err) {
      console.error(err);
      setError('Credenciales incorrectas o error de conexión.');
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <div className="card p-4 shadow-sm">
            <h2 className="text-center mb-4 font-pacifico">Iniciar Sesión</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100 mt-3">Ingresar</Button>
            </Form>
            <div className="text-center mt-3">
              <small>¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link></small>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;