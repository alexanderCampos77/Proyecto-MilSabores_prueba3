import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../pages/Home.jsx';
import { getProductos } from '../../db.js';
import userEvent from '@testing-library/user-event';

jest.mock('../../db.js');

const mockProductos = [
    {
        id: 1,
        nombre: "Torta Test 1",
        precio: 10000,
        categoria: "test",
        descripcion: "Desc Test 1",
        imagen: "/images/test1.jpg",
        estrellas: 4,
        reseñas: []
    },
    {
        id: 2,
        nombre: "Torta Test 2",
        precio: 20000,
        categoria: "test",
        descripcion: "Desc Test 2",
        imagen: "/images/test2.jpg",
        estrellas: 5,
        reseñas: []
    }
];

describe('Home Component', () => {
  beforeEach(() => {
    getProductos.mockResolvedValue([...mockProductos]);
  });

  it('debería renderizar el título y la barra de búsqueda', async () => {
    render(
      <BrowserRouter>
        <Home agregarAlCarrito={() => {}} />
      </BrowserRouter>
    );

    expect(screen.getByText(/Nuestros Productos/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Buscar pastel.../i)).toBeInTheDocument();
  });

  it('debería cargar y mostrar los productos', async () => {
    render(
      <BrowserRouter>
        <Home agregarAlCarrito={() => {}} />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Torta Test 1/i)).toBeInTheDocument();
    });

    expect(screen.getByText(/Torta Test 2/i)).toBeInTheDocument();
    const productTitles = screen.getAllByText(/Torta Test/i); 
    expect(productTitles).toHaveLength(mockProductos.length);
  });

  it('debería filtrar productos basado en la búsqueda', async () => {
     const user = userEvent.setup();
     render(
       <BrowserRouter>
         <Home agregarAlCarrito={() => {}} />
       </BrowserRouter>
     );

     await waitFor(() => {
        expect(screen.getByText(/Torta Test 1/i)).toBeInTheDocument();
     });

     const searchInput = screen.getByPlaceholderText(/Buscar pastel.../i);
     await user.type(searchInput, 'Test 2');

     expect(screen.queryByText(/Torta Test 1/i)).not.toBeInTheDocument();
     expect(screen.getByText(/Torta Test 2/i)).toBeInTheDocument();
   });

});
