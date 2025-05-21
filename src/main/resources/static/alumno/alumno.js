document.addEventListener('DOMContentLoaded', function() {
    // Datos del estudiante (simulados)
    const studentData = {
        nombre: "Juan Pérez",
        boleta: "2020630123",
        carrera: "Ingeniería en Sistemas Computacionales",
        semestre: 4,
        grupo: "4CV1"
    };

    // Mostrar datos del estudiante en el HTML
    document.getElementById('alumno-nombre').textContent = studentData.nombre;
    document.getElementById('alumno-boleta').textContent = studentData.boleta;
    document.getElementById('alumno-carrera').textContent = studentData.carrera;
    document.getElementById('alumno-semestre').textContent = studentData.semestre;
    document.getElementById('alumno-grupo').textContent = studentData.grupo;
});