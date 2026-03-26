# Design System & Style Guide

## Color Palette

### Primary Colors
- **Blue-500**: `#0ea5e9` - Primary CTA, links, focus states
- **Cyan-500**: `#06b6d4` - Secondary highlights, accents
- **Blue-600**: `#0284c7` - Hover states for primary
- **Cyan-600**: `#0891b2` - Hover states for secondary

### Neutral Colors
- **Slate-900**: `#0f172a` - Dark backgrounds, text
- **Slate-800**: `#1e293b` - Secondary backgrounds
- **Slate-700**: `#334155` - Tertiary backgrounds
- **Gray-900**: `#111827` - Primary text
- **Gray-600**: `#4b5563` - Secondary text
- **Gray-500**: `#6b7280` - Tertiary text
- **Gray-200**: `#e5e7eb` - Borders, dividers
- **Gray-100**: `#f3f4f6` - Light backgrounds

### Status Colors
- **Green-500**: `#10b981` - Success, valid states
- **Red-500**: `#ef4444` - Danger, error states
- **Yellow-500**: `#f59e0b` - Warning states
- **Blue-500**: `#0ea5e9` - Info states

## Typography

### Font Family
```css
-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue'
```

### Font Sizes
- **xs**: 0.75rem (12px) - Captions, helper text
- **sm**: 0.875rem (14px) - Secondary text, labels
- **base**: 1rem (16px) - Body text, inputs
- **lg**: 1.125rem (18px) - Subheadings
- **xl**: 1.25rem (20px) - Section titles
- **2xl**: 1.5rem (24px) - Page titles
- **3xl**: 1.875rem (30px) - Large headings
- **4xl**: 2.25rem (36px) - Hero titles

### Font Weights
- **Regular**: 400 - Body text
- **Medium**: 500 - Labels, secondary headings
- **Semibold**: 600 - Button text, tertiary headings
- **Bold**: 700 - Headings, emphasis

### Line Heights
- **Tight**: 1.25 - Headings
- **Snug**: 1.375 - Subheadings
- **Normal**: 1.5 - Body text
- **Relaxed**: 1.625 - Forms, accessibility
- **Loose**: 2 - Wide spacing

## Spacing Scale

Based on 8px system:
- **0.5**: 4px
- **1**: 8px
- **2**: 16px
- **3**: 24px
- **4**: 32px
- **6**: 48px
- **8**: 64px
- **12**: 96px
- **16**: 128px

## Components

### Button Variants

#### Primary Button
```
Background: Gradient blue-500 to cyan-500
Text: White, semibold
Padding: px-4 py-2 (md size)
Hover: Darker gradient + shadow-xl
Active: Shadow reduced
Disabled: Gray-400 background, cursor-not-allowed
```

#### Secondary Button
```
Background: Gray-200
Text: Gray-900, semibold
Hover: Gray-300
Active: Gray-400
```

#### Danger Button
```
Background: Red-500
Text: White, semibold
Hover: Red-600
Active: Red-700
```

#### Outline Button
```
Border: 2px blue-500
Text: Blue-600
Background: Transparent
Hover: Blue-50 background
Active: Blue-100 background
```

### Input Fields
```
Border: 1px gray-300
Radius: lg (8px)
Padding: px-4 py-2
Focus: Ring-2 blue-500, border transparent
Disabled: bg-gray-100, cursor-not-allowed
Error: Border red-500, ring-red-500
```

### Cards
```
Background: White
Border: 1px gray-200
Radius: xl (12px)
Padding: p-6
Shadow: shadow-sm
Hover: shadow-md
```

### Badges
```
Padding: px-3 py-1
Radius: full (pills)
Font-size: xs, semibold
Variants:
  - Blue: bg-blue-100 text-blue-800
  - Green: bg-green-100 text-green-800
  - Red: bg-red-100 text-red-800
  - Yellow: bg-yellow-100 text-yellow-800
```

### Typography Classes

#### Headings
```
h1: text-4xl font-bold leading-tight
h2: text-3xl font-bold leading-tight
h3: text-2xl font-bold leading-snug
h4: text-xl font-semibold leading-snug
h5: text-lg font-semibold
h6: text-base font-semibold
```

#### Body
```
Body: text-base leading-relaxed text-gray-900
Caption: text-xs leading-normal text-gray-500
Label: text-sm font-medium text-gray-700
```

