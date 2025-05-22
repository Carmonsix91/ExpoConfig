package com.expo.expoapp.controller;

import com.expo.expoapp.model.Equipo;
import com.expo.expoapp.model.Estudiante;
import com.expo.expoapp.model.Proyecto;
import com.expo.expoapp.repository.EquipoRepository;
import com.expo.expoapp.repository.EstudianteRepository;
import com.expo.expoapp.repository.ProyectoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/equipos")
@CrossOrigin(origins = "*")
public class EquipoController {

    @Autowired
    private EquipoRepository equipoRepository;

    @Autowired
    private EstudianteRepository estudianteRepository;

    @Autowired
    private ProyectoRepository proyectoRepository;

    @PostMapping("/crear")
    public ResponseEntity<Equipo> crearEquipo(@RequestBody Equipo equipo) {
        Equipo nuevo = equipoRepository.save(equipo);
        return ResponseEntity.ok(nuevo);
    }


    @PostMapping("/unirse")
    public String unirseAEquipo(@RequestParam Long equipoId, @RequestParam Long estudianteId) {
        Optional<Equipo> equipoOpt = equipoRepository.findById(equipoId);
        Optional<Estudiante> estudianteOpt = estudianteRepository.findById(estudianteId);

        if (equipoOpt.isPresent() && estudianteOpt.isPresent()) {
            Estudiante estudiante = estudianteOpt.get();
            estudiante.setEquipo(equipoOpt.get());
            estudianteRepository.save(estudiante);
            return "Estudiante unido al equipo correctamente.";
        } else {
            return "Equipo o estudiante no encontrado.";
        }
    }

    @PostMapping("/asignarProyecto")
    public String asignarProyecto(@RequestParam Long equipoId, @RequestParam Long proyectoId) {
        Optional<Equipo> equipoOpt = equipoRepository.findById(equipoId);
        Optional<Proyecto> proyectoOpt = proyectoRepository.findById(proyectoId);

        if (equipoOpt.isPresent() && proyectoOpt.isPresent()) {
            Equipo equipo = equipoOpt.get();
            equipo.setProyecto(proyectoOpt.get());
            equipoRepository.save(equipo);
            return "Proyecto asignado al equipo.";
        } else {
            return "Equipo o proyecto no encontrado.";
        }
    }
    
    @GetMapping("/listar")
    public List<Equipo> listarEquipos() {   
        return equipoRepository.findAll();
    }


    @GetMapping("/proyecto/{idEquipo}")
    public ResponseEntity<Proyecto> obtenerProyectoPorEquipo(@PathVariable Long idEquipo) { 
        Optional<Equipo> equipo = equipoRepository.findById(idEquipo);
        if (equipo.isPresent() && equipo.get().getProyecto() != null) {
            return ResponseEntity.ok(equipo.get().getProyecto());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
