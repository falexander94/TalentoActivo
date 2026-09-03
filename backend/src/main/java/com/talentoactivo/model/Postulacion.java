package com.talentoactivo.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "postulaciones")
public class Postulacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "vacante_id", nullable = false)
    private Vacante vacante;

    @Column(columnDefinition = "TEXT")
    private String cartaPresentacion;

    @Column(nullable = false)
    private String estado = "POSTULADO"; // POSTULADO, EN_REVISION, ENTREVISTA, OFERTA, RECHAZADO

    private LocalDateTime fechaPostulacion = LocalDateTime.now();

    public Postulacion() {
    }

    public Postulacion(Usuario usuario, Vacante vacante, String cartaPresentacion) {
        this.usuario = usuario;
        this.vacante = vacante;
        this.cartaPresentacion = cartaPresentacion;
    }

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Usuario getUsuario() { return usuario; }
    public void setUsuario(Usuario usuario) { this.usuario = usuario; }

    public Vacante getVacante() { return vacante; }
    public void setVacante(Vacante vacante) { this.vacante = vacante; }

    public String getCartaPresentacion() { return cartaPresentacion; }
    public void setCartaPresentacion(String cartaPresentacion) { this.cartaPresentacion = cartaPresentacion; }

    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }

    public LocalDateTime getFechaPostulacion() { return fechaPostulacion; }
    public void setFechaPostulacion(LocalDateTime fechaPostulacion) { this.fechaPostulacion = fechaPostulacion; }
}
