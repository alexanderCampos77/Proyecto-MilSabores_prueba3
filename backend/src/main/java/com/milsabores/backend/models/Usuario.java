package com.milsabores.backend.models;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "usuario")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String run;
    private String nombre;
    private String apellidos;
    private String direccion;
    private String region;
    private String comuna;
    private String fechaNacimiento;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    private String rol;
    private Integer edad;
    private String telefono;
}