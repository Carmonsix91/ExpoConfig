document.addEventListener('DOMContentLoaded', function() {
    // Datos del profesor (simulados)
    const profesorData = {
        nombre: "Reina Elia",
        boleta: "884378"
    };

    // Mostrar datos del profesor en el HTML
    document.getElementById('profesor-nombre').textContent = profesorData.nombre;
    document.getElementById('profesor-boleta').textContent = profesorData.boleta;
});