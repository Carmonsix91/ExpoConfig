package com.expo.expoapp.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class Equipo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;

    // Relación a Proyecto (para evitar loops infinitos, permanece con @JsonIgnore)
    @OneToOne(mappedBy = "equipo")
    @com.fasterxml.jackson.annotation.JsonIgnore
    private Proyecto proyecto;

    // Relación con los estudiantes (integrantes)
    @OneToMany(mappedBy = "equipo", fetch = FetchType.LAZY)
    private List<Estudiante> integrantes;

    // Getters y setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public Proyecto getProyecto() { return proyecto; }
    public void setProyecto(Proyecto proyecto) { this.proyecto = proyecto; }

    public List<Estudiante> getIntegrantes() { return integrantes; }
    public void setIntegrantes(List<Estudiante> integrantes) { this.integrantes = integrantes; }
}
