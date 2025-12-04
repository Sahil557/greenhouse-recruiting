# Submission Notes

**TEMPLATE - Complete this form when submitting your work**

**Candidate Name**: Sahil gupta
**Date**: 03-Dec-2025

## What I Completed

### Frontend
- [x] Sidebar search input
- [x] Full Text Search toggle
- [x] Sort dropdown
- [x] Collapsible filter sections
- [x] Reset Filters button
- [x] Candidate list display
- [x] Candidate card components
- [x] Pagination component
- [x] Search filtering functionality
- [x] Sort functionality
- [x] Pagination logic

### Backend
- [ ] GET /api/candidates endpoint
- [ ] Filtering by search term
- [ ] Sorting logic
- [ ] Pagination logic
- [ ] CORS configuration

### Styling
- [x] Visual accuracy to design
- [x] Hover states
- [x] Focus states
- [ ] Responsive layout (if attempted)

## What I Would Do With More Time

[List features, improvements, or refactorings you would add if you had more time]

## Features Implemented

1. **Componentization**
   - Created reusable components wherever possible (Button, Chip, Dropdown, Radio, CollapsibleSection, Table, Pagination, Header, Icon, etc.) to ensure modularity and maintainability.

2. **Dropdown**
   - Implemented a fully functional dropdown component with proper selection handling.
   - Added rotation animation for dropdown icon when opened/closed.
   - Applied selected state styles for better UX.

3. **CSS & Theming**
   - Created a dedicated CSS file with all required colors and utilities for the UI.
   - Ensured consistent styling across components.

4. **Accordion / Collapsible Sections**
   - Added props to control accordion behavior:
     - Ability to open multiple sections at once.
     - Option to open one section at a time.
   - Added smooth open/close animations and rotation effect on icons.

5. **Buttons**
   - Added hover, focus, and ring effects for better interactivity.
   - Ensured consistent styling and reusable variants.

6. **Icons**
   - Created a reusable Icon component to handle different SVGs across the app.

7. **Header**
   - Implemented a sticky header for better navigation and usability.

8. **Sidebar Functionality**
   - Enabled selection of options in the sidebar accordion.
   - Dynamically show selected options as Chips.
   - Chips can be removed individually or all at once using the Reset Filters button.
   - Reset Filters button is hidden when no filters are selected.

9. **Animations**
   - Smooth animations for opening/closing accordions and dropdowns.
   - Rotating icons for better visual feedback.

---

## What I Would Do With More Time

- Add full **responsiveness** for mobile and tablet screens.  
- Integrate **real API data** instead of mock data.  
- Implement **multi-select filters** for some accordion sections.  
- Add **search/filter functionality** for the dropdowns.  
- Include **keyboard accessibility** for dropdowns and accordions.  
- Add **unit and integration tests** for critical components.  
- Enhance **UI/UX** with advanced transitions and micro-interactions.  
- Use of Mock data for better Readability.
- Added functionality for search, filter, sort, pagination and generate report on excel and json.

## Libraries/Packages Added

[If you added any packages beyond the starter, list them here with explanations]

- `tw-merge` - used to override Tailwind classes, making it easy to update styles dynamically in reusable components. 

## AI Tools Used

[If you used any AI tools (ChatGPT, Copilot, Claude, etc.), note which ones and how]

Examples:
- Used GitHub Copilot for autocompletion
- Used ChatGPT to debug a TypeScript error
- Used Claude to understand FastAPI query parameters
- etc.

## Challenges & Solutions

- **Figma limitations for fast development** – In Figma, I could not directly select components, typography, or elements easily, which made it harder to quickly reference styles or structure for implementation.  
  **Solution:** I inspected layers carefully, referred to design tokens where possible, and created reusable components in code to match the design system efficiently.

- **Dropdown hover & open state visualization** – Figma does not show interactive states like hover or dropdown open behavior.  
  **Solution:** I implemented these interactions in React with state management and added CSS animations to replicate hover and open effects for a realistic user experience.

## Additional Notes

[Any other notes you'd like to share about your implementation]
