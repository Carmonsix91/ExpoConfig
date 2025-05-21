document.addEventListener('DOMContentLoaded', function () {
    // Obtener datos del usuario desde localStorage
    const studentData = JSON.parse(localStorage.getItem('usuario'));

    if (!studentData || studentData.tipo !== 'alumno') {
        alert("No hay sesión activa o no eres alumno. Redirigiendo al login...");
        window.location.href = "/login/login.html";
        return;
    }
    
    // Mostrar datos en el HTML
    document.getElementById('alumno-nombre').textContent = studentData.nombre || '';
    document.getElementById('alumno-boleta').textContent = studentData.identificador || '';
    document.getElementById('alumno-carrera').textContent = studentData.carrera || 'N/A';
    document.getElementById('alumno-semestre').textContent = studentData.semestre || 'N/A';
    document.getElementById('alumno-grupo').textContent = studentData.grupo || 'N/A';
});
