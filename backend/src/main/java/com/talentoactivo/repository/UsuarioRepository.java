package com.talentoactivo.repository;

import com.talentoactivo.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByAuth0Sub(String auth0Sub);
    Optional<Usuario> findByCorreo(String correo);
}
