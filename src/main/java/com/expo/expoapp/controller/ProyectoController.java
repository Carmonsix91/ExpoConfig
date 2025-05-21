package com.expo.expoapp.controller;

import com.expo.expoapp.model.Proyecto;
import com.expo.expoapp.repository.ProyectoRepository;
import com.expo.expoapp.repository.EquipoRepository;

import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/proyectos")
public class ProyectoController {

    private final ProyectoRepository proyectoRepository;
    //private final EquipoRepository equipoRepository;

     @Autowired
    public ProyectoController(ProyectoRepository proyectoRepository) {
        this.proyectoRepository = proyectoRepository;
    }

    @PostMapping
    public Proyecto crear(@RequestBody Proyecto proyecto) {
        return proyectoRepository.save(proyecto);
    }

    public ProyectoController(ProyectoRepository proyectoRepository, EquipoRepository equipoRepository) {
        this.proyectoRepository = proyectoRepository;
        //this.equipoRepository = equipoRepository;
    }

    @GetMapping
    public List<Proyecto> listar() {
        return proyectoRepository.findAll();
    }

    /*@PostMapping
    public ResponseEntity<Proyecto> crear(@RequestBody Proyecto proyecto) {
        if (proyecto.getEquipo() == null || proyecto.getEquipo().getId_equipo() == null) {
            return ResponseEntity
                    .badRequest()
                    .build();
        }

    // Buscar si el equipo existe
        Long idEquipo = proyecto.getEquipo().getId_equipo();
        return equipoRepository.findById(idEquipo)
                .map(equipoExistente -> {
                    proyecto.setEquipo(equipoExistente); // asegura referencia válida
                    Proyecto proyectoGuardado = proyectoRepository.save(proyecto);
                    return ResponseEntity.ok(proyectoGuardado);
                })
                .orElseGet(() -> ResponseEntity
                        .badRequest()
                        .build());
    } */


    @GetMapping("/{id}")
    public Proyecto obtener(@PathVariable Long id) {
        return proyectoRepository.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public Proyecto actualizar(@PathVariable Long id, @RequestBody Proyecto proyecto) {
        proyecto.setId_proyecto(id);
        return proyectoRepository.save(proyecto);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        proyectoRepository.deleteById(id);
    }
    
}
