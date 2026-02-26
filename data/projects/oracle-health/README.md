# Oracle Health Integration

## Project Overview
Integration project with Oracle Health (formerly Cerner) systems for health data exchange.

## Status
- **Phase:** Planning / Requirements Gathering
- **Start Date:** February 2026
- **Target Completion:** June 2026

## Key Objectives
1. Establish secure data exchange with Oracle Health APIs
2. Implement FHIR-compliant data models
3. Build integration middleware layer
4. Set up monitoring and alerting for health data flows
5. Ensure compliance with NHS/regulatory requirements

## Requirements
*Requirements are being gathered and will be documented here as they are confirmed.*

### Functional Requirements
- [ ] Patient data retrieval via FHIR APIs
- [ ] Clinical document exchange (CDA/FHIR)
- [ ] Appointment and scheduling integration
- [ ] Lab results and diagnostics data flow
- [ ] Medication and prescription data sync

### Non-Functional Requirements
- [ ] HL7 FHIR R4 compliance
- [ ] Data encryption at rest and in transit
- [ ] Audit logging for all data access
- [ ] 99.9% uptime SLA for integration layer
- [ ] Sub-second response times for API calls

## Technical Stack (Proposed)
- **Integration Layer:** Node.js / TypeScript
- **API Protocol:** FHIR R4 (REST)
- **Auth:** OAuth 2.0 / SMART on FHIR
- **Message Queue:** RabbitMQ or AWS SQS
- **Database:** PostgreSQL for local data cache
- **Monitoring:** Datadog / CloudWatch

## Team
- Project Lead: TBD
- Technical Architect: TBD
- Senior Developer: TBD
- Junior Developer: TBD

## Budget
- Total allocated: £50,000
- See budget breakdown in the app at `/projects/oracle-health/budget`

## Key Milestones
| Milestone | Target Date | Status |
|-----------|------------|--------|
| Requirements Finalisation | 2026-03-01 | In Progress |
| Architecture Review | 2026-03-15 | Planned |
| Development Sprint 1 Complete | 2026-04-15 | Planned |
| Integration Testing Complete | 2026-05-15 | Planned |
| UAT Complete | 2026-06-15 | Planned |
| Go-Live | 2026-06-30 | Planned |

## Notes
- Requirements originally gathered via external artifact (Claude conversation)
- All future requirements and data gathering to be tracked in this repository
- See `/data/projects/oracle-health/requirements/` for detailed requirement documents
