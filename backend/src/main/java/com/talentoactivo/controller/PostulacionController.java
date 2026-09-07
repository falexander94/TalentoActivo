package com.talentoactivo.controller;

import com.talentoactivo.model.Postulacion;
import com.talentoactivo.model.Usuario;
import com.talentoactivo.model.Vacante;
import com.talentoactivo.repository.PostulacionRepository;
import com.talentoactivo.repository.UsuarioRepository;
import com.talentoactivo.repository.VacanteRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/v1/postulaciones")
public class PostulacionController {

    private final PostulacionRepository postulacionRepository;
    private final UsuarioRepository usuarioRepository;
    private final VacanteRepository vacanteRepository;

    public PostulacionController(PostulacionRepository postulacionRepository,
                                 UsuarioRepository usuarioRepository,
                                 VacanteRepository vacanteRepository) {
        this.postulacionRepository = postulacionRepository;
        this.usuarioRepository = usuarioRepository;
        this.vacanteRepository = vacanteRepository;
    }

    @GetMapping("/mis-postulaciones")
    public ResponseEntity<?> listarMisPostulaciones(@AuthenticationPrincipal Jwt jwt) {
        if (jwt == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        String auth0Sub = jwt.getSubject();
        return usuarioRepository.findByAuth0Sub(auth0Sub)
                .map(usuario -> ResponseEntity.ok(postulacionRepository.findByUsuario(usuario)))
                .orElse(ResponseEntity.ok(List.of()));
    }

    @PostMapping("/aplicar/{vacanteId}")
    public ResponseEntity<?> aplicarAVacante(@AuthenticationPrincipal Jwt jwt,
                                             @PathVariable Long vacanteId,
                                             @RequestBody(required = false) Map<String, String> payload) {
        if (jwt == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Token JWT no proporcionado"));
        }

        String auth0Sub = jwt.getSubject();
        String correo = jwt.getClaimAsString("email");
        if (correo == null || correo.isBlank()) {
            correo = auth0Sub.replace("|", "_") + "@talentoactivo.com";
        }

        // Obtener o crear automáticamente el usuario si no ha sido sincronizado previamente
        Usuario usuario = usuarioRepository.findByAuth0Sub(auth0Sub)
                .orElseGet(() -> usuarioRepository.save(new Usuario(auth0Sub, "Usuario Autenticado", correo, "", "", "CANDIDATO")));

        Vacante vacante = vacanteRepository.findById(vacanteId)
                .orElse(null);

        if (vacante == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Vacante no encontrada con ID: " + vacanteId));
        }

        // Verificar si ya se postuló
        if (postulacionRepository.findByUsuarioAndVacante(usuario, vacante).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Ya te has postulado a esta vacante anteriormente."));
        }

        String carta = payload != null ? payload.getOrDefault("cartaPresentacion", "") : "";
        Postulacion postulacion = new Postulacion(usuario, vacante, carta);
        Postulacion guardada = postulacionRepository.save(postulacion);

        return ResponseEntity.status(HttpStatus.CREATED).body(guardada);
    }
}
