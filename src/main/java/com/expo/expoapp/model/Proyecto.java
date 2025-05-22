package com.expo.expoapp.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Proyecto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_proyecto;

    private String titulo;
    private String descripcion;
    private String responsable;
    private String correo;
    private String boleta;
    private String materia;
    private String profesor;
    private String carrera;
    private String documento_url;
    private LocalDate fecha_exposicion;

    @OneToOne(mappedBy = "proyecto")
    private Equipo equipo;


    // Getters y setters

    public Long getId_proyecto() {
        return id_proyecto;
    }

    public void setId_proyecto(Long id_proyecto) {
        this.id_proyecto = id_proyecto;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getResponsable() {
        return responsable;
    }

    public void setResponsable(String responsable) {
        this.responsable = responsable;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getBoleta() {
        return boleta;
    }

    public void setBoleta(String boleta) {
        this.boleta = boleta;
    }

    public String getMateria() {
        return materia;
    }

    public void setMateria(String materia) {
        this.materia = materia;
    }

    public String getProfesor() {
        return profesor;
    }

    public void setProfesor(String profesor) {
        this.profesor = profesor;
    }

    public String getCarrera() {
        return carrera;
    }

    public void setCarrera(String carrera) {
        this.carrera = carrera;
    }

    public String getDocumento_url() {
        return documento_url;
    }

    public void setDocumento_url(String documento_url) {
        this.documento_url = documento_url;
    }

    public Equipo getEquipo() { return equipo; }

    public void setEquipo(Equipo equipo) { this.equipo = equipo; }

    public LocalDate getFecha_exposicion() {
        return fecha_exposicion;
    }

    public void setFecha_exposicion(LocalDate fecha_exposicion) {
        this.fecha_exposicion = fecha_exposicion;
    }


}
