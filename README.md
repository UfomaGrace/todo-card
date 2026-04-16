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