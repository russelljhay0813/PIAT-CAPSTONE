# Database Structure & Dictionary - BWEST College Management System

## Table Specifications & Data Types

### USER MANAGEMENT TABLES

#### 1. USERS
**Primary Table for User Authentication & Profile**

| Column | Data Type | Size | Null | Key | Default | Constraints | Description |
|--------|-----------|------|------|-----|---------|-------------|-------------|
| user_id | INT | 11 | NO | PK | AUTO_INCREMENT | UNIQUE, AUTO_INCREMENT | Unique user identifier |
| email | VARCHAR | 100 | NO | UQ | NULL | UNIQUE, INDEX | User email address for login |
| password_hash | VARCHAR | 255 | NO | - | NULL | NOT NULL | Hashed password (bcrypt) |
| first_name | VARCHAR | 50 | NO | - | NULL | NOT NULL | User's first name |
| last_name | VARCHAR | 50 | NO | - | NULL | NOT NULL | User's last name |
| phone | VARCHAR | 20 | YES | - | NULL | - | Contact phone number |
| profile_picture_url | VARCHAR | 255 | YES | - | NULL | - | URL to profile picture |
| status | ENUM | - | NO | - | 'active' | CHECK('active','inactive','suspended') | Account status |
| created_at | TIMESTAMP | - | NO | - | CURRENT_TIMESTAMP | NOT NULL | Account creation date |
| updated_at | TIMESTAMP | - | NO | - | CURRENT_TIMESTAMP | ON UPDATE CURRENT_TIMESTAMP | Last update date |
| role_id | INT | 11 | NO | FK | NULL | FOREIGN KEY (roles) | Link to user role |

**Indexes**: PRIMARY KEY (user_id), UNIQUE KEY (email), INDEX (role_id)

---

#### 2. ROLES
**Role-Based Access Control**

| Column | Data Type | Size | Null | Key | Default | Constraints | Description |
|--------|-----------|------|------|-----|---------|-------------|-------------|
| role_id | INT | 11 | NO | PK | AUTO_INCREMENT | UNIQUE, AUTO_INCREMENT | Role identifier |
| role_name | VARCHAR | 50 | NO | UQ | NULL | UNIQUE, NOT NULL | Role name (admin, faculty, student, etc.) |
| description | VARCHAR | 255 | YES | - | NULL | - | Role description |
| permissions | JSON | - | YES | - | NULL | - | JSON array of permissions |
| created_at | TIMESTAMP | - | NO | - | CURRENT_TIMESTAMP | NOT NULL | Creation date |

**Indexes**: PRIMARY KEY (role_id), UNIQUE KEY (role_name)

---

### ACADEMIC TABLES

#### 3. PROGRAMS
**Academic Programs/Degrees**

| Column | Data Type | Size | Null | Key | Default | Constraints | Description |
|--------|-----------|------|------|-----|---------|-------------|-------------|
| program_id | INT | 11 | NO | PK | AUTO_INCREMENT | UNIQUE, AUTO_INCREMENT | Program identifier |
| program_code | VARCHAR | 10 | NO | UQ | NULL | UNIQUE, NOT NULL | Program code (e.g., BS-CS) |
| program_name | VARCHAR | 100 | NO | - | NULL | NOT NULL | Program name |
| description | TEXT | - | YES | - | NULL | - | Program description |
| department_id | INT | 11 | NO | FK | NULL | FOREIGN KEY (departments) | Department offering program |
| duration_years | INT | 2 | NO | - | 4 | CHECK >= 1 | Program duration in years |
| created_at | TIMESTAMP | - | NO | - | CURRENT_TIMESTAMP | NOT NULL | Creation date |

---

#### 4. DEPARTMENTS
**Academic Departments**

