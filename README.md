# Frontend Wizards — Stage 0: Testable Todo Card

A clean, modern, and fully testable Todo Item Card component built as part of the Frontend Stage 0 project for hng Internship.

## Features

- All required `data-testid` attributes for automated testing
- Fully responsive design (works perfectly from 320px to 1200px+)
- Accessible (proper semantic HTML, labels, focus styles, keyboard navigation)
- Interactive checkbox that strikes through the title and updates status to "Done"
- Live "Time Remaining" calculation (updates every 60 seconds)
- Dummy Edit and Delete buttons with proper feedback

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript

## Live Demo

[View Live Demo](https://todo-card-eight.vercel.app/)

## Project Structure
Todo-Card/
├── index.html
├── style.css
├── script.js
└── README.md


## How to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/UfomaGrace/todo-card.git

2. Open index.html in your browser.


## Accessibility & Testing

- Uses semantic HTML (<article>, <time>, <label>, etc.)
- Proper aria-label attributes
- Keyboard navigable
- WCAG AA compliant contrast


## What I Learned

- Writing testable components with exact data-testid
- Implementing real-time time-remaining logic
- Balancing clean design with strong accessibility and responsiveness



## Stage 1a
## What Changed from Stage 0

- **Added full Edit Mode** – Clicking "Edit" now opens a form to modify title, description, priority, and due date.
- **Status Management** – Added a status dropdown (`test-todo-status-control`) that syncs with the checkbox.
- **Priority Visual Indicator** – Added a colored dot indicator that changes based on priority level.
- **Collapsible Description** – Long descriptions are now collapsed by default with an expand/collapse toggle.
- **Improved Time Logic** – More granular time remaining ("Due in 3 hours", "Due in 45 minutes", etc.) and clear overdue warning.
- **State Management** – Implemented centralized state to keep checkbox, status, visual states, and edit form in sync.
- **Better Accessibility** – Added proper `aria-labels`, `aria-expanded`, `aria-controls`, and focus management.

## New Design Decisions

- Separated **View Mode** and **Edit Mode** using two distinct containers for better maintainability.
- Used a colored dot as the priority indicator for stronger visual feedback.
- Made the card slightly wider (460px) for better readability in edit mode.
- Soft, modern color palette with clear visual states for "Done", "Overdue", and different priorities.
- Improved spacing and typography for a cleaner, more premium feel.

## Features Implemented

- Full editing functionality (title, description, priority, due date)
- Real-time status synchronization between checkbox and dropdown
- Expand/collapse for long descriptions
- Granular time remaining with overdue indicator
- Proper state management
- Keyboard accessible navigation

## Known Limitations

- Focus trapping in edit mode is not implemented yet (can be added in future stages).
- No persistence — changes are lost when the page is refreshed.
- Tags are hardcoded and not editable in this stage.
- No validation on edit form (e.g., empty title or past due dates).

## Accessibility Notes

- All interactive elements have proper labels and focus styles.
- Expand/collapse toggle uses `aria-expanded` and `aria-controls`.
- Time remaining updates use `aria-live="polite"`.
- Edit form fields are properly labeled with `<label for="">`.
- Keyboard navigation order maintained (Checkbox → Status → Expand → Edit → Delete).
- Good color contrast maintained across all states (WCAG AA compliant).