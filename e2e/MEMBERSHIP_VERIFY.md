# Membership verification checklist

Automated coverage lives in [`student/membership.spec.ts`](./student/membership.spec.ts). It simulates Stripe webhook outcomes in the database (no live Checkout or Portal UI) so lifecycle rules stay testable in CI.

Run:

```bash
npm run test:e2e -- --project=student-membership
```

## Automated scenarios (Playwright)

| Scenario | What is exercised |
|----------|-------------------|
| Subscribe | `checkout.session.completed` sync → member panel, current tier highlight |
| Course access | Active membership unlocks paid chapter without `Purchase` |
| Upgrade | `customer.subscription.updated` sync → higher tier highlighted |
| Payment failure revoke | `invoice.payment_failed` → `PAST_DUE` → chapter locked immediately |
| Cancel at period end | `cancelAtPeriodEnd` keeps access until `customer.subscription.deleted` |

## Manual verification (Stripe sandbox)

Use these when validating real Stripe Checkout, Customer Portal, and dashboard webhooks before production.

### Prerequisites

- Teacher has saved all three tiers in `/teacher/membership` (Stripe Product/Price IDs present).
- Stripe Customer Portal enabled for the test account.
- Webhook endpoint receives: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.payment_failed`.

### 1. New subscription

1. Sign in as a student with no membership.
2. Open `/membership` — three tier cards with **Subscribe**.
3. Click **Gold** → Stripe Checkout → pay with test card `4242 4242 4242 4242`.
4. Return to `/membership?success=1` — Gold highlighted, **Active**, renewal date, **Manage subscription**.

### 2. Course access

1. As the member, open a paid chapter you have **not** purchased individually.
2. Video and progress controls load; no purchase modal / locked banner.

### 3. Upgrade

1. On `/membership`, click **Upgrade** on a higher tier (or upgrade via Customer Portal).
2. Confirm prorated charge in Stripe; page shows new tier as current plan.

### 4. Payment failure (immediate revoke)

1. In Stripe Dashboard, fail the next invoice (test clock or `4242 …` + attach a failing payment method).
2. Confirm webhook sets subscription to past due.
3. Paid chapter shows **This chapter is locked** without waiting for period end.

### 5. Voluntary cancel (access until period end)

1. Open Customer Portal → cancel at period end.
2. `/membership` shows cancel-at-period-end message; paid chapters remain unlocked.
3. After period ends (or simulate `customer.subscription.deleted` in Stripe), chapters lock again.

### 6. Individual purchase still works

1. As a non-member, buy a single course via course checkout.
2. Only that course is unlocked; membership page still offers Subscribe on all tiers.

## Notes

- E2E seeds fake Stripe price IDs (`price_e2e_membership_*`); real Checkout still needs teacher-configured prices.
- Membership access tests use `E2E Membership Access Course`, which is never purchased — other student specs keep their purchase fixture.