| Column | Data Type | Size | Null | Key | Default | Constraints | Description |
|--------|-----------|------|------|-----|---------|-------------|-------------|
| department_id | INT | 11 | NO | PK | AUTO_INCREMENT | UNIQUE, AUTO_INCREMENT | Department identifier |
| department_name | VARCHAR | 100 | NO | UQ | NULL | UNIQUE, NOT NULL | Department name |
| department_head_id | INT | 11 | YES | FK | NULL | FOREIGN KEY (users) | Department head reference |
| description | TEXT | - | YES | - | NULL | - | Department description |
| created_at | TIMESTAMP | - | NO | - | CURRENT_TIMESTAMP | NOT NULL | Creation date |

---

#### 5. STUDENTS
**Student Information & Academic Profile**

| Column | Data Type | Size | Null | Key | Default | Constraints | Description |
|--------|-----------|------|------|-----|---------|-------------|-------------|
| student_id | INT | 11 | NO | PK | AUTO_INCREMENT | UNIQUE, AUTO_INCREMENT | Student identifier |
| user_id | INT | 11 | NO | FK | NULL | FOREIGN KEY (users), UNIQUE | Link to user account |
| student_number | VARCHAR | 20 | NO | UQ | NULL | UNIQUE, NOT NULL, INDEX | Student ID number |
| program_id | INT | 11 | NO | FK | NULL | FOREIGN KEY (programs) | Program enrolled in |
| enrollment_status | ENUM | - | NO | - | 'active' | CHECK (active,inactive,graduated,suspended) | Current enrollment status |
| entry_year | YEAR | - | NO | - | NULL | NOT NULL | Year of entry |
| expected_graduation | YEAR | - | YES | - | NULL | - | Expected graduation year |
| current_semester | INT | 1 | NO | - | 1 | CHECK >= 1 AND <= 8 | Current semester |
| gpa | DECIMAL | 5,2 | YES | - | 0.00 | CHECK >= 0 AND <= 4.0 | Cumulative GPA |
| created_at | TIMESTAMP | - | NO | - | CURRENT_TIMESTAMP | NOT NULL | Creation date |
| updated_at | TIMESTAMP | - | NO | - | CURRENT_TIMESTAMP | ON UPDATE CURRENT_TIMESTAMP | Last update |

**Indexes**: PRIMARY KEY (student_id), UNIQUE KEY (user_id), UNIQUE KEY (student_number), INDEX (program_id)

---

#### 6. FACULTY
**Faculty/Instructor Information**

| Column | Data Type | Size | Null | Key | Default | Constraints | Description |
|--------|-----------|------|------|-----|---------|-------------|-------------|
| faculty_id | INT | 11 | NO | PK | AUTO_INCREMENT | UNIQUE, AUTO_INCREMENT | Faculty identifier |
| user_id | INT | 11 | NO | FK | NULL | FOREIGN KEY (users), UNIQUE | Link to user account |
| faculty_number | VARCHAR | 20 | NO | UQ | NULL | UNIQUE, NOT NULL, INDEX | Faculty ID number |
| department_id | INT | 11 | NO | FK | NULL | FOREIGN KEY (departments) | Department assignment |
| specialization | VARCHAR | 100 | YES | - | NULL | - | Area of specialization |
| qualification | VARCHAR | 255 | YES | - | NULL | - | Educational qualification |
| employment_status | ENUM | - | NO | - | 'full-time' | CHECK (full-time,part-time,contract) | Employment type |
| hire_date | DATE | - | NO | - | NULL | NOT NULL | Date hired |
| created_at | TIMESTAMP | - | NO | - | CURRENT_TIMESTAMP | NOT NULL | Creation date |

---

#### 7. SUBJECTS
**Course/Subject Information**

