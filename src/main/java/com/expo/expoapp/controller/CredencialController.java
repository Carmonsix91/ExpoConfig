package com.expo.expoapp.controller;

import com.expo.expoapp.model.Credencial;
import com.expo.expoapp.repository.CredencialRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/credenciales")
public class CredencialController {

    private final CredencialRepository repository;

    public CredencialController(CredencialRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public Credencial crear(@RequestBody Credencial credencial) {
        return repository.save(credencial);
    }

    @GetMapping
    public List<Credencial> listar() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public Credencial obtener(@PathVariable Long id) {
        return repository.findById(id).orElse(null);
    }
}
