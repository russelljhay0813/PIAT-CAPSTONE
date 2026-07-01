# Entity Relationship Diagram (ERD) - BWEST College Management System

## Database Schema & Relationships

This diagram shows the logical database design and relationships between entities.

```mermaid
erDiagram
    USERS ||--o{ ROLES : has
    USERS ||--o{ STUDENTS : is
    USERS ||--o{ FACULTY : is
    USERS ||--o{ ADMINS : is
    
    STUDENTS ||--o{ REGISTRATIONS : make
    STUDENTS ||--o{ GRADES : receive
    STUDENTS ||--o{ ATTENDANCE : have
    STUDENTS ||--o{ PAYMENTS : make
    STUDENTS ||--o{ CLEARANCES : request
    STUDENTS ||--o{ SCHEDULES : view
    STUDENTS ||--o{ ANNOUNCEMENTS : receive
    STUDENTS ||--o{ NOTIFICATIONS : receive
    
    FACULTY ||--o{ SUBJECTS : teach
    FACULTY ||--o{ CLASSES : conduct
    FACULTY ||--o{ GRADES : submit
    FACULTY ||--o{ ATTENDANCE : record
    FACULTY ||--o{ ANNOUNCEMENTS : create
    
    SUBJECTS ||--o{ CLASSES : offer
    CLASSES ||--o{ SCHEDULES : have
    CLASSES ||--o{ GRADES : assign
    CLASSES ||--o{ ATTENDANCE : track
    CLASSES }o--|| REGISTRATIONS : enroll
    
    REGISTRATIONS ||--o{ GRADES : result-in
    REGISTRATIONS ||--o{ SCHEDULES : include
    
    GRADES ||--o{ NOTIFICATIONS : trigger
    PAYMENTS ||--o{ NOTIFICATIONS : trigger
    SCHEDULES ||--o{ NOTIFICATIONS : trigger
    
    PAYMENTS ||--o{ CLEARANCES : link-to
    FEES ||--o{ PAYMENTS : invoice
    
    CLEARANCES ||--o{ SIGNOFFS : require
    
    ANNOUNCEMENTS }o--|| FACULTY : from
    ANNOUNCEMENTS ||--o{ USERS : to
    
    ADMINS ||--o{ USERS : manage
    ADMINS ||--o{ ROLES : manage
```

## Entity Definitions

### Core Entities

#### USERS
```
user_id (PK)
email (UNIQUE, NOT NULL)
password_hash (NOT NULL)
first_name
last_name
phone
profile_picture_url
status (active, inactive, suspended)
created_at
updated_at
role_id (FK)
```

#### ROLES
```
role_id (PK)
role_name (admin, faculty, student, finance_officer, registrar, UNIQUE)
description
permissions (JSON)
created_at
```

#### STUDENTS
```
student_id (PK)
user_id (FK, UNIQUE)
student_number (UNIQUE)
program_id (FK)
enrollment_status (active, inactive, graduated, suspended)
entry_year
expected_graduation
current_semester
gpa
created_at
updated_at
```

#### FACULTY
```
faculty_id (PK)
user_id (FK, UNIQUE)
faculty_number (UNIQUE)
department_id (FK)
specialization
qualification
employment_status (full-time, part-time, contract)
hire_date
created_at
updated_at
```

#### ADMINS
```
admin_id (PK)
user_id (FK, UNIQUE)
admin_level (super_admin, admin, moderator)
assigned_modules (JSON)
last_login
created_at
```

### Academic Entities

#### SUBJECTS
```
subject_id (PK)
subject_code (UNIQUE)
subject_name
description
credit_hours
prerequisites (JSON)
faculty_id (FK)
department_id (FK)
created_at
```

#### CLASSES
```
class_id (PK)
subject_id (FK)
faculty_id (FK)
semester
academic_year
section
room_number
capacity
enrolled_count
status (active, inactive, cancelled)
created_at
```

#### REGISTRATIONS
```
registration_id (PK)
student_id (FK)
class_id (FK)
academic_year
semester
registration_date
status (registered, dropped, completed, failed)
grade_id (FK)
created_at
```

