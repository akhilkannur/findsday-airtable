# Salestools Club Design System

## Direction: Precision & Density
**Aesthetic:** Swiss-inspired, high-density, technical, and "agent-ready."
**Keywords:** Monochromatic, Bold, Schematic, Grid-based, High-contrast.

## 01. Spacing & Grid
- **Base Unit:** 4px
- **Scale:** 4, 8, 12, 16, 24, 32, 48, 64, 80, 96, 128
- **Grid:** 12-column layout for desktop; 1-column for mobile.
- **Container:** Max-width 7xl (80rem / 1280px).

## 02. Color Palette
- **Primary Foreground:** #121212 (Ink Black)
- **Primary Background:** #F4F4F1 (Sage BG)
- **Secondary Background:** #FFFFFF (White)
- **Accent Blue:** #3B82F6 (Technical/API)
- **Accent Orange:** #F59E0B (Action/Alert)
- **Muted Border:** rgba(18, 18, 18, 0.1)

## 03. Typography
- **Display:** Playfair Display (Italic for emphasis, Black weight for headers)
- **Interface:** Inter (Bold for labels, Regular for body)
- **Technical:** Geist Mono (Code, Configs, Micro-labels)

## 04. Component Patterns
### A. Tool Card (Node Card)
- **Border:** 1px solid #121212 (Ink Black)
- **Padding:** 8 (32px)
- **Radius:** 0px (Sharp corners)
- **Shadow:** 4px 4px 0px rgba(18, 18, 18, 0.05)
- **Hover:** Border-color changes to Accent Blue, Shadow increases to 8px.

### B. Primary Button (Action Node)
- **Height:** 48px
- **Padding:** 0 24px
- **Background:** #121212
- **Text:** #FFFFFF, All Caps, Bold, 0.1em tracking.
- **Shadow:** 4px 4px 0px #3B82F6

### C. Search Bar
- **Height:** 64px
- **Icon:** Search (Lucide)
- **Style:** Understated border, focus-visible accent blue.

## 05. UI Principles (Craft & Enforcement)
1. **No Border Radius:** All elements should have 0px radius to maintain the "schematic" look.
2. **Heavy Borders:** Use 1px or 2px solid borders instead of subtle shadows.
3. **Monospace labels:** Use Geist Mono for all uppercase micro-labels (e.g., "CATEGORIES", "VERSION").
4. **High Contrast:** Ensure all interactive elements have a clear :hover state using Accent Blue or Accent Orange.
