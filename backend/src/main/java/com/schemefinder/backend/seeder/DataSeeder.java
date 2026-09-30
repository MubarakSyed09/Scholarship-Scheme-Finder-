package com.schemefinder.backend.seeder;

import com.schemefinder.backend.model.Scheme;
import com.schemefinder.backend.repository.SchemeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataSeeder implements CommandLineRunner {

    private final SchemeRepository schemeRepository;

    @Override
    public void run(String... args) {
        if (schemeRepository.count() > 0) {
            log.info("Database already seeded with {} schemes.", schemeRepository.count());
            return;
        }

        log.info("Seeding realistic Indian scholarship and financial aid schemes...");
        List<Scheme> schemes = new ArrayList<>();

        // 1. NSP Pre-Matric Scholarship for Minorities
        schemes.add(Scheme.builder()
                .name("Pre-Matric Scholarship Scheme for Minorities")
                .provider("Central")
                .state(null)
                .levelMin("CLASS_9_10")
                .levelMax("CLASS_9_10")
                .categoryAllowed(List.of("Minority"))
                .incomeMax(100000)
                .marksMin(50)
                .genderAllowed("ALL")
                .courseStreamsAllowed(Collections.emptyList())
                .benefitSummary("Admission and tuition fee up to ₹4,000/year plus maintenance allowance of ₹500/month.")
                .applyUrl("https://scholarships.gov.in")
                .deadline("31 Oct 2026")
                .docsRequired(List.of(
                        "Self-declaration of Minority Community certificate",
                        "Family Income Certificate from Competent Authority",
                        "Previous Year Marksheet (min 50%)",
                        "Aadhaar Card of student",
                        "Active Bank Account details linked to Aadhaar",
                        "Current School Bonafide Certificate"
                ))
                .build());

        // 2. NSP Post-Matric Scholarship for SC Students
        schemes.add(Scheme.builder()
                .name("Post-Matric Scholarship for Scheduled Caste (SC) Students")
                .provider("Central")
                .state(null)
                .levelMin("CLASS_11_12")
                .levelMax("RESEARCH")
                .categoryAllowed(List.of("SC"))
                .incomeMax(250000)
                .marksMin(null)
                .genderAllowed("ALL")
                .courseStreamsAllowed(Collections.emptyList())
                .benefitSummary("100% compulsory non-refundable fees reimbursed + monthly maintenance allowance up to ₹13,500/year.")
                .applyUrl("https://scholarships.gov.in")
                .deadline("30 Nov 2026")
                .docsRequired(List.of(
                        "Valid SC Caste Certificate issued by Tehsildar/SDM",
                        "Income Certificate (annual family income ≤ ₹2.5 Lakhs)",
                        "Previous Academic Marksheet / Passing Certificate",
                        "College Fee Structure Receipt",
                        "Aadhaar Card with biometric verification",
                        "Bank Account Passbook (Direct Benefit Transfer enabled)"
                ))
                .build());

        // 3. NSP Post-Matric Scholarship for ST Students
        schemes.add(Scheme.builder()
                .name("Post-Matric Scholarship for Scheduled Tribe (ST) Students")
                .provider("Central")
                .state(null)
                .levelMin("CLASS_11_12")
                .levelMax("RESEARCH")
                .categoryAllowed(List.of("ST"))
                .incomeMax(250000)
                .marksMin(null)
                .genderAllowed("ALL")
                .courseStreamsAllowed(Collections.emptyList())
                .benefitSummary("Full mandatory tuition and examination fee coverage plus study tour charges and book allowances.")
                .applyUrl("https://scholarships.gov.in")
                .deadline("30 Nov 2026")
                .docsRequired(List.of(
                        "ST Tribe Certificate by authorized Revenue Officer",
                        "Family Income Certificate (≤ ₹2,50,000/annum)",
                        "Class 10/12/Degree marksheets",
                        "Hostel resident proof (if applying for hosteller rate)",
                        "Aadhaar Card & Bank Account linked to NPCI mapper"
                ))
                .build());

        // 4. PM YASASVI Post-Matric Scholarship for OBC, EBC and DNT
        schemes.add(Scheme.builder()
                .name("PM YASASVI Central Sector Scheme for OBC, EBC and DNT Students")
                .provider("Central")
                .state(null)
                .levelMin("CLASS_9_10")
                .levelMax("DIPLOMA")
                .categoryAllowed(List.of("OBC", "EBC", "DNT"))
                .incomeMax(250000)
                .marksMin(60)
                .genderAllowed("ALL")
                .courseStreamsAllowed(Collections.emptyList())
                .benefitSummary("₹75,000/year for Class 9–10 and up to ₹1,25,000/year for Class 11–12 and Polytechnic Diplomas.")
                .applyUrl("https://yet.nta.ac.in")
                .deadline("15 Nov 2026")
                .docsRequired(List.of(
                        "OBC/EBC/DNT Category Certificate",
                        "Income Certificate not exceeding ₹2.5 Lakhs per year",
                        "Qualifying examination marksheet (min 60%)",
                        "NTA PM-YASASVI Admit card / Score card (if applicable)",
                        "Bonafide certificate from recognized school/polytechnic"
                ))
                .build());

        // 5. AICTE Pragati Scholarship for Girls (Degree)
        schemes.add(Scheme.builder()
                .name("AICTE Pragati Scholarship Scheme for Girl Students (Degree)")
                .provider("Central")
                .state(null)
                .levelMin("UG")
                .levelMax("UG")
                .categoryAllowed(List.of("General", "SC", "ST", "OBC", "EBC", "DNT", "Minority", "PwD"))
                .incomeMax(800000)
                .marksMin(null)
                .genderAllowed("FEMALE")
                .courseStreamsAllowed(List.of("Technical/Professional"))
                .benefitSummary("₹50,000 per annum towards college fee, computer/laptop purchase, books, and stationeries.")
                .applyUrl("https://www.aicte-pragati-saksham-gov.in")
                .deadline("31 Dec 2026")
                .docsRequired(List.of(
                        "Class 10 and 12 marksheets",
                        "Centralized Admission Process (CAP) allotment letter for AICTE approved degree course",
                        "Annual Family Income Certificate (below ₹8 Lakh)",
                        "Aadhaar Card",
                        "Bonafide student certificate signed by College Director/Principal"
                ))
                .build());

        // 6. AICTE Pragati Scholarship for Girls (Diploma)
        schemes.add(Scheme.builder()
                .name("AICTE Pragati Scholarship Scheme for Girl Students (Technical Diploma)")
                .provider("Central")
                .state(null)
                .levelMin("DIPLOMA")
                .levelMax("DIPLOMA")
                .categoryAllowed(List.of("General", "SC", "ST", "OBC", "EBC", "DNT", "Minority", "PwD"))
                .incomeMax(800000)
                .marksMin(null)
                .genderAllowed("FEMALE")
                .courseStreamsAllowed(List.of("Technical/Professional", "Vocational"))
                .benefitSummary("₹50,000 per annum for each year of study (max 3 years) for technical diploma students.")
                .applyUrl("https://scholarships.gov.in")
                .deadline("31 Dec 2026")
                .docsRequired(List.of(
                        "Class 10 Board Marksheet",
                        "Polytechnic Admission Allotment letter",
                        "Tahsildar Income Certificate (<= ₹8,00,000/yr)",
                        "Aadhaar linked bank account passbook copy",
                        "College fee structure breakdown"
                ))
                .build());

        // 7. National Means-cum-Merit Scholarship Scheme (NMMSS)
        schemes.add(Scheme.builder()
                .name("National Means-cum-Merit Scholarship Scheme (NMMSS)")
                .provider("Central")
                .state(null)
                .levelMin("CLASS_9_10")
                .levelMax("CLASS_9_10")
                .categoryAllowed(List.of("General", "SC", "ST", "OBC", "EBC", "DNT", "Minority", "PwD"))
                .incomeMax(350000)
                .marksMin(55)
                .genderAllowed("ALL")
                .courseStreamsAllowed(Collections.emptyList())
                .benefitSummary("₹12,000 per annum (₹1,000 per month) from Class 9 to Class 12 in state/govt-aided schools.")
                .applyUrl("https://scholarships.gov.in")
                .deadline("31 Oct 2026")
                .docsRequired(List.of(
                        "Class 7/8 annual examination marksheet (minimum 55% for Gen/OBC, 50% for SC/ST)",
                        "NMMSS Selection Examination Scorecard",
                        "Parental Income Certificate (≤ ₹3.5 Lakhs)",
                        "Govt or Local Body School enrollment proof",
                        "Bank Account Passbook in student's name"
                ))
                .build());

        // 8. Central Sector Scheme of Scholarship for College and University Students (PM-USP CSSS)
        schemes.add(Scheme.builder()
                .name("Central Sector Scheme of Scholarship for College & University Students (PM-USP)")
                .provider("Central")
                .state(null)
                .levelMin("UG")
                .levelMax("PG")
                .categoryAllowed(List.of("General", "SC", "ST", "OBC", "EBC", "DNT", "Minority", "PwD"))
                .incomeMax(450000)
                .marksMin(80)
                .genderAllowed("ALL")
                .courseStreamsAllowed(List.of("Science", "Commerce", "Arts", "Technical/Professional"))
                .benefitSummary("₹12,000/year for first 3 years of graduation; ₹20,000/year at postgraduate level.")
                .applyUrl("https://scholarships.gov.in")
                .deadline("31 Oct 2026")
                .docsRequired(List.of(
                        "Class 12 Board Marksheet (above 80th percentile in relevant board)",
                        "Annual Family Income Certificate (below ₹4.5 Lakhs)",
                        "Current College Admission Receipt and Bonafide Certificate",
                        "Aadhaar Card",
                        "College joining report verified by HOD"
                ))
                .build());

        // 9. Begum Hazrat Mahal National Scholarship
        schemes.add(Scheme.builder()
                .name("Begum Hazrat Mahal National Scholarship for Meritorious Minority Girls")
                .provider("Central")
                .state(null)
                .levelMin("CLASS_9_10")
                .levelMax("CLASS_11_12")
                .categoryAllowed(List.of("Minority"))
                .incomeMax(200000)
                .marksMin(55)
                .genderAllowed("FEMALE")
                .courseStreamsAllowed(Collections.emptyList())
                .benefitSummary("₹5,000 for Class 9 & 10; ₹6,000 for Class 11 & 12 paid directly to student's bank account.")
                .applyUrl("https://scholarships.gov.in")
                .deadline("15 Nov 2026")
                .docsRequired(List.of(
                        "Self-declaration certificate of Minority Community",
                        "Marksheet of previous qualifying class (min 55% marks)",
                        "Income certificate issued by competent district authority",
                        "School verification form signed by Principal",
                        "Student Aadhaar card and Bank Account passbook"
                ))
                .build());

        // 10. AICTE Saksham Scholarship for Specially-Abled Students
        schemes.add(Scheme.builder()
                .name("AICTE Saksham Scholarship Scheme for Specially-Abled Students (Degree/Diploma)")
                .provider("Central")
                .state(null)
                .levelMin("DIPLOMA")
                .levelMax("UG")
                .categoryAllowed(List.of("PwD", "General", "SC", "ST", "OBC", "EBC"))
                .incomeMax(800000)
                .marksMin(null)
                .genderAllowed("ALL")
                .courseStreamsAllowed(List.of("Technical/Professional", "Vocational"))
                .benefitSummary("₹50,000 per annum for tuition fees, assistive software, braille displays, and books.")
                .applyUrl("https://www.aicte-india.org")
                .deadline("31 Dec 2026")
                .docsRequired(List.of(
                        "Disability Certificate from Authorized Medical Board (min 40% disability)",
                        "AICTE approved institute admission confirmation letter",
                        "Family income certificate below ₹8 Lakhs",
                        "Class 10/12/Diploma marksheets",
                        "Aadhaar Card and Student Bank Passbook"
                ))
                .build());

        // 11. Ishan Uday Special Scholarship for North Eastern Region (NER)
        schemes.add(Scheme.builder()
                .name("Ishan Uday Special Scholarship Scheme for North Eastern Region (UGC)")
                .provider("Central")
                .state(null)
                .levelMin("UG")
                .levelMax("UG")
                .categoryAllowed(List.of("General", "SC", "ST", "OBC", "EBC", "DNT", "Minority", "PwD"))
                .incomeMax(450000)
                .marksMin(null)
                .genderAllowed("ALL")
                .courseStreamsAllowed(Collections.emptyList())
                .benefitSummary("₹5,400 per month for general degree courses; ₹7,800 per month for technical/medical/professional courses.")
                .applyUrl("https://scholarships.gov.in")
                .deadline("30 Nov 2026")
                .docsRequired(List.of(
                        "Domicile / Permanent Resident Certificate (PRC) of any NE state (Assam, Meghalaya, etc.)",
                        "Income Certificate proving parental income ≤ ₹4.5 Lakhs",
                        "Class 12 examination passing certificate",
                        "Bonafide certificate of admission in first year of regular degree course"
                ))
                .build());

        // 12. INSPIRE Scholarship for Higher Education (SHE) - DST
        schemes.add(Scheme.builder()
                .name("INSPIRE Scholarship for Higher Education (SHE) - Department of Science & Tech")
                .provider("Central")
                .state(null)
                .levelMin("UG")
                .levelMax("PG")
                .categoryAllowed(List.of("General", "SC", "ST", "OBC", "EBC", "DNT", "Minority", "PwD"))
                .incomeMax(null) // Merit based, no income cap
                .marksMin(85)
                .genderAllowed("ALL")
                .courseStreamsAllowed(List.of("Science"))
                .benefitSummary("₹80,000 per annum (₹60,000 cash scholarship + ₹20,000 summer mentorship project grant).")
                .applyUrl("https://online-inspire.gov.in")
                .deadline("15 Dec 2026")
                .docsRequired(List.of(
                        "Class 12 marksheet (top 1% rank in respective State/Central Board)",
                        "Proof of enrollment in B.Sc., B.S., or Int. M.Sc. in Natural & Basic Sciences",
                        "Endorsement certificate signed by Head of Institution",
                        "Aadhaar Card and active SBI/Nationalized bank passbook"
                ))
                .build());

        // 13. Post Graduate Indira Gandhi Scholarship for Single Girl Child (UGC)
        schemes.add(Scheme.builder()
                .name("Post Graduate Indira Gandhi Scholarship for Single Girl Child (UGC)")
                .provider("Central")
                .state(null)
                .levelMin("PG")
                .levelMax("PG")
                .categoryAllowed(List.of("General", "SC", "ST", "OBC", "EBC", "DNT", "Minority", "PwD"))
                .incomeMax(null) // No income ceiling
                .marksMin(60)
                .genderAllowed("FEMALE")
                .courseStreamsAllowed(Collections.emptyList())
                .benefitSummary("₹36,200 per annum for the 2-year duration of full-time regular PG Master’s degree.")
                .applyUrl("https://scholarships.gov.in")
                .deadline("30 Nov 2026")
                .docsRequired(List.of(
                        "Affidavit on ₹100 stamp paper attested by SDM/First Class Magistrate verifying single girl child status",
                        "UG Degree marksheet with at least 60% aggregate",
                        "Admission proof in first year of regular non-professional PG course",
                        "Aadhaar Card"
                ))
                .build());

        // 14. Post Graduate Merit Scholarship for University Rank Holders (UGC)
        schemes.add(Scheme.builder()
                .name("Post Graduate Merit Scholarship for University Rank Holders (UGC)")
                .provider("Central")
                .state(null)
                .levelMin("PG")
                .levelMax("PG")
                .categoryAllowed(List.of("General", "SC", "ST", "OBC", "EBC", "DNT", "Minority", "PwD"))
                .incomeMax(null)
                .marksMin(75)
                .genderAllowed("ALL")
                .courseStreamsAllowed(List.of("Science", "Commerce", "Arts"))
                .benefitSummary("₹3,100 per month for 2 years (duration of PG program) with zero tuition fee at central universities.")
                .applyUrl("https://scholarships.gov.in")
                .deadline("31 Oct 2026")
                .docsRequired(List.of(
                        "University 1st / 2nd Rank Certificate issued by Controller of Examinations",
                        "UG Final Degree Marksheet & Transcript",
                        "Current PG College enrollment certificate",
                        "Bank Account details linked to Aadhaar"
                ))
                .build());

        // 15. Andhra Pradesh - Jagananna Vidya Deevena (RTF)
        schemes.add(Scheme.builder()
                .name("Jagananna Vidya Deevena (Complete Fee Reimbursement Scheme)")
                .provider("State")
                .state("Andhra Pradesh")
                .levelMin("DIPLOMA")
                .levelMax("PG")
                .categoryAllowed(List.of("SC", "ST", "BC", "EBC", "Minority", "PwD", "General"))
                .incomeMax(250000)
                .marksMin(null)
                .genderAllowed("ALL")
                .courseStreamsAllowed(Collections.emptyList())
                .benefitSummary("100% full fee reimbursement credited quarterly directly to the beneficiary student's mother's account.")
                .applyUrl("https://jnanabhumi.ap.gov.in")
                .deadline("15 Nov 2026")
                .docsRequired(List.of(
                        "AP Integrated Caste & Residence Certificate",
                        "MeeSeva Income Certificate (< ₹2.5 Lakhs / yr)",
                        "Rice Card / Ration Card proof",
                        "Mother's Aadhaar & Bank Account linked to NPCI",
                        "College admission and current semester attendance certificate (min 75%)"
                ))
                .build());

        // 16. Andhra Pradesh - Jagananna Vasathi Deevena (MTF)
        schemes.add(Scheme.builder()
                .name("Jagananna Vasathi Deevena (Hostel & Food Maintenance)")
                .provider("State")
                .state("Andhra Pradesh")
                .levelMin("DIPLOMA")
                .levelMax("PG")
                .categoryAllowed(List.of("SC", "ST", "BC", "EBC", "Minority", "PwD", "General"))
                .incomeMax(250000)
                .marksMin(null)
                .genderAllowed("ALL")
                .courseStreamsAllowed(Collections.emptyList())
                .benefitSummary("₹10,000/yr for ITI, ₹15,000/yr for Polytechnic, ₹20,000/yr for Degree/Engineering for food & hostel expenses.")
                .applyUrl("https://jnanabhumi.ap.gov.in")
                .deadline("15 Nov 2026")
                .docsRequired(List.of(
                        "AP Domicile Certificate",
                        "Valid Rice Card / BPL card",
                        "Income certificate issued by Tahsildar",
                        "College Bonafide and biometric attendance record"
                ))
                .build());

        // 17. Telangana - ePass Post-Matric Scholarship Scheme
        schemes.add(Scheme.builder()
                .name("Telangana ePass Post-Matric Scholarship (RTF & MTF)")
                .provider("State")
                .state("Telangana")
                .levelMin("CLASS_11_12")
                .levelMax("RESEARCH")
                .categoryAllowed(List.of("SC", "ST", "BC", "EBC", "Minority", "PwD"))
                .incomeMax(200000)
                .marksMin(null)
                .genderAllowed("ALL")
                .courseStreamsAllowed(Collections.emptyList())
                .benefitSummary("Full Reimbursement of Tuition Fee (RTF) + Monthly Maintenance Fee (MTF) up to ₹15,000/year.")
                .applyUrl("https://telanganaepass.cgg.gov.in")
                .deadline("30 Nov 2026")
                .docsRequired(List.of(
                        "MeeSeva Caste Certificate with C-number",
                        "MeeSeva Income Certificate (< ₹2 Lakh for BC/EBC, < ₹2.5 Lakh for SC/ST)",
                        "SSC / Inter memo and bonafide study certificates (past 7 years)",
                        "Aadhaar card seeded with bank account",
                        "College Admission Allotment Order"
                ))
                .build());

        // 18. Uttar Pradesh - UP Post-Matric Scholarship Scheme
        schemes.add(Scheme.builder()
                .name("Uttar Pradesh Post-Matric Dashmottar Scholarship & Fee Reimbursement")
                .provider("State")
                .state("Uttar Pradesh")
                .levelMin("CLASS_11_12")
                .levelMax("RESEARCH")
                .categoryAllowed(List.of("General", "SC", "ST", "OBC", "Minority"))
                .incomeMax(250000)
                .marksMin(50)
                .genderAllowed("ALL")
                .courseStreamsAllowed(Collections.emptyList())
                .benefitSummary("Full government college tuition fee refund + non-refundable charges + monthly stipend.")
                .applyUrl("https://scholarship.up.gov.in")
                .deadline("20 Nov 2026")
                .docsRequired(List.of(
                        "UP Niwas Praman Patra (Domicile Certificate)",
                        "Jati Praman Patra (Caste Certificate)",
                        "Aay Praman Patra (Income Certificate below ₹2 Lakh Gen/OBC, ₹2.5 Lakh SC/ST)",
                        "High School / Intermediate marksheet",
                        "College Fee Receipt & Bonafide letter"
                ))
                .build());

        // 19. Maharashtra - Rajarshi Chhatrapati Shahu Maharaj Shikshan Shulkh Shishyavrutti Yojna
        schemes.add(Scheme.builder()
                .name("Rajarshi Chhatrapati Shahu Maharaj Shikshan Shulkh Shishyavrutti Yojna (EBC)")
                .provider("State")
                .state("Maharashtra")
                .levelMin("DIPLOMA")
                .levelMax("PG")
                .categoryAllowed(List.of("General", "OBC", "EBC"))
                .incomeMax(800000)
                .marksMin(50)
                .genderAllowed("ALL")
                .courseStreamsAllowed(List.of("Technical/Professional", "Science", "Commerce", "Arts"))
                .benefitSummary("50% Tuition Fee & 50% Exam Fee waiver in Government, Aided and Non-Aided Professional Institutes.")
                .applyUrl("https://mahadbt.maharashtra.gov.in")
                .deadline("31 Dec 2026")
                .docsRequired(List.of(
                        "Maharashtra Domicile Certificate",
                        "Income Certificate issued by Tahsildar (annual income ≤ ₹8 Lakhs)",
                        "CAP Admission Allotment letter",
                        "Previous Year marksheets (no drop year)",
                        "Ration card & Aadhaar linked bank account"
                ))
                .build());

        // 20. Maharashtra - Dr. Panjabrao Deshmukh Vasatigruh Nirvah Bhatta Yojna
        schemes.add(Scheme.builder()
                .name("Dr. Panjabrao Deshmukh Hostel Maintenance Allowance Scheme")
                .provider("State")
                .state("Maharashtra")
                .levelMin("UG")
                .levelMax("PG")
                .categoryAllowed(List.of("General", "OBC", "EBC", "SC", "ST"))
                .incomeMax(800000)
                .marksMin(null)
                .genderAllowed("ALL")
                .courseStreamsAllowed(List.of("Technical/Professional", "Vocational"))
                .benefitSummary("Hostel maintenance allowance up to ₹30,000/year for students in MMR/Pune/Nagpur; ₹20,000 elsewhere.")
                .applyUrl("https://mahadbt.maharashtra.gov.in")
                .deadline("31 Dec 2026")
                .docsRequired(List.of(
                        "Parental land holding certificate (Alpabhudharak) or registered labor certificate",
                        "Maharashtra Domicile Certificate",
                        "Hostel admission certificate and fee receipts",
                        "College Bonafide certificate"
                ))
                .build());

        // 21. Karnataka - Vidyasiri (SSP Post-Matric Scholarship Scheme)
        schemes.add(Scheme.builder()
                .name("Karnataka Vidyasiri (SSP Post-Matric Scholarship Scheme)")
                .provider("State")
                .state("Karnataka")
                .levelMin("CLASS_11_12")
                .levelMax("RESEARCH")
                .categoryAllowed(List.of("SC", "ST", "OBC", "Minority"))
                .incomeMax(250000)
                .marksMin(null)
                .genderAllowed("ALL")
                .courseStreamsAllowed(Collections.emptyList())
                .benefitSummary("Full maintenance allowance of ₹1,500/month for 10 months + complete fee concession.")
                .applyUrl("https://ssp.postmatric.karnataka.gov.in")
                .deadline("30 Nov 2026")
                .docsRequired(List.of(
                        "Karnataka RD Number for Caste and Income Certificate",
                        "SSLC Registration Number & Marks Card",
                        "College Registration / Student E-Attestation Document",
                        "Aadhaar Number seeded with Bank NPCI mapper"
                ))
                .build());

        // 22. Tamil Nadu - Moovalur Ramamirtham Ammaiyar Higher Education Assurance Scheme (Pudhumai Penn)
        schemes.add(Scheme.builder()
                .name("Pudhumai Penn Scheme (Moovalur Ramamirtham Ammaiyar Higher Education)")
                .provider("State")
                .state("Tamil Nadu")
                .levelMin("DIPLOMA")
                .levelMax("UG")
                .categoryAllowed(List.of("General", "SC", "ST", "OBC", "EBC", "Minority", "PwD"))
                .incomeMax(null) // No income ceiling for girls educated in govt schools
                .marksMin(null)
                .genderAllowed("FEMALE")
                .courseStreamsAllowed(Collections.emptyList())
                .benefitSummary("Monthly cash assistance of ₹1,000 directly transferred to girl student's account till graduation.")
                .applyUrl("https://penkalvi.tn.gov.in")
                .deadline("30 Nov 2026")
                .docsRequired(List.of(
                        "Proof of study in Tamil Nadu Government Schools from Class 6 to Class 12",
                        "Class 10 and 12 Transfer Certificate (TC)",
                        "Undergraduate or Polytechnic admission card",
                        "Aadhaar card & active Savings Bank Account details"
                ))
                .build());

        // 23. West Bengal - Swami Vivekananda Merit-cum-Means Scholarship (SVMCM)
        schemes.add(Scheme.builder()
                .name("Swami Vivekananda Merit-cum-Means Scholarship (SVMCM 4.0)")
                .provider("State")
                .state("West Bengal")
                .levelMin("CLASS_11_12")
                .levelMax("RESEARCH")
                .categoryAllowed(List.of("General", "SC", "ST", "OBC", "EBC", "Minority", "PwD"))
                .incomeMax(250000)
                .marksMin(60)
                .genderAllowed("ALL")
                .courseStreamsAllowed(Collections.emptyList())
                .benefitSummary("₹1,000 to ₹5,000 per month (₹12,000 to ₹60,000 annually) based on level of higher study.")
                .applyUrl("https://svmcm.wbhed.gov.in")
                .deadline("15 Dec 2026")
                .docsRequired(List.of(
                        "Madhyamik (Class 10) or Higher Secondary marksheet (min 60% marks)",
                        "Income certificate issued by BDO / SDO / Joint BDO",
                        "West Bengal Residential / Domicile Certificate",
                        "Current course admission receipt",
                        "First page of Bank Passbook"
                ))
                .build());

        // 24. Rajasthan - Chief Minister Higher Education Scholarship Scheme
        schemes.add(Scheme.builder()
                .name("Rajasthan Chief Minister Higher Education Scholarship Scheme (Mukhyamantri Uchh Shiksha)")
                .provider("State")
                .state("Rajasthan")
                .levelMin("UG")
                .levelMax("PG")
                .categoryAllowed(List.of("General", "SC", "ST", "OBC", "EBC", "Minority"))
                .incomeMax(250000)
                .marksMin(60)
                .genderAllowed("ALL")
                .courseStreamsAllowed(Collections.emptyList())
                .benefitSummary("₹500 per month (₹5,000 per year) for a maximum of 5 years of higher education.")
                .applyUrl("https://hte.rajasthan.gov.in")
                .deadline("31 Oct 2026")
                .docsRequired(List.of(
                        "Jan Aadhaar Card / Bhamashah Card",
                        "Rajasthan Board Senior Secondary Marksheet (top priority list)",
                        "Income certificate (< ₹2,50,000 per year)",
                        "Bonafide certificate from higher educational institution"
                ))
                .build());

        // 25. College Merit-cum-Means Institutional Fellowship
        schemes.add(Scheme.builder()
                .name("College Merit-cum-Means (MCM) Institutional Financial Grant")
                .provider("College")
                .state(null)
                .levelMin("UG")
                .levelMax("PG")
                .categoryAllowed(List.of("General", "SC", "ST", "OBC", "EBC", "DNT", "Minority", "PwD"))
                .incomeMax(500000)
                .marksMin(75)
                .genderAllowed("ALL")
                .courseStreamsAllowed(Collections.emptyList())
                .benefitSummary("100% or 50% Institute tuition fee waiver + ₹1,000/month stipend towards study materials.")
                .applyUrl("https://scholarships.gov.in")
                .deadline("15 Oct 2026")
                .docsRequired(List.of(
                        "Annual Parent IT Return (ITR-V) or Salary Slip / Tahsildar Certificate",
                        "Current Cumulative Grade Point Average (CGPA min 7.5 / 75%)",
                        "Dean / Academic Office verification slip",
                        "Hostel & Mess clearance slip"
                ))
                .build());

        // 26. College Alumni Endowment Scholarship for Women in STEM
        schemes.add(Scheme.builder()
                .name("College Alumni Endowment Scholarship for Women in STEM")
                .provider("College")
                .state(null)
                .levelMin("UG")
                .levelMax("RESEARCH")
                .categoryAllowed(List.of("General", "SC", "ST", "OBC", "EBC", "DNT", "Minority", "PwD"))
                .incomeMax(600000)
                .marksMin(70)
                .genderAllowed("FEMALE")
                .courseStreamsAllowed(List.of("Technical/Professional", "Science"))
                .benefitSummary("₹40,000 one-time annual grant + dedicated mentorship by global alumni leaders.")
                .applyUrl("https://scholarships.gov.in")
                .deadline("30 Oct 2026")
                .docsRequired(List.of(
                        "College ID Card & Bonafide letter from Department Head",
                        "Statement of Purpose (SOP) on STEM research/career goals",
                        "Previous Semester Grade Sheet",
                        "Family income proof below ₹6,00,000"
                ))
                .build());

        // 27. Institute Sports & Cultural Excellence Freeship
        schemes.add(Scheme.builder()
                .name("Institute Academic & Sports Excellence Freeship")
                .provider("College")
                .state(null)
                .levelMin("DIPLOMA")
                .levelMax("PG")
                .categoryAllowed(List.of("General", "SC", "ST", "OBC", "EBC", "DNT", "Minority", "PwD"))
                .incomeMax(null) // Open to all income levels based on exceptional achievement
                .marksMin(65)
                .genderAllowed("ALL")
                .courseStreamsAllowed(Collections.emptyList())
                .benefitSummary("Complete sports facility fee waiver and 50% tuition reimbursement for state/national achievers.")
                .applyUrl("https://scholarships.gov.in")
                .deadline("31 Oct 2026")
                .docsRequired(List.of(
                        "State / National / Inter-University Sports or Olympiad Medal Certificate",
                        "Physical Fitness & Sports Department Recommendation",
                        "Semester Academic Marksheet with no backlogs",
                        "College Identity Card"
                ))
                .build());

        schemeRepository.saveAll(schemes);
        log.info("Successfully seeded {} Indian scholarship schemes into H2 database.", schemes.size());
    }
}
