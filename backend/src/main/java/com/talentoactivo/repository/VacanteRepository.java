package com.talentoactivo.repository;

import com.talentoactivo.model.Vacante;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface VacanteRepository extends JpaRepository<Vacante, Long> {
    List<Vacante> findByActivaTrueOrderByFechaPublicacionDesc();
    List<Vacante> findByEmpresaContainingIgnoreCase(String empresa);
}
