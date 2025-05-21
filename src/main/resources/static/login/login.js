document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const photoInput = document.getElementById('register-photo');
    const photoPreview = document.getElementById('photo-preview');
    const previewContainer = document.querySelector('.preview-container');
    const passwordInput = document.getElementById('register-password');
    const confirmInput = document.getElementById('register-confirm');
    const passwordError = document.getElementById('password-error');
    const strengthMeter = document.querySelector('.strength-meter');

    // Mostrar vista previa de la foto seleccionada
    photoInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        
        if (file) {
            // Validar tamaño del archivo (máx 2MB)
            if (file.size > 2 * 1024 * 1024) {
                alert('El archivo es demasiado grande. Máximo 2MB permitidos.');
                this.value = '';
                return;
            }

            const reader = new FileReader();
            reader.onload = function(e) {
                photoPreview.src = e.target.result;
                photoPreview.style.display = 'block';
                previewContainer.style.display = 'block';
            }
            reader.readAsDataURL(file);
            
            // Mostrar nombre del archivo
            document.querySelector('.file-name').textContent = file.name;
        } else {
            photoPreview.src = '';
            photoPreview.style.display = 'none';
            previewContainer.style.display = 'none';
            document.querySelector('.file-name').textContent = 'Ningún archivo seleccionado';
        }
    });

    // Validar fortaleza de la contraseña
    passwordInput.addEventListener('input', function() {
        const password = this.value;
        let strength = 0;

        // Longitud mínima
        if (password.length >= 8) strength += 20;
        
        // Contiene números
        if (/\d/.test(password)) strength += 20;
        
        // Contiene letras mayúsculas
        if (/[A-Z]/.test(password)) strength += 20;
        
        // Contiene caracteres especiales
        if (/[^A-Za-z0-9]/.test(password)) strength += 20;
        
        // Longitud adicional
        if (password.length >= 12) strength += 20;

        // Actualizar medidor visual
        strengthMeter.style.width = `${strength}%`;
        
        // Cambiar color según fortaleza
        if (strength < 40) {
            strengthMeter.style.backgroundColor = '#d32f2f'; // Rojo
        } else if (strength < 70) {
            strengthMeter.style.backgroundColor = '#ffa000'; // Amarillo
        } else {
            strengthMeter.style.backgroundColor = '#388e3c'; // Verde
        }
    });

    // Validar coincidencia de contraseñas
    confirmInput.addEventListener('input', function() {
        if (passwordInput.value !== this.value) {
            passwordError.style.display = 'block';
            confirmInput.classList.add('input-error');
        } else {
            passwordError.style.display = 'none';
            confirmInput.classList.remove('input-error');
        }
    });

    // Manejar envío del formulario de login
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        // Validación básica
        if (!email || !password) {
            alert('Por favor completa todos los campos');
            return;
        }
        
        // Aquí iría la llamada real al servidor para autenticación
        console.log('Intentando login con:', { email, password });
        alert('Inicio de sesión exitoso (simulado)');
        
        // Redirección después de login exitoso
        // window.location.href = 'dashboard.html';
    });

    // Manejar envío del formulario de registro
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const password = passwordInput.value;
        const confirm = confirmInput.value;
        const terms = document.querySelector('input[name="terms"]:checked');
        
        // Validar contraseña
        if (password !== confirm) {
            alert('Las contraseñas no coinciden');
            return;
        }
        
        if (password.length < 8) {
            alert('La contraseña debe tener al menos 8 caracteres');
            return;
        }
        
        if (!terms) {
            alert('Debes aceptar los términos y condiciones');
            return;
        }
        
        // Obtener datos del formulario
        const formData = {
            userType: document.querySelector('input[name="user-type"]:checked').value,
            name: document.getElementById('register-name').value,
            email: document.getElementById('register-email').value,
            id: document.getElementById('register-id').value,
            password: password,
            photo: photoInput.files[0] ? photoInput.files[0].name : null
        };
        
        // Aquí iría la llamada real al servidor para registro
        console.log('Datos de registro:', formData);
        alert('Registro exitoso (simulado)');
        
        // Limpiar formulario después de registro exitoso
        registerForm.reset();
        photoPreview.src = '';
        photoPreview.style.display = 'none';
        previewContainer.style.display = 'none';
        document.querySelector('.file-name').textContent = 'Ningún archivo seleccionado';
        strengthMeter.style.width = '0';
    });

    // Manejar botón de limpiar en login
    document.querySelector('#loginForm .btn-reset').addEventListener('click', function() {
        loginForm.reset();
    });
});