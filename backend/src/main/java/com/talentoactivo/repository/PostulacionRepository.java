package com.talentoactivo.repository;

import com.talentoactivo.model.Postulacion;
import com.talentoactivo.model.Usuario;
import com.talentoactivo.model.Vacante;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface PostulacionRepository extends JpaRepository<Postulacion, Long> {
    List<Postulacion> findByUsuario(Usuario usuario);
    List<Postulacion> findByVacante(Vacante vacante);
    Optional<Postulacion> findByUsuarioAndVacante(Usuario usuario, Vacante vacante);
}
