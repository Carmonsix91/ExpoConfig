package com.expo.expoapp.repository;

import com.expo.expoapp.model.Visitante;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VisitanteRepository extends JpaRepository<Visitante, Long> {
}
