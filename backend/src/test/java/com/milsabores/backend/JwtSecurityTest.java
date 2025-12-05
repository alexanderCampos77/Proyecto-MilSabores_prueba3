package com.milsabores.backend;

import com.milsabores.backend.security.JwtUtil;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class JwtSecurityTest {

    @Autowired
    private JwtUtil jwtUtil;

    @Test
    public void testCicloDeVidaToken() {
        System.out.println("______-----INICIANDO TEST DE SEGURIDAD JWT------______");

        String usuarioPrueba = "usuario@seguridad.com";
        String token = jwtUtil.generateToken(usuarioPrueba);
        assertThat(token).isNotNull();
        assertThat(token.length()).isGreaterThan(20);
        System.out.println("Token generado: " + token);
        String nombreExtraido = jwtUtil.extractUsername(token);
        assertThat(nombreExtraido).isEqualTo(usuarioPrueba);
        Boolean esValido = jwtUtil.validateToken(token, usuarioPrueba);
        assertThat(esValido).isTrue();
        Boolean esValidoParaHacker = jwtUtil.validateToken(token, "hacker@malo.com");
        assertThat(esValidoParaHacker).isFalse();
        System.out.println("--- ✅ TEST DE JWT COMPLETADO CON ÉXITO ---");
    }
}