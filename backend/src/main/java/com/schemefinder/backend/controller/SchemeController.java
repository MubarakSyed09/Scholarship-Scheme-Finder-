package com.schemefinder.backend.controller;

import com.schemefinder.backend.dto.ProfileRequest;
import com.schemefinder.backend.model.Scheme;
import com.schemefinder.backend.service.SchemeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:3000"})
@RequiredArgsConstructor
@Slf4j
public class SchemeController {

    private final SchemeService schemeService;

    /**
     * GET /api/schemes
     * Returns all schemes in the database.
     */
    @GetMapping("/schemes")
    public ResponseEntity<List<Scheme>> getAllSchemes() {
        List<Scheme> schemes = schemeService.getAllSchemes();
        return ResponseEntity.ok(schemes);
    }

    /**
     * GET /api/schemes/{id}
     * Returns details for a single scheme by its ID.
     */
    @GetMapping("/schemes/{id}")
    public ResponseEntity<Scheme> getSchemeById(@PathVariable Long id) {
        Scheme scheme = schemeService.getSchemeById(id);
        return ResponseEntity.ok(scheme);
    }

    /**
     * POST /api/match
     * Accepts a student's profile and returns a sorted list of eligible schemes.
     */
    @PostMapping("/match")
    public ResponseEntity<List<Scheme>> matchSchemes(@Valid @RequestBody ProfileRequest profile) {
        log.info("Received scheme matching request for: {}", profile);
        List<Scheme> eligibleSchemes = schemeService.findEligibleSchemes(profile);
        return ResponseEntity.ok(eligibleSchemes);
    }
}
