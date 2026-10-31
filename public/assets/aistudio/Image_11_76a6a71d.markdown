---
name: Cacerista Escolar Mobile
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#5b403d'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#8f6f6c'
  outline-variant: '#e4beb9'
  surface-tint: '#b91c1c'
  primary: '#93000b'
  on-primary: '#ffffff'
  primary-container: '#b91c1c'
  on-primary-container: '#ffcdc7'
  inverse-primary: '#ffb4ab'
  secondary: '#904d00'
  on-secondary: '#ffffff'
  secondary-container: '#fe932c'
  on-secondary-container: '#663500'
  tertiary: '#005137'
  on-tertiary: '#ffffff'
  tertiary-container: '#006c4a'
  on-tertiary-container: '#7aeeba'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad6'
  primary-fixed-dim: '#ffb4ab'
  on-primary-fixed: '#410002'
  on-primary-fixed-variant: '#93000b'
  secondary-fixed: '#ffdcc3'
  secondary-fixed-dim: '#ffb77d'
  on-secondary-fixed: '#2f1500'
  on-secondary-fixed-variant: '#6e3900'
  tertiary-fixed: '#85f8c4'
  tertiary-fixed-dim: '#68dba9'
  on-tertiary-fixed: '#002114'
  on-tertiary-fixed-variant: '#005137'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  headline-lg:
    fontFamily: Inter
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 30px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 26px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '500'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  margin: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1rem
  space-xl: 1.5rem
---

## Brand & Style

This design system establishes a high-efficiency mobile experience tailored for public school educators at the I.E. Andrés Avelino Cáceres Dorregaray (UGEL 04 Collique). Combining institutional civic pride with pragmatic utility, the aesthetic draws upon modern civic minimalism paired with functional tactile controls. 

The visual atmosphere balances solemnity, trust, and operational clarity. In the dynamic, fast-paced environment of classroom role calls, teachers require instant cognitive recognition, zero visual clutter, and accessible tap targets designed for one-handed thumb interaction. The visual tone balances the patriotic heritage of the school emblem with the streamlined cleanliness of contemporary pedagogical tools.

## Colors

The palette is anchored by the institution's heraldic heritage and optimized for immediate cognitive clarity in daylight classroom lighting:

- **Primary (`#B91C1C`)**: Cáceres crimson red. Expresses civic institutional authority, used for key actions, top app bars, and active navigational highlights.
- **Secondary (`#D97706`)**: Emblematic golden amber. Applied to badges, honorary highlights, alerts, and pending statuses.
- **Tertiary (`#059669`)**: Emerald green. Devoted specifically to the primary success state: "Presente" (Attended).
- **Neutral (`#0F172A`)**: Deep slate. Delivers AAA-compliant contrast for body copy, names, and core numerical tallies.

### Semantic Attendance Spectrum
- **Presente (P)**: `#059669` (surface: `#ECFDF5`, border: `#A7F3D0`)
- **Falta (F)**: `#DC2626` (surface: `#FEF2F2`, border: `#FECACA`)
- **Tardanza (T)**: `#D97706` (surface: `#FFFBEB`, border: `#FDE68A`)
- **Justificada (J)**: `#2563EB` (surface: `#EFF6FF`, border: `#BFDBFE`)

### Background & Canvas Neutrals
- **Background Canvas**: `#F8FAFC`
- **Surface Elevation (Card/Sheet)**: `#FFFFFF`
- **Muted Label / Secondary Text**: `#475569`
- **Subtle Dividers / Structural Borders**: `#E2E8F0`

## Typography

The design system relies entirely on `Inter` for exceptional legibility on variable density mobile displays. Letter forms remain crisp even when viewing student rosters in ambient sunlight.

