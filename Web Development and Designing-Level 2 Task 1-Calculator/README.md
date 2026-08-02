# Modern Calculator Studio (No-Eval Expression Engine)

A sleek, accessible, and feature-rich browser-based calculator engineered using **React**, **TypeScript**, **Tailwind CSS**, and **Motion**. Designed to satisfy all criteria for arithmetic calculators with custom parsing logic, keyboard accessibility, CSS Grid layouts, and custom theme customizer.

---

## 🌟 Key Features

1. **Custom Evaluation Engine (Zero `eval()`)**:
   - Built using a safe Shunting-Yard tokenization and Abstract Syntax Tree / RPN parser.
   - Handles standard mathematical operator precedence (`*` and `/` before `+` and `-`), exponents (`^`), parentheses `()`, and functions like square root (`√`).
   - Supports both **Standard Expression Mode** (respects mathematical precedence) and **Sequential Chaining Mode** (immediate calculation step by step).

2. **Division-by-Zero Protection**:
   - Gracefully traps division by zero (e.g. `10 ÷ 0`) and invalid operations (e.g. `√(-1)`), displaying friendly, precise error messages (`Cannot divide by 0`) without crashing the application state.

3. **CSS Grid Layout**:
   - Button keypad strictly mapped using responsive CSS Grid with custom column spans for double-width buttons (0 and =) and functional groupings.

4. **Interactive Calculation Tape (History)**:
   - Records past operations with timestamps and expression results.
   - Click any entry from history to load its result back into the current calculation or copy to clipboard.
   - History can be exported as a text log or cleared with one click.

5. **Memory & Scientific Functions**:
   - Memory operations (`MC`, `MR`, `M+`, `M-`) with persistent visual indicator when memory is active.
   - Quick scientific controls (`x²`, `√`, `π`, `^`, `sin`, `cos`, `tan`).

6. **Keyboard Navigation & Feedback**:
   - Full keyboard bindings for digits `0-9`, operators `+ - * / % ^`, decimal `.`, backspace `Backspace`, evaluation `Enter` or `=`, clear `Escape` or `c`.
   - On-screen visual pulse feedback on button matching corresponding key press.

7. **Aesthetic Designer Themes**:
   - **Obsidian Dark Glass**: Tactile neon emerald accents with subtle dark frosted glass.
   - **Nordic Slate**: Crisp slate blue with warm copper accents.
   - **Cyberpunk Synthwave**: Neon violet and cyan glowing aesthetic.
   - **Monochrome Ink**: High-contrast, clean minimalist editorial design.

8. **Sound Feedback**:
   - Optional realistic mechanical keyclick sound using browser Web Audio API (zero external assets required).

---

## 📂 Project Structure

```
├── README.md               # Comprehensive project documentation
├── metadata.json           # Application metadata
├── index.html              # Entry HTML with custom Google fonts
├── src/
│   ├── main.tsx            # React entry point
│   ├── App.tsx             # Main layout, state management, mode tabs
│   ├── index.css           # Custom styles, animations, CSS grid rules
│   ├── types.ts            # TypeScript interfaces and type definitions
│   ├── utils/
│   │   ├── calculator.ts   # Safe math parser & tokenization logic (No eval)
│   │   ├── sound.ts        # Web Audio API sound synthesis for keypresses
│   │   └── converter.ts    # Unit conversion utilities
│   └── components/
│       ├── CalculatorDisplay.tsx # Dual line input & result screen
│       ├── CalculatorKeypad.tsx  # CSS Grid button layout with event handlers
│       ├── HistoryTape.tsx       # Saved history records & actions
│       ├── ScientificPanel.tsx   # Advanced mathematical operations
│       ├── UnitConverter.tsx     # Extended conversion tool
│       ├── ThemeSelector.tsx     # Palette & layout switcher
│       └── DocumentationModal.tsx # Built-in interactive documentation view
```

---

## 🚀 Technical Highlights

### Safe Operator Precedence Parser (Algorithm)
Instead of using unsafe JavaScript `eval()`, the calculator tokenizes input strings (e.g., `"5.5 + 3.2 × (4 - 1)"`) into typed tokens:
- **Numbers**: Floats & integer handling
- **Operators**: `+`, `-`, `×`, `÷`, `%`, `^` with defined precedence and associativity
- **Parentheses**: Nested expression evaluation

Evaluation traps division-by-zero during the reduction stack step and returns explicit mathematical errors.

---

## 🛠️ Verification Checklist

- [x] Dual-line display screen showing expression and live result.
- [x] Numeric (0-9) and decimal (.) buttons.
- [x] Addition (+), subtraction (-), multiplication (×), division (÷) operators.
- [x] Equals (=) button for calculation evaluation.
- [x] Clear (C / AC) button to reset memory and screen.
- [x] Backspace (⌫) button to remove last entry.
- [x] Prevent division-by-zero error handling ("Cannot divide by 0").
- [x] Sequential and chained operation support.
- [x] CSS Grid alignment for buttons.
- [x] Event listeners without inline HTML `onclick` strings.
- [x] No `eval()` usage — custom tokenized Shunting-Yard parser.
- [x] Project documentation & README included.
