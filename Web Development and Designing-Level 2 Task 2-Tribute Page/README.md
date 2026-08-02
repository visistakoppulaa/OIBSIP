# Chronicle — Interactive Historical Tribute Page

A visually engaging, responsive, and feature-rich Tribute Application built to honor legendary historical figures, scientists, and visionaries. Designed and implemented in full compliance with the **Oasis Infobyte Task 2: Tribute Page** specifications and evaluation criteria.

---

## 📋 Task 2 Requirement Checklist Verification

| Requirement | Implementation Details | Status |
| :--- | :--- | :---: |
| **1. Page Title & Tagline** | Displays the subject's full name ("Dr. A. P. J. Abdul Kalam") and official one-line tagline in elegant display typography. | **✓ 100% Satisfied** |
| **2. Prominent Royalty-Free Image** | High-resolution portrait sourced from Wikimedia Commons / Unsplash with image caption, source badges, and full-resolution lightbox modal. | **✓ 100% Satisfied** |
| **3. Biography / Tribute Section** | At least 3–4 paragraphs of original written content (Contains 5 comprehensive, deep-dive chapters covering Early Life, Innovations, Defense, Presidency, and Legacy). | **✓ 100% Satisfied** |
| **4. Timeline / Key Achievements** | Chronological milestone section featuring category filtering tabs ("All", "Early Life", "Breakthrough", "Leadership", "Awards", "Legacy") and dual view mode (Interactive Cards vs HTML Ordered List). | **✓ 100% Satisfied** |
| **5. Distinctly Styled Quote Block** | Dedicated quote callout with decorative oversized quotation marks, audio speech reader, copy-to-clipboard, and quote archive library. | **✓ 100% Satisfied** |
| **6. At least 2 Different Background Colors** | Utilizes **3 distinct background colors** across major sections: Obsidian Slate (`#0B0F19`) for Hero, Warm Editorial Cream (`#FAF8F5`) for Biography, and Deep Navy (`#0B132B`) for Timeline. | **✓ 100% Satisfied** |
| **7. At least 2 Font Styles Explored** | Explores **3 font styles**: Playfair Display / Cinzel (Serif for Headings), Plus Jakarta Sans / Newsreader (Sans-Serif & Editorial for Body), and Space Mono (Monospace for Dates & Stats). | **✓ 100% Satisfied** |
| **8. Responsive Layout** | Fully adaptive for mobile, tablet, and ultra-wide screens using Tailwind CSS mobile-first breakpoint utilities. | **✓ 100% Satisfied** |

---

## ✨ Features & Highlights

1. **Interactive Multi-Figure Switcher**: Explore the primary featured figure, **Dr. A. P. J. Abdul Kalam** (The Missile Man of India & 11th President), or switch to **Ada Lovelace** (World's First Computer Programmer) or **Carl Sagan** (Cosmologist & Voyager Golden Record Curator).
2. **Audio Speech Reader**: Integrated Web Speech Synthesis API allows visitors to listen to an audio narration of the figure's biography and notable quotes.
3. **Interactive Timeline**: Search and filter milestones by category, toggle between card grids and chronological ordered lists, and open detailed milestone modals.
4. **Knowledge Trivia Challenge & Certificate**: 5-question trivia quiz with immediate explanation feedback, score calculation, and a printable/shareable Tribute Honor Certificate.
5. **Design & Font Customizer**: Real-time font pairing switcher (Serif + Sans, Classic + Editorial, Modern Tech) and theme palette controls.
6. **Self-Sourced Academic Content**: All biographical details are paraphrased from verified historical encyclopedias (Wikipedia, Britannica, and Official Archives).

---

## 🛠️ Tech Stack & Dependencies

- **Frontend Framework**: React 19 + TypeScript
- **Styling**: Tailwind CSS v4 (with custom `@layer utilities` font classes)
- **Icons**: Lucide React (`lucide-react`)
- **Typography**: Google Fonts (*Playfair Display*, *Cinzel*, *Newsreader*, *Plus Jakarta Sans*, *Space Mono*)
- **Audio Synthesis**: Native Web Speech API
- **Build Tool**: Vite 6

---

## 🚀 Local Development Setup

To run this project locally on your machine:

1. **Clone or Download the Repository**:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```

4. **Open in Browser**:
   Navigate to `http://localhost:3000` in your web browser.

---

## 📄 License & Attribution

- **Text Content**: Paraphrased from Wikipedia & Encyclopædia Britannica under Creative Commons Attribution-ShareAlike License.
- **Images**: Sourced under Public Domain and Creative Commons CC-BY-SA via Wikimedia Commons and Unsplash.
