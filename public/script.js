document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('userForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value.trim();
        const lastName = document.getElementById('last_name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        if (!name || !lastName || !email || !password) {
            swal("Error", "Todos los campos deben estar completos", "error");
            return;
        }

        fetch('/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                last_name: lastName,
                email: email,
                password: password
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Hubo un problema al registrar el usuario.');
            }
            return response.json();
        })
        .then(data => {
            swal("Éxito", "Usuario registrado correctamente", "success")
                .then(() => {
                    window.location.href = 'sesion.html';
                });
            console.log('Éxito:', data);
        })
        .catch(error => {
            swal("Error", error.message || "Hubo un problema al registrar el usuario", "error");
            console.error('Error:', error);
        });
    });
});
