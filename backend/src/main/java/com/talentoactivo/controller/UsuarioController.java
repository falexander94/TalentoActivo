package com.talentoactivo.controller;

import com.talentoactivo.model.Usuario;
import com.talentoactivo.repository.UsuarioRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/v1/usuarios")
public class UsuarioController {

    private final UsuarioRepository usuarioRepository;

    public UsuarioController(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @GetMapping("/me")
    public ResponseEntity<?> obtenerMiPerfil(@AuthenticationPrincipal Jwt jwt) {
        if (jwt == null) {
            return ResponseEntity.status(401).body(Map.of("message", "Token JWT no proporcionado o inválido"));
        }

        String auth0Sub = jwt.getSubject();
        return usuarioRepository.findByAuth0Sub(auth0Sub)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/sincronizar")
    public ResponseEntity<Usuario> sincronizarUsuario(
            @AuthenticationPrincipal Jwt jwt, 
            @RequestBody(required = false) Map<String, String> payload) {
        
        String auth0Sub = jwt != null ? jwt.getSubject() : "anonymous";
        String correoFromJwt = jwt != null ? jwt.getClaimAsString("email") : null;
        String correoPayload = payload != null ? payload.get("correo") : null;
        
        String correo = (correoFromJwt != null && !correoFromJwt.isBlank()) ? correoFromJwt : correoPayload;
        if (correo == null || correo.isBlank()) {
            correo = auth0Sub.replace("|", "_") + "@talentoactivo.com";
        }

        String nombre = payload != null ? payload.getOrDefault("nombre", "Usuario TalentoActivo") : "Usuario TalentoActivo";
        String fotoUrl = payload != null ? payload.getOrDefault("fotoUrl", "") : "";
        String telefono = payload != null ? payload.getOrDefault("telefono", "") : "";

        Usuario usuario = usuarioRepository.findByAuth0Sub(auth0Sub)
                .orElseGet(() -> new Usuario(auth0Sub, nombre, correo, telefono, fotoUrl, "CANDIDATO"));

        usuario.setNombre(nombre);
        usuario.setCorreo(correo);
        if (!fotoUrl.isBlank()) usuario.setFotoUrl(fotoUrl);
        if (!telefono.isBlank()) usuario.setTelefono(telefono);

        Usuario usuarioGuardado = usuarioRepository.save(usuario);
        return ResponseEntity.ok(usuarioGuardado);
    }
}
