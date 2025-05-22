package com.expo.expoapp.controller;

import com.expo.expoapp.model.Profesor;
import com.expo.expoapp.repository.ProfesorRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/profesores")
public class ProfesorController {

    private final ProfesorRepository repository;

    public ProfesorController(ProfesorRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Profesor> listar() {
        return repository.findAll();
    }

    @PostMapping
    public Profesor crear(@RequestBody Profesor profesor) {
        return repository.save(profesor);
    }

    @GetMapping("/{matricula}")
    public Profesor obtener(@PathVariable Long matricula) {
        return repository.findById(matricula).orElse(null);
    }
        
    @PutMapping("/{matricula}")
    public Profesor actualizar(@PathVariable String numeroEmpleado, @RequestBody Profesor profesor) {
        profesor.setNumeroEmpleado(numeroEmpleado);
        return repository.save(profesor);
    }

    @DeleteMapping("/{matricula}")
    public void eliminar(@PathVariable Long matricula) {
        repository.deleteById(matricula);
    }
}
