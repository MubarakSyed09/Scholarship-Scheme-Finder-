# Eligible Schemes Finder (Indian Student Scholarships & Grants)

A production-ready, full-stack web application designed for Indian students across all 28 states and 8 Union Territories to instantly discover government (Central & State) and institutional scholarship schemes they are eligible for.

Built with a modern, calm, and trustworthy UI adhering to real-world government/ed-tech portal standards. No login is required for students to discover their benefits.

---

## 🏛️ Key Features

- **Personalized Eligibility Engine**: Evaluates criteria across education levels (Class 9 to PhD), annual family income ceilings, caste categories (General, SC, ST, OBC, EBC, DNT, Minority, PwD), minimum marks cutoffs, gender, and state domicile.
- **Hierarchical Priority Sorting**: Matches are prioritized: **Central Government Schemes → State Government Schemes → College / University Grants**, then ordered by income ceiling generosity.
- **Explainable Matching ("Why You Match")**: Breaks down exactly why each scholarship is recommended (e.g. *"Your family income ₹1.2L is below the ₹2.5L limit; SC quota matched; Class 12 covered"*).
- **Direct Application Links**: Instant access to official portals (National Scholarship Portal - NSP, State portals like MahaDBT, Jnanabhumi AP, ePass Telangana, UP Scholarship, AICTE, UGC).
- **Collapsible Document Checklist**: Actionable list of required certificates (Income certificate, Caste certificate, Aadhaar DBT-seeded bank account, Bonafide certificate).
- **Comprehensive Scheme Directory**: Searchable, filterable repository of all 27+ seeded schemes with instant keyword search and faceted filtering.
- **Zero Friction**: 100% free and anonymous with built-in one-click demo student profiles for instant testing.

---

## 📁 Project Architecture & Layout

```text
mfef-project/
├── backend/                       # Spring Boot 3 Java backend
│   ├── .mvn/wrapper/              # Maven Wrapper
│   ├── mvnw / mvnw.cmd            # Cross-platform Maven executable
│   ├── pom.xml                    # Maven dependencies (Web, JPA, H2, Lombok, Validation)
│   └── src/
│       ├── main/
│       │   ├── java/com/schemefinder/backend/
│       │   │   ├── config/        # CorsConfig
│       │   │   ├── controller/    # SchemeController (REST endpoints)
│       │   │   ├── dto/           # ProfileRequest DTO with Jakarta validation
│       │   │   ├── exception/     # GlobalExceptionHandler & ResourceNotFoundException
│       │   │   ├── model/         # Scheme JPA Entity & EducationLevel Enum
│       │   │   ├── repository/    # SchemeRepository (Spring Data JPA)
│       │   │   ├── seeder/        # DataSeeder (Seeds 27 realistic Indian schemes on startup)
│       │   │   ├── service/       # SchemeService & SchemeServiceImpl (Matching & sorting logic)
│       │   │   └── BackendApplication.java
│       │   └── resources/
│       │       └── application.properties # H2 in-memory DB config & PostgreSQL/MySQL templates
│       └── test/                  # Comprehensive JUnit 5 & Spring Boot integration tests
│
├── frontend/                      # React 19 + TypeScript + Vite + Tailwind CSS frontend
│   ├── package.json               # Frontend dependencies (React Router, Lucide icons, Tailwind)
│   ├── vite.config.ts             # Vite configuration with Tailwind and /api proxy
│   ├── tsconfig.json              # Strict TypeScript configuration
│   ├── index.html                 # App shell with Plus Jakarta Sans typography
│   └── src/
│       ├── components/            # Header, Footer, SchemeCard, ProfileForm, FilterBar, Badge
│       ├── pages/                 # LandingPage, ProfilePage, ResultsPage, AllSchemesPage, AboutPage
│       ├── services/              # api.ts (REST client for Spring Boot API)
│       ├── types/                 # Scheme, ProfileRequest, MatchReason interfaces
│       ├── utils/                 # Indian states, categories, levels, and INR helpers
│       ├── App.tsx                # Client-side routing
│       ├── main.tsx               # DOM entry point
│       └── index.css              # Tailwind CSS styling
│
└── README.md                      # Documentation & Run Guide
```

---

## ⚡ Super Easy: Running in VS Code

We have pre-configured `.vscode/tasks.json` and `.vscode/launch.json` for you:

### Option A: VS Code Tasks (Recommended - Runs Both Together)
1. Open this project folder in **VS Code**.
2. Press **`Ctrl + Shift + B`** (or go to `Terminal` → `Run Build Task...`).
3. Select **`🚀 Run Full App (Backend + Frontend)`**.
   - This starts the Spring Boot backend on `:8080` and the Vite frontend on `:5173` simultaneously in dedicated background terminal tabs!
4. Open your browser at **`http://localhost:5173`**.

### Option B: One-Click Run & Debug (F5)
1. Press **`F5`** (or go to `Run and Debug` sidebar `Ctrl + Shift + D` and click the green Play button).
2. Select **`🚀 Full App (Java Backend + Open Browser)`**.
3. It boots Spring Boot with full debugging support and automatically opens your browser at `http://localhost:5173`!

