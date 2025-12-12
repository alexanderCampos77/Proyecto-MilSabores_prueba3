import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function RegisterPage() {
  const navigate = useNavigate();
  
  const regionesYcomunas = {
    "Metropolitana": ["Santiago", "Puente Alto", "Maipú", "La Florida", "Providencia"],
    "Valparaíso": ["Valparaíso", "Viña del Mar", "San Antonio", "Quilpué"],
    "Biobío": ["Concepción", "Talcahuano", "Los Ángeles"],
    "Araucanía": ["Temuco", "Villarrica", "Pucón"]
  };

  const [formData, setFormData] = useState({
    run: '',
    nombre: '',
    apellidos: '', 
    email: '',
    password: '',
    confirmPassword: '',
    fechaNacimiento: '',
    edad: '',
    telefono: '',
    codigoPais: '+56',
    direccion: '', 
    region: '',    
    comuna: ''     
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'region') {
      setFormData({ ...formData, region: value, comuna: '' });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const calcularEdadReal = (fechaNac) => {
    if (!fechaNac) return null;
    const hoy = new Date();
    const nacimiento = new Date(fechaNac);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    return edad;
  };

  const validateForm = () => {
    const newErrors = {};
    const edadCalculada = calcularEdadReal(formData.fechaNacimiento);

    if (!formData.run) {
        newErrors.run = 'El RUN es obligatorio.';
    } else {
        if (/[.-]/.test(formData.run)) newErrors.run = '❌ Sin puntos ni guión (Ej: 12345678k)';
        if (formData.run.length < 7 || formData.run.length > 9) newErrors.run = '❌ Largo entre 7 y 9 caracteres.';
    }

    if (!formData.nombre.trim()) newErrors.nombre = 'Falta el nombre.';
    if (!formData.apellidos.trim()) newErrors.apellidos = 'Faltan los apellidos.'; 
    if (!formData.direccion.trim()) newErrors.direccion = 'Falta la dirección.';     
    if (formData.direccion.length > 300) newErrors.direccion = 'Máximo 300 caracteres.';
    if (!formData.region) newErrors.region = 'Selecciona una región.';
    if (!formData.comuna) newErrors.comuna = 'Selecciona una comuna.';

    const dominiosPermitidos = ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com'];
    if (!formData.email) {
        newErrors.email = 'El correo es obligatorio.';
    } else {
        const dominioValido = dominiosPermitidos.some(d => formData.email.endsWith(d));
        if (!dominioValido) newErrors.email = '❌ Solo correos Duoc o Gmail.';
    }

    if (!formData.password) {
        newErrors.password = 'La contraseña es obligatoria.';
    } else if (formData.password.length < 4 || formData.password.length > 10) {
        newErrors.password = '❌ Debe tener entre 4 y 10 caracteres.';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '❌ Las contraseñas no coinciden.';
    }

    if (formData.fechaNacimiento && formData.edad) {
      if (parseInt(formData.edad) !== edadCalculada) {
        newErrors.edad = `🤨 Viendo tu edad no coincide con tu fecha de nacimiento raro no crees`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const datosParaEnviar = {
        run: formData.run,
        nombre: formData.nombre,
        apellidos: formData.apellidos,
        email: formData.email,
        password: formData.password,
        fechaNacimiento: formData.fechaNacimiento,
        edad: parseInt(formData.edad),
        telefono: `${formData.codigoPais} ${formData.telefono}`,
        direccion: formData.direccion,
        region: formData.region,
        comuna: formData.comuna,
        rol: 'CLIENTE'
      };

      await axios.post('http://localhost:9090/api/usuarios/registro', datosParaEnviar);
      
      alert("¡Registro exitoso! 🎉");
      navigate('/login');

    } catch (err) {
      console.error(err);
      setErrors({ email: 'Error al registrar (quizás el correo o RUN ya existe).' });
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-md-center">
        <Col md={10}>
          <div className="card p-4 shadow-sm border-0">
            <h2 className="text-center mb-4 font-pacifico text-primary">Formulario de Registro</h2>
            
            <Form onSubmit={handleSubmit} noValidate>
              
              <Row>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>RUN (Sin puntos ni guión)</Form.Label>
                        <Form.Control type="text" name="run" value={formData.run} onChange={handleChange} placeholder="12345678k" isInvalid={!!errors.run} />
                        <Form.Control.Feedback type="invalid">{errors.run}</Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Correo Electrónico</Form.Label>
                        <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} placeholder="@gmail.cl" isInvalid={!!errors.email} />
                        <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                    </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Nombres</Form.Label>
                    <Form.Control type="text" name="nombre" value={formData.nombre} onChange={handleChange} isInvalid={!!errors.nombre} />
                    <Form.Control.Feedback type="invalid">{errors.nombre}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Apellidos</Form.Label>
                    <Form.Control type="text" name="apellidos" value={formData.apellidos} onChange={handleChange} isInvalid={!!errors.apellidos} />
                    <Form.Control.Feedback type="invalid">{errors.apellidos}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                        <Form.Label>Región</Form.Label>
                        <Form.Select name="region" value={formData.region} onChange={handleChange} isInvalid={!!errors.region}>
                            <option value="">Seleccione...</option>
                            {Object.keys(regionesYcomunas).map(reg => <option key={reg} value={reg}>{reg}</option>)}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">{errors.region}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                        <Form.Label>Comuna</Form.Label>
                        <Form.Select name="comuna" value={formData.comuna} onChange={handleChange} disabled={!formData.region} isInvalid={!!errors.comuna}>
                            <option value="">Seleccione...</option>
                            {formData.region && regionesYcomunas[formData.region].map(com => <option key={com} value={com}>{com}</option>)}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">{errors.comuna}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                        <Form.Label>Dirección</Form.Label>
                        <Form.Control type="text" name="direccion" value={formData.direccion} onChange={handleChange} isInvalid={!!errors.direccion} placeholder="Calle 123" />
                        <Form.Control.Feedback type="invalid">{errors.direccion}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Fecha Nacimiento</Form.Label>
                    <Form.Control type="date" name="fechaNacimiento" value={formData.fechaNacimiento} onChange={handleChange} isInvalid={!!errors.fechaNacimiento} />
                  </Form.Group>
                </Col>
                <Col md={2}>
                  <Form.Group className="mb-3">
                    <Form.Label>Edad</Form.Label>
                    <Form.Control type="number" name="edad" value={formData.edad} onChange={handleChange} isInvalid={!!errors.edad} />
                    <Form.Control.Feedback type="invalid">{errors.edad}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Teléfono</Form.Label>
                    <InputGroup>
                      <Form.Select name="codigoPais" value={formData.codigoPais} onChange={handleChange} style={{ maxWidth: '80px' }}>
                        <option value="+56">🇨🇱</option>
                      </Form.Select>
                      <Form.Control type="number" name="telefono" value={formData.telefono} onChange={handleChange} isInvalid={!!errors.telefono} />
                    </InputGroup>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Contraseña (4-10 chars)</Form.Label>
                    <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} isInvalid={!!errors.password} />
                    <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Confirmar Contraseña</Form.Label>
                    <Form.Control type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} isInvalid={!!errors.confirmPassword} />
                    <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Button variant="success" type="submit" className="w-100 mt-3 btn-lg">Registrarse</Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default RegisterPage;