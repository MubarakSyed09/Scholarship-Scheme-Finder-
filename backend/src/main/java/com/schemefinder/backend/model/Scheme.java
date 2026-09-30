package com.schemefinder.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "schemes")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Scheme {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 255)
    private String name;

    @Column(nullable = false, length = 50)
    private String provider; // "Central", "State", "College"

    @Column(length = 100)
    private String state; // nullable, for state-specific schemes

    @Column(nullable = false, length = 50)
    private String levelMin; // e.g. "CLASS_9_10", "CLASS_11_12", "DIPLOMA", "UG", "PG", "RESEARCH"

    @Column(nullable = false, length = 50)
    private String levelMax;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "scheme_categories", joinColumns = @JoinColumn(name = "scheme_id"))
    @Column(name = "category")
    @Builder.Default
    private List<String> categoryAllowed = new ArrayList<>(); // e.g. ["SC","ST"] or ["General","OBC","EBC","DNT"]

    private Integer incomeMax; // in INR, nullable

    private Integer marksMin; // percentage, nullable

    @Column(nullable = false, length = 50)
    private String genderAllowed; // "ALL", "MALE", "FEMALE", "MALE_FEMALE"

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "scheme_course_streams", joinColumns = @JoinColumn(name = "scheme_id"))
    @Column(name = "course_stream")
    @Builder.Default
    private List<String> courseStreamsAllowed = new ArrayList<>(); // e.g. ["TECHNICAL_PROFESSIONAL"]

    @Column(length = 1000)
    private String benefitSummary;

    @Column(length = 500)
    private String applyUrl;

    @Column(length = 100)
    private String deadline; // e.g. "31 Oct 2026"

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "scheme_docs_required", joinColumns = @JoinColumn(name = "scheme_id"))
    @Column(name = "doc_name")
    @Builder.Default
    private List<String> docsRequired = new ArrayList<>();
}
