# Track A: Oracle Health Code Console — Connect Avala

> **CRITICAL PATH** — This is what actually connects the app to Avala's Millennium instance.
>
> Status: **IN PROGRESS**
>
> Estimated timeline: 2-4 weeks from when Avala logs the SR

## Provisioning Steps

| Step | Description | Status |
|------|-------------|--------|
| 1 | Register SMART-on-FHIR app on Code Console | DONE |
| 2 | Test app against sandbox environment | DONE — Phase 1 working |
| 3 | Update Code Console company name to Better Day Payments, LLC | DONE (updated from "Nutrapi Ltd. t/a Sroware") |
| 4 | Retrieve Application ID and Client ID from Code Console | DONE |
| 5 | Update Code Console app name from "CernerTest" to "Better Day Payments" | DONE |
| 6 | Add custom domain (app.betterdaypayments.com) to Azure App Service | DONE — validated and added |
| 7 | Enable SSL certificate on custom domain | DONE — App Service Managed Certificate, SNI SSL |
| 8 | Update Code Console redirect URIs to production domain | DONE |
| 9 | Update app config/appsettings to use production domain | Not needed — app handles redirect URI dynamically |
| 10 | Test OAuth flow against sandbox using production domain | DONE — full flow working, patient loaded on app.betterdaypayments.com |
| 11 | Add support contact details to Code Console (email, phone) | DONE — kieran@betterdaypayments.com, +353867827399 |
| 12 | Send provisioning email to Avala IT team | DONE — sent to Stephen on Feb 24, 2026 |
| 13 | Avala gets their Millennium tenant ID from Oracle Health Hosting | **WAITING ON AVALA** |
| 14 | Avala logs SR to Cerner Ignite APIs for Millennium with our App ID and Client ID | **WAITING ON AVALA** |
| 15 | Avala completes PECA form (if Oracle requests it — Oracle's internal form, not ours) | **WAITING ON AVALA** |
| 16 | Avala adds app.betterdaypayments.com to trusted sites (if using Citrix/VDI) | **WAITING ON AVALA** |
| 17 | Oracle Health processes SR and provides production FHIR URL (est. 5-10 business days) | WAITING |
| 18 | Configure app to point to Avala's production FHIR URL | PENDING |
| 19 | Pilot deployment in single department (2-week minimum) | PENDING |
| 20 | Full go-live at Avala | PENDING |

## What Avala Needs To Do

_(Included in provisioning email sent Feb 24, 2026)_

1. **Get their Millennium tenant ID** (from Oracle Health Hosting)
2. **Log an SR** to Cerner Ignite APIs for Millennium requesting provisioning of:
   - App ID: `5a056b84-0c48-4a6d-93af-1c41a1bce11c`
   - Client ID: `53b5d048-b12c-4e02-92f8-6fe5b122c482`
   - Against their tenant ID
3. **Complete PECA form** if Oracle requests it (this is Oracle's form, not ours — Avala handles it)
4. **Add `https://app.betterdaypayments.com` to trusted sites** if using Citrix/VDI
5. **Send us their production FHIR URL** once Oracle confirms

## Important Notes

- **OPN submission pack is NOT needed for the SR.** The SR is a simple provisioning request. The OPN pack is for the separate Marketplace/Validated Integration process (Track B).
- **Avala drives production provisioning** — they log the SR, not us. Our job is to give them everything they need.
- **PECA form** is Oracle's internal form — Avala completes it if Oracle requests it during SR processing. We don't provide it.
- **Trusted sites** — not just Citrix. Any VDI environment (Citrix, VMware Horizon, etc.) will need `app.betterdaypayments.com` whitelisted. Avala should check with their Oracle Hosting contacts.

## Escalation Plan

If no response from Oracle by Day 10 after SR submission:
- Escalate via OPN Healthcare Track contact
- Or via [partnerhelp.oracle.com](https://partnerhelp.oracle.com)
- OPN + Healthcare Track expertise gives an additional channel to push requests through Oracle Health if the standard SR process is slow
