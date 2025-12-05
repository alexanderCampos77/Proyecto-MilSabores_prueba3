package com.milsabores.backend;

import com.milsabores.backend.models.Producto;
import com.milsabores.backend.repositories.ProductoRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@AutoConfigureTestDatabase(replace = Replace.NONE)
public class ProductoRepositoryTest {

    @Autowired
    private ProductoRepository productoRepository;

    @Test
    public void testGuardarProducto() {
        Producto p = new Producto();
        p.setNombre("Torta Test");
        p.setPrecio(10000.0);
        p.setDescripcion("Rica");
        p.setImagen("img.jpg");

        Producto guardado = productoRepository.save(p);
        assertThat(guardado.getId()).isNotNull();
    }

    @Test
    public void testListarProductos() {
        List<Producto> productos = productoRepository.findAll();
        assertThat(productos).isNotNull();
    }

    @Test
    public void testBuscarPorId() {
        Producto p = new Producto();
        p.setNombre("Torta ID");
        p.setPrecio(5000.0);
        Producto guardado = productoRepository.save(p);

        Optional<Producto> encontrado = productoRepository.findById(guardado.getId());
        assertThat(encontrado).isPresent();
    }

    @Test
    public void testBorrarProducto() {
        Producto p = new Producto();
        p.setNombre("Para Borrar");
        p.setPrecio(100.0);
        Producto guardado = productoRepository.save(p);
        Long id = guardado.getId();

        productoRepository.deleteById(id);

        Optional<Producto> eliminado = productoRepository.findById(id);
        assertThat(eliminado).isEmpty();
    }

    @Test
    public void testPrecioPositivo() {
        Producto p = new Producto();
        p.setNombre("Torta Cara");
        p.setPrecio(99999.0);
        productoRepository.save(p);

        assertThat(p.getPrecio()).isGreaterThan(0);
    }
}