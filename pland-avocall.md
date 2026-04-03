# Avocall Payment Verification Plan (Updated After Implementation)

## Goal

Move payment logic to the backend with explicit transaction states, safer checkout data flow, and clear wallet/expiration rules.

## Current Decision Baseline

- `Done`: frontend sends `packCode` and uses `transactionId` in payment redirects.
- `Done`: bank transfer remains manual and requires admin approve/reject.
- `Done`: transaction state is persisted in a dedicated model.
- `Changed from original`: card success currently auto-credits wallet inside backend return endpoint.
- `Pending hardening`: move final card approval to provider-verified callback/signature flow.

## Implementation Status

1. `Done` Add payment transaction model.
   - Implemented `models/paymentTransaction.js` with method, pack, expected/confirmed amount, status, provider fields, audit fields, and timestamps.

2. `Done` Consolidate pack contract usage by `packCode`.
   - Added helper lookups in `helpers/packContract.js` and wired checkout/payment code to use `packCode`.

3. `Done` Replace direct `buyPack` card-credit path with transaction APIs.
   - Added user payment routes for card initiate, card return, bank transfer, and transaction read in `routes/users.js` and `controllers/user.js`.
   - Kept legacy `buyPack` but disabled direct online confirmation path.

4. `Partially Done` Card credit rules.
   - Implemented automated wallet credit on `card/return` success with idempotency guard (`appliedAt` / approved status) in `controllers/user.js`.
   - Remaining: provider-side verification before approval.

5. `Done` Frontend checkout migration.
   - `Payement.jsx` now sends `packCode`.
   - `OrderConfirmation.jsx` now initiates backend card transaction and uses transaction context.

6. `Done` Bank-transfer pending route.
   - Added `client/src/containers/PayementPending/PayementPending.jsx` and route in `client/src/App.js`.

7. `Done` Admin payment review screen and actions.
   - Admin list now uses transaction statuses and supports approve/reject for pending bank transfers.

8. `Done` Result page UX state icons.
   - `PayementSuccess.jsx` shows dedicated icons/messages for approved, pending, failed states.

9. `Done` Expiration and old-user wallet behavior.
   - Added `resetExpiredWallet` in `helpers/walletExpiration.js`.
   - Applied reset before adding new credits in user/admin pack application flows.
   - Applied reset when loading user and before new consultation checks.

## Files Implemented

- `models/paymentTransaction.js`
- `helpers/packContract.js`
- `helpers/walletExpiration.js`
- `models/file.js`
- `controllers/user.js`
- `controllers/admin.js`
- `routes/users.js`
- `routes/admin.js`
- `client/src/containers/Payement/Payement.jsx`
- `client/src/containers/OrderConfirmation/OrderConfirmation.jsx`
- `client/src/containers/PayementSuccess/PayementSuccess.jsx`
- `client/src/containers/PayementError/PayementError.jsx`
- `client/src/containers/PayementPending/PayementPending.jsx`
- `client/src/containers/PayementPending/index.js`
- `client/src/containers/DashboardAdmin/AllPayments/allConsultations.js`
- `client/src/containers/DashboardAdmin/AllPayments/index.jsx`
- `client/src/App.js`

## Remaining Work Before Final Hardening

1. Add gateway callback verification endpoint (signature or server-to-server check).
2. Move final card `APPROVED` transition to verified callback only.
3. Keep success redirect endpoint as status sync only, not trust source of truth.
4. Add audit logs for card verification attempts and failures.
5. Add integration tests for replay/duplicate callback and forged redirect scenarios.

## Review Notes

- If you keep current behavior, card success URL can still trigger automated approval for the owner transaction.
- If you want strict anti-fraud behavior, update plan to make card approval callback-only and we will implement that in the next execution step.
