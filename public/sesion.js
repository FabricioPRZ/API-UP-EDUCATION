document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('/api/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Usuario o contraseña incorrectos');
        }
        return response.json();
    })
    .then(data => {
        // Mostrar alerta de éxito
        Swal.fire({
            title: 'Éxito',
            text: 'Inicio de sesión exitoso',
            icon: 'success',
            confirmButtonText: 'Aceptar'
        }).then((result) => {
            // Redirigir a otra página o mostrar un mensaje de éxito
            if (result.isConfirmed) {
                window.location.href = '/home.html'; // Redirigir a la página de dashboard, por ejemplo
            }
        });
        
        // Guardar el token en localStorage o sessionStorage para sesiones posteriores
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.id);
    })
    .catch(error => {
        // Mostrar alerta de error
        Swal.fire({
            title: 'Error',
            text: error.message,
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
    });
});
