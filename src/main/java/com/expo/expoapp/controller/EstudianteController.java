package com.expo.expoapp.controller;

import com.expo.expoapp.model.Estudiante;
import com.expo.expoapp.repository.EstudianteRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/estudiantes")
public class EstudianteController {

    private final EstudianteRepository repository;
    
    public EstudianteController(EstudianteRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Estudiante> listarEstudiantes() {
        return repository.findAll();
    }

    @PostMapping
    public Estudiante crearEstudiante(@RequestBody Estudiante estudiante) {
        return repository.save(estudiante);
    }

    @GetMapping("/{boleta}")
    public Estudiante obtenerEstudiante(@PathVariable String boleta) {
        return repository.findById(boleta).orElse(null);
    }
    
    @PutMapping("/{boleta}")
    public Estudiante actualizarEstudiante(@PathVariable String boleta, @RequestBody Estudiante estudiante) {
        estudiante.setBoleta(boleta);
        return repository.save(estudiante);
    }

    @DeleteMapping("/{boleta}")
    public void eliminarEstudiante(@PathVariable String boleta) {
        repository.deleteById(boleta);
    }
}
