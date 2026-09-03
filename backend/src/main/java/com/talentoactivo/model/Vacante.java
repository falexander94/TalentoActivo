package com.talentoactivo.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "vacantes")
public class Vacante {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String titulo;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String descripcion;

    private String empresa;
    private String ubicacion;
    private String tipoJornada; // REMOTO, HIBRIDO, PRESENCIAL
    private BigDecimal salarioEstimado;
    private String nivelExperiencia; // JUNIOR, MID, SENIOR, LEAD

    @Column(nullable = false)
    private Boolean activa = true;

    private LocalDateTime fechaPublicacion = LocalDateTime.now();

    public Vacante() {
    }

    public Vacante(String titulo, String descripcion, String empresa, String ubicacion, String tipoJornada, BigDecimal salarioEstimado, String nivelExperiencia) {
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.empresa = empresa;
        this.ubicacion = ubicacion;
        this.tipoJornada = tipoJornada;
        this.salarioEstimado = salarioEstimado;
        this.nivelExperiencia = nivelExperiencia;
    }

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }

    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }

    public String getEmpresa() { return empresa; }
    public void setEmpresa(String empresa) { this.empresa = empresa; }

    public String getUbicacion() { return ubicacion; }
    public void setUbicacion(String ubicacion) { this.ubicacion = ubicacion; }

    public String getTipoJornada() { return tipoJornada; }
    public void setTipoJornada(String tipoJornada) { this.tipoJornada = tipoJornada; }

    public BigDecimal getSalarioEstimado() { return salarioEstimado; }
    public void setSalarioEstimado(BigDecimal salarioEstimado) { this.salarioEstimado = salarioEstimado; }

    public String getNivelExperiencia() { return nivelExperiencia; }
    public void setNivelExperiencia(String nivelExperiencia) { this.nivelExperiencia = nivelExperiencia; }

    public Boolean getActiva() { return activa; }
    public void setActiva(Boolean activa) { this.activa = activa; }

    public LocalDateTime getFechaPublicacion() { return fechaPublicacion; }
    public void setFechaPublicacion(LocalDateTime fechaPublicacion) { this.fechaPublicacion = fechaPublicacion; }
}
