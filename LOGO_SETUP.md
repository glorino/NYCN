# Logo Setup Instructions

## Required Logo Files

To complete the logo integration, please add the following files:

### 1. Main Logo (for Header and Footer)
- **Location**: `public/nycn-logo.png`
- **Format**: PNG (or SVG - if SVG, name it `nycn-logo.svg` and update the path in Header.tsx and Footer.tsx)
- **Recommended Size**: 200x200px or larger (will be scaled down automatically)
- **Description**: The circular NYCN Ireland logo with golden stars, shield emblem, and "NYCN IRELAND" text

### 2. Favicon
- **Location**: `public/favicon.png`
- **Format**: PNG
- **Recommended Sizes**: 
  - 32x32px (standard favicon)
  - 192x192px (for better quality)
  - 512x512px (for high-DPI displays)
- **Description**: Same NYCN Ireland logo, optimized for small display

## Current Implementation

- ✅ Header logo: Displays at 56px height on mobile (h-14), 64px on larger screens (h-16)
- ✅ Footer logo: Displays at 56px height (h-14)
- ✅ Favicon: Linked in `index.html`
- ✅ Error handling: Logo will hide gracefully if file is missing
- ✅ Responsive: Logo scales appropriately on all screen sizes

## Notes

- The logo is loaded from the `public` folder (accessible at `/nycn-logo.png`)
- The logo will automatically scale on hover in the header
- The logo maintains aspect ratio using `object-contain`
- If the logo file is missing, it will hide gracefully without breaking the page
- The "NYCN Ireland" text will always be visible next to the logo

