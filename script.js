// Smooth scroll to About section
function scrollToAbout() {
    document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
}

// Add ripple effect on button and maintain color on hover
document.getElementById('about-us-btn').addEventListener('mouseenter', function(e) {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const ripple = document.createElement('span');

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Apply ripple position and style
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.classList.add('ripple-effect');

    // Change button color on hover
    button.style.backgroundColor = '#5cd1ff';
    button.style.color = '#353333';
    button.appendChild(ripple);

    // Remove ripple after animation
    ripple.addEventListener('animationend', () => {
        ripple.remove();
    });
});

// Reset button color when mouse leaves
document.getElementById('about-us-btn').addEventListener('mouseleave', function() {
    this.style.backgroundColor = '#353333';
    this.style.color = 'white';
});

// Function to toggle the drawer
function toggleDrawer() {
    const drawer = document.getElementById('drawer');
    const isDrawerOpen = drawer.style.left === '0px';
    drawer.style.left = isDrawerOpen ? '-250px' : '0px';
}

// Close drawer if click happens outside of it
document.addEventListener('click', function(event) {
    const drawer = document.getElementById('drawer');
    const isClickInsideDrawer = drawer.contains(event.target) || event.target.closest('.logo-section');

    if (!isClickInsideDrawer) {
        drawer.style.left = '-250px';
    }
});

// Attach toggle function to logo click
function onLogoClick() {
    toggleDrawer();
}

// Show the login modal
function showLoginModal() {
    document.getElementById('login-modal').style.display = 'block';
}

// Close the login modal
function closeLoginModal() {
    document.getElementById('login-modal').style.display = 'none';
}

// Hardcoded admin credentials
const adminUsername = 'admin';
const adminPassword = 'password123';

// Login function
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === adminUsername && password === adminPassword) {
        // Redirect to dashboard
        window.location.href = 'dashboard.html';
    } else {
        alert('Invalid credentials. Please try again.');
    }
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('login-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}
