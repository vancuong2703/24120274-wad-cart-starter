# Brief for AI Assistant: Implement `cartTotal` and Test Suite

You are an expert JavaScript software engineer. Your task is to implement the function `cartTotal` and its comprehensive test suite for an e-commerce shopping cart.

---

## 1. Allowed Files to Touch (Scope & Boundary)

- **Allowed files to modify/create**:
  - `src/cart.js`: Implement the `cartTotal` function.
  - `test/cart.test.js`: Write the comprehensive test suite using Node.js native test runner.
- **Strictly forbidden to touch**:
  - `package.json`, `package-lock.json`, `.github/`, `RULES.md`, or any configuration files.
  - Do NOT create any helper modules or files outside the two allowed files.

---

## 2. Technical Constraints

- **No Dependencies**: Plain JavaScript (Vanilla JS, standard ECMAScript Module). Absolutely NO external runtime packages or third-party libraries (no `lodash`, no `bignumber.js`, etc.).
- **Built-in Testing**: Use Node.js built-in modules: `import { test, describe } from 'node:test'` and `import assert from 'node:assert/strict'`.
- **Code Style**: Follow repository formatting (single quotes, no semicolons).

---

## 3. Contract Specification

### Function Signature

```javascript
export function cartTotal(items, options)
```

### Parameters

1. `items`: An array of item objects:
   ```javascript
   ;[{ name: string, price: number, qty: number }]
   ```
2. `options`: A configuration object:
   ```javascript
   {
     vatRate: number,      // e.g. 0.08 for 8% VAT
     freeShipFrom: number, // subtotal threshold for free shipping (e.g. 500000)
     shipFee: number       // shipping fee when below threshold (e.g. 30000)
   }
   ```

### Return Value

- **Type**: Must be a primitive `number` (NEVER a `string`). Do NOT use `toFixed()` directly as it returns a string.
- **Rounding**: Rounded to the nearest whole đồng using `Math.round(...)`.

### Calculation Logic

1. **Empty Cart**:
   - If `items` is empty (`items.length === 0`), return `0` immediately. No VAT and no shipping fee applied.
2. **Subtotal**:
   - Sum of `item.price * item.qty` for all items in `items`.
3. **VAT**:
   - Calculated as `subtotal * options.vatRate`.
4. **Shipping**:
   - If `subtotal >= options.freeShipFrom`, `shipping = 0` (free shipping threshold reached).
   - Otherwise, `shipping = options.shipFee`.
5. **Grand Total**:
   - `Math.round(subtotal + VAT + shipping)`.

### Worked Example

- Input items:
  - 2 × Áo thun (180,000 VND) = 360,000 VND
  - 1 × Sổ tay (45,000 VND) = 45,000 VND
  - `subtotal` = 405,000 VND
- Options: `{ vatRate: 0.08, freeShipFrom: 500000, shipFee: 30000 }`
  - `VAT` = 405,000 × 0.08 = 32,400 VND
  - `shipping` = 30,000 VND (since 405,000 < 500,000)
  - `total` = 405,000 + 32,400 + 30,000 = **467400** (number).

---

## 4. Error Handling & Validation

Throw a standard `RangeError` in the following cases:

1. **Negative Price**: Any item has `price < 0`.
2. **Invalid Quantity**: Any item has a quantity `qty` that is not a positive integer (e.g., `!Number.isInteger(qty)` or `qty <= 0`).

_Constraint_: Do NOT swallow errors (`catch {}` or silent logging). Do NOT throw generic `Error` or other error types when `RangeError` is specified.

---

## 5. Test Suite Requirements

In `test/cart.test.js`, write clean, decoupled unit tests adhering to the rule:

> **"Each test can fail for one reason."**

The test suite must cover:

1. **Worked example**: Matches the worked example returning `467400` as a number.
2. **Empty cart**: Returns `0` for empty items array.
3. **Free shipping threshold**:
   - Cart subtotal strictly below threshold (charges shipping fee).
   - Cart subtotal exactly equal to threshold (free shipping).
   - Cart subtotal above threshold (free shipping).
4. **Validation - RangeError on negative price**: Verify `RangeError` is thrown when an item has negative price.
5. **Validation - RangeError on non-integer/invalid quantity**:
   - Non-integer decimal quantity (e.g. `1.5`).
   - Zero or negative quantity (e.g. `0` or `-1`).
6. **Return type check**: Asserts that `typeof result === 'number'`.
