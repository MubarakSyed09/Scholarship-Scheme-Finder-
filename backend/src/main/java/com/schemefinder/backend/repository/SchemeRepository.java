package com.schemefinder.backend.repository;

import com.schemefinder.backend.model.Scheme;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SchemeRepository extends JpaRepository<Scheme, Long> {

    List<Scheme> findByProviderIgnoreCase(String provider);

    List<Scheme> findByStateIgnoreCase(String state);
}
