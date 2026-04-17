// script.js - Stage 1a (Fixed Due Date Issue)

let todoState = {
    id: 1,
    title: "Frontend Wizard Todo Card",
    description: "Build a clean, testable Todo card component with all required data-testid attributes, accessibility, and responsiveness.",
    priority: "High",
    dueDate: "2026-04-18",      // YYYY-MM-DD
    status: "In Progress",
    isExpanded: false,
    tags: ["#frontend", "#urgent", "#design"]
};

// Cache DOM elements - We'll fill this after DOM is loaded
let elements = {};

// ==================== RENDER FUNCTIONS ====================

function renderCard() {
    if (!elements.dueDateEl) return;   // Safety check

    // Title
    elements.title.textContent = todoState.title;
    
    // Description
    elements.description.textContent = todoState.description;
    
    // Priority
    elements.priorityBadge.textContent = todoState.priority;
    elements.priorityBadge.className = `priority-badge priority-${todoState.priority.toLowerCase()}`;
    
    elements.priorityIndicator.className = `priority-indicator priority-${todoState.priority.toLowerCase()}`;
    
    // Due Date - FIXED
    const due = new Date(todoState.dueDate);
    if (!isNaN(due.getTime())) {
        elements.dueDateEl.textContent = `Due ${due.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
        })}`;
        elements.dueDateEl.setAttribute('datetime', todoState.dueDate);
    }

    // Status
    elements.statusBadge.textContent = todoState.status;
    elements.statusBadge.className = `status-badge status-${todoState.status.toLowerCase().replace(/\s+/g, '-')}`;
    
    // Sync Checkbox & Status Control
    elements.checkbox.checked = todoState.status === "Done";
    elements.statusControl.value = todoState.status;
    
    // Time Remaining + Expand
    updateTimeRemaining();
    updateExpandState();
}

function updateTimeRemaining() {
    if (todoState.status === "Done") {
        elements.timeRemaining.textContent = "Completed";
        elements.timeRemaining.className = "time-remaining completed";
        elements.overdueIndicator.className = "overdue-indicator";
        return;
    }

    const now = new Date();
    const due = new Date(todoState.dueDate + "T18:00:00");
    const diffMs = due.getTime() - now.getTime();

    let text = "";
    const isOverdue = diffMs < 0;

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
            text = hoursLeft > 0 ? `Due in ${hoursLeft} hours` : "Due now!";
        }
        elements.overdueIndicator.className = "overdue-indicator";
    }

    elements.timeRemaining.textContent = text;
}

function updateExpandState() {
    const isLong = todoState.description.length > 120;
    const shouldExpand = todoState.isExpanded || !isLong;

    elements.collapsibleSection.style.maxHeight = shouldExpand ? 'none' : '80px';
    elements.expandToggle.textContent = shouldExpand ? "Show less" : "Show more";
    elements.expandToggle.setAttribute('aria-expanded', shouldExpand.toString());
}

// ==================== EVENT LISTENERS ====================

function setupEventListeners() {
    elements.checkbox.addEventListener('change', () => {
        todoState.status = elements.checkbox.checked ? "Done" : "Pending";
        renderCard();
    });

    elements.statusControl.addEventListener('change', () => {
        todoState.status = elements.statusControl.value;
        renderCard();
    });

    elements.expandToggle.addEventListener('click', () => {
        todoState.isExpanded = !todoState.isExpanded;
        updateExpandState();
    });

    document.querySelector('[data-testid="test-todo-edit-button"]').addEventListener('click', enterEditMode);
    elements.saveBtn.addEventListener('click', saveChanges);
    elements.cancelBtn.addEventListener('click', cancelEdit);

    setInterval(updateTimeRemaining, 60000);
}

// ==================== EDIT MODE ====================

function enterEditMode() {
    elements.editTitle.value = todoState.title;
    elements.editDescription.value = todoState.description;
    elements.editPriority.value = todoState.priority;
    elements.editDueDate.value = todoState.dueDate;

    elements.viewMode.style.display = 'none';
    elements.editMode.style.display = 'block';
    elements.editTitle.focus();
}

function saveChanges() {
    todoState.title = elements.editTitle.value.trim();
    todoState.description = elements.editDescription.value.trim();
    todoState.priority = elements.editPriority.value;
    todoState.dueDate = elements.editDueDate.value;

    elements.viewMode.style.display = 'block';
    elements.editMode.style.display = 'none';
    renderCard();
}

function cancelEdit() {
    elements.viewMode.style.display = 'block';
    elements.editMode.style.display = 'none';
}

// ==================== INIT ====================

function init() {
    // Cache DOM elements AFTER the page has loaded
    elements = {
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
        viewMode: document.getElementById('view-mode'),
        editMode: document.getElementById('edit-mode'),
        editTitle: document.getElementById('test-todo-edit-title-input'),
        editDescription: document.getElementById('test-todo-edit-description-input'),
        editPriority: document.getElementById('test-todo-edit-priority-select'),
        editDueDate: document.getElementById('test-todo-edit-due-date-input'),
        saveBtn: document.getElementById('test-todo-save-button'),
        cancelBtn: document.getElementById('test-todo-cancel-button')
    };

    setupEventListeners();
    renderCard();

    console.log('%c✅ Stage 1a Todo Card initialized successfully!', 'color: #16a34a; font-weight: bold');
}

window.onload = init;