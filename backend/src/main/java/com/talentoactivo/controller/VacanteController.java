package com.talentoactivo.controller;

import com.talentoactivo.model.Vacante;
import com.talentoactivo.repository.VacanteRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/vacantes")
public class VacanteController {

    private final VacanteRepository vacanteRepository;

    public VacanteController(VacanteRepository vacanteRepository) {
        this.vacanteRepository = vacanteRepository;
    }

    @GetMapping
    public ResponseEntity<List<Vacante>> listarTodas() {
        return ResponseEntity.ok(vacanteRepository.findAll());
    }

    @PostMapping
    public ResponseEntity<Vacante> crearVacante(@RequestBody Vacante vacante) {
        Vacante nuevaVacante = vacanteRepository.save(vacante);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevaVacante);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Vacante> actualizarVacante(@PathVariable Long id, @RequestBody Vacante vacanteDetalles) {
        return vacanteRepository.findById(id)
                .map(vacante -> {
                    vacante.setTitulo(vacanteDetalles.getTitulo());
                    vacante.setDescripcion(vacanteDetalles.getDescripcion());
                    vacante.setEmpresa(vacanteDetalles.getEmpresa());
                    vacante.setUbicacion(vacanteDetalles.getUbicacion());
                    vacante.setTipoJornada(vacanteDetalles.getTipoJornada());
                    vacante.setSalarioEstimado(vacanteDetalles.getSalarioEstimado());
                    vacante.setNivelExperiencia(vacanteDetalles.getNivelExperiencia());
                    vacante.setActiva(vacanteDetalles.getActiva());
                    return ResponseEntity.ok(vacanteRepository.save(vacante));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarVacante(@PathVariable Long id) {
        return vacanteRepository.findById(id)
                .map(vacante -> {
                    vacanteRepository.delete(vacante);
                    return ResponseEntity.noContent().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
