package com.schemefinder.backend;

import com.schemefinder.backend.dto.ProfileRequest;
import com.schemefinder.backend.model.Scheme;
import com.schemefinder.backend.service.SchemeService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class BackendApplicationTests {

    @Autowired
    private SchemeService schemeService;

    @Test
    void contextLoads() {
        assertNotNull(schemeService);
    }

    @Test
    @DisplayName("Verify database is seeded with at least 20 schemes")
    void testSeederPopulatedSchemes() {
        List<Scheme> allSchemes = schemeService.getAllSchemes();
        assertTrue(allSchemes.size() >= 20, "Should have at least 20 seeded schemes, found: " + allSchemes.size());
    }

    @Test
    @DisplayName("Scenario 1: Low income (₹1.2L), SC, Class 12, 70%, Andhra Pradesh -> Matches Post-Matric SC & State schemes")
    void testScenario1_LowIncomeSCClass12() {
        ProfileRequest profile = ProfileRequest.builder()
                .educationLevel("CLASS_11_12")
                .category("SC")
                .familyIncome(120000)
                .marksPercent(70)
                .gender("Male")
                .state("Andhra Pradesh")
                .district("Visakhapatnam")
                .courseStream("Science")
                .build();

        List<Scheme> matches = schemeService.findEligibleSchemes(profile);
        assertFalse(matches.isEmpty(), "Matches should not be empty for low income SC student");

        boolean hasPostMatricSC = matches.stream()
                .anyMatch(s -> s.getName().contains("Scheduled Caste") || s.getName().contains("SC"));
        assertTrue(hasPostMatricSC, "Should include Post-Matric Scholarship for SC students");

        // Central schemes should appear before State schemes
        int firstCentralIndex = -1;
        int firstStateIndex = -1;
        for (int i = 0; i < matches.size(); i++) {
            if ("Central".equalsIgnoreCase(matches.get(i).getProvider()) && firstCentralIndex == -1) {
                firstCentralIndex = i;
            }
            if ("State".equalsIgnoreCase(matches.get(i).getProvider()) && firstStateIndex == -1) {
                firstStateIndex = i;
            }
        }
        if (firstCentralIndex != -1 && firstStateIndex != -1) {
            assertTrue(firstCentralIndex < firstStateIndex, "Central schemes must be prioritized over State schemes");
        }
    }

    @Test
    @DisplayName("Scenario 2: Middle income (₹4L), OBC, UG Technical, Female, 80%, Maharashtra -> Matches AICTE Pragati & State schemes")
    void testScenario2_MiddleIncomeOBCFemaleUGTech() {
        ProfileRequest profile = ProfileRequest.builder()
                .educationLevel("UG")
                .category("OBC")
                .familyIncome(400000)
                .marksPercent(80)
                .gender("Female")
                .state("Maharashtra")
                .district("Pune")
                .courseStream("Technical/Professional")
                .build();

        List<Scheme> matches = schemeService.findEligibleSchemes(profile);
        assertFalse(matches.isEmpty(), "Matches should not be empty for OBC female engineering student");

        boolean hasAictePragati = matches.stream()
                .anyMatch(s -> s.getName().contains("Pragati"));
        assertTrue(hasAictePragati, "Should match AICTE Pragati Scholarship for Girls");

        boolean hasMahaScheme = matches.stream()
                .anyMatch(s -> s.getName().contains("Rajarshi Chhatrapati Shahu Maharaj") || "Maharashtra".equalsIgnoreCase(s.getState()));
        assertTrue(hasMahaScheme, "Should match Maharashtra state scholarship");
    }

    @Test
    @DisplayName("Scenario 3: High income (₹15L), General, PG, 65%, Delhi -> Fewer matches (only merit/sports without income cap)")
    void testScenario3_HighIncomeGeneralPG() {
        ProfileRequest profile = ProfileRequest.builder()
                .educationLevel("PG")
                .category("General")
                .familyIncome(1500000)
                .marksPercent(65)
                .gender("Male")
                .state("Delhi")
                .district("New Delhi")
                .courseStream("Commerce")
                .build();

        List<Scheme> matches = schemeService.findEligibleSchemes(profile);
        // Only schemes with NO income cap (incomeMax == null) can match
        for (Scheme scheme : matches) {
            assertNull(scheme.getIncomeMax(), "High income student should only match schemes with no income cap");
        }
        assertTrue(matches.size() < 5, "High income should yield few or no income-tested schemes");
    }
}
