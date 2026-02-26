# Oracle Health Integration — Initial Requirements

*Status: Draft — being gathered*
*Last updated: 2026-02-26*

## 1. Integration Scope

### 1.1 Data Domains
- **Patient Demographics** — Retrieve and sync patient records
- **Clinical Documents** — CDA and FHIR document exchange
- **Appointments** — Read/write appointment scheduling
- **Lab Results** — Receive and display lab/diagnostic results
- **Medications** — Medication lists, prescriptions, administration records
- **Allergies** — Patient allergy and intolerance data
- **Encounters** — Episode of care and visit tracking

### 1.2 Integration Patterns
- **Real-time API** — Synchronous REST calls for on-demand data retrieval
- **Event-driven** — Pub/sub for data change notifications
- **Batch** — Scheduled bulk data sync for reporting

## 2. Technical Requirements

### 2.1 API Standards
- FHIR R4 (preferred)
- HL7 v2 (if FHIR not available for specific resources)
- OAuth 2.0 for authentication
- SMART on FHIR for clinical app authorisation

### 2.2 Security
- TLS 1.2+ for all communications
- AES-256 encryption at rest
- Role-based access control
- Full audit trail for data access
- Data residency: UK (or as per NHS requirements)

### 2.3 Performance
- API response time: < 500ms (p95)
- Throughput: 100 requests/second sustained
- Availability: 99.9% uptime

## 3. Compliance
- NHS Digital standards
- Data Protection Act 2018 / UK GDPR
- Clinical safety (DCB0129 / DCB0160)
- IG Toolkit compliance

## 4. Open Questions
- [ ] Which Oracle Health environment version is the target?
- [ ] Is there an existing integration engine (e.g., Rhapsody, MuleSoft)?
- [ ] What are the data retention requirements?
- [ ] Are there existing HL7 v2 feeds that need migrating to FHIR?
- [ ] What is the expected data volume (patients, transactions/day)?
- [ ] Who is the Oracle Health technical contact?

## 5. Dependencies
- Oracle Health sandbox/test environment access
- VPN or secure network connectivity setup
- Clinical governance sign-off
- Information governance assessment
