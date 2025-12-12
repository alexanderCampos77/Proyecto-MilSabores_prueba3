import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Form, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminPage() {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: '',
    precio: '',
    imagen: '',
    stock: 10,
    codigo: ''
  });

  useEffect(() => {
    const usuarioStorage = localStorage.getItem('usuario');
    if (!usuarioStorage) {
      navigate('/login');
      return;
    }

    const usuario = JSON.parse(usuarioStorage);
    
    if (usuario.rol !== 'ADMIN') {
      alert("⛔ ACCESO DENEGADO: No eres Administrador.");
      navigate('/');
      return;
    }

    cargarProductos();
  }, [navigate]);

  const cargarProductos = async () => {
    try {
      const response = await axios.get('http://localhost:9090/api/productos');
      setProductos(response.data);
    } catch (error) {
      console.error("Error cargando productos", error);
    }
  };

  const handleEliminar = async (id) => {
    if (!window.confirm("¿Seguro que quieres borrar esta torta?")) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:9090/api/productos/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      alert("Producto eliminado correctamente");
      cargarProductos();
    } catch (error) {
      alert("Error al eliminar. Revisa si tienes permisos.");
    }
  };

  const handleCrear = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:9090/api/productos', nuevoProducto, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      alert("¡Torta creada con éxito! 🎂");
      setShowModal(false);
      cargarProductos();
    } catch (error) {
      alert("Error al crear producto.");
    }
  };

  return (
    <Container className="my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="font-pacifico text-danger">Panel de Administración 🛠️</h2>
        <Button variant="success" onClick={() => setShowModal(true)}>
          + Nueva Torta
        </Button>
      </div>

      <Table striped bordered hover className="shadow-sm">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.nombre}</td>
              <td>${p.precio}</td>
              <td>{p.stock}</td>
              <td>
                <Button variant="danger" size="sm" onClick={() => handleEliminar(p.id)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Nueva Torta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" onChange={(e) => setNuevoProducto({...nuevoProducto, nombre: e.target.value})} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Precio</Form.Label>
              <Form.Control type="number" onChange={(e) => setNuevoProducto({...nuevoProducto, precio: e.target.value})} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nombre Imagen (ej: selva.jpg)</Form.Label>
              <Form.Control type="text" onChange={(e) => setNuevoProducto({...nuevoProducto, imagen: e.target.value})} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Código (ej: T005)</Form.Label>
              <Form.Control type="text" onChange={(e) => setNuevoProducto({...nuevoProducto, codigo: e.target.value})} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
          <Button variant="primary" onClick={handleCrear}>Guardar</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default AdminPage;