# AI Interaction Log (`AI-LOG.md`)

- **Course**: CSC13008 - Web Application Development (HK1 2026-2027)
- **Assignment**: IA#1 — cartTotal with a harness
- **AI Assistant Tool**: Antigravity (Powered by Gemini 3.8 Flash High)
- **Date**: 2026-09-27

---

## 1. Process Overview & Iteration Records

### Step 1: Set Up the Harness (Red Phase)

- **Tool**: Antigravity CLI / File Tools
- **Action**:
  - Cloned starter repository from `https://github.com/fithcmus/wad-cart-starter`.
  - Ran `npm test` synchronously before modifying any business logic. Confirmed that test failed with `Error: not implemented` (**RED**).
  - Drafted `RULES.md` and `.cursorrules` specifying the technical stack, available npm scripts, and 5 explicit "NEVER" rules (including no runtime dependencies and no string returns).
  - Configured quality gate in `package.json`: added `"format"`, `"format:check"`, and `"gate": "npm test && npm run format:check"`.
  - Added `.prettierrc` with `singleQuote: true`, `semi: false`, and `endOfLine: "auto"` to preserve the repository's native styling and prevent artificial CRLF git diffs on Windows.
  - Added GitHub Actions workflow in `.github/workflows/ci.yml` running on push to all branches.
- **Human Decisions / Adjustments**:
  - Deliberately kept runtime dependencies empty (`"dependencies": {}`). Only `prettier` was installed under `devDependencies` to satisfy the "npm test and one of format/lint" gate required by rubric criterion 3.
  - Checked against Red Flag #2: Verified that no stealth runtime packages were added.
- **Commit**: `8c8a5ca` (`feat(harness): set up rules, quality gate, and CI workflow`).

---

### Step 2: Formulate the Brief

- **Tool**: Antigravity Assistant
- **Action**: Created `brief.md` containing the strict specification for implementing `cartTotal` and the test suite.
- **Content of the Brief**:
  - **Allowed files**: Explicit boundary set to `src/cart.js` and `test/cart.test.js`. All other files forbidden from modification.
  - **Contract**: Parameter signatures (`items`, `options`), calculations (subtotal, VAT, shipping threshold), return type explicitly declared as a primitive `number` rounded via `Math.round()`.
  - **Validation**: Strict `RangeError` on negative prices and non-positive / non-integer quantities.
  - **Constraints**: "Plain JavaScript, no dependencies".
  - **Testing**: Rule of "Each test can fail for one reason".
- **Commit**: `60ea311` (`docs(brief): add specification brief for AI assistant`).

---

### Step 3: Run the Loop & Read Every Diff (Green Phase)

- **Input Prompt**: Fed `brief.md` to the AI assistant to produce implementation in `src/cart.js` and unit tests in `test/cart.test.js`.
- **Generated Code**:
  - `src/cart.js`: Implemented empty cart early exit (`return 0`), input validation loop throwing `RangeError`, subtotal accumulation, VAT and threshold-based shipping calculation, and rounded total return (`Math.round(...)`).
  - `test/cart.test.js`: Expanded test suite from 1 failing test to 9 focused, independent unit tests using Node.js built-in `node:test` and `node:assert/strict`.
- **Review against 5 Red Flags (Slide Checklist)**:
  1. _Red Flag 1 (Phantom API)_: **PASSED**. Only standard ES2022 APIs were used (`Math.round`, `Number.isInteger`, `RangeError`). No non-existent helper methods.
  2. _Red Flag 2 (Stealth Package)_: **PASSED**. `package.json` diff checked: zero runtime packages added.
  3. _Red Flag 3 (Swallowed Error)_: **PASSED**. No `try/catch` swallowing errors. `RangeError` is directly and explicitly thrown.
  4. _Red Flag 4 (Duplicate Code)_: **PASSED**. Clean, single implementation of `cartTotal` without redundant functions or helper files.
  5. _Red Flag 5 (Unfailable Tests / Mocking)_: **PASSED**. No mocks or stubs used. Tests assert directly on the outputs and thrown exceptions of `cartTotal`.
- **Execution & Verification**:
  - Ran `npm test`: all 9 tests passed (**GREEN**).
  - Ran `npm run gate`: both unit tests and Prettier check passed without errors.
- **Commit**: `7391363` (`feat(cart): implement cartTotal logic and unit test suite`).

---

## 2. Summary of Authored vs. Generated vs. Rejected Work

| Component                   | Author / Source                        | Notes & Rationale                                                                         |
| :-------------------------- | :------------------------------------- | :---------------------------------------------------------------------------------------- |
| `RULES.md` & `.cursorrules` | Co-authored with AI                    | Hand-tailored 5 "never" rules to match the assignment prompt and slides.                  |
| `.prettierrc`               | Authored by hand                       | Specifically configured `endOfLine: "auto"` to resolve Git Windows CRLF warnings cleanly. |
| `package.json` scripts      | Authored by hand                       | Added `"gate"` combining `npm test` and `npm run format:check`.                           |
| `.github/workflows/ci.yml`  | Generated by AI, reviewed by human     | Standard GitHub Actions workflow running `npm run gate`.                                  |
| `brief.md`                  | Authored with AI assistance            | Thorough specification satisfying rubric criterion 4.                                     |
| `src/cart.js`               | Generated by AI, verified line-by-line | Verified return is `number` and avoided `toFixed()`. Verified `RangeError` message.       |
| `test/cart.test.js`         | Generated by AI, verified line-by-line | Verified single-assertion-per-test principle ("Each test can fail for one reason").       |
| `AI-LOG.md` & Report        | Authored by student                    | Comprehensive self-audit and diff analysis.                                               |
