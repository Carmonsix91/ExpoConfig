package com.expo.expoapp.controller;

import com.expo.expoapp.model.Visitante;
import com.expo.expoapp.repository.VisitanteRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/visitantes")
public class VisitanteController {

    private final VisitanteRepository repository;

    public VisitanteController(VisitanteRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public Visitante crearVisitante(@RequestBody Visitante visitante) {
        return repository.save(visitante);
    }

    @GetMapping
    public List<Visitante> listarVisitantes() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public Visitante obtenerVisitante(@PathVariable Long id) {
        return repository.findById(id).orElse(null);
    }
}
