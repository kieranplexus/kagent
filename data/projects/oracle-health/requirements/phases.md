# Phase 1 vs Phase 2 Summary

## Phase 1 — Read-Only Payment Facilitation (current submission)

- Standalone SMART-on-FHIR app on secondary screen
- MRN-based patient lookup verified against Millennium FHIR API
- Read-only access: Patient, Encounter, Account resources
- Manual payment amount entry by staff
- Payment execution via IPOS Systems (Dejavoo) / PayTrac
- Card data never enters BDP environment
- Offline reconciliation reporting to hospital finance team
- No write-back to Millennium

## Phase 2 — Integrated Automated Payment Solution (target: after Phase 1 deployment)

- Everything in Phase 1 PLUS:
- Balance retrieval and auto-population of payment amounts
- FHIR write access: PaymentNotice, PaymentReconciliation
- Real-time payment status written back to Millennium
- Additional read resources: Invoice, ChargeItem
- Optional EHR Launch mode (embedded in PowerChart)
- Requires separate Oracle review and additional scope approval
- Write scopes = higher scrutiny — Phase 1 success at Avala strengthens this case

## Key Notes

- Phase 2 write scopes will get significantly more scrutiny
- Having Phase 1 running successfully at Avala is the strongest evidence for Phase 2 approval
- Phase 2 Submission Pack — don't update until Phase 1 is live at Avala. No point refining before production evidence
