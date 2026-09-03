package com.talentoactivo.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "usuarios")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String auth0Sub; // Identificador único de Auth0 (ej: auth0|123456)

    @Column(nullable = false)
    private String nombre;

    @Column(nullable = false, unique = true)
    private String correo;

    private String telefono;
    
    private String fotoUrl;

    @Column(nullable = false)
    private String rol = "CANDIDATO"; // CANDIDATO, RECLUTADOR, ADMIN

    private LocalDateTime fechaCreacion = LocalDateTime.now();

    public Usuario() {
    }

    public Usuario(String auth0Sub, String nombre, String correo, String telefono, String fotoUrl, String rol) {
        this.auth0Sub = auth0Sub;
        this.nombre = nombre;
        this.correo = correo;
        this.telefono = telefono;
        this.fotoUrl = fotoUrl;
        this.rol = rol;
    }

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getAuth0Sub() { return auth0Sub; }
    public void setAuth0Sub(String auth0Sub) { this.auth0Sub = auth0Sub; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getCorreo() { return correo; }
    public void setCorreo(String correo) { this.correo = correo; }

    public String getTelefono() { return telefono; }
    public void setTelefono(String telefono) { this.telefono = telefono; }

    public String getFotoUrl() { return fotoUrl; }
    public void setFotoUrl(String fotoUrl) { this.fotoUrl = fotoUrl; }

    public String getRol() { return rol; }
    public void setRol(String rol) { this.rol = rol; }

    public LocalDateTime getFechaCreacion() { return fechaCreacion; }
    public void setFechaCreacion(LocalDateTime fechaCreacion) { this.fechaCreacion = fechaCreacion; }
}
