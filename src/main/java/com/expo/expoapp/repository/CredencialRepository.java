package com.expo.expoapp.repository;

import com.expo.expoapp.model.Credencial;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CredencialRepository extends JpaRepository<Credencial, Long> {
}
