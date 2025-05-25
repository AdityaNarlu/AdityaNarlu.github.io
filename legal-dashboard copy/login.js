document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        console.log('Login form found, attaching handler...');
        
        loginForm.addEventListener('submit', function(e) {
            console.log('Form submission intercepted');
            e.preventDefault();
            
            // Get form values (we'll just log them for now)
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            console.log('Login attempt with:', { email });
            
            // Redirect to dashboard
            window.location.href = 'dashboard.html';
            
            // Prevent any further execution
            return false;
        });
    } else {
        console.log('Login form not found');
    }
});
