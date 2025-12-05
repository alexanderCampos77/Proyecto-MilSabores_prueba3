package com.milsabores.backend;

import com.milsabores.backend.models.Usuario;
import com.milsabores.backend.repositories.UsuarioRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@AutoConfigureTestDatabase(replace = Replace.NONE) // Usa tu MySQL real (o quítalo para usar memoria)
public class UsuarioRepositoryTest {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Test
    public void testGuardarUsuario() {
        Usuario usuario = new Usuario();
        usuario.setEmail("test1@prueba.com");
        usuario.setPassword("1234");
        usuario.setNombre("Tester Uno");
        usuario.setRol("CLIENTE");

        Usuario guardado = usuarioRepository.save(usuario);

        assertThat(guardado).isNotNull();
        assertThat(guardado.getId()).isGreaterThan(0);
    }

    @Test
    public void testBuscarPorEmail() {
        Usuario usuario = new Usuario();
        usuario.setEmail("buscado@prueba.com");
        usuario.setPassword("1234");
        usuario.setNombre("Buscado");
        usuarioRepository.save(usuario);

        Usuario encontrado = usuarioRepository.findByEmail("buscado@prueba.com");

        assertThat(encontrado).isNotNull();
        assertThat(encontrado.getNombre()).isEqualTo("Buscado");
    }

    @Test
    public void testBuscarEmailNoExistente() {
        Usuario encontrado = usuarioRepository.findByEmail("fantasma@prueba.com");
        assertThat(encontrado).isNull();
    }

    @Test
    public void testVerificarRol() {
        Usuario admin = new Usuario();
        admin.setEmail("admin@test.com");
        admin.setPassword("admin123");
        admin.setNombre("Admin");
        admin.setRol("ADMIN");
        usuarioRepository.save(admin);

        Usuario encontrado = usuarioRepository.findByEmail("admin@test.com");
        assertThat(encontrado.getRol()).isEqualTo("ADMIN");
    }

    @Test
    public void testActualizarUsuario() {
        Usuario usuario = new Usuario();
        usuario.setEmail("update@test.com");
        usuario.setPassword("1234");
        usuario.setNombre("Nombre Viejo");
        usuarioRepository.save(usuario);

        Usuario guardado = usuarioRepository.findByEmail("update@test.com");
        guardado.setNombre("Nombre Nuevo");
        Usuario actualizado = usuarioRepository.save(guardado);

        assertThat(actualizado.getNombre()).isEqualTo("Nombre Nuevo");
    }
}