// Navigation
function navigate(viewId) {
    // Hide all views
    document.querySelectorAll('.view').forEach(view => {
        view.classList.remove('active');
    });
    
    // Show target view
    document.getElementById(viewId).classList.add('active');
    
    // Update nav links
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if(item.dataset.target === viewId) {
            item.classList.add('active');
        }
    });

    // Scroll to top
    window.scrollTo(0, 0);
}

// Modals
function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
    document.body.style.overflow = '';
}

// Close modals when clicking outside
document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
        if(e.target === overlay) {
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// Setup Pill Selectors
document.querySelectorAll('.pill-selector').forEach(selector => {
    const pills = selector.querySelectorAll('.pill');
    pills.forEach(pill => {
        pill.addEventListener('click', () => {
            pills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
        });
    });
});

// Setup Split Method
function setSplitMethod(method) {
    // Update tabs
    const tabs = document.querySelectorAll('.segmented-control .segment');
    tabs.forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');

    // Update validation box for demo
    const validationBox = document.getElementById('split-validation');
    const inputs = document.querySelectorAll('.split-input');
    
    if (method === 'equal') {
        inputs.forEach(input => {
            input.value = "600";
            input.disabled = true;
        });
        validationBox.className = 'validation-box valid';
        validationBox.innerHTML = '<i data-lucide="check-circle-2"></i><span>Perfectly Split (Total: ₹2,400 | Assigned: ₹2,400 | Remaining: ₹0)</span>';
    } else if (method === 'exact') {
        inputs.forEach(input => {
            input.disabled = false;
        });
        validationBox.className = 'validation-box invalid';
        validationBox.innerHTML = '<i data-lucide="alert-circle"></i><span>Remaining to allocate: ₹400</span>';
    } else if (method === 'percent') {
        inputs.forEach(input => {
            input.value = "25";
            input.disabled = false;
        });
        validationBox.className = 'validation-box valid';
        validationBox.innerHTML = '<i data-lucide="check-circle-2"></i><span>Perfectly Split (Total: 100% | Assigned: 100% | Remaining: 0%)</span>';
    }
    
    // Re-initialize icons for dynamic content
    lucide.createIcons();
}

// Settle Up Flow
function openSettleModal(name, amount, type) {
    const modal = document.getElementById('settle-up-modal');
    const headerTitle = modal.querySelector('h3');
    const amountDisplay = modal.querySelector('.flow-amount');
    const toastMessage = document.getElementById('toast-message');
    
    if (name === 'All') {
        headerTitle.textContent = "Settle all balances";
        amountDisplay.textContent = "₹-";
        toastMessage.textContent = "All balances marked as settled";
    } else if (type === 'owe') {
        headerTitle.textContent = `You are paying ${name}`;
        amountDisplay.textContent = `₹${amount}`;
        toastMessage.textContent = `Payment of ₹${amount} marked as settled`;
    } else {
        headerTitle.textContent = `${name} is paying you`;
        amountDisplay.textContent = `₹${amount}`;
        toastMessage.textContent = `Received payment of ₹${amount}`;
    }
    
    openModal('settle-up-modal');
}

// Payment Method Selection
document.querySelectorAll('.method-option').forEach(option => {
    option.addEventListener('click', () => {
        document.querySelectorAll('.method-option .radio-circle').forEach(circle => {
            circle.classList.remove('active');
        });
        option.querySelector('.radio-circle').classList.add('active');
    });
});

function confirmSettle() {
    closeModal('settle-up-modal');
    showToast();
}

// Toast
function showToast() {
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Initialize Nav Clicks
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
        if(item.dataset.target) {
            navigate(item.dataset.target);
        }
    });
});
