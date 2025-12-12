import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function PerfilPage() {
  const navigate = useNavigate();
  const usuarioStorage = localStorage.getItem('usuario');
  const usuario = usuarioStorage ? JSON.parse(usuarioStorage) : null;

  if (!usuario) {
    return (
      <Container className="my-5 text-center">
        <h2>No has iniciado sesión 🔒</h2>
        <Button variant="primary" className="mt-3" onClick={() => navigate('/login')}>
          Ir al Login
        </Button>
      </Container>
    );
  }

  const ocultarCorreo = (email) => {
    if (!email) return '';
    const parteNombre = email.split('@')[0]; 
    return `${parteNombre}****`; 
  };

  return (
    <Container className="my-5">
      <Card className="shadow p-4 border-0" style={{ maxWidth: '500px', margin: '0 auto' }}>
        <Card.Body className="text-center">
          <h2 className="mb-4 font-pacifico text-primary">Mi Perfil</h2>
          
          <div className="mb-4">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" 
              alt="Avatar" 
              className="rounded-circle shadow-sm mb-3"
              style={{ width: '120px', backgroundColor: '#f8f9fa' }}
            />
            
            <h3 className="fw-bold">
              {usuario.nombre} 
              {usuario.edad ? <span className="text-muted fs-5 ms-2">({usuario.edad} años)</span> : ''}
            </h3>
            
            <p className="text-muted fs-5">
              📧 {ocultarCorreo(usuario.email)}
            </p>
            
            <span className="badge bg-secondary">{usuario.rol}</span>
          </div>

          <hr className="my-4" />

          <div className="d-grid gap-3">
            <Button variant="success" size="lg" onClick={() => navigate('/carrito')}>
              🛒 Ir a mi Carrito
            </Button>
            
            <Button variant="outline-danger" onClick={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('usuario');
                navigate('/login');
            }}>
              Cerrar Sesión
            </Button>
          </div>

        </Card.Body>
      </Card>
    </Container>
  );
}

export default PerfilPage;