## Shadows

### Elevation Levels
- **None**: No shadow (elevation 0)
- **sm**: 0 1px 2px 0 rgba(0,0,0,0.05)
- **md**: 0 4px 6px -1px rgba(0,0,0,0.1)
- **lg**: 0 10px 15px -3px rgba(0,0,0,0.1)
- **xl**: 0 20px 25px -5px rgba(0,0,0,0.1)
- **2xl**: 0 25px 50px -12px rgba(0,0,0,0.25)

### Special Shadows
- **glow**: 0 0 15px rgba(14, 165, 233, 0.5)
- **glow-lg**: 0 0 30px rgba(14, 165, 233, 0.3)

## Borders

### Border Radius
- **sm**: 0.375rem (6px)
- **md**: 0.5rem (8px)
- **lg**: 0.75rem (12px)
- **xl**: 1rem (16px)
- **2xl**: 1.5rem (24px)
- **full**: 9999px (pills)

### Border Widths
- **1px**: Subtle borders (default)
- **2px**: Active/focused states
- **4px**: Emphasis borders

## Animations

### Transitions
- **Fast**: 150ms
- **Normal**: 200ms (default)
- **Slower**: 300ms
- **Slow**: 500ms

### Easing Functions
- **ease-in**: cubic-bezier(0.4, 0, 1, 1)
- **ease-out**: cubic-bezier(0, 0, 0.2, 1) (default)
- **ease-in-out**: cubic-bezier(0.4, 0, 0.2, 1)

### Standard Transitions
```css
transition: all 200ms ease-out;  /* All properties */
transition: background-color 150ms ease-out;  /* Specific property */
```

### Custom Animations
```
spin-slow: 3s linear infinite
pulse-slow: 3s cubic-bezier loop
bounce-slow: 2s infinite
```

## Responsive Breakpoints

- **Mobile**: < 640px (default)
- **sm**: >= 640px
- **md**: >= 768px (desktop)
- **lg**: >= 1024px (large desktop)
- **xl**: >= 1280px

### Responsive Pattern
```jsx
{/* Default: mobile */}
className="px-4 py-2 text-sm"
{/* Desktop (md breakpoint) */}
className="md:px-6 md:py-3 md:text-base"
{/* Large screens */}
className="lg:px-8 lg:text-lg"
```

## Icon Guidelines

- **Size sm**: 16px (w-4 h-4)
- **Size md**: 20px (w-5 h-5) - default
- **Size lg**: 24px (w-6 h-6)
- **Size xl**: 32px (w-8 h-8)

### Icon Usage
```jsx
<Icon className="w-5 h-5 text-blue-500" />
```

## Accessibility

### Focus Indicators
```
Ring: 2px blue-500
Offset: 2px
```

### Color Contrast
- **AAA Level**: 7:1 (normal text)
- **AA Level**: 4.5:1 (large text)
- **Minimum**: 3:1 (UI components)

### Touch Targets
- **Minimum Size**: 44x44px (mobile)
- **Recommended**: 48x48px

## States

### Interactive States
1. **Default**: Normal appearance
2. **Hover**: Subtle elevation/color change
3. **Active**: Stronger visual feedback
4. **Disabled**: Reduced opacity, cursor-not-allowed
5. **Focus**: Ring indicator + outline
6. **Loading**: Spinner animation

### Form States
1. **Default**: Border gray-300
2. **Focus**: Ring-2 blue-500
3. **Valid**: Green border + icon
4. **Error**: Red-500 border + icon
5. **Disabled**: Gray background

## Dark Mode (Future)

Prepared structure for dark mode:
```
Light: bg-white, text-gray-900
Dark: bg-slate-900, text-gray-100
```

## Usage Examples

### Common Patterns

#### Modal Header
```
Font: text-2xl font-bold
Color: text-gray-900
Spacing: mb-6
```

#### Form Group
```
Container: space-y-6
Label: text-sm font-semibold text-gray-700
Input: w-full input-primary
Helper: text-xs text-gray-500 mt-1
Error: text-red-500 text-sm mt-1
```

#### Card Section
```
Container: card mb-6
Header: pb-4 border-b border-gray-200
Body: pt-4
Footer: mt-4 pt-4 border-t border-gray-200
```

---

**Design Language**: Modern, Professional, Accessible
**Last Updated**: March 2026
**Version**: 1.0
