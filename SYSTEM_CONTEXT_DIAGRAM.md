# Context Diagram - BWEST College Management System

## High-Level System Boundary and External Entities

This diagram shows the system boundary and all external entities that interact with the BWEST College Management System.

```mermaid
graph TB
    subgraph System["🏫 BWEST College Management System"]
        Core["Academic & Financial<br/>Management System"]
    end
    
    Admin["👨‍💼 Administrator"]
    Student["👨‍🎓 Student"]
    Faculty["👨‍🏫 Faculty"]
    Finance["💰 Finance Officer"]
    Registrar["📋 Registrar"]
    PaymentGW["💳 Payment Gateway<br/>PayMongo"]
    ExtSys["🔌 External Systems<br/>& Services"]
    
    Admin -->|User Management<br/>System Settings<br/>Security Audit| System
    System -->|System Status<br/>Audit Logs| Admin
    
    Student -->|Registration<br/>Academic Records<br/>Payment Requests| System
    System -->|Class Schedule<br/>Grades<br/>Notifications| Student
    
    Faculty -->|Attendance Data<br/>Grade Records<br/>Subject Info| System
    System -->|Class Roster<br/>Student Info| Faculty
    
    Finance -->|Payment Records<br/>Financial Reports<br/>Clearance Data| System
    System -->|Financial Status<br/>Collections Summary| Finance
    
    Registrar -->|Student Records<br/>Transcripts| System
    System -->|Academic Status<br/>Registration Status| Registrar
    
    System -->|Process Payment| PaymentGW
    PaymentGW -->|Payment Confirmation| System
    
    System -.->|Data Integration| ExtSys
    ExtSys -.->|Updates| System
    
    style System fill:#2563eb,stroke:#1e40af,color:#fff
    style Core fill:#3b82f6,stroke:#1e40af,color:#fff
    style Admin fill:#fbbf24,stroke:#d97706
    style Student fill:#86efac,stroke:#22c55e
    style Faculty fill:#93c5fd,stroke:#3b82f6
    style Finance fill:#fca5a5,stroke:#dc2626
    style Registrar fill:#c4b5fd,stroke:#7c3aed
    style PaymentGW fill:#fed7aa,stroke:#d97706
    style ExtSys fill:#d1d5db,stroke:#6b7280
```

## Key External Entities

| Entity | Role | Primary Functions |
|--------|------|-------------------|
| **Administrator** | System Manager | User management, system configuration, security audits, reporting |
| **Student** | User | Registration, view schedules, track grades, make payments, manage clearance |
| **Faculty** | Content Provider | Record attendance, submit grades, manage class rosters, view student info |
| **Finance Officer** | Financial Manager | Process payments, generate financial reports, manage clearance, collect fees |
| **Registrar** | Academic Records | Maintain student records, manage transcripts, process registrations |
| **Payment Gateway** | External Service | Process online payments securely (PayMongo integration) |
| **External Systems** | Third-party Integration | Future integrations for data exchange |

## System Responsibilities

The BWEST College Management System provides:
- **Academic Management**: Class scheduling, attendance, grades, transcripts
- **Financial Management**: Payment processing, fee management, financial reports
- **User Management**: Role-based access, authentication, authorization
- **Registration**: Student enrollment, course registration, academic planning
- **Notifications**: Real-time alerts for grades, payments, schedule changes
- **Reporting**: Analytics, audit logs, compliance reports
