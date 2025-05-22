document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const tipoRadios = document.querySelectorAll('input[name="user-type"]');
  const extraFields = document.getElementById('alumno-extra-fields');
  const passwordInput = document.getElementById('register-password');
  const confirmInput = document.getElementById('register-confirm');

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
      // Guardar el objeto usuario completo
      localStorage.setItem('usuario', JSON.stringify(data));
      // Guardar el ID por separado para facilitar el acceso en otras páginas
      localStorage.setItem('id', data.id);

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
      apellido: document.getElementById('register-apellido').value,
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
    })
    .catch(error => {
      console.error(error);
      alert('Error al registrar usuario');
    });
  });
});
