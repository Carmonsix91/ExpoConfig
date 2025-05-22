package com.expo.expoapp.controller;

import com.expo.expoapp.model.Estudiante;
import com.expo.expoapp.model.Equipo;
import com.expo.expoapp.repository.EstudianteRepository;
import com.expo.expoapp.repository.EquipoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/estudiantes")
@CrossOrigin(origins = "*")
public class EstudianteController {

    @Autowired
    private EstudianteRepository estudianteRepository;

    @Autowired
    private EquipoRepository equipoRepository;

    // Obtener todos los estudiantes
    @GetMapping("/listar")
    public List<Estudiante> listarEstudiantes() {
        return estudianteRepository.findAll();
    }

    // Obtener estudiante por ID
    @GetMapping("/{id}")
    public ResponseEntity<Estudiante> obtenerEstudiante(@PathVariable String id) {
        Optional<Estudiante> estudiante = estudianteRepository.findById(id);
        return estudiante.map(ResponseEntity::ok)
                         .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Crear nuevo estudiante
    @PostMapping("/crear")
    public ResponseEntity<Estudiante> crearEstudiante(@RequestBody Estudiante estudiante) {
        return ResponseEntity.ok(estudianteRepository.save(estudiante));
    }

    // Unir estudiante a un equipo
    @PutMapping("/unir/{idEstudiante}/{idEquipo}")
    public ResponseEntity<Estudiante> unirAEquipo(@PathVariable String idEstudiante, @PathVariable Long idEquipo) {
        Optional<Estudiante> estudianteOpt = estudianteRepository.findById(idEstudiante);
        Optional<Equipo> equipoOpt = equipoRepository.findById(idEquipo);

        if (estudianteOpt.isPresent() && equipoOpt.isPresent()) {
            Estudiante estudiante = estudianteOpt.get();
            Equipo equipo = equipoOpt.get();

            estudiante.setEquipo(equipo);
            estudianteRepository.save(estudiante);

            // Puedes agregar lógica aquí si necesitas actualizar la lista de integrantes del equipo,
            // aunque si la relación es @OneToMany en Equipo con mappedBy="equipo" en Estudiante,
            // JPA lo gestiona automáticamente.

            return ResponseEntity.ok(estudiante);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // (Opcional) Remover estudiante de un equipo
    @PutMapping("/salir/{idEstudiante}")
    public ResponseEntity<Estudiante> salirDeEquipo(@PathVariable String idEstudiante) {
        Optional<Estudiante> estudianteOpt = estudianteRepository.findById(idEstudiante);

        if (estudianteOpt.isPresent()) {
            Estudiante estudiante = estudianteOpt.get();
            estudiante.setEquipo(null);
            estudianteRepository.save(estudiante);
            return ResponseEntity.ok(estudiante);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // (Opcional) Actualizar información de estudiante
    @PutMapping("/actualizar/{id}")
    public ResponseEntity<Estudiante> actualizarEstudiante(@PathVariable String id, @RequestBody Estudiante datos) {
        Optional<Estudiante> estudianteOpt = estudianteRepository.findById(id);
        if (estudianteOpt.isPresent()) {
            Estudiante estudiante = estudianteOpt.get();
            estudiante.setNombre(datos.getNombre());
            estudiante.setApellido(datos.getApellido());
            estudiante.setCarrera(datos.getCarrera());
            estudiante.setGrupo(datos.getGrupo());
            estudiante.setSemestre(datos.getSemestre());
            estudiante.setTurno(datos.getTurno());
            // ... otros campos si es necesario
            estudianteRepository.save(estudiante);
            return ResponseEntity.ok(estudiante);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
