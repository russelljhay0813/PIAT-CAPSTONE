# Data Flow Diagram (DFD) - BWEST College Management System

## Level 0 - System-Level Data Flows

This diagram shows how data flows between external entities and the main processes within the system.

```mermaid
graph LR
    subgraph System["BWEST College System"]
        P1["P1: Academic<br/>Management"]
        P2["P2: Financial<br/>Management"]
        P3["P4: User<br/>Management<br/>& Security"]
        P4["P4: Notification<br/>Service"]
        P5["P5: Reporting &<br/>Analytics"]
    end
    
    Student["Student"]
    Faculty["Faculty"]
    Finance["Finance Officer"]
    Admin["Administrator"]
    Registrar["Registrar"]
    PaymentGW["Payment<br/>Gateway"]
    
    %% Student flows
    Student -->|Registration Data<br/>Payment Requests<br/>Schedule Queries| P1
    P1 -->|Grades<br/>Class Schedule<br/>Academic Records| Student
    
    Student -->|Payment Info<br/>Clearance Status| P2
    P2 -->|Invoice<br/>Payment Status<br/>Clearance Info| Student
    
    P4 -->|Grade Notification<br/>Payment Alert<br/>Schedule Change| Student
    
    %% Faculty flows
    Faculty -->|Attendance Records<br/>Grade Submissions<br/>Subject Info| P1
    P1 -->|Student List<br/>Class Roster<br/>Academic Data| Faculty
    
    %% Finance flows
    Finance -->|Payment Processing<br/>Financial Queries| P2
    P2 -->|Financial Reports<br/>Collections Summary<br/>Clearance Status| Finance
    
    P4 -->|Payment Received Alert| Finance
    
    %% Admin flows
    Admin -->|System Config<br/>User Requests<br/>Security Commands| P3
    P3 -->|System Status<br/>Audit Logs<br/>User List| Admin
    
    %% Registrar flows
    Registrar -->|Academic Queries<br/>Transcript Requests| P1
    P1 -->|Student Records<br/>Transcripts| Registrar
    
    %% Payment Gateway
    Student -->|Payment Request| PaymentGW
    PaymentGW -->|Payment Result| P2
    P2 -->|Process Payment<br/>Verify Transaction| PaymentGW
    
    %% Reporting
    P5 -->|System Analytics<br/>Reports| Admin
    P5 -->|Financial Reports| Finance
    
    %% Notifications trigger from other processes
    P1 -.->|Grade Posted Event| P4
    P2 -.->|Payment Event| P4
    P1 -.->|Schedule Change Event| P4
    
    style System fill:#dbeafe,stroke:#0284c7
    style P1 fill:#86efac,stroke:#22c55e
    style P2 fill:#fca5a5,stroke:#dc2626
    style P3 fill:#c4b5fd,stroke:#7c3aed
    style P4 fill:#fed7aa,stroke:#d97706
    style P5 fill:#f3e8ff,stroke:#a855f7
    style Student fill:#86efac,stroke:#22c55e
    style Faculty fill:#93c5fd,stroke:#3b82f6
    style Finance fill:#fca5a5,stroke:#dc2626
    style Admin fill:#fbbf24,stroke:#d97706
    style Registrar fill:#c4b5fd,stroke:#7c3aed
    style PaymentGW fill:#fed7aa,stroke:#d97706
```

## Level 1 - Detailed Academic Management Process (P1)