### Option C: One-Click Windows Launcher (`run.bat`)
- Simply double-click **`run.bat`** (or run `.\run.bat` in terminal).
- It automatically spins up both the backend and frontend in separate command windows and launches the application in your default browser.

---

## 🚀 Getting Started (Manual Terminal Commands)

### Prerequisites
- **Java 17+** (Java 21 supported)
- **Node.js 18+** (Node.js 20+ recommended)
- **Git** (optional)

---

### 1. Running the Backend (Spring Boot)

1. Open a terminal and navigate to the `backend/` directory:
   ```bash
   cd backend
   ```

2. Run the application using the included Maven wrapper:
   - **On Linux / macOS:**
     ```bash
     ./mvnw spring-boot:run
     ```
   - **On Windows (Command Prompt / PowerShell):**
     ```cmd
     mvnw.cmd spring-boot:run
     ```

3. The backend starts on port **8080**:
   - API Base: `http://localhost:8080/api`
   - H2 Console: `http://localhost:8080/h2-console`
     - JDBC URL: `jdbc:h2:mem:schemesdb`
     - Username: `sa`
     - Password: *(empty)*

4. Run backend tests:
   ```bash
   ./mvnw test
   # Or on Windows:
   mvnw.cmd test
   ```

---

### 2. Running the Frontend (React + Vite)

1. Open a second terminal and navigate to the `frontend/` directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit:
   ```text
   http://localhost:5173
   ```
   *(Requests to `/api/*` are automatically proxied to `http://localhost:8080` by Vite)*.

---

## 📡 REST API Documentation

### 1. Match Eligible Schemes
- **Method**: `POST`
- **Path**: `/api/match`
- **Request Body (`application/json`)**:
  ```json
  {
    "educationLevel": "UG",
    "category": "OBC",
    "familyIncome": 350000,
    "marksPercent": 80,
    "gender": "Female",
    "state": "Maharashtra",
    "district": "Pune",
    "courseStream": "Technical/Professional"
  }
  ```
- **Response**: `200 OK` with JSON array of matching schemes, sorted by Provider priority (Central → State → College) and income generosity.

### 2. Get All Schemes
- **Method**: `GET`
- **Path**: `/api/schemes`
- **Response**: `200 OK` with all 27+ seeded schemes.

### 3. Get Scheme Details by ID
- **Method**: `GET`
- **Path**: `/api/schemes/{id}`
- **Response**: `200 OK` with complete scheme object or `404 Not Found`.

---

## 🧪 Verified Test Scenarios

The matching algorithm has been validated across standard demographic personas:

1. **Scenario 1 (Low Income, SC, Class 12, Andhra Pradesh)**:
   - *Income*: ₹1,20,000 | *Marks*: 70% | *Category*: SC | *Level*: Class 11–12
   - *Matches*: **Post-Matric Scholarship for SC Students** (Central) and AP fee reimbursement grants.

2. **Scenario 2 (Middle Income, OBC, UG Engineering, Female, Maharashtra)**:
   - *Income*: ₹3,50,000 | *Marks*: 80% | *Category*: OBC | *Level*: UG | *Gender*: Female
   - *Matches*: **AICTE Pragati Scholarship for Girls** (₹50,000/yr), **PM-USP Central Sector**, **MahaDBT Rajarshi Shahu Maharaj Scheme**, and **Women in STEM Fellowships**.

3. **Scenario 3 (High Income, General, PG Master's, Delhi)**:
   - *Income*: ₹15,00,000 | *Marks*: 65% | *Category*: General | *Level*: PG
   - *Matches*: Strictly merit/sports freeships with no income ceiling. Clear guidance provided to check institutional endowments.

---

## 🛠️ Production Build

### Building the Backend JAR
```bash
cd backend
./mvnw clean package -DskipTests
# On Windows:
mvnw.cmd clean package -DskipTests
```
The standalone executable JAR will be located at `backend/target/backend-0.0.1-SNAPSHOT.jar`. Run with:
```bash
java -jar target/backend-0.0.1-SNAPSHOT.jar
```

### Building the Frontend Static Assets
```bash
cd frontend
npm run build
```
The optimized production bundle will be output to `frontend/dist/`, ready to deploy to Nginx, AWS S3/CloudFront, Cloudflare Pages, Netlify or Vercel.

---

## 🔄 Extending the System

### 1. Adding More Schemes
To seed additional schemes, simply add new entries to `backend/src/main/java/com/schemefinder/backend/seeder/DataSeeder.java` using the `Scheme.builder()` pattern.

### 2. Switching from H2 to PostgreSQL / MySQL
The backend uses Spring Data JPA. To switch to a persistent relational database:
1. Add the driver dependency to `backend/pom.xml` (e.g. `org.postgresql:postgresql` or `com.mysql:mysql-connector-j`).
2. Update `backend/src/main/resources/application.properties` with your database credentials (uncomment the provided template lines).

### 3. Future Enhancements
- **DigiLocker Integration**: Enable one-click verification of caste and income certificates directly via DigiLocker.
- **NSP API Webhooks**: Automatically sync application deadlines and tracking IDs with the official National Scholarship Portal.
- **WhatsApp / SMS Deadline Alerts**: Notify students 7 days before application deadlines close for their matched schemes.
