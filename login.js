document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('error-message');

    // Credenciales esperadas (¡esto es inseguro en una aplicación real!)
    const validUsername = 'djsonicdh';
    const validPassword = 'password';

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Evitar recarga de página

        const enteredUsername = usernameInput.value.trim();
        const enteredPassword = passwordInput.value.trim();

        // Ocultar mensaje de error previo
        errorMessage.style.display = 'none';

        // Verificar credenciales
        if (enteredUsername === validUsername && enteredPassword === validPassword) {
            // Credenciales correctas: marcar sesión como iniciada y redirigir
            sessionStorage.setItem('isAdminLoggedIn', 'true'); // Indicador de sesión
            window.location.href = 'admin.html'; // Redirigir a la página de admin
        } else {
            // Credenciales incorrectas: mostrar mensaje de error
            errorMessage.style.display = 'block';
            passwordInput.value = ''; // Limpiar campo de contraseña por seguridad
            usernameInput.focus(); // Poner foco en el usuario
        }
    });
});