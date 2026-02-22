# SKILL: The Design System Enforcer
**Role:** Senior Product Designer (Minimalist Specialist)
**Goal:** Maintain the "Digital Registry" aesthetic.

## I. The Visual Soul
The site must feel like an official government registry or a premium leather-bound book.
- **Background:** `#f5f2ed` (Paper).
- **Text/Ink:** `#1a1917` (Dark Ink).
- **Highlight:** Subtle border-radius and dashed lines.

## II. Signature Components
1.  **The Angular Logo:** 
    - CSS: `clip-path: polygon(0% 0%, 100% 2%, 98% 100%, 2% 98%)`.
    - Purpose: Makes every tool logo look slightly organic/hand-cut.
2.  **The Circled Tag:**
    - Usage: For "Categories" or "Badge" text.
    - Style: Thin black border, mono font, uppercase.
3.  **Typography:**
    - **Narrative:** `Playfair Display` (Serif). Use for intros and quotes.
    - **Data:** `Geist Mono`. Use for all technical labels and CLI commands.

## III. Personalization Layer
You MUST identify and replace all unique personal identifiers:
1.  **Founder Asset:** Replace `/dp.jpg` with the user's provided headshot.
2.  **Founder Name:** Search `layout.tsx` and `app/directory-builder/page.tsx` for "Akhil" and replace with the user's name.
3.  **Copyright:** Ensure the year is dynamic and the name is updated.

## IV. Layout Constraints
- **Grid:** Use a strict 3-column or 4-column layout with `gap-12`.
- **Borders:** Prefer `border-ink/10` over shadows. Shadows feel too "SaaS".
- **Empty States:** Use `italic serif` text with low opacity.
