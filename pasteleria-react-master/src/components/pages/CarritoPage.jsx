import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CarritoPage({ carrito, setCarrito }) {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }
  }, []);

  const calcularTotal = () => {
    return carrito.reduce((sum, item) => sum + item.precio, 0);
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const eliminarItem = (indexToDelete) => {
    const nuevoCarrito = carrito.filter((_, index) => index !== indexToDelete);
    setCarrito(nuevoCarrito);
  };

  const handleComprar = async () => {
    const token = localStorage.getItem('token');
    const usuarioStorage = localStorage.getItem('usuario');

    if (!token || !usuarioStorage) {
      alert('Debes iniciar sesión para comprar.');
      navigate('/login'); 
      return;
    }

    if (carrito.length === 0) {
      alert("El carrito está vacío");
      return;
    }

    const usuarioObj = JSON.parse(usuarioStorage);

    try {
      const datosCompra = {
        usuarioId: usuarioObj.id,
        email: usuarioObj.email,
        total: calcularTotal(),
        items: carrito.map(prod => ({ 
            id: prod.id, 
            nombre: prod.nombre, 
            precio: prod.precio 
        })) 
      };

      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };

      await axios.post('http://localhost:9090/api/compras', datosCompra, config);
      const nombreMostrar = usuarioObj.nombre ? usuarioObj.nombre : "Cliente";
      
      alert(`¡Compra Exitosa! 🎉\nMuchas gracias ${nombreMostrar}, tu pedido ha sido registrado.`);
      
      vaciarCarrito();
      navigate('/'); 

    } catch (error) {
      console.error("Error al comprar:", error);
      alert("Hubo un error al procesar tu compra. Revisa que el Backend esté encendido.");
    }
  };

  return (
    <Container className="my-5">
      <h2 className="font-pacifico text-center mb-4">🛒 Tu Carrito de Compras</h2>
      
      {carrito.length === 0 ? (
        <Alert variant="info" className="text-center shadow-sm">
            <h4>Tu carrito está vacío 😢</h4>
            <p>¡Nuestras tortas te están esperando!</p>
            <Button variant="outline-primary" onClick={() => navigate('/')}>Ir a la Tienda</Button>
        </Alert>
      ) : (
        <>
          <Table striped bordered hover responsive className="shadow-sm align-middle">
            <thead className="table-dark text-center">
              <tr>
                <th>Imagen</th>
                <th>Producto</th>
                <th>Precio</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {carrito.map((item, index) => (
                <tr key={index}>
                  <td className="text-center" style={{width: '120px'}}>
                    {}
                    <img 
                        src={item.imagen} 
                        alt={item.nombre}
                        onError={(e) => { e.target.src = 'https://via.placeholder.com/80?text=Sin+Foto'; }} 
                        style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }} 
                    />
                  </td>
                  <td className="fw-bold">{item.nombre}</td>
                  <td className="text-success fw-bold">${item.precio.toLocaleString('es-CL')}</td>
                  <td className="text-center">
                    {}
                    <Button 
                        variant="outline-danger" 
                        size="sm" 
                        onClick={() => eliminarItem(index)}
                        title="Eliminar este producto"
                    >
                      🗑️ Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="card p-4 mt-4 shadow border-0 bg-light">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4>Total a Pagar:</h4>
                <h1 className="text-primary fw-bold">${calcularTotal().toLocaleString('es-CL')}</h1>
            </div>
            
            <div className="d-flex justify-content-end gap-3">
                <Button variant="danger" onClick={vaciarCarrito}>
                  Vaciar Todo 🗑️
                </Button>
                <Button variant="success" size="lg" onClick={handleComprar}>
                  ✅ Confirmar Compra
                </Button>
            </div>
          </div>
        </>
      )}
    </Container>
  );
}

export default CarritoPage;