```mermaid
graph LR
    subgraph P1["P1: Academic Management Process"]
        P1A["P1.1: Registration<br/>& Enrollment"]
        P1B["P1.2: Attendance<br/>Tracking"]
        P1C["P1.3: Grade<br/>Management"]
        P1D["P1.4: Schedule<br/>Management"]
    end
    
    D1["D1: Students<br/>Database"]
    D2["D2: Classes<br/>Database"]
    D3["D3: Grades<br/>Database"]
    D4["D4: Attendance<br/>Database"]
    
    Student["Student"]
    Faculty["Faculty"]
    Registrar["Registrar"]
    
    Student -->|Enrollment Request| P1A
    P1A -->|Student Data| D1
    D1 -->|Student Info| P1A
    P1A -->|Registration Confirmation| Student
    
    Faculty -->|Attendance Data| P1B
    P1B -->|Store Records| D4
    D4 -->|Attendance Data| P1B
    
    Faculty -->|Grade Submission| P1C
    P1C -->|Store Grades| D3
    D3 -->|Grade Data| P1C
    P1C -->|Grade Report| Faculty
    
    P1D -->|Class Schedule| D2
    D2 -->|Schedule Info| P1D
    P1D -->|Schedule Data| Student
    P1D -->|Schedule Data| Faculty
    
    Registrar -->|Record Query| P1A
    P1A -->|Academic Records| Registrar
    
    style P1 fill:#e0f2fe,stroke:#0284c7
    style P1A fill:#86efac,stroke:#22c55e
    style P1B fill:#86efac,stroke:#22c55e
    style P1C fill:#86efac,stroke:#22c55e
    style P1D fill:#86efac,stroke:#22c55e
    style D1 fill:#fecaca,stroke:#ef4444
    style D2 fill:#fecaca,stroke:#ef4444
    style D3 fill:#fecaca,stroke:#ef4444
    style D4 fill:#fecaca,stroke:#ef4444
```

## Level 1 - Detailed Financial Management Process (P2)

```mermaid
graph LR
    subgraph P2["P2: Financial Management Process"]
        P2A["P2.1: Payment<br/>Processing"]
        P2B["P2.2: Fee<br/>Management"]
        P2C["P2.3: Clearance<br/>Processing"]
        P2D["P2.4: Financial<br/>Reporting"]
    end
    
    D5["D5: Payments<br/>Database"]
    D6["D6: Fees<br/>Database"]
    D7["D7: Clearance<br/>Database"]
    
    Student["Student"]
    Finance["Finance Officer"]
    PaymentGW["Payment<br/>Gateway"]
    
    Student -->|Payment Request| P2A
    P2A -->|Process Payment| PaymentGW
    PaymentGW -->|Payment Status| P2A
    P2A -->|Store Payment| D5
    D5 -->|Payment Info| P2A
    
    Finance -->|Fee Config| P2B
    P2B -->|Store Fees| D6
    D6 -->|Fee Data| P2B
    
    Student -->|Clearance Request| P2C
    Finance -->|Process Clearance| P2C
    P2C -->|Store Clearance| D7
    D7 -->|Clearance Status| P2C
    P2C -->|Clearance Report| Student
    
    Finance -->|Report Request| P2D
    P2D -->|Generate Reports| Finance
    
    style P2 fill:#ffe0e6,stroke:#ef4444
    style P2A fill:#fca5a5,stroke:#dc2626
    style P2B fill:#fca5a5,stroke:#dc2626
    style P2C fill:#fca5a5,stroke:#dc2626
    style P2D fill:#fca5a5,stroke:#dc2626
    style D5 fill:#fecaca,stroke:#ef4444
    style D6 fill:#fecaca,stroke:#ef4444
    style D7 fill:#fecaca,stroke:#ef4444
```

## Data Stores (Databases)

| ID | Name | Purpose | Primary Data |
|----|------|---------|--------------|
| **D1** | Students | Student information & profile | ID, Name, Email, Program, Status |
| **D2** | Classes | Course/Class information | Class ID, Name, Faculty, Schedule |
| **D3** | Grades | Student grades & academic records | Student ID, Class ID, Grade, Status |
| **D4** | Attendance | Attendance records | Student ID, Class ID, Date, Status |
| **D5** | Payments | Payment transaction records | Payment ID, Student ID, Amount, Status, Date |
| **D6** | Fees | Fee structure & assessment | Fee ID, Student ID, Amount, Type, Deadline |
| **D7** | Clearance | Student clearance status | Clearance ID, Student ID, Status, Sign-offs |
| **D8** | Users | Authentication & Authorization | User ID, Email, Password Hash, Role |
| **D9** | Notifications | Notification records & delivery | Notification ID, User ID, Type, Message, Read Status |

## Data Flow Summary

- **Students**: Submit registrations, payment requests, and clearance queries
- **Faculty**: Submit grades and attendance records
- **Finance**: Process payments and manage clearances
- **Admin**: Configure system and manage users
- **Registrar**: Access academic records and transcripts
- **Notifications**: Automatically triggered from grade, payment, and schedule changes
