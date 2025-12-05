package com.milsabores.backend.controllers;

import com.milsabores.backend.models.Usuario;
import com.milsabores.backend.repositories.UsuarioRepository;
import com.milsabores.backend.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder; // <--- Importante
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/registro")
    public Usuario registrarUsuario(@RequestBody Usuario usuario) {
        usuario.setRol("CLIENTE");
        String passwordEncriptada = passwordEncoder.encode(usuario.getPassword());
        usuario.setPassword(passwordEncriptada);

        return usuarioRepository.save(usuario);
    }
    @PostMapping("/login")
    public Map<String, Object> iniciarSesion(@RequestBody Map<String, String> credenciales) {
        String email = credenciales.get("email");
        String password = credenciales.get("password"); // Contraseña normal (texto plano)

        Usuario usuario = usuarioRepository.findByEmail(email);
        Map<String, Object> respuesta = new HashMap<>();

        if (usuario != null && passwordEncoder.matches(password, usuario.getPassword())) {

            String token = jwtUtil.generateToken(usuario.getEmail());

            respuesta.put("usuario", usuario);
            respuesta.put("token", token);
            return respuesta;
        } else {
            return null;
        }
    }
}