| Column | Data Type | Size | Null | Key | Default | Constraints | Description |
|--------|-----------|------|------|-----|---------|-------------|-------------|
| subject_id | INT | 11 | NO | PK | AUTO_INCREMENT | UNIQUE, AUTO_INCREMENT | Subject identifier |
| subject_code | VARCHAR | 10 | NO | UQ | NULL | UNIQUE, NOT NULL, INDEX | Subject code (e.g., CS101) |
| subject_name | VARCHAR | 100 | NO | - | NULL | NOT NULL | Subject name |
| description | TEXT | - | YES | - | NULL | - | Course description |
| credit_hours | DECIMAL | 3,1 | NO | - | 3 | CHECK > 0 | Credit units |
| prerequisites | JSON | - | YES | - | NULL | - | Array of prerequisite subject IDs |
| faculty_id | INT | 11 | YES | FK | NULL | FOREIGN KEY (faculty) | Primary instructor |
| department_id | INT | 11 | NO | FK | NULL | FOREIGN KEY (departments) | Department offering subject |
| created_at | TIMESTAMP | - | NO | - | CURRENT_TIMESTAMP | NOT NULL | Creation date |

---

#### 8. CLASSES
**Class/Section Offerings**

| Column | Data Type | Size | Null | Key | Default | Constraints | Description |
|--------|-----------|------|------|-----|---------|-------------|-------------|
| class_id | INT | 11 | NO | PK | AUTO_INCREMENT | UNIQUE, AUTO_INCREMENT | Class identifier |
| subject_id | INT | 11 | NO | FK | NULL | FOREIGN KEY (subjects) | Subject offered |
| faculty_id | INT | 11 | NO | FK | NULL | FOREIGN KEY (faculty) | Instructor |
| semester | INT | 1 | NO | - | 1 | CHECK (1 or 2) | Semester (1 or 2) |
| academic_year | VARCHAR | 9 | NO | - | NULL | NOT NULL, INDEX | Academic year (e.g., 2024-2025) |
| section | VARCHAR | 10 | NO | - | 'A' | NOT NULL | Section letter/number |
| room_number | VARCHAR | 20 | YES | - | NULL | - | Classroom number |
| capacity | INT | 3 | NO | - | 40 | CHECK > 0 | Classroom capacity |
| enrolled_count | INT | 3 | NO | - | 0 | CHECK >= 0 | Current enrollment |
| status | ENUM | - | NO | - | 'active' | CHECK (active,inactive,cancelled) | Class status |
| created_at | TIMESTAMP | - | NO | - | CURRENT_TIMESTAMP | NOT NULL | Creation date |

**Indexes**: PRIMARY KEY (class_id), FOREIGN KEY (subject_id), INDEX (academic_year, semester)

---

#### 9. SCHEDULES
**Class Schedule/Meeting Times**

| Column | Data Type | Size | Null | Key | Default | Constraints | Description |
|--------|-----------|------|------|-----|---------|-------------|-------------|
| schedule_id | INT | 11 | NO | PK | AUTO_INCREMENT | UNIQUE, AUTO_INCREMENT | Schedule identifier |
| class_id | INT | 11 | NO | FK | NULL | FOREIGN KEY (classes) | Class scheduled |
| day_of_week | ENUM | - | NO | - | NULL | CHECK (Monday-Sunday) | Day of week |
| start_time | TIME | - | NO | - | NULL | NOT NULL | Class start time |
| end_time | TIME | - | NO | - | NULL | NOT NULL | Class end time |
| room_number | VARCHAR | 20 | YES | - | NULL | - | Room assignment |
| faculty_id | INT | 11 | YES | FK | NULL | FOREIGN KEY (faculty) | Instructor (may differ) |
| created_at | TIMESTAMP | - | NO | - | CURRENT_TIMESTAMP | NOT NULL | Creation date |

**Check Constraint**: end_time > start_time

---

#### 10. REGISTRATIONS
**Student Course Registration**

