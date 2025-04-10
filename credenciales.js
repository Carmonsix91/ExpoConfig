document.addEventListener('DOMContentLoaded', function() {
    const credencialForm = document.getElementById('credencialForm');
    const credencialPreview = document.getElementById('credencialPreview');
    const btnImprimir = document.getElementById('btnImprimir');
    const btnNuevaCredencial = document.getElementById('btnNuevaCredencial');
    const fotoInput = document.getElementById('foto');
    const fotoPreview = document.getElementById('fotoPreview');
    
    // Elementos para evento y fecha
    const eventoSelect = document.getElementById('eventoSelect');
    const eventoInput = document.getElementById('eventoInput');
    const fechaSelect = document.getElementById('fechaSelect');
    const fechaInputs = document.querySelector('.fecha-inputs');
    const fechaInput = document.getElementById('fechaInput');
    const fechaTexto = document.getElementById('fechaTexto');
    
    // Historial de eventos y fechas
    let historialEventos = ['Exposición de Proyectos ESCOM 2024'];
    let historialFechas = ['15 de Noviembre 2024'];
    
    // Mapeo de tipos de asistente
    const tipoMap = {
        'alumno': 'Alumno',
        'profesor': 'Profesor',
        'invitado': 'Invitado Especial',
        'organizador': 'Organizador'
    };
    
    // Inicializar eventos
    function initEventListeners() {
        // Mostrar vista previa de la foto
        fotoInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    fotoPreview.src = event.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
        
        // Manejar selección de evento
        eventoSelect.addEventListener('change', function() {
            if (eventoSelect.value === 'otro') {
                eventoInput.style.display = 'block';
                eventoInput.focus();
            } else {
                eventoInput.style.display = 'none';
            }
        });
        
        // Manejar selección de fecha
        fechaSelect.addEventListener('change', function() {
            if (fechaSelect.value === 'otra') {
                fechaInputs.style.display = 'block';
                fechaInput.focus();
            } else {
                fechaInputs.style.display = 'none';
            }
        });
        
        // Cuando se escribe en el input de evento, agregar al select
        eventoInput.addEventListener('change', function() {
            if (eventoInput.value && !historialEventos.includes(eventoInput.value)) {
                historialEventos.unshift(eventoInput.value);
                updateEventoSelect();
            }
        });
        
        // Cuando se selecciona una fecha, formatearla
        fechaInput.addEventListener('change', function() {
            if (fechaInput.value) {
                const fecha = new Date(fechaInput.value);
                const options = { year: 'numeric', month: 'long', day: 'numeric' };
                const fechaFormateada = fecha.toLocaleDateString('es-ES', options);
                fechaTexto.value = fechaFormateada;
                
                if (!historialFechas.includes(fechaFormateada)) {
                    historialFechas.unshift(fechaFormateada);
                    updateFechaSelect();
                }
            }
        });
        
        // También permitir ingresar fecha manualmente
        fechaTexto.addEventListener('change', function() {
            if (fechaTexto.value && !historialFechas.includes(fechaTexto.value)) {
                historialFechas.unshift(fechaTexto.value);
                updateFechaSelect();
            }
        });
    }
    
    // Actualizar el select de eventos con el historial
    function updateEventoSelect() {
        // Guardar el valor actual
        const currentValue = eventoSelect.value;
        
        // Limpiar y agregar opciones
        eventoSelect.innerHTML = '';
        
        // Agregar eventos del historial
        historialEventos.forEach(evento => {
            const option = document.createElement('option');
            option.value = evento;
            option.textContent = evento;
            eventoSelect.appendChild(option);
        });
        
        // Agregar opción "otro"
        const optionOtro = document.createElement('option');
        optionOtro.value = 'otro';
        optionOtro.textContent = 'Otro evento...';
        eventoSelect.appendChild(optionOtro);
        
        // Restaurar el valor seleccionado si existe
        if (currentValue && historialEventos.includes(currentValue)) {
            eventoSelect.value = currentValue;
        }
    }
    
    // Actualizar el select de fechas con el historial
    function updateFechaSelect() {
        // Guardar el valor actual
        const currentValue = fechaSelect.value;
        
        // Limpiar y agregar opciones
        fechaSelect.innerHTML = '';
        
        // Agregar fechas del historial
        historialFechas.forEach(fecha => {
            const option = document.createElement('option');
            option.value = fecha;
            option.textContent = fecha;
            fechaSelect.appendChild(option);
        });
        
        // Agregar opción "otra"
        const optionOtra = document.createElement('option');
        optionOtra.value = 'otra';
        optionOtra.textContent = 'Otra fecha...';
        fechaSelect.appendChild(optionOtra);
        
        // Restaurar el valor seleccionado si existe
        if (currentValue && historialFechas.includes(currentValue)) {
            fechaSelect.value = currentValue;
        }
    }
    
    // Generar un código de acceso aleatorio
    function generarCodigoAcceso() {
        const letras = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
        const numeros = '0123456789';
        let codigo = '';
        
        // 3 letras
        for (let i = 0; i < 3; i++) {
            codigo += letras.charAt(Math.floor(Math.random() * letras.length));
        }
        
        // 4 números
        for (let i = 0; i < 4; i++) {
            codigo += numeros.charAt(Math.floor(Math.random() * numeros.length));
        }
        
        return codigo;
    }
    
    // Obtener el evento seleccionado
    function getEventoSeleccionado() {
        if (eventoSelect.value === 'otro' && eventoInput.value) {
            return eventoInput.value;
        }
        return eventoSelect.value;
    }
    
    // Obtener la fecha seleccionada
    function getFechaSeleccionada() {
        if (fechaSelect.value === 'otra') {
            if (fechaTexto.value) {
                return fechaTexto.value;
            }
            if (fechaInput.value) {
                const fecha = new Date(fechaInput.value);
                const options = { year: 'numeric', month: 'long', day: 'numeric' };
                return fecha.toLocaleDateString('es-ES', options);
            }
            return 'Fecha no especificada';
        }
        return fechaSelect.value;
    }
    
    // Procesar el formulario
    credencialForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtener valores del formulario
        const nombre = document.getElementById('nombre').value;
        const matricula = document.getElementById('matricula').value;
        const tipo = document.getElementById('tipo').value;
        const evento = getEventoSeleccionado();
        const fecha = getFechaSeleccionada();
        
        // Validar que se haya seleccionado un tipo
        if (!tipo) {
            alert('Por favor seleccione un tipo de asistente');
            return;
        }
        
        // Validar evento
        if (!evento) {
            alert('Por favor ingrese un nombre para el evento');
            return;
        }
        
        // Validar fecha
        if (!fecha) {
            alert('Por favor ingrese una fecha para el evento');
            return;
        }
        
        // Actualizar historiales si es necesario
        if (!historialEventos.includes(evento)) {
            historialEventos.unshift(evento);
            updateEventoSelect();
        }
        
        if (!historialFechas.includes(fecha)) {
            historialFechas.unshift(fecha);
            updateFechaSelect();
        }
        
        // Mostrar datos en la vista previa
        document.getElementById('previewNombre').textContent = nombre;
        document.getElementById('previewMatricula').textContent = matricula;
        document.getElementById('previewTipo').textContent = tipoMap[tipo] || tipo;
        document.getElementById('previewEvento').textContent = evento;
        document.getElementById('previewFecha').textContent = fecha;
        
        // Generar y mostrar código de acceso
        const codigoAcceso = generarCodigoAcceso();
        document.getElementById('codigoAcceso').textContent = codigoAcceso;
        
        // Mostrar foto por defecto si no se subió ninguna
        if (!fotoInput.files[0]) {
            fotoPreview.src = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
        }
        
        // Mostrar la vista previa y ocultar el formulario
        credencialForm.style.display = 'none';
        credencialPreview.style.display = 'block';
    });
    
    // Botón para imprimir la credencial
    btnImprimir.addEventListener('click', function() {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Credencial de Acceso</title>
                <style>
                    body { 
                        margin: 0; 
                        padding: 0; 
                        font-family: Arial, sans-serif;
                    }
                    .credencial {
                        width: 350px;
                        margin: 0 auto;
                        background: white;
                        border-radius: 10px;
                        box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
                        overflow: hidden;
                        border: 1px solid #e0e0e0;
                    }
                    .credencial-header {
                        background-color: #5c0e2d;
                        color: white;
                        padding: 15px;
                        text-align: center;
                        position: relative;
                    }
                    .credencial-header h3 {
                        margin: 0;
                        font-size: 18px;
                    }
                    .logo-credencial {
                        width: 50px;
                        position: absolute;
                        left: 15px;
                        top: 50%;
                        transform: translateY(-50%);
                    }
                    .credencial-body {
                        display: flex;
                        padding: 20px;
                    }
                    .foto-container {
                        width: 100px;
                        height: 120px;
                        border: 1px solid #e0e0e0;
                        margin-right: 20px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        overflow: hidden;
                    }
                    .foto-perfil {
                        max-width: 100%;
                        max-height: 100%;
                    }
                    .datos-container {
                        flex: 1;
                        text-align: left;
                        font-size: 14px;
                    }
                    .datos-container p {
                        margin-bottom: 8px;
                    }
                    .credencial-footer {
                        background-color: #e0e0e0;
                        padding: 10px;
                        text-align: center;
                    }
                    .codigo-barras {
                        height: 40px;
                        background: linear-gradient(90deg, black 0%, black 20%, white 20%, white 40%, black 40%, black 60%, white 60%, white 80%, black 80%, black 100%);
                        margin-bottom: 5px;
                    }
                    .codigo-texto {
                        font-family: 'Courier New', monospace;
                        font-size: 12px;
                        color: #333;
                    }
                    @page { size: auto; margin: 0mm; }
                </style>
            </head>
            <body>
                ${document.getElementById('credencialToPrint').outerHTML}
            </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.onload = function() {
            printWindow.print();
        };
    });
    
    // Botón para generar nueva credencial
    btnNuevaCredencial.addEventListener('click', function() {
        credencialForm.reset();
        credencialForm.style.display = 'block';
        credencialPreview.style.display = 'none';
        fotoPreview.src = '';
        
        // Restablecer selects
        eventoSelect.value = historialEventos[0];
        fechaSelect.value = historialFechas[0];
        eventoInput.style.display = 'none';
        fechaInputs.style.display = 'none';
    });
    
    // Inicializar la aplicación
    initEventListeners();
    updateEventoSelect();
    updateFechaSelect();
});