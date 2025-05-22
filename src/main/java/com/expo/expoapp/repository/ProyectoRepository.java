package com.expo.expoapp.repository;

import com.expo.expoapp.model.Proyecto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProyectoRepository extends JpaRepository<Proyecto, Long> {
    
}
