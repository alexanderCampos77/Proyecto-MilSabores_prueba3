package com.milsabores.backend.loader;

import com.milsabores.backend.models.Categoria;
import com.milsabores.backend.models.Producto;
import com.milsabores.backend.repositories.CategoriaRepository;
import com.milsabores.backend.repositories.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private CategoriaRepository categoriaRepository;

    @Autowired
    private ProductoRepository productoRepository;

    @Override
    public void run(String... args) throws Exception {
        cargarDatos();
    }

    private void cargarDatos() {
        if (categoriaRepository.count() == 0) {

            Categoria catCuadradas = crearCategoria("Tortas Cuadradas");
            Categoria catCirculares = crearCategoria("Tortas Circulares");
            Categoria catPostres = crearCategoria("Postres Individuales");
            Categoria catSinAzucar = crearCategoria("Sin Azúcar");
            Categoria catTradicional = crearCategoria("Tradicional");

            crearProducto("Torta Cuadrada de Chocolate",
                    "Deliciosa torta de chocolate con capas de ganache y un toque de avellanas.",
                    45000.0,
                    "/images/Chocolate_Hazelnut_Cube_Cake_to_order_London_Surrey_2_1200x.webp",
                    catCuadradas);

            crearProducto("Torta Cuadrada de Frutas",
                    "Una mezcla de frutas frescas y crema chantilly sobre un suave bizcocho.",
                    50000.0,
                    "/images/54040c9a1a1c4b979d88d22977ef6aa126.jpg",
                    catCuadradas);

            crearProducto("Torta Circular de Vainilla",
                    "Bizcocho de vainilla clásico relleno con crema pastelera.",
                    40000.0,
                    "/images/Gluten-Free-Vanilla-Cake-image--500x500.webp",
                    catCirculares);

            crearProducto("Torta Circular de Manjar",
                    "Torta tradicional chilena con manjar y nueces.",
                    42000.0,
                    "/images/imagesmannjar.jpg",
                    catCirculares);

            crearProducto("Mousse de Chocolate",
                    "Postre individual cremoso y suave, hecho con chocolate de alta calidad.",
                    5000.0,
                    "/images/c170cfd080dcaa23853a390b8343b021.jpg",
                    catPostres);

            crearProducto("Tiramisú Clásico",
                    "Un postre italiano individual con capas de café, mascarpone y cacao.",
                    5500.0,
                    "/images/11d636dc683222b2d4e9b3dcb248ccb5.jpg",
                    catPostres);

            crearProducto("Torta Sin Azúcar de Naranja",
                    "Torta ligera y deliciosa, endulzada naturalmente.",
                    48000.0,
                    "/images/88_MIF_2420_Torta_de_Naranja_Sin_Azucar_Anadida_1080x1080.webp",
                    catSinAzucar);

            crearProducto("Torta Especial de Boda",
                    "Elegante y deliciosa, esta torta está diseñada para ser el centro de atención en cualquier boda.",
                    60000.0,
                    "/images/boda.jpg",
                    catTradicional);

            System.out.println("DATOS ORIGINALES CARGADOS");
        }
    }

    private Categoria crearCategoria(String nombre) {
        Categoria c = new Categoria();
        c.setNombre(nombre);
        return categoriaRepository.save(c);
    }

    private void crearProducto(String nombre, String descripcion, Double precio, String imagen, Categoria categoria) {
        Producto p = new Producto();
        p.setNombre(nombre);
        p.setDescripcion(descripcion);
        p.setPrecio(precio);
        p.setImagen(imagen);
        p.setCategoria(categoria);
        productoRepository.save(p);
    }
}