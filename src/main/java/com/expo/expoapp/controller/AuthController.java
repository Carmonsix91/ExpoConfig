package com.expo.expoapp.controller;

import com.expo.expoapp.model.*;
import com.expo.expoapp.repository.*;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UsuarioRepository usuarioRepository;
    private final EstudianteRepository estudianteRepository;
    private final ProfesorRepository profesorRepository;

    public AuthController(UsuarioRepository usuarioRepository,
                          EstudianteRepository estudianteRepository,
                          ProfesorRepository profesorRepository) {
        this.usuarioRepository = usuarioRepository;
        this.estudianteRepository = estudianteRepository;
        this.profesorRepository = profesorRepository;
    }

    @PostMapping("/register")
    public Object registrar(@RequestBody Map<String, String> datos) {  // Cambiado a Object
        System.out.println("Datos recibidos:");
        datos.forEach((k, v) -> System.out.println(k + " = " + v));
        try {
            String tipo = datos.get("userType");
            if ("alumno".equalsIgnoreCase(tipo)) {
                Estudiante estudiante = new Estudiante();
                estudiante.setNombre(datos.get("name"));
                estudiante.setApellido(datos.get("apellido"));
                estudiante.setEmail(datos.get("email"));
                estudiante.setIdentificador(datos.get("id"));
                estudiante.setPassword(datos.get("password"));
                estudiante.setTipo("alumno");
                estudiante.setBoleta(datos.get("id"));
                estudiante.setCarrera(datos.get("carrera"));
                estudiante.setGrupo(datos.get("grupo"));
                try {
                    estudiante.setSemestre(Integer.parseInt(datos.get("semestre")));
                } catch (NumberFormatException e) {
                    estudiante.setSemestre(0);
                }
                return estudianteRepository.save(estudiante);

            } else if ("profesor".equalsIgnoreCase(tipo)) {
                Profesor profesor = new Profesor();
                profesor.setNombre(datos.get("name"));
                profesor.setApellido(datos.get("apellido"));
                profesor.setEmail(datos.get("email"));
                profesor.setIdentificador(datos.get("id"));
                profesor.setPassword(datos.get("password"));
                profesor.setTipo("profesor");
                profesor.setNumeroEmpleado(datos.get("id"));
                return profesorRepository.save(profesor);
            }

            throw new RuntimeException("Tipo de usuario inválido");
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }

    @PostMapping("/login")
    public Object login(@RequestBody Map<String, String> datos) {  // Cambiado a Object
        Optional<Usuario> encontrado = usuarioRepository.findByEmail(datos.get("email"));
        if (encontrado.isPresent() && encontrado.get().getPassword().equals(datos.get("password"))) {
            Usuario usuario = encontrado.get();

            // Buscar si es estudiante o profesor y retornar la entidad completa correspondiente
            Optional<Estudiante> estOpt = estudianteRepository.findByEmail(usuario.getEmail());
            if (estOpt.isPresent()) {
                return estOpt.get();
            }
            Optional<Profesor> profOpt = profesorRepository.findByEmail(usuario.getEmail());
            if (profOpt.isPresent()) {
                return profOpt.get();
            }
            // Si no es estudiante ni profesor, retorna usuario genérico
            return usuario;
        } else {
            throw new RuntimeException("Credenciales inválidas");
        }
    }
}
