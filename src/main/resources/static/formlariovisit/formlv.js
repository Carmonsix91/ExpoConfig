document.addEventListener('DOMContentLoaded', function() {
    const registroForm = document.getElementById('registroForm');
    const mensajeExito = document.getElementById('mensajeExito');
    const btnNuevoRegistro = document.getElementById('btnNuevoRegistro');
    const fechaDisplay = document.getElementById('fechaDisplay');
    const horaDisplay = document.getElementById('horaDisplay');
    const fechaInput = document.getElementById('fecha');
    const horaInput = document.getElementById('hora');
    
    // Función para formatear la fecha
    function formatFecha(fecha) {
        const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
        return fecha.toLocaleDateString('es-ES', opciones);
    }
    
    // Función para actualizar fecha y hora
    function actualizarFechaHora() {
        const ahora = new Date();
        
        // Mostrar en formato legible
        fechaDisplay.textContent = formatFecha(ahora);
        horaDisplay.textContent = ahora.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
        
        // Guardar en formato para enviar al servidor
        fechaInput.value = ahora.toISOString().split('T')[0];
        horaInput.value = ahora.toTimeString().substring(0, 8);
    }
    
    // Actualizar al cargar
    actualizarFechaHora();
    
    // Actualizar cada minuto (opcional)
    setInterval(actualizarFechaHora, 60000);
    
    registroForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!document.getElementById('privacidad').checked) {
            alert('Debe aceptar la política de privacidad para continuar');
            return;
        }
        
        registroForm.style.display = 'none';
        mensajeExito.style.display = 'block';
        
        const formData = new FormData(registroForm);
        const datosVisitante = {};
        formData.forEach((value, key) => {
            datosVisitante[key] = value;
        });
        // Enviar datos al backend
        fetch('/api/visitantes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datosVisitante)
        })
        .then(response => {
            if (!response.ok) throw new Error("No se pudo registrar el visitante");
            return response.json();
        })
        .then(data => {
            console.log("Visitante registrado:", data);
        })
        .catch(error => {
            console.error("Error al registrar visitante:", error);
        });
    });
    
    btnNuevoRegistro.addEventListener('click', function() {
        registroForm.reset();
        registroForm.style.display = 'block';
        mensajeExito.style.display = 'none';
        actualizarFechaHora(); // Actualizar fecha/hora al hacer nuevo registro
    });
});