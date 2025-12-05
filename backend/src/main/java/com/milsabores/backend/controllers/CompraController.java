package com.milsabores.backend.controllers;

import com.milsabores.backend.models.*;
import com.milsabores.backend.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/compras")
public class CompraController {

    @Autowired
    private BoletaRepository boletaRepository;
    @Autowired
    private DetalleBoletaRepository detalleBoletaRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private ProductoRepository productoRepository;

    @PostMapping
    public ResponseEntity<?> realizarCompra(@RequestBody Map<String, Object> datosCompra) {
        String emailUsuario = (String) datosCompra.get("email");
        List<Map<String, Object>> items = (List<Map<String, Object>>) datosCompra.get("items");
        Double total = Double.valueOf(datosCompra.get("total").toString());

        Usuario usuario = usuarioRepository.findByEmail(emailUsuario);
        if (usuario == null) return ResponseEntity.badRequest().body("Usuario no encontrado");

        Boleta boleta = new Boleta();
        boleta.setUsuario(usuario);
        boleta.setFecha(new Date());
        boleta.setTotal(total);
        Boleta boletaGuardada = boletaRepository.save(boleta);

        for (Map<String, Object> item : items) {
            Long productoId = Long.valueOf(item.get("id").toString());
            Integer cantidad = 1;

            Producto producto = productoRepository.findById(productoId).orElse(null);

            if (producto != null) {
                DetalleBoleta detalle = new DetalleBoleta();
                detalle.setBoleta(boletaGuardada);
                detalle.setProducto(producto);
                detalle.setCantidad(cantidad);
                detalle.setPrecioUnitario(producto.getPrecio());
                detalleBoletaRepository.save(detalle);
            }
        }

        return ResponseEntity.ok("Compra registrada exitosamente con ID: " + boletaGuardada.getId());
    }
}