- **Headlines**: Semi-bold to bold weights establish rapid contextual anchoring (Grade, Section, Date).
- **Body**: Medium weight for student names (`body-lg`) to prevent misreading during rapid scrolling, paired with regular weight (`body-md`) for institutional IDs and secondary metadata.
- **Labels & Badges**: Distinct uppercase tracking for attendance tags (`label-sm`), ensuring high scannability in metric summaries and compact row segments.

## Layout & Spacing

This layout adopts a mobile-first fluid vertical model tailored for single-column continuous interaction:

- **Horizontal Bleed**: Standard outer margin of `1rem` (16px) on mobile viewports to maximize usable width for student identification and four-step state selectors.
- **Vertical Rhythm**: A strict 4px base increment (`0.25rem`), utilizing `space-sm` (8px) between tight list items and `space-md` (12px) for card body padding.
- **Ergonomic Safe Zones**: Fixed bottom action bar containers include `1.5rem` bottom padding plus device safe-area insets to accommodate natural thumb positioning without accidental home-bar gestures.

## Elevation & Depth

Visual hierarchy uses soft ambient diffusion layered over neutral boundaries rather than heavy drop shadows:

- **Base Canvas**: Level 0 (`#F8FAFC`), completely flat.
- **Card Surfaces**: Level 1 (`#FFFFFF`), anchored by a 1px structural stroke in `#E2E8F0` and a soft ambient shadow: `0px 1px 3px rgba(15, 23, 42, 0.05)`.
- **Active State / Dropdowns / Popovers**: Level 2, with elevated presence: `0px 4px 12px rgba(15, 23, 42, 0.08)`.
- **Bottom Navigation & Floating Action Bars**: Level 3, anchored along the bottom with an inverted soft elevation: `0px -2px 10px rgba(15, 23, 42, 0.04)` combined with an upper border of `#E2E8F0`.

## Shapes

The interface embraces a balanced rounded geometry (`roundedness: 2`):
- **Base Components**: Student cards, input controls, and standard buttons utilize `0.5rem` (8px) corners.
- **Containers & Bottom Sheets**: Larger structural surfaces leverage `1rem` (16px) rounding to signal layered hierarchy.
- **Attendance Status Chips**: Segmented controls and status pills utilize pill caps (`9999px`) to visually separate interaction modes from standard structural cards.

## Components

### Attendance Student Row
- **Container**: White background card (`#FFFFFF`) with a 1px border (`#E2E8F0`), padding of `12px`, and a min-height of `72px`.
- **Student Profile**: Number order badge (e.g., "01"), full student surname in `body-lg` bold (`#0F172A`), followed by first name.
- **Direct Selector Buttons**: A horizontal segmented button group containing 4 touch targets:
  - **P (Presente)**: Emerald green background when active (`#059669`), white text.
  - **F (Falta)**: Crimson red background when active (`#DC2626`), white text.
  - **T (Tardanza)**: Amber gold background when active (`#D97706`), white text.
  - **J (Justificada)**: Cobalt blue background when active (`#2563EB`), white text.
  - **Inactive State**: Neutral surface (`#F1F5F9`), subtle border (`#CBD5E1`), text `#64748B`. Min touch target: `44px x 40px`.

### Quick Action Buttons
- **Primary Institutional Button**: Crimson background (`#B91C1C`), white text, bold `label-lg`, height `48px`, full width or prominent dock.
- **Secondary / Auxiliary Button**: Transparent background, 1.5px border (`#B91C1C` or `#D97706`), primary text color.

### Attendance Summary Pills & Metrics
- Inline statistical chips displaying live counters at the top of the roster:
  - Total Presentes (green pill), Faltas (red pill), Tardanzas (amber pill).
  - High-contrast visual numbers paired with micro-labels.

### Inputs & Filters
- **Class / Section Dropdown**: Min height `48px`, `#FFFFFF` fill with `#CBD5E1` border, rounded to `8px`, with bold selected text and trailing icon for instant section switching.
- **Date Selector**: Prominent banner displaying the current educational session with quick left/right day stepper arrows.