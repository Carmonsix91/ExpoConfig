package com.expo.expoapp.controller;

import com.expo.expoapp.model.Usuario;
import com.expo.expoapp.repository.UsuarioRepository;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UsuarioRepository usuarioRepository;

    public AuthController(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @PostMapping("/register")
    public Usuario registrar(@RequestBody Map<String, String> datos) {
        System.out.println("Datos recibidos:");
        datos.forEach((k, v) -> System.out.println(k + " = " + v));

        Usuario usuario = new Usuario();
        usuario.setNombre(datos.get("name"));
        usuario.setEmail(datos.get("email"));
        usuario.setIdentificador(datos.get("id"));
        usuario.setPassword(datos.get("password"));
        usuario.setTipo(datos.get("userType")); 

        if ("alumno".equalsIgnoreCase(usuario.getTipo())) {
            usuario.setCarrera(datos.get("carrera"));
            usuario.setGrupo(datos.get("grupo"));
            try {
                usuario.setSemestre(Integer.parseInt(datos.get("semestre")));
            } catch (NumberFormatException e) {
                usuario.setSemestre(null);
            }
        }

        return usuarioRepository.save(usuario);
    }

    @PostMapping("/login")
    public Usuario login(@RequestBody Map<String, String> datos) {
        Optional<Usuario> encontrado = usuarioRepository.findByEmail(datos.get("email"));
        if (encontrado.isPresent() && encontrado.get().getPassword().equals(datos.get("password"))) {
            return encontrado.get();
        } else {
            throw new RuntimeException("Credenciales inválidas");
        }
    }
}
