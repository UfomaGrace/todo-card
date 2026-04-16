// script.js
const dueDate = new Date('2026-04-18T18:00:00Z');

// Format due date nicely
function updateDueDate() {
    const dueEl = document.getElementById('test-todo-due-date');
    
    // Nice display text
    const displayOptions = { month: 'short', day: 'numeric', year: 'numeric' };
    dueEl.textContent = `Due ${dueDate.toLocaleDateString('en-US', displayOptions)}`;

    // Proper datetime attribute (ISO format)
    const year = dueDate.getFullYear();
    const month = String(dueDate.getMonth() + 1).padStart(2, '0');
    const day = String(dueDate.getDate()).padStart(2, '0');
    
    dueEl.setAttribute('datetime', `${year}-${month}-${day}T18:00`);
}

// Calculate time remaining
function getTimeRemaining() {
    const now = new Date();
    const diffMs = dueDate.getTime() - now.getTime();

    if (diffMs < 0) {
        const hours = Math.floor(Math.abs(diffMs) / (1000 * 60 * 60));
        return `Overdue by ${hours} hour${hours !== 1 ? 's' : ''}`;
    }

    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (days > 1) return `Due in ${days} days`;
    if (days === 1) return "Due tomorrow";
    return "Due now!";
}

function updateTimeRemaining() {
    const timeEl = document.getElementById('test-todo-time-remaining');
    timeEl.textContent = getTimeRemaining();
}

// Checkbox behavior
function setupCheckbox() {
    const checkbox = document.getElementById('complete-toggle');
    const title = document.getElementById('test-todo-title');
    const status = document.getElementById('test-todo-status');

    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            title.style.textDecoration = 'line-through';
            title.style.color = '#9ca3af';
            status.textContent = 'Done';
            status.style.backgroundColor = '#d1fae5';
            status.style.color = '#15803d';
        } else {
            title.style.textDecoration = 'none';
            title.style.color = '#18181b';
            status.textContent = 'In Progress';
            status.style.backgroundColor = '#fef3c7';
            status.style.color = '#d97706';
        }
    });
}

// Button actions (dummy)
function setupButtons() {
    const editBtn = document.querySelector('[data-testid="test-todo-edit-button"]');
    const deleteBtn = document.querySelector('[data-testid="test-todo-delete-button"]');

    editBtn.addEventListener('click', () => {
        console.log('✅ Edit clicked');
        alert('Edit mode would open here (Stage 0 demo)');
    });

    deleteBtn.addEventListener('click', () => {
        console.log('✅ Delete clicked');
        if (confirm('Delete this todo? (demo only)')) {
            alert('Todo would be deleted (demo)');
        }
    });
}

// Initialize everything
function init() {
    updateDueDate();
    updateTimeRemaining();
    setInterval(updateTimeRemaining, 60000); // update every 60 seconds
    setupCheckbox();
    setupButtons();

    console.log('%c✅ Todo Card ready! All data-testid are set.', 'color: #16a34a; font-weight: bold');
}

window.onload = init;