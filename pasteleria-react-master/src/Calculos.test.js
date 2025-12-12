import { describe, it, expect } from 'vitest';

function calcularTotal(productos) {
    return productos.reduce((total, item) => total + item.precio, 0);
}
describe('Pruebas de Lógica de Negocio (Frontend)', () => {
    it('Debe calcular correctamente el total de una compra', () => {
        const carritoPrueba = [
            { id: 1, nombre: 'Torta Chocolate', precio: 15000 },
            { id: 2, nombre: 'Cupcake', precio: 2000 }
        ];
        const resultado = calcularTotal(carritoPrueba);
        expect(resultado).toBe(17000);
    });
    it('Debe devolver 0 si el carrito está vacío', () => {
        const carritoVacio = [];
        const resultado = calcularTotal(carritoVacio);
        expect(resultado).toBe(0);
    });
});