| Column | Data Type | Size | Null | Key | Default | Constraints | Description |
|--------|-----------|------|------|-----|---------|-------------|-------------|
| registration_id | INT | 11 | NO | PK | AUTO_INCREMENT | UNIQUE, AUTO_INCREMENT | Registration identifier |
| student_id | INT | 11 | NO | FK | NULL | FOREIGN KEY (students), INDEX | Registered student |
| class_id | INT | 11 | NO | FK | NULL | FOREIGN KEY (classes), INDEX | Class enrolled |
| academic_year | VARCHAR | 9 | NO | - | NULL | NOT NULL | Academic year |
| semester | INT | 1 | NO | - | 1 | CHECK (1 or 2) | Semester number |
| registration_date | DATE | - | NO | - | CURDATE() | NOT NULL | Registration date |
| status | ENUM | - | NO | - | 'registered' | CHECK (registered,dropped,completed,failed) | Registration status |
| grade_id | INT | 11 | YES | FK | NULL | FOREIGN KEY (grades) | Resulting grade |
| created_at | TIMESTAMP | - | NO | - | CURRENT_TIMESTAMP | NOT NULL | Creation date |

**Indexes**: PRIMARY KEY (registration_id), UNIQUE KEY (student_id, class_id, academic_year)

---

#### 11. GRADES
**Student Grade Records**

| Column | Data Type | Size | Null | Key | Default | Constraints | Description |
|--------|-----------|------|------|-----|---------|-------------|-------------|
| grade_id | INT | 11 | NO | PK | AUTO_INCREMENT | UNIQUE, AUTO_INCREMENT | Grade identifier |
| student_id | INT | 11 | NO | FK | NULL | FOREIGN KEY (students), INDEX | Student |
| class_id | INT | 11 | NO | FK | NULL | FOREIGN KEY (classes), INDEX | Class graded |
| faculty_id | INT | 11 | NO | FK | NULL | FOREIGN KEY (faculty) | Grading faculty |
| midterm_score | DECIMAL | 5,2 | YES | - | NULL | CHECK 0-100 | Midterm exam score |
| final_score | DECIMAL | 5,2 | YES | - | NULL | CHECK 0-100 | Final exam score |
| assignment_score | DECIMAL | 5,2 | YES | - | NULL | CHECK 0-100 | Assignment/project score |
| overall_score | DECIMAL | 5,2 | YES | - | NULL | CHECK 0-100 | Computed overall score |
| letter_grade | ENUM | - | YES | - | NULL | CHECK (A,B,C,D,F,INC,WD) | Letter grade |
| status | ENUM | - | NO | - | 'pending' | CHECK (pending,submitted,finalized) | Grade status |
| submitted_date | TIMESTAMP | - | YES | - | NULL | - | Date grade submitted |
| created_at | TIMESTAMP | - | NO | - | CURRENT_TIMESTAMP | NOT NULL | Creation date |

**Indexes**: PRIMARY KEY (grade_id), UNIQUE KEY (student_id, class_id), INDEX (submitted_date)

---

#### 12. ATTENDANCE
**Class Attendance Records**

| Column | Data Type | Size | Null | Key | Default | Constraints | Description |
|--------|-----------|------|------|-----|---------|-------------|-------------|
| attendance_id | INT | 11 | NO | PK | AUTO_INCREMENT | UNIQUE, AUTO_INCREMENT | Attendance record ID |
| student_id | INT | 11 | NO | FK | NULL | FOREIGN KEY (students), INDEX | Student |
| class_id | INT | 11 | NO | FK | NULL | FOREIGN KEY (classes) | Class attended |
| faculty_id | INT | 11 | NO | FK | NULL | FOREIGN KEY (faculty) | Faculty recording |
| attendance_date | DATE | - | NO | - | CURDATE() | NOT NULL, INDEX | Attendance date |
| status | ENUM | - | NO | - | 'present' | CHECK (present,absent,excused) | Attendance status |
| recorded_time | TIMESTAMP | - | NO | - | CURRENT_TIMESTAMP | NOT NULL | Time recorded |
| remarks | VARCHAR | 255 | YES | - | NULL | - | Notes/remarks |
| created_at | TIMESTAMP | - | NO | - | CURRENT_TIMESTAMP | NOT NULL | Creation date |

**Indexes**: PRIMARY KEY (attendance_id), UNIQUE KEY (student_id, class_id, attendance_date)

---



### COMMUNICATION TABLES

#### 17. ANNOUNCEMENTS
**Faculty/Admin Announcements**

| Column | Data Type | Size | Null | Key | Default | Constraints | Description |
|--------|-----------|------|------|-----|---------|-------------|-------------|
| announcement_id | INT | 11 | NO | PK | AUTO_INCREMENT | UNIQUE, AUTO_INCREMENT | Announcement identifier |
| title | VARCHAR | 255 | NO | - | NULL | NOT NULL | Announcement title |
| content | LONGTEXT | - | NO | - | NULL | NOT NULL | Announcement body/content |
| posted_by | INT | 11 | NO | FK | NULL | FOREIGN KEY (users) | Author (faculty/admin) |
| target_audience | ENUM | - | NO | - | 'all' | CHECK (all,students,faculty,admin,specific_class) | Target audience |
| priority | ENUM | - | NO | - | 'medium' | CHECK (low,medium,high,urgent) | Priority level |
| posted_date | TIMESTAMP | - | NO | - | CURRENT_TIMESTAMP | NOT NULL | Publication date |
| expiry_date | DATE | - | YES | - | NULL | - | Expiration date |
| created_at | TIMESTAMP | - | NO | - | CURRENT_TIMESTAMP | NOT NULL | Creation date |
| updated_at | TIMESTAMP | - | NO | - | CURRENT_TIMESTAMP | ON UPDATE CURRENT_TIMESTAMP | Last update |

---

#### 18. NOTIFICATIONS
**User Notifications (Real-time alerts)**

| Column | Data Type | Size | Null | Key | Default | Constraints | Description |
|--------|-----------|------|------|-----|---------|-------------|-------------|
| notification_id | INT | 11 | NO | PK | AUTO_INCREMENT | UNIQUE, AUTO_INCREMENT | Notification ID |
| user_id | INT | 11 | NO | FK | NULL | FOREIGN KEY (users), INDEX | Recipient user |
| notification_type | ENUM | - | NO | - | NULL | CHECK (grade_posted,payment_received,schedule_changed,announcement,clearance_status,enrollment_confirmation) | Notification type |
| title | VARCHAR | 255 | NO | - | NULL | NOT NULL | Notification title |
| message | TEXT | - | NO | - | NULL | NOT NULL | Notification message |
| related_entity_id | INT | 11 | YES | - | NULL | - | Related record ID (grade_id, payment_id, etc.) |
| is_read | BOOLEAN | - | NO | - | FALSE | - | Read status |
| read_at | TIMESTAMP | - | YES | - | NULL | - | Timestamp when read |
| created_at | TIMESTAMP | - | NO | - | CURRENT_TIMESTAMP | NOT NULL, INDEX | Creation date |

**Indexes**: PRIMARY KEY (notification_id), INDEX (user_id, is_read, created_at)

---

#### 19. ADMINS
**Admin User Records**

| Column | Data Type | Size | Null | Key | Default | Constraints | Description |
|--------|-----------|------|------|-----|---------|-------------|-------------|
| admin_id | INT | 11 | NO | PK | AUTO_INCREMENT | UNIQUE, AUTO_INCREMENT | Admin identifier |
| user_id | INT | 11 | NO | FK | NULL | FOREIGN KEY (users), UNIQUE | User account |
| admin_level | ENUM | - | NO | - | 'admin' | CHECK (super_admin,admin,moderator) | Admin privilege level |
| assigned_modules | JSON | - | YES | - | NULL | - | Accessible modules (JSON array) |
| last_login | TIMESTAMP | - | YES | - | NULL | - | Last login timestamp |
| created_at | TIMESTAMP | - | NO | - | CURRENT_TIMESTAMP | NOT NULL | Creation date |

---

## Data Type Reference

