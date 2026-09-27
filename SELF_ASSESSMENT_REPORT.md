# Self-Assessment Report

- **Course**: CSC13008 - Web Application Development
- **Student ID**: 24120274
- **Repository**: https://github.com/vancuong2703/24120274-wad-cart-starter
- **Total Self-Assessed Score**: **100 / 100**

---

## 1. Rubric Evaluation Table

|     #     | Criterion                          | Max Points | Claimed Marks | Specific Evidence (File, Line, Commit, or Test Name)                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| :-------: | :--------------------------------- | :--------: | :-----------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|   **1**   | **cartTotal behaves as specified** |     30     |    **30**     | - `src/cart.js` lines 1–36: Implements subtotal, VAT, shipping threshold, whole đồng rounding via `Math.round()`.<br>- Returns primitive `number`, worked example returns `467400`.<br>- Empty cart returns `0` (`src/cart.js` lines 3–5).<br>- Throws `RangeError` on negative price (`src/cart.js` lines 10–14) and non-integer/non-positive quantity (`src/cart.js` lines 16–24).<br>- Commit: `7391363`.                                                                                                 |
|   **2**   | **Tests**                          |     20     |    **20**     | - `test/cart.test.js` contains 9 independent unit tests adhering to "each test can fail for one reason".<br>- All 9 tests pass green on `npm test`.<br>- Tests cover: worked example (`test/cart.test.js:5`), empty cart (`line 17`), below threshold (`line 25`), at threshold (`line 33`), above threshold (`line 41`), negative price `RangeError` (`line 49`), non-integer qty `RangeError` (`line 62`), zero/negative qty `RangeError` (`line 75`), rounding check (`line 96`).<br>- Commit: `7391363`. |
|   **3**   | **The harness**                    |     20     |    **20**     | - Rules file: `RULES.md` and `.cursorrules` specify tech stack, command table, and 5 explicit "never" prohibitions.<br>- Working gate: `npm run gate` in `package.json` line 7 executes `npm test && npm run format:check`.<br>- Formatter: Prettier configured in `.prettierrc` with `singleQuote: true`, `semi: false`, `endOfLine: "auto"`.<br>- CI: `.github/workflows/ci.yml` runs verification gate on push to any branch.<br>- Initial commit: `8c8a5ca`.                                             |
|   **4**   | **The brief**                      |     15     |    **15**     | - `brief.md` comprehensively defines boundary & scope:<br> * Explicitly names allowed files (`src/cart.js`, `test/cart.test.js`).<br> * Strict "no dependencies" (plain JavaScript) constraint.<br> * Full contract specification with input/output types and worked example.<br> * Full specification of both `RangeError` validation cases.<br>- Commit: `60ea311`.                                                                                                                                        |
|   **5**   | **AI-LOG.md**                      |     15     |    **15**     | - `AI-LOG.md` documents tool used (Antigravity / Gemini), prompts given, generated code, human review process, and audit against the 5 Red Flags from the lecture slides.<br>- Specific breakdown of authored vs generated vs rejected code matching Git commits and diffs.                                                                                                                                                                                                                                  |
| **Total** |                                    |  **100**   |    **100**    | **File name to submit: `24120274_100.zip`**                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |

---

## 2. What I Did Not Manage (Reflection)

- Everything in the specification and rubric was completely implemented and verified locally with all quality gates passing green (`npm run gate`).
- Pushed to remote GitHub repository (`https://github.com/vancuong2703/24120274-wad-cart-starter`) with GitHub Actions CI active.
