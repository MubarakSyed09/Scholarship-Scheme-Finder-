package com.schemefinder.backend.model;

import lombok.Getter;

import java.util.Arrays;

@Getter
public enum EducationLevel {
    CLASS_9_10(1, "Class 9-10"),
    CLASS_11_12(2, "Class 11-12"),
    DIPLOMA(3, "Diploma"),
    UG(4, "Undergraduate (UG)"),
    PG(5, "Postgraduate (PG)"),
    RESEARCH(6, "PhD / Research");

    private final int rank;
    private final String displayName;

    EducationLevel(int rank, String displayName) {
        this.rank = rank;
        this.displayName = displayName;
    }

    public static EducationLevel fromString(String value) {
        if (value == null || value.trim().isEmpty()) {
            return null;
        }
        String normalized = value.trim().toUpperCase()
                .replace(" ", "_")
                .replace("-", "_")
                .replace("/", "_")
                .replace("(", "")
                .replace(")", "");

        // Match exact or startsWith
        for (EducationLevel level : EducationLevel.values()) {
            if (level.name().equalsIgnoreCase(normalized)) {
                return level;
            }
        }
        if (normalized.contains("9") || normalized.contains("10")) {
            return CLASS_9_10;
        }
        if (normalized.contains("11") || normalized.contains("12")) {
            return CLASS_11_12;
        }
        if (normalized.contains("DIPLOMA")) {
            return DIPLOMA;
        }
        if (normalized.contains("UG") || normalized.contains("UNDERGRADUATE") || normalized.contains("BACHELOR")) {
            return UG;
        }
        if (normalized.contains("PG") || normalized.contains("POSTGRADUATE") || normalized.contains("MASTER")) {
            return PG;
        }
        if (normalized.contains("RESEARCH") || normalized.contains("PHD") || normalized.contains("DOCTORAL")) {
            return RESEARCH;
        }
        return null;
    }
}
