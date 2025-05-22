package com.expo.expoapp.model;

import jakarta.persistence.Entity;

@Entity
public class Profesor extends Usuario {

    private String numeroEmpleado;
    private String apellido;

    // Getters y Setters

    public String getNumeroEmpleado() {
        return numeroEmpleado;
    }

    public void setNumeroEmpleado(String numeroEmpleado) {
        this.numeroEmpleado = numeroEmpleado;
    }

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }
}
