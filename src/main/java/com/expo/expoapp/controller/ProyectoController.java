package com.expo.expoapp.controller;

import com.expo.expoapp.model.Proyecto;
import com.expo.expoapp.model.Equipo;
import com.expo.expoapp.repository.ProyectoRepository;
import com.expo.expoapp.repository.EquipoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/proyectos")
@CrossOrigin(origins = "*")
public class ProyectoController {

    @Autowired
    private ProyectoRepository proyectoRepository;

    @Autowired
    private EquipoRepository equipoRepository;

    // Registrar un nuevo proyecto asociado a un equipo
    @PostMapping
    public ResponseEntity<Proyecto> registrarProyecto(@RequestBody Proyecto proyecto) {
        if (proyecto.getEquipo() != null && proyecto.getEquipo().getId() != null) {
            Optional<Equipo> equipoOpt = equipoRepository.findById(proyecto.getEquipo().getId());
            if (equipoOpt.isPresent()) {
                proyecto.setEquipo(equipoOpt.get());
            } else {
                return ResponseEntity.badRequest().body(null);
            }
        } else {
            return ResponseEntity.badRequest().body(null);
        }
        Proyecto nuevo = proyectoRepository.save(proyecto);
        return ResponseEntity.ok(nuevo);
    }

    // (Opcional) Obtener todos los proyectos
    @GetMapping("/listar")
    public Iterable<Proyecto> listarProyectos() {
        return proyectoRepository.findAll();
    }

    // (Opcional) Obtener proyecto por ID
    @GetMapping("/{id}")
    public ResponseEntity<Proyecto> obtenerProyecto(@PathVariable Long id) {
        Optional<Proyecto> proyectoOpt = proyectoRepository.findById(id);
        return proyectoOpt.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
}
