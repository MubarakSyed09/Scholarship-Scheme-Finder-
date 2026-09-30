package com.schemefinder.backend.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProfileRequest {

    @NotBlank(message = "Education level is required")
    private String educationLevel; // e.g. "CLASS_9_10", "CLASS_11_12", "DIPLOMA", "UG", "PG", "RESEARCH"

    @NotBlank(message = "Social category is required")
    private String category; // "General", "SC", "ST", "OBC", "EBC", "DNT", "Minority", "PwD"

    @NotNull(message = "Family annual income is required")
    @Min(value = 0, message = "Family income must be non-negative")
    private Integer familyIncome; // in INR

    @NotNull(message = "Qualifying marks percentage is required")
    @Min(value = 0, message = "Marks percentage must be between 0 and 100")
    @Max(value = 100, message = "Marks percentage must be between 0 and 100")
    private Integer marksPercent; // 0-100

    @NotBlank(message = "Gender is required")
    private String gender; // "Male", "Female", "Other"

    @NotBlank(message = "State of domicile is required")
    private String state;

    private String district;

    @NotBlank(message = "Course stream is required")
    private String courseStream; // e.g. "Science", "Commerce", "Arts", "Vocational", "Technical/Professional"
}
