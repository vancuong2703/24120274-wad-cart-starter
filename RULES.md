# Engineering Rules & Guidelines for cartTotal

This rules document defines the development environment, commands, constraints, and quality gates for the `cartTotal` project. Any developer or AI assistant working in this repository MUST strictly follow these rules.

---

## 1. Technology Stack

- **Runtime**: Node.js (>= 20.0.0, recommended v22+ or v24 LTS)
- **Module System**: ECMAScript Modules (ESM, `"type": "module"` in `package.json`)
- **Language**: Plain JavaScript (Vanilla JS, standard ECMAScript). No TypeScript, no transpilers.
- **Testing Framework**: Node.js built-in test runner (`node:test`) and assertion library (`node:assert/strict`).
- **Code Formatter**: Prettier (development dependency only).
- **CI / Gate**: GitHub Actions (`.github/workflows/ci.yml`), pre-push local gate via `npm run gate`.

---

## 2. Project Commands

All verification commands are standard npm scripts defined in `package.json`:

| Command                | Purpose                                                                            |
| :--------------------- | :--------------------------------------------------------------------------------- |
| `npm test`             | Runs the test suite via Node.js native test runner (`node --test`).                |
| `npm run format`       | Formats all code files using Prettier.                                             |
| `npm run format:check` | Verifies code style compliance without modifying files.                            |
| `npm run gate`         | The primary verification gate: runs `npm test` followed by `npm run format:check`. |

---

## 3. Strict Prohibitions ("NEVER" Rules)

To prevent code degradation, false positives, and compliance violations:

1. **NEVER install or import external runtime dependencies**:
   The function `cartTotal` must be implemented in pure plain JavaScript. The `"dependencies"` field in `package.json` must remain empty or absent. Only devDependencies (e.g. Prettier) are permitted for linting/formatting.
2. **NEVER return a string from `cartTotal`**:
   The return value must strictly be a primitive `number` rounded to the nearest whole đồng (using `Math.round()`). Using `.toFixed()` directly as return value is forbidden because it returns a `string`.
3. **NEVER swallow errors**:
   Never catch an exception and ignore it (`catch {}`), and never replace a required `RangeError` with a warning, default value, or console log.
4. **NEVER weaken or fake tests**:
   Never assert against mocks or relax test assertions to force a test pass. Every test must test actual behavior against the specification ("Each test can fail for one reason").
5. **NEVER touch files outside `src/cart.js` and `test/` during feature implementation**:
   Core logic belongs strictly in `src/cart.js`. Automated tests belong in `test/cart.test.js`.

---

## 4. Contract Specification: `cartTotal(items, options)`

- **Function signature**: `cartTotal(items, options)` in `src/cart.js`
- **Arguments**:
  - `items`: Array of items `[{ name: string, price: number, qty: number }]`.
  - `options`: Configuration object `{ vatRate: number, freeShipFrom: number, shipFee: number }`.
- **Behavior**:
  - `subtotal` = $\sum (\text{price} \times \text{qty})$
  - `VAT` = $\text{subtotal} \times \text{vatRate}$
  - `shipping` = `0` when $\text{subtotal} \ge \text{freeShipFrom}$, otherwise $\text{shipFee}$.
  - Return: $\text{Math.round}(\text{subtotal} + \text{VAT} + \text{shipping})$.
  - An empty cart (`items` has length 0) immediately returns `0` (no VAT, no shipping).
  - Validation:
    - If any item has `price < 0`, throw `RangeError`.
    - If any item has `qty` that is not a positive integer (e.g. `qty <= 0` or `!Number.isInteger(qty)`), throw `RangeError`.
