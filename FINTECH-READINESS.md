# Fintech readiness checklist

What DigiDan must have in place before we can **legitimately and bravely** say
"Fintech" on the website or in a pitch. This is the working tracker for that.

> **Not legal advice.** Anything touching SARB, the NPS Act, POPIA, FICA or
> PCI-DSS must be confirmed with a payments/fintech attorney or a compliance
> specialist before we rely on it. South African regulation changes; re-check
> before launch.

---

## 0. The question that sets the whole burden: what role do we play?

Our obligations depend entirely on which hat we wear. Decide and record this
first, because it determines everything below.

- [ ] **Software engineering partner** (we build/integrate for clients; funds
      flow through licensed gateways; we never hold money) — **light** burden.
      This is DigiDan's intended position.
- [ ] **System Operator / Third-Party Payment Provider (TPPP)** (we sit in the
      payment flow, route or process on others' behalf) — must register under
      the **NPS Act** and meet Payments Association (PA, formerly PASA) rules.
- [ ] **We hold or pool customer funds** — requires **bank sponsorship** or an
      e-money arrangement (SA is a bank-led model under SARB). Heaviest path.

> Decision (record here): DigiDan operates as **___________________________**.
> As long as we never hold funds, bank-sponsorship / e-money licensing does
> **not** apply.

---

## 1. Payment-grade engineering (we largely have this)

The disciplines that actually make a system "fintech-grade" — most already
evidenced in the company profile. Confirm each is real, current and
demonstrable.

- [ ] **Idempotency** on every money-moving operation (no double charges).
- [ ] **Webhook integrity**: signature verification, retry handling and
      idempotent processing of vendor callbacks.
- [ ] **Ledgering**: double-entry, append-only, immutable audit trail.
- [ ] **Reconciliation** and end-of-day / settlement handling.
- [ ] **Delivery semantics**: exactly-once / at-least-once with dead-letter
      queues for failed messages.
- [ ] **Environment separation**: isolated sandbox and production, no shared
      secrets, no test data in prod.
- [ ] **Observability**: tracing, metrics and structured logs across the flow.
- [ ] **Chargeback / dispute** handling process.

## 2. Vendor accounts & integration

- [ ] Sandbox developer accounts with the relevant SA vendors (e.g. **Stitch,
      Peach Payments, Ozow, Yoco, Paystack, PayFast**; Stripe where applicable;
      open-banking/pay-by-bank via Stitch / Mono).
- [ ] Production API keys obtained (granted only after each vendor's security
      screening).
- [ ] Signed **merchant / commercial agreement** with the chosen gateway
      (usually held by the client when we build for them), covering fees and
      SLAs.

## 3. Security posture

Basics plus what vendors and enterprise clients ask for before granting
production keys.

- [ ] **TLS/SSL** in transit; **AES-256** (or equivalent) for data at rest.
- [ ] **Tokenisation**: never touch or store raw card numbers or banking
      credentials; offload to the vendor.
- [ ] **Secrets management**: KMS/vault, key rotation, no secrets in code.
- [ ] **Access control**: MFA, least privilege, RBAC.
- [ ] **Tamper-evident audit logging.**
- [ ] **Penetration testing** + vulnerability and dependency scanning.
- [ ] **Secure SDLC**: SAST/DAST in the pipeline.
- [ ] **Incident-response / breach plan**, documented and tested.
- [ ] **Data retention & secure deletion** policy.
- [ ] **Fraud / velocity monitoring** where we own that surface.

## 4. Regulatory & legal (South Africa)

- [ ] **POPIA** — not just a privacy policy: lawful processing, security
      safeguards (s19), operator/sub-processor agreements (DPAs), and breach
      notification to the Information Regulator and data subjects (s22).
- [ ] **PCI-DSS** — the appropriate **SAQ** (likely SAQ-A / SAQ-A-EP) attested,
      even when card data is offloaded.
- [ ] **FICA** (FIC Act) — AML/KYC obligations if we are ever in the money flow
      or onboarding customers.
- [ ] **NPS Act** — register as TPPP / System Operator only if the role in
      section 0 requires it.
- [ ] **NCA** (if any lending/credit) and **FAIS/FSCA** (if any financial
      advice) — confirm we are outside scope, or comply.
- [ ] **Bank sponsorship / e-money** — only if we ever hold funds (we should
      not).

## 5. Trust artefacts (the "bravely" part)

What turns "we're good at this" into "here is our attestation".

- [ ] **PCI-DSS SAQ** completed (minimum bar).
- [ ] Path toward **ISO 27001** (information-security management).
- [ ] **SOC 2** for larger/enterprise clients (later).
- [ ] **A real, demonstrable fintech build** — a working sandbox integration or
      a shipped reference (e.g. on Stitch/Peach). *Proof beats claims; this is
      the single strongest earner of the label.*

## 6. Business readiness

- [ ] **Professional Indemnity** + **Cyber** insurance.
- [ ] **DPAs** with clients and sub-processors; clear liability scoping; SLAs.
- [ ] **Documented policies**: security, access control, data retention,
      incident response — written, not just practised.

---

## The gate: when can we say "Fintech"?

Because DigiDan is the **engineering partner**, not the institution, the bar is:

1. Demonstrable payment-grade engineering (section 1). ✅ largely have it
2. At least one real integration we can point to (section 5).
3. A defensible security posture + PCI-DSS SAQ, trending to ISO 27001
   (sections 3 & 5).
4. POPIA done properly (section 4).
5. Insurance + contracts (section 6).
6. A clear public line on role: *we build and integrate; funds are held by
   licensed gateways/banks, not us.*

Until these are genuinely in place, keep the website framing conservative
("financial-grade engineering… when your systems need it… we are not a bank").
Once ticked, we can legitimately lean in and add a short "how we handle
financial-grade work" trust page.
