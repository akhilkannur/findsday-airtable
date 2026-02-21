---
name: interface-design
description: Design engineering for consistent UI interfaces (Craft, Memory, Enforcement). Use when building or auditing dashboards, tools, and apps to ensure principle-based design consistency.
---

# Interface Design Skill

This skill enforces a rigorous design engineering workflow to ensure visual consistency and professional polish across your application.

## Core Pillars

### 1. Craft
Focus on principle-based design. Every UI element should have a reason for its style.
- **Direction:** Establish a design direction (e.g., "Precision & Density").
- **Tokens:** Define strict spacing and color tokens.
- **Patterns:** Reuse component patterns (buttons, cards, inputs) instead of creating unique styles.

### 2. Memory
All design decisions must be persistent.
- **System File:** Store all tokens and patterns in `.interface-design/system.md`.
- **Automatic Loading:** Read `system.md` before performing any UI work to maintain continuity across sessions.

### 3. Enforcement
Actively prevent design drift.
- **Audit:** Use this skill to audit existing code against the defined `system.md`.
- **Validation:** Ensure new components strictly adhere to established tokens and patterns.

## Workflow

1. **Initialize:** If `.interface-design/system.md` doesn't exist, create it with a chosen design direction.
2. **Consult Memory:** Read the system file before any modification to CSS or UI components.
3. **Execute:** Apply changes using the defined tokens.
4. **Audit:** Periodically run an audit of the codebase to identify and fix style inconsistencies.

## Design Directions (Examples)
- **Precision & Density:** Small spacing scale (4px), sharp corners (0px), high contrast, monochromatic.
- **Utility & Function:** GitHub-inspired density, muted borders, functional focus.
- **Warmth & Approachability:** Larger spacing (8px), rounded corners (8px+), softer colors.

## Enforcement Rules
- **No Magic Numbers:** Never use arbitrary pixel values. Use tokens from the scale.
- **Component Parity:** If a "Button" pattern exists, all buttons must use it.
- **Alignment:** Every element must sit on the defined spacing grid.
