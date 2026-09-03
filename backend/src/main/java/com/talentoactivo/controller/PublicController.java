package com.talentoactivo.controller;

import com.talentoactivo.model.Vacante;
import com.talentoactivo.repository.VacanteRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/v1")
public class PublicController {

    private final VacanteRepository vacanteRepository;

    public PublicController(VacanteRepository vacanteRepository) {
        this.vacanteRepository = vacanteRepository;
    }

    @GetMapping("/health")
    public ResponseEntity<?> healthCheck() {
        return ResponseEntity.ok(Map.of(
            "status", "UP",
            "service", "TalentoActivo API REST",
            "authProvider", "Auth0 OAuth2/OIDC"
        ));
    }

    @GetMapping("/vacantes/publicas")
    public ResponseEntity<List<Vacante>> obtenerVacantesPublicas() {
        return ResponseEntity.ok(vacanteRepository.findByActivaTrueOrderByFechaPublicacionDesc());
    }

    @GetMapping("/vacantes/publicas/{id}")
    public ResponseEntity<?> obtenerVacantePorId(@PathVariable Long id) {
        return vacanteRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
