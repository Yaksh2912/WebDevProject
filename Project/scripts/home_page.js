document.addEventListener('DOMContentLoaded', function() {
    // Handle navigation
    const navLinks = document.querySelectorAll('.nav-bar a, .nav-cards a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Handle auth buttons
    const signupBtn = document.getElementById('signupBtn');
    const loginBtn = document.getElementById('loginBtn');

    signupBtn.addEventListener('click', function() {
        alert('Sign Up functionality to be implemented');
        // Implement sign up functionality here
    });

    loginBtn.addEventListener('click', function() {
        alert('Login functionality to be implemented');
        // Implement login functionality here
    });
});   