#### SCHEDULES
```
schedule_id (PK)
class_id (FK)
day_of_week (Monday-Sunday)
start_time
end_time
room_number
faculty_id (FK)
created_at
```

#### GRADES
```
grade_id (PK)
student_id (FK)
class_id (FK)
faculty_id (FK)
midterm_score
final_score
assignment_score
overall_score
letter_grade (A, B, C, D, F)
status (pending, submitted, finalized)
submitted_date
created_at
```

#### ATTENDANCE
```
attendance_id (PK)
student_id (FK)
class_id (FK)
faculty_id (FK)
attendance_date
status (present, absent, excused)
recorded_time
remarks
created_at
```

### Financial Entities

#### PAYMENTS
```
payment_id (PK)
student_id (FK)
amount
payment_date
payment_method (credit_card, debit_card, bank_transfer, check)
payment_reference (PayMongo reference)
status (pending, completed, failed, refunded)
description
created_at
updated_at
```

#### FEES
```
fee_id (PK)
fee_type (tuition, misc, lab, library, registration)
amount
description
due_date
academic_year
semester
created_at
```

#### CLEARANCES
```
clearance_id (PK)
student_id (FK)
clearance_status (pending, approved, rejected)
academic_officer_sign (boolean)
finance_officer_sign (boolean)
registrar_sign (boolean)
requested_date
processed_date
created_at
```

#### SIGNOFFS
```
signoff_id (PK)
clearance_id (FK)
signoff_by (user_id FK)
department (academic, finance, registrar)
signed_date
remarks
status (pending, signed, rejected)
```

### Communication Entities

#### ANNOUNCEMENTS
```
announcement_id (PK)
title
content
posted_by (faculty_id or admin_id FK)
target_audience (all, students, faculty, admin)
priority (low, medium, high)
posted_date
expiry_date
created_at
updated_at
```

#### NOTIFICATIONS
```
notification_id (PK)
user_id (FK)
notification_type (grade_posted, payment_received, schedule_changed, announcement)
title
message
related_entity_id
is_read (boolean)
read_at
created_at
```

### Supporting Entities

#### PROGRAMS
```
program_id (PK)
program_code (UNIQUE)
program_name
description
department_id (FK)
duration_years
created_at
```

#### DEPARTMENTS
```
department_id (PK)
department_name (UNIQUE)
department_head_id (FK)
description
created_at
```

## Relationship Summary

| From | To | Cardinality | Type | Description |
|------|----|-----------|----|-------------|
| USERS | ROLES | N:1 | Foreign Key | Each user has one role |
| STUDENTS | CLASSES | N:N | REGISTRATIONS | Students register for classes |
| FACULTY | CLASSES | 1:N | Foreign Key | Faculty conducts multiple classes |
| SUBJECTS | CLASSES | 1:N | Foreign Key | Subject offered in multiple classes |
| CLASSES | SCHEDULES | 1:N | Foreign Key | Class has multiple schedule slots |
| REGISTRATIONS | GRADES | 1:1 | Foreign Key | Registration results in one grade |
| GRADES | NOTIFICATIONS | 1:N | Foreign Key | Grade triggers notification |
| PAYMENTS | CLEARANCES | 1:1 | Foreign Key | Payment linked to clearance |
| STUDENTS | PAYMENTS | 1:N | Foreign Key | Student makes multiple payments |
| STUDENTS | CLEARANCES | 1:N | Foreign Key | Student requests clearance |
| FACULTY | ANNOUNCEMENTS | 1:N | Foreign Key | Faculty creates announcements |
| USERS | NOTIFICATIONS | 1:N | Foreign Key | User receives notifications |

## Key Design Principles

1. **Normalization**: Database is in 3NF to minimize data redundancy
2. **Referential Integrity**: Foreign keys enforce relationships
3. **Audit Trail**: `created_at` and `updated_at` timestamps on all entities
4. **Status Tracking**: Entities have status fields for lifecycle management
5. **Role-Based Access**: Users linked to roles for authorization
6. **Scalability**: Design supports growth in users and data volume
