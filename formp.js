document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registroProyecto');
    const mensajeExito = document.getElementById('mensajeExito');
    const btnNuevoProyecto = document.getElementById('btnNuevoProyecto');
    const resumenProyecto = document.getElementById('resumenProyecto');

    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!document.getElementById('requisitos').checked) {
            alert('Debe aceptar que cumple con los requisitos para continuar');
            return;
        }
        
        // Mostrar resumen del proyecto
        const formData = new FormData(form);
        const proyecto = {};
        formData.forEach((value, key) => {
            proyecto[key] = value;
        });
        
        resumenProyecto.innerHTML = `
            <strong>Proyecto:</strong> ${proyecto.nombreProyecto}<br>
            <strong>Responsable:</strong> ${proyecto.responsable}<br>
            <strong>Materia Relacionada:</strong> ${proyecto.materia}<br>
            <strong>Correo:</strong> ${proyecto.correo}
        `;
        
        // Mostrar mensaje de éxito
        form.style.display = 'none';
        mensajeExito.style.display = 'block';
        
        // Aquí iría el código para enviar los datos al servidor
        console.log('Datos del proyecto:', proyecto);
    });
    
    btnNuevoProyecto.addEventListener('click', function() {
        form.reset();
        form.style.display = 'block';
        mensajeExito.style.display = 'none';
    });
});