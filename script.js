// script.js - Stage 1a State Management

let todoState = {
    id: 1,
    title: "Frontend Wizard Todo Card",
    description: "Build a clean, testable Todo card component with all required data-testid attributes, accessibility, and responsiveness.",
    priority: "High",           // "Low" | "Medium" | "High"
    dueDate: "2026-04-18",      // YYYY-MM-DD format
    status: "In Progress",      // "Pending" | "In Progress" | "Done"
    isExpanded: false,
    tags: ["#frontend", "#urgent", "#design"]
};

// Cache DOM elements
const elements = {
    card: document.getElementById('test-todo-card'),
    
    // View Mode
    viewMode: document.getElementById('view-mode'),
    title: document.getElementById('test-todo-title'),
    description: document.getElementById('test-todo-description'),
    priorityBadge: document.getElementById('test-todo-priority'),
    priorityIndicator: document.getElementById('test-todo-priority-indicator'),
    dueDateEl: document.getElementById('test-todo-due-date'),
    statusBadge: document.getElementById('test-todo-status'),
    timeRemaining: document.getElementById('test-todo-time-remaining'),
    overdueIndicator: document.getElementById('test-todo-overdue-indicator'),
    checkbox: document.getElementById('complete-toggle'),
    statusControl: document.getElementById('test-todo-status-control'),
    expandToggle: document.getElementById('test-todo-expand-toggle'),
    collapsibleSection: document.getElementById('test-todo-collapsible-section'),
    
    // Edit Mode
    editMode: document.getElementById('edit-mode'),
    editForm: document.getElementById('test-todo-edit-form'),
    editTitle: document.getElementById('test-todo-edit-title-input'),
    editDescription: document.getElementById('test-todo-edit-description-input'),
    editPriority: document.getElementById('test-todo-edit-priority-select'),
    editDueDate: document.getElementById('test-todo-edit-due-date-input'),
    saveBtn: document.getElementById('test-todo-save-button'),
    cancelBtn: document.getElementById('test-todo-cancel-button')
};

// ==================== RENDER FUNCTIONS ====================

function renderCard() {
    // Render Title
    elements.title.textContent = todoState.title;
    
    // Render Description
    elements.description.textContent = todoState.description;
    
    // Render Priority
    elements.priorityBadge.textContent = todoState.priority;
    elements.priorityBadge.className = `priority-badge priority-${todoState.priority.toLowerCase()}`;
    
    // Render Priority Indicator
    elements.priorityIndicator.className = `priority-indicator priority-${todoState.priority.toLowerCase()}`;
    
    // Render Due Date
    const due = new Date(todoState.dueDate);
    elements.dueDateEl.textContent = `Due ${due.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
    elements.dueDateEl.setAttribute('datetime', todoState.dueDate);
    
    // Render Status
    elements.statusBadge.textContent = todoState.status;
    elements.statusBadge.className = `status-badge status-${todoState.status.toLowerCase().replace(/\s+/g, '-')}`;
    
    // Sync Checkbox
    elements.checkbox.checked = todoState.status === "Done";
    
    // Sync Status Control
    elements.statusControl.value = todoState.status;
    
    // Render Time Remaining
    updateTimeRemaining();
    
    // Render Expand/Collapse
    updateExpandState();
}

function updateTimeRemaining() {
    if (todoState.status === "Done") {
        elements.timeRemaining.textContent = "Completed";
        elements.timeRemaining.className = "time-remaining completed";
        elements.overdueIndicator.textContent = "";
        return;
    }

    const now = new Date();
    const due = new Date(todoState.dueDate + "T18:00:00");
    const diffMs = due.getTime() - now.getTime();

    let text = "";
    let isOverdue = diffMs < 0;

    if (isOverdue) {
        const hours = Math.floor(Math.abs(diffMs) / (1000 * 60 * 60));
        text = `Overdue by ${hours} hour${hours !== 1 ? 's' : ''}`;
        elements.overdueIndicator.textContent = "Overdue";
        elements.overdueIndicator.className = "overdue-indicator show";
    } else {
        const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        if (days > 1) text = `Due in ${days} days`;
        else if (days === 1) text = "Due tomorrow";
        else {
            const hoursLeft = Math.floor(diffMs / (1000 * 60 * 60));
            if (hoursLeft > 0) text = `Due in ${hoursLeft} hours`;
            else text = "Due now!";
        }
        elements.overdueIndicator.textContent = "";
        elements.overdueIndicator.className = "overdue-indicator";
    }

    elements.timeRemaining.textContent = text;
}

function updateExpandState() {
    const isLong = todoState.description.length > 120;
    const shouldExpand = todoState.isExpanded || !isLong;

    elements.collapsibleSection.style.maxHeight = shouldExpand ? 'none' : '80px';
    elements.expandToggle.textContent = shouldExpand ? "Show less" : "Show more";
    elements.expandToggle.setAttribute('aria-expanded', shouldExpand);
}

// ==================== EVENT LISTENERS ====================

function setupEventListeners() {
    // Checkbox
    elements.checkbox.addEventListener('change', () => {
        todoState.status = elements.checkbox.checked ? "Done" : "Pending";
        renderCard();
    });

    // Status Control
    elements.statusControl.addEventListener('change', () => {
        todoState.status = elements.statusControl.value;
        renderCard();
    });

    // Expand Toggle
    elements.expandToggle.addEventListener('click', () => {
        todoState.isExpanded = !todoState.isExpanded;
        updateExpandState();
    });

    // Edit Button
    document.querySelector('[data-testid="test-todo-edit-button"]').addEventListener('click', enterEditMode);

    // Save Button
    elements.saveBtn.addEventListener('click', saveChanges);

    // Cancel Button
    elements.cancelBtn.addEventListener('click', cancelEdit);

    // Live Time Updates
    setInterval(updateTimeRemaining, 60000);
}

// ==================== EDIT MODE FUNCTIONS ====================

function enterEditMode() {
    // Populate form with current values
    elements.editTitle.value = todoState.title;
    elements.editDescription.value = todoState.description;
    elements.editPriority.value = todoState.priority;
    elements.editDueDate.value = todoState.dueDate;

    // Switch visibility
    elements.viewMode.style.display = 'none';
    elements.editMode.style.display = 'block';
    
    // Focus first input
    elements.editTitle.focus();
}

function saveChanges() {
    // Update state from form
    todoState.title = elements.editTitle.value.trim();
    todoState.description = elements.editDescription.value.trim();
    todoState.priority = elements.editPriority.value;
    todoState.dueDate = elements.editDueDate.value;

    // Exit edit mode
    elements.viewMode.style.display = 'block';
    elements.editMode.style.display = 'none';

    renderCard();
}

function cancelEdit() {
    elements.viewMode.style.display = 'block';
    elements.editMode.style.display = 'none';
}

// ==================== INITIALIZATION ====================

function init() {
    setupEventListeners();
    renderCard();
    console.log('%c✅ Stage 1a Todo Card initialized with state management!', 'color: #16a34a; font-weight: bold');
}

window.onload = init;