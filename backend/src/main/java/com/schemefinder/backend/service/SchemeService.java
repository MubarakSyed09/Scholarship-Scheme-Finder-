package com.schemefinder.backend.service;

import com.schemefinder.backend.dto.ProfileRequest;
import com.schemefinder.backend.model.Scheme;

import java.util.List;

public interface SchemeService {

    List<Scheme> getAllSchemes();

    Scheme getSchemeById(Long id);

    List<Scheme> findEligibleSchemes(ProfileRequest profile);

    Scheme createScheme(Scheme scheme);
}
