package com.schemefinder.backend.service;

import com.schemefinder.backend.dto.ProfileRequest;
import com.schemefinder.backend.exception.ResourceNotFoundException;
import com.schemefinder.backend.model.EducationLevel;
import com.schemefinder.backend.model.Scheme;
import com.schemefinder.backend.repository.SchemeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class SchemeServiceImpl implements SchemeService {

    private final SchemeRepository schemeRepository;

    @Override
    public List<Scheme> getAllSchemes() {
        return schemeRepository.findAll().stream()
                .sorted(Comparator.comparing(this::getProviderPriority)
                        .thenComparing(Scheme::getName, String.CASE_INSENSITIVE_ORDER))
                .collect(Collectors.toList());
    }

    @Override
    public Scheme getSchemeById(Long id) {
        return schemeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Scheme not found with ID: " + id));
    }

    @Override
    public List<Scheme> findEligibleSchemes(ProfileRequest profile) {
        log.info("Evaluating eligibility for profile: level={}, category={}, income={}, marks={}, gender={}, state={}, stream={}",
                profile.getEducationLevel(), profile.getCategory(), profile.getFamilyIncome(),
                profile.getMarksPercent(), profile.getGender(), profile.getState(), profile.getCourseStream());

        List<Scheme> allSchemes = schemeRepository.findAll();

        return allSchemes.stream()
                .filter(scheme -> isEligible(scheme, profile))
                .sorted(Comparator.comparing(this::getProviderPriority)
                        .thenComparing(this::getEffectiveIncomeMax, Comparator.reverseOrder())
                        .thenComparing(Scheme::getName, String.CASE_INSENSITIVE_ORDER))
                .collect(Collectors.toList());
    }

    @Override
    public Scheme createScheme(Scheme scheme) {
        return schemeRepository.save(scheme);
    }

    private boolean isEligible(Scheme scheme, ProfileRequest profile) {
        // 1. Education Level check
        if (!isEducationLevelEligible(scheme, profile.getEducationLevel())) {
            return false;
        }

        // 2. Category check
        if (!isCategoryEligible(scheme, profile.getCategory())) {
            return false;
        }

        // 3. Family Income check: if incomeMax is set, user's income must be <= incomeMax
        if (scheme.getIncomeMax() != null && profile.getFamilyIncome() != null) {
            if (profile.getFamilyIncome() > scheme.getIncomeMax()) {
                return false;
            }
        }

        // 4. Marks check: if marksMin is set, user's marks must be >= marksMin
        if (scheme.getMarksMin() != null && profile.getMarksPercent() != null) {
            if (profile.getMarksPercent() < scheme.getMarksMin()) {
                return false;
            }
        }

        // 5. Gender check
        if (!isGenderEligible(scheme, profile.getGender())) {
            return false;
        }

        // 6. Course Stream check
        if (!isCourseStreamEligible(scheme, profile.getCourseStream())) {
            return false;
        }

        // 7. State check
        if (!isStateEligible(scheme, profile.getState())) {
            return false;
        }

        return true;
    }

    private boolean isEducationLevelEligible(Scheme scheme, String profileLevelStr) {
        EducationLevel userLevel = EducationLevel.fromString(profileLevelStr);
        if (userLevel == null) {
            return false;
        }

        EducationLevel minLevel = EducationLevel.fromString(scheme.getLevelMin());
        EducationLevel maxLevel = EducationLevel.fromString(scheme.getLevelMax());

        int userRank = userLevel.getRank();
        int minRank = minLevel != null ? minLevel.getRank() : Integer.MIN_VALUE;
        int maxRank = maxLevel != null ? maxLevel.getRank() : Integer.MAX_VALUE;

        return userRank >= minRank && userRank <= maxRank;
    }

    private boolean isCategoryEligible(Scheme scheme, String profileCategory) {
        List<String> allowedCategories = scheme.getCategoryAllowed();
        if (allowedCategories == null || allowedCategories.isEmpty()) {
            return true;
        }

        if (profileCategory == null || profileCategory.trim().isEmpty()) {
            return false;
        }

        String userCat = profileCategory.trim().toUpperCase();

        return allowedCategories.stream().anyMatch(cat -> {
            if (cat == null) return false;
            String allowed = cat.trim().toUpperCase();
            if (allowed.equals("ALL") || allowed.equals("ANY")) {
                return true;
            }
            if (allowed.equals(userCat)) {
                return true;
            }
            // Match sub-elements (e.g., "OBC/EBC/DNT" or "SC/ST")
            String[] tokens = allowed.split("[/,\\s]+");
            for (String token : tokens) {
                if (token.equalsIgnoreCase(userCat)) {
                    return true;
                }
            }
            // General / Open equivalence
            if ((userCat.equals("GENERAL") && allowed.contains("OPEN")) ||
                (userCat.equals("OPEN") && allowed.contains("GENERAL"))) {
                return true;
            }
            return false;
        });
    }

    private boolean isGenderEligible(Scheme scheme, String profileGender) {
        String allowed = scheme.getGenderAllowed();
        if (allowed == null || allowed.trim().isEmpty() || allowed.equalsIgnoreCase("ALL")) {
            return true;
        }

        if (profileGender == null || profileGender.trim().isEmpty()) {
            return false;
        }

        String userGender = profileGender.trim().toUpperCase();
        String reqGender = allowed.trim().toUpperCase();

        if (reqGender.equals("FEMALE")) {
            return userGender.equals("FEMALE");
        }
        if (reqGender.equals("MALE")) {
            return userGender.equals("MALE");
        }
        if (reqGender.equals("MALE_FEMALE")) {
            return userGender.equals("MALE") || userGender.equals("FEMALE");
        }

        return true;
    }

    private boolean isCourseStreamEligible(Scheme scheme, String profileStream) {
        List<String> allowedStreams = scheme.getCourseStreamsAllowed();
        if (allowedStreams == null || allowedStreams.isEmpty()) {
            return true; // No stream restriction applies
        }

        if (profileStream == null || profileStream.trim().isEmpty()) {
            return false;
        }

        String userStreamNorm = normalizeStream(profileStream);

        return allowedStreams.stream().anyMatch(s -> {
            if (s == null) return false;
            String sNorm = normalizeStream(s);
            if (sNorm.equals("ALL") || sNorm.equals("ANY")) {
                return true;
            }
            return sNorm.equals(userStreamNorm) || sNorm.contains(userStreamNorm) || userStreamNorm.contains(sNorm);
        });
    }

    private String normalizeStream(String stream) {
        if (stream == null) return "";
        return stream.trim().toUpperCase()
                .replace(" ", "_")
                .replace("-", "_")
                .replace("/", "_");
    }

    private boolean isStateEligible(Scheme scheme, String profileState) {
        String schemeState = scheme.getState();
        if (schemeState == null || schemeState.trim().isEmpty() ||
                schemeState.equalsIgnoreCase("ALL") ||
                schemeState.equalsIgnoreCase("Pan-India")) {
            return true; // Central / Pan-India scheme
        }

        if (profileState == null || profileState.trim().isEmpty()) {
            return false;
        }

        return schemeState.trim().equalsIgnoreCase(profileState.trim());
    }

    private int getProviderPriority(Scheme scheme) {
        String provider = scheme.getProvider();
        if (provider == null) return 4;
        String p = provider.trim().toUpperCase();
        if (p.contains("CENTRAL")) return 1;
        if (p.contains("STATE")) return 2;
        if (p.contains("COLLEGE") || p.contains("INSTITUTE")) return 3;
        return 4;
    }

    private int getEffectiveIncomeMax(Scheme scheme) {
        // Schemes without income limit (null) are considered most generous / highest ceiling
        return scheme.getIncomeMax() != null ? scheme.getIncomeMax() : Integer.MAX_VALUE;
    }
}