| Type | Size | Use Case | Range/Example |
|------|------|----------|---------------|
| **INT** | 4 bytes | IDs, counts, years | -2,147,483,648 to 2,147,483,647 |
| **BIGINT** | 8 bytes | Large IDs, phone numbers | Very large numbers |
| **DECIMAL(m,n)** | Variable | Money, GPA, scores | Exact decimal values |
| **VARCHAR(n)** | n bytes | Names, emails, codes | Up to 65,535 bytes |
| **TEXT** | Up to 64KB | Long descriptions | Large text blocks |
| **LONGTEXT** | Up to 4GB | Content, announcements | Very long content |
| **DATE** | 3 bytes | Birth dates, deadlines | YYYY-MM-DD |
| **TIME** | 3 bytes | Class times | HH:MM:SS |
| **TIMESTAMP** | 4 bytes | Audit trail | 2038 limit, auto-update |
| **DATETIME** | 8 bytes | Event date/time | No auto-update |
| **BOOLEAN** | 1 byte | Flags, status | TRUE/FALSE |
| **ENUM** | 1-2 bytes | Fixed options | Predefined values |
| **JSON** | Variable | Complex data | Stored as JSON |
| **YEAR** | 1 byte | Year values | 1901-2155 |

---

## Constraints & Integrity Rules

### Primary Key Constraints
- All tables have `user_id` (auto-incremented INT) as primary key
- Ensures each record is uniquely identifiable

### Foreign Key Constraints
- Enforce referential integrity between tables
- Example: `FOREIGN KEY (student_id) REFERENCES STUDENTS(student_id)`
- SET actions: CASCADE delete, RESTRICT updates

### Unique Constraints
- Email, student number, faculty number are globally unique
- Combinations for duplicate prevention (e.g., student+class+year)

### Check Constraints
- GPA: 0.0 - 4.0
- Scores: 0 - 100
- Credit hours: > 0
- Capacity: > 0
- Status: Only valid enum values

### NOT NULL Constraints
- Applied to critical fields (email, passwords, names, dates)
- Ensures data completeness

### Default Values
- Timestamps default to CURRENT_TIMESTAMP
- Status fields default to 'pending', 'active', or similar
- Counts default to 0

---

## Indexing Strategy

### Performance Indexes
- **PRIMARY KEY**: All tables (auto-indexed)
- **FOREIGN KEYS**: All foreign key columns for join performance
- **UNIQUE KEYS**: Email, student/faculty numbers, payment references
- **SEARCH FILTERS**: student_id, user_id, academic_year, semester, created_at, is_read
- **COMPOSITE INDEXES**: (student_id, class_id, academic_year), (user_id, is_read, created_at)

### Index Maintenance
- Regular ANALYZE and OPTIMIZE TABLE commands
- Monitor slow query logs
- Rebuild indexes if fragmentation > 10%

---

## Data Validation Rules

| Table | Field | Validation Rule |
|-------|-------|-----------------|
| USERS | email | Valid email format, unique |
| USERS | password_hash | Minimum 60 chars (bcrypt) |
| STUDENTS | student_number | Format: YYYY-####, unique |
| FACULTY | faculty_number | Format: FAC-####, unique |
| GRADES | overall_score | Calculated from components |
| GRADES | letter_grade | Must match score range |
| PAYMENTS | amount | > 0, rounded to 2 decimals |
| CLASSES | enrolled_count | <= capacity |
| SCHEDULES | end_time | Must be > start_time |
| SUBJECTS | credit_hours | Must be > 0 |

---

## Backup & Recovery

- **Backup Frequency**: Daily at 2:00 AM
- **Retention Period**: 30 days
- **Recovery Time Objective (RTO)**: < 1 hour
- **Recovery Point Objective (RPO)**: < 15 minutes
- **Storage Location**: Offsite cloud backup

---

## Growth Projections

| Entity | Current | Year 1 | Year 3 | Year 5 |
|--------|---------|--------|--------|---------|
| Users | 5,000 | 8,000 | 15,000 | 25,000 |
| Students | 3,000 | 5,000 | 10,000 | 15,000 |
| Faculty | 200 | 300 | 500 | 700 |
| Transactions | 50K/yr | 100K/yr | 250K/yr | 500K/yr |

Database size projected to grow from 500MB to 5GB over 5 years.
