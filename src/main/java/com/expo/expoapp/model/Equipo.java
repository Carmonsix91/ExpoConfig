package com.expo.expoapp.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class Equipo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;

    @OneToMany(mappedBy = "equipo")
    private List<Estudiante> integrantes;

    // AHORA Equipo es el dueño de la relación uno a uno con Proyecto
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "proyecto_id", referencedColumnName = "id_proyecto", unique = true)
    private Proyecto proyecto;

    // Getters y Setters
    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getNombre() { return nombre; }

    public void setNombre(String nombre) { this.nombre = nombre; }

    public List<Estudiante> getIntegrantes() { return integrantes; }

    public void setIntegrantes(List<Estudiante> integrantes) { this.integrantes = integrantes; }

    public Proyecto getProyecto() { return proyecto; }

    public void setProyecto(Proyecto proyecto) { this.proyecto = proyecto; }
}
