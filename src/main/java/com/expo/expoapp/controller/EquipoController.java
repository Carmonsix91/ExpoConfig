package com.expo.expoapp.controller;

import com.expo.expoapp.model.Equipo;
import com.expo.expoapp.model.Estudiante;
import com.expo.expoapp.model.Proyecto;
import com.expo.expoapp.repository.EquipoRepository;
import com.expo.expoapp.repository.EstudianteRepository;
import com.expo.expoapp.repository.ProyectoRepository;
import org.springframework.beans.factory.annotation.Autowired;
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
    public Equipo crearEquipo(@RequestParam String nombre, @RequestParam String estudianteId) {
        Equipo nuevoEquipo = new Equipo();
        nuevoEquipo.setNombre(nombre);
        nuevoEquipo = equipoRepository.save(nuevoEquipo);

        Optional<Estudiante> estudianteOpt = estudianteRepository.findById(estudianteId);
        if (estudianteOpt.isPresent()) {
            Estudiante estudiante = estudianteOpt.get();
            estudiante.setEquipo(nuevoEquipo);
            estudianteRepository.save(estudiante);
        }

        return nuevoEquipo;
    }

    @PostMapping("/unirse")
    public String unirseAEquipo(@RequestParam Long equipoId, @RequestParam String estudianteId) {
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

    @GetMapping("/proyectoPorEstudiante")
    public Proyecto obtenerProyectoPorEstudiante(@RequestParam String estudianteId) {
        Optional<Estudiante> estudianteOpt = estudianteRepository.findById(estudianteId);
        return estudianteOpt.map(est -> {
            Equipo equipo = est.getEquipo();
            return (equipo != null) ? equipo.getProyecto() : null;
        }).orElse(null);
    }
}
