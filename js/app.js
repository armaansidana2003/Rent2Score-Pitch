// --- Sound Effects Engine ---
const sounds = {
    click: new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3'),
    success: new Audio('https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3'),
    hover: new Audio('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3')
};

// Enable sound on user interaction
let audioEnabled = false;
document.addEventListener('click', () => { audioEnabled = true; }, { once: true });

function playSfx(type) {
    if (!audioEnabled) return;
    try {
        const sound = sounds[type];
        if (sound) {
            sound.volume = 0.15;
            sound.currentTime = 0;
            sound.play().catch(e => console.log("Audio play blocked"));
        }
    } catch (e) {}
}

// Add hover sounds to buttons
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('button, a').forEach(el => {
        el.addEventListener('mouseenter', () => playSfx('hover'));
        el.addEventListener('click', () => playSfx('click'));
    });
});

// --- Modal Logic ---
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if(modal) {
        modal.classList.add('active');
        playSfx('click');
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if(modal) {
        modal.classList.remove('active');
    }
}

// Close modal when clicking outside
document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
        if(e.target === overlay) {
            overlay.classList.remove('active');
        }
    });
});

// --- Form Simulation Logic ---
function handleFakeSubmit(event, modalId, successMessage) {
    event.preventDefault();
    playSfx('success');
    
    const btn = event.target.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    
    // Loading State
    btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Processing...';
    btn.disabled = true;
    btn.classList.add('opacity-75');

    setTimeout(() => {
        // Restore State
        btn.innerHTML = originalText;
        btn.disabled = false;
        btn.classList.remove('opacity-75');
        
        // Close Modal if ID provided
        if(modalId) closeModal(modalId);
        
        // Show Success Alert (Simple)
        alert(successMessage || "Action completed successfully!");
    }, 1000);
}

// --- Admin Dashboard Specifics ---
function approveVerification(btn) {
    playSfx('success');
    const row = btn.closest('tr');
    const cell = btn.parentElement;
    
    // Replace buttons with success badge
    cell.innerHTML = `
        <span class="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold flex items-center justify-end gap-1">
            <i class="fa-solid fa-check-circle"></i> APPROVED
        </span>
    `;
    row.classList.add('bg-green-50/50');
}

function rejectVerification(btn) {
    const row = btn.closest('tr');
    const cell = btn.parentElement;
    
    cell.innerHTML = `
        <span class="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold flex items-center justify-end gap-1">
            <i class="fa-solid fa-ban"></i> REJECTED
        </span>
    `;
    row.classList.add('bg-red-50/50');
}
