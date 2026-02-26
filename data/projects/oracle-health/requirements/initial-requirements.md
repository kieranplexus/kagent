# Oracle Health Integration — FHIR Resource Requirements

> Last updated: February 26, 2026

## Phase 1 — Read-Only FHIR Resources

| Resource | Access | Purpose |
|----------|--------|---------|
| Patient | Read | MRN-based patient lookup and identity verification |
| Encounter | Read | Visit/episode context for payment association |
| Account | Read | Patient account context |

### Phase 1 Integration Pattern
- Standalone SMART-on-FHIR app on secondary screen
- MRN-based patient lookup verified against Millennium FHIR API
- Read-only access only
- Manual payment amount entry by staff
- Payment execution via IPOS Systems (Dejavoo) / PayTrac
- Card data never enters BDP environment
- Offline reconciliation reporting to hospital finance team
- No write-back to Millennium

## Phase 2 — Additional Resources (after Phase 1 deployment)

| Resource | Access | Purpose |
|----------|--------|---------|
| Invoice | Read | Balance retrieval for auto-population of payment amounts |
| ChargeItem | Read | Charge details for payment context |
| PaymentNotice | Write | Real-time payment status written to Millennium |
| PaymentReconciliation | Write | Payment reconciliation records in Millennium |

### Phase 2 Additional Capabilities
- Balance retrieval and auto-population of payment amounts
- Real-time payment status written back to Millennium
- Optional EHR Launch mode (embedded in PowerChart)
- Requires separate Oracle review and additional scope approval
- Write scopes = higher scrutiny

## Authentication
- OAuth 2.0 / SMART on FHIR
- SMART v1
- Application Type: Provider
- Type of Access: Online
- Application Privacy: Public

## Technical Notes
- Default FHIR Version: R4
- Products: Millennium — Oracle Health EHR APIs, Oracle Health FHIR APIs (R4, All)
- Sandbox URL: `https://fhir-ehr-code.cerner.com/r4/ec2458f2-1e24-41c8-b71b-0e701af7583d`
- Production URL format: `https://fhir-ehr.cerner.com/r4/{tenant-id}`
