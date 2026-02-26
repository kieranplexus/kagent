# Better Day Payments — OPN & Oracle Health Integration

> Last Updated: February 24, 2026

## Project Overview

SMART-on-FHIR payment facilitation app connecting to Oracle Health (Millennium) for patient context. The app enables hospital staff to verify patient identity via MRN lookup against Millennium FHIR APIs, then process payments through IPOS Systems (Dejavoo) / PayTrac.

**Company:** Better Day Payments, LLC
**Parent Company:** Better Day Health EHR (founded 2014)
**Partner Admin:** Kieran Walkin | **Director:** Ben Herrera

## Two Parallel Tracks

### Track A: Code Console / Avala Provisioning (CRITICAL PATH)
Connects the app to Avala's Millennium instance via SMART-on-FHIR.
- **Status:** IN PROGRESS — waiting on Avala to log SR
- **Details:** [track-a/avala-provisioning.md](track-a/avala-provisioning.md)

### Track B: OPN + Oracle Cloud Marketplace
Establishes marketplace presence for future hospital clients.
- **Status:** IN PROGRESS — waiting on Ben's OCI account
- **Details:** [track-b/opn-marketplace.md](track-b/opn-marketplace.md)

## Current Phase

**Phase 1 — Read-Only Payment Facilitation** (current submission)
- See [requirements/phases.md](requirements/phases.md) for Phase 1 vs Phase 2 breakdown

## Data in this Directory

| File | Contents |
|------|----------|
| [credentials/reference-numbers.md](credentials/reference-numbers.md) | OPN IDs, Code Console app details, FHIR endpoints, Azure config |
| [track-a/avala-provisioning.md](track-a/avala-provisioning.md) | Track A steps, Avala action items, escalation plan |
| [track-b/opn-marketplace.md](track-b/opn-marketplace.md) | Track B steps, Ben's OCI setup instructions |
| [requirements/phases.md](requirements/phases.md) | Phase 1 vs Phase 2 scope comparison |
| [documents/document-tracker.md](documents/document-tracker.md) | Document versions and status |
| [action-items.md](action-items.md) | Open action items by person |
| [decisions.md](decisions.md) | Key decisions made and rationale |
| [key-urls.md](key-urls.md) | Oracle portals, docs, and contact links |
| [dns/setup.md](dns/setup.md) | DNS records and Azure custom domain config |

## Immediate Blockers

1. **Avala** needs to get their Millennium tenant ID and log the SR
2. **Ben** needs to create OCI account from US (Kieran blocked by geo-location)

## Key Milestones

| Milestone | Target | Status |
|-----------|--------|--------|
| Sandbox testing complete | Feb 2026 | DONE |
| Production domain + SSL | Feb 2026 | DONE |
| Provisioning email to Avala | Feb 24, 2026 | DONE |
| Avala logs SR | TBD | WAITING |
| Oracle processes SR (5-10 business days) | TBD | WAITING |
| Pilot deployment (2-week minimum) | TBD | PENDING |
| Full go-live at Avala | TBD | PENDING |
| Marketplace Phase 1 listing published | TBD | PENDING |
