package com.expo.expoapp.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class Equipo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_equipo;

    private String nombre_equipo;

    @OneToMany
    @JoinColumn(name = "equipo_id")  // clave foránea en la tabla Estudiante
    private List<Estudiante> integrantes;

    @OneToOne
    @JoinColumn(name = "proyecto_id", referencedColumnName = "id_proyecto")
    private Proyecto proyecto;

    // Getters y Setters

    public Long getId_equipo() {
        return id_equipo;
    }

    public void setId_equipo(Long id_equipo) {
        this.id_equipo = id_equipo;
    }

    public String getNombre_equipo() {
        return nombre_equipo;
    }

    public void setNombre_equipo(String nombre_equipo) {
        this.nombre_equipo = nombre_equipo;
    }

    public List<Estudiante> getIntegrantes() {
        return integrantes;
    }

    public void setIntegrantes(List<Estudiante> integrantes) {
        this.integrantes = integrantes;
    }

    public Proyecto getProyecto() {
        return proyecto;
    }

    public void setProyecto(Proyecto proyecto) {
        this.proyecto = proyecto;
    }
}
