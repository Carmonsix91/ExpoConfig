document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const tipoRadios = document.querySelectorAll('input[name="user-type"]');
  const extraFields = document.getElementById('alumno-extra-fields');
  const passwordInput = document.getElementById('register-password');
  const confirmInput = document.getElementById('register-confirm');
  const passwordError = document.getElementById('password-error');
  const strengthMeter = document.querySelector('.strength-meter');
  const photoInput = document.getElementById('register-photo');
  const photoPreview = document.getElementById('photo-preview');
  const fileName = document.querySelector('.file-name');

  tipoRadios.forEach(radio => {
    radio.addEventListener('change', function () {
      if (this.value === 'alumno') {
        extraFields.style.display = 'block';
        document.getElementById('register-carrera').required = true;
        document.getElementById('register-grupo').required = true;
        document.getElementById('register-semestre').required = true;
      } else {
        extraFields.style.display = 'none';
        document.getElementById('register-carrera').required = false;
        document.getElementById('register-grupo').required = false;
        document.getElementById('register-semestre').required = false;
      }
    });
  });

  photoInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
      fileName.textContent = file.name;
      const reader = new FileReader();
      reader.onload = function(e) {
        photoPreview.src = e.target.result;
        photoPreview.style.display = 'block';
        document.querySelector('.preview-container').style.display = 'block';
      }
      reader.readAsDataURL(file);
    } else {
      photoPreview.src = '';
      photoPreview.style.display = 'none';
      document.querySelector('.preview-container').style.display = 'none';
      fileName.textContent = 'Ningún archivo seleccionado';
    }
  });

  passwordInput.addEventListener('input', function() {
    const password = this.value;
    let strength = 0;
    if (password.length >= 8) strength += 20;
    if (/\d/.test(password)) strength += 20;
    if (/[A-Z]/.test(password)) strength += 20;
    if (/[^A-Za-z0-9]/.test(password)) strength += 20;
    if (password.length >= 12) strength += 20;
    strengthMeter.style.width = `${strength}%`;
    strengthMeter.style.backgroundColor = strength < 40 ? '#d32f2f' : strength < 70 ? '#ffa000' : '#388e3c';
  });

  confirmInput.addEventListener('input', function() {
    passwordError.style.display = passwordInput.value !== this.value ? 'block' : 'none';
    this.classList.toggle('input-error', passwordInput.value !== this.value);
  });

  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    fetch('http://localhost:8080/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    .then(response => {
      if (!response.ok) throw new Error("Credenciales incorrectas");
      return response.json();
    })
    .then(data => {
      localStorage.setItem('usuario', JSON.stringify(data));
      const tipo = data.tipo?.toLowerCase();
      if (tipo === 'alumno') {
        window.location.href = "/alumno/alumno.html";
      } else if (tipo === 'profesor') {
        window.location.href = "/profesor/profesor.html";
      } else {
        window.location.href = "/index/index.html";
      }
    })
    .catch(error => {
      console.error(error);
      alert('Error al iniciar sesión');
    });
  });

  registerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const password = passwordInput.value;
    const confirm = confirmInput.value;
    const terms = document.querySelector('input[name="terms"]:checked');

    if (password !== confirm || !terms) {
      alert('Verifica contraseñas y acepta los términos.');
      return;
    }

    const tipo = document.querySelector('input[name="user-type"]:checked').value;
    const formData = {
      userType: tipo,
      name: document.getElementById('register-name').value,
      email: document.getElementById('register-email').value,
      id: document.getElementById('register-id').value,
      password: password
    };

    if (tipo === 'alumno') {
      formData.carrera = document.getElementById('register-carrera').value;
      formData.grupo = document.getElementById('register-grupo').value;
      formData.semestre = document.getElementById('register-semestre').value;
    }

    fetch('http://localhost:8080/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    .then(response => {
      if (!response.ok) throw new Error("Error en el registro");
      return response.json();
    })
    .then(data => {
      alert('Registro exitoso');
      registerForm.reset();
      photoPreview.src = '';
      photoPreview.style.display = 'none';
      document.querySelector('.preview-container').style.display = 'none';
      fileName.textContent = 'Ningún archivo seleccionado';
      strengthMeter.style.width = '0';
    })
    .catch(error => {
      console.error(error);
      alert('Error al registrar usuario');
    });
  });
});
