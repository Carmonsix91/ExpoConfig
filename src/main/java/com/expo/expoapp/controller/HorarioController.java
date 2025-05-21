package com.expo.expoapp.controller;

import com.expo.expoapp.model.Horario;
import com.expo.expoapp.model.Evento;
import com.expo.expoapp.repository.HorarioRepository;
import com.expo.expoapp.repository.EventoRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api/horarios")
public class HorarioController {

    private final HorarioRepository horarioRepository;
    private final EventoRepository eventoRepository;

    public HorarioController(HorarioRepository horarioRepository, EventoRepository eventoRepository) {
        this.horarioRepository = horarioRepository;
        this.eventoRepository = eventoRepository;
    }

    @GetMapping
    public List<Horario> listar() {
        return horarioRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<?> crear(@RequestBody Horario horario) {
        if (horario.getEvento() == null || horario.getEvento().getId_evento() == null) {
            return ResponseEntity.badRequest().body("Debes proporcionar un evento válido.");
        }

        Optional<Evento> eventoOpt = eventoRepository.findById(horario.getEvento().getId_evento());

        if (eventoOpt.isPresent()) {
            horario.setEvento(eventoOpt.get());
            Horario guardado = horarioRepository.save(horario);
            return ResponseEntity.ok(guardado);
        } else {
            return ResponseEntity
                    .badRequest()
                    .body("No existe un evento con id: " + horario.getEvento().getId_evento());
        }
    }


    @GetMapping("/{id}")
    public Horario obtener(@PathVariable Long id) {
        return horarioRepository.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> actualizar(@PathVariable Long id, @RequestBody Horario horario) {
        if (horario.getEvento() == null || horario.getEvento().getId_evento() == null) {
            return ResponseEntity.badRequest().body("Debes proporcionar un evento válido.");
        }

        Optional<Evento> eventoOpt = eventoRepository.findById(horario.getEvento().getId_evento());

        if (eventoOpt.isPresent()) {
            horario.setId_horario(id);
            horario.setEvento(eventoOpt.get());
            Horario actualizado = horarioRepository.save(horario);
            return ResponseEntity.ok(actualizado);
        } else {
            return ResponseEntity
                    .badRequest()
                    .body("No existe un evento con id: " + horario.getEvento().getId_evento());
        }
    }


    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        horarioRepository.deleteById(id);
    }
}
