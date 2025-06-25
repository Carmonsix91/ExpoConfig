document.addEventListener('DOMContentLoaded', function() {
    // Variables globales
    let eventos = JSON.parse(localStorage.getItem('eventos')) || [];
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();
    let eventoEditando = null;

    // Elementos del DOM
    const calendarGrid = document.getElementById('calendar-grid');
    const eventsList = document.getElementById('events-list');
    const mesActualElement = document.getElementById('mes-actual');
    const btnMesAnterior = document.getElementById('btn-mes-anterior');
    const btnMesSiguiente = document.getElementById('btn-mes-siguiente');
    const btnNuevoEvento = document.getElementById('btn-nuevo-evento');
    const filtroFecha = document.getElementById('filtro-fecha');
    const eventoModal = document.getElementById('evento-modal');
    const confirmacionModal = document.getElementById('confirmacion-modal');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    const btnCancelarEvento = document.getElementById('btn-cancelar-evento');
    const btnGuardarEvento = document.getElementById('btn-guardar-evento');
    const btnCancelarConfirmacion = document.getElementById('btn-cancelar-confirmacion');
    const btnAceptarConfirmacion = document.getElementById('btn-aceptar-confirmacion');
    const eventoForm = document.getElementById('evento-form');

    // Inicializar el calendario
    function initCalendar() {
        renderCalendar();
        renderEventosLista();
    }

    // Renderizar el calendario
    function renderCalendar() {
        calendarGrid.innerHTML = '';
        
        // Configurar el mes actual en el encabezado
        const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        mesActualElement.textContent = `${meses[currentMonth]} ${currentYear}`;
        
        // Obtener el primer día del mes y el número de días en el mes
        const primerDia = new Date(currentYear, currentMonth, 1).getDay();
        const diasEnMes = new Date(currentYear, currentMonth + 1, 0).getDate();
        
        // Ajustar para que la semana comience en lunes
        const primerDiaAjustado = primerDia === 0 ? 6 : primerDia - 1;
        
        // Crear celdas vacías para los días del mes anterior
        for (let i = 0; i < primerDiaAjustado; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.className = 'calendar-day empty';
            calendarGrid.appendChild(emptyCell);
        }
        
        // Crear celdas para cada día del mes
        for (let dia = 1; dia <= diasEnMes; dia++) {
            const dayCell = document.createElement('div');
            dayCell.className = 'calendar-day';
            dayCell.textContent = dia;
            
            // Resaltar el día actual
            const today = new Date();
            if (dia === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()) {
                dayCell.classList.add('today');
            }
            
            // Verificar si hay eventos en este día
            const eventosDia = eventos.filter(evento => {
                const eventoDate = new Date(evento.fecha);
                return eventoDate.getDate() === dia && 
                       eventoDate.getMonth() === currentMonth && 
                       eventoDate.getFullYear() === currentYear;
            });
            
            if (eventosDia.length > 0) {
                dayCell.classList.add('has-events');
                
                const eventIndicator = document.createElement('div');
                eventIndicator.className = 'event-indicator';
                eventIndicator.textContent = eventosDia.length;
                dayCell.appendChild(eventIndicator);
            }
            
            // Agregar evento de clic para mostrar eventos del día
            dayCell.addEventListener('click', () => {
                mostrarEventosDia(dia);
            });
            
            calendarGrid.appendChild(dayCell);
        }
    }

    // Mostrar eventos de un día específico
    function mostrarEventosDia(dia) {
        const eventosDia = eventos.filter(evento => {
            const eventoDate = new Date(evento.fecha);
            return eventoDate.getDate() === dia && 
                   eventoDate.getMonth() === currentMonth && 
                   eventoDate.getFullYear() === currentYear;
        });
        
        if (eventosDia.length > 0) {
            // Filtrar la lista de eventos para mostrar solo los del día seleccionado
            renderEventosLista(eventosDia);
        } else {
            alert(`No hay eventos programados para el ${dia} de ${meses[currentMonth]} ${currentYear}`);
        }
    }

    // Renderizar la lista de eventos
    function renderEventosLista(eventosFiltrados = null) {
        eventsList.innerHTML = '';
        
        const eventosAMostrar = eventosFiltrados || filtrarEventos();
        
        if (eventosAMostrar.length === 0) {
            eventsList.innerHTML = '<div class="empty-state">No hay eventos programados</div>';
            return;
        }
        
        eventosAMostrar.sort((a, b) => {
            const fechaA = new Date(`${a.fecha}T${a.horaInicio}`);
            const fechaB = new Date(`${b.fecha}T${b.horaInicio}`);
            return fechaA - fechaB;
        });
        
        eventosAMostrar.forEach(evento => {
            const eventCard = document.createElement('div');
            eventCard.className = 'event-card';
            
            const eventHeader = document.createElement('div');
            eventHeader.className = 'event-header';
            
            const eventTitle = document.createElement('h3');
            eventTitle.textContent = evento.titulo;
            
            const eventType = document.createElement('span');
            eventType.className = 'event-type';
            eventType.textContent = obtenerNombreTipoEvento(evento.tipo);
            
            eventHeader.appendChild(eventTitle);
            eventHeader.appendChild(eventType);
            
            const eventBody = document.createElement('div');
            eventBody.className = 'event-body';
            
            const eventDate = document.createElement('p');
            eventDate.innerHTML = `<i class="fas fa-calendar-day"></i> <strong>Fecha:</strong> ${formatearFecha(evento.fecha)}`;
            
            const eventTime = document.createElement('p');
            eventTime.innerHTML = `<i class="fas fa-clock"></i> <strong>Hora:</strong> ${evento.horaInicio} - ${evento.horaFin}`;
            
            const eventLocation = document.createElement('p');
            eventLocation.innerHTML = `<i class="fas fa-map-marker-alt"></i> <strong>Ubicación:</strong> ${evento.ubicacion || 'No especificada'}`;
            
            if (evento.descripcion) {
                const eventDescription = document.createElement('p');
                eventDescription.innerHTML = `<i class="fas fa-align-left"></i> <strong>Descripción:</strong> ${evento.descripcion}`;
                eventBody.appendChild(eventDescription);
            }
            
            eventBody.appendChild(eventDate);
            eventBody.appendChild(eventTime);
            eventBody.appendChild(eventLocation);
            
            const eventActions = document.createElement('div');
            eventActions.className = 'event-actions';
            
            const btnEdit = document.createElement('button');
            btnEdit.className = 'btn-edit';
            btnEdit.innerHTML = '<i class="fas fa-edit"></i> Editar';
            btnEdit.addEventListener('click', () => editarEvento(evento.id));
            
            const btnDelete = document.createElement('button');
            btnDelete.className = 'btn-delete';
            btnDelete.innerHTML = '<i class="fas fa-trash-alt"></i> Eliminar';
            btnDelete.addEventListener('click', () => confirmarEliminarEvento(evento.id));
            
            eventActions.appendChild(btnEdit);
            eventActions.appendChild(btnDelete);
            
            eventCard.appendChild(eventHeader);
            eventCard.appendChild(eventBody);
            eventCard.appendChild(eventActions);
            
            eventsList.appendChild(eventCard);
        });
    }

    // Filtrar eventos según el filtro seleccionado
    function filtrarEventos() {
        const filtro = filtroFecha.value;
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);
        
        switch (filtro) {
            case 'hoy':
                return eventos.filter(evento => {
                    const eventoDate = new Date(evento.fecha);
                    return eventoDate.toDateString() === hoy.toDateString();
                });
                
            case 'semana':
                const finSemana = new Date(hoy);
                finSemana.setDate(hoy.getDate() + 6);
                return eventos.filter(evento => {
                    const eventoDate = new Date(evento.fecha);
                    return eventoDate >= hoy && eventoDate <= finSemana;
                });
                
            case 'mes':
                return eventos.filter(evento => {
                    const eventoDate = new Date(evento.fecha);
                    return eventoDate.getMonth() === hoy.getMonth() && eventoDate.getFullYear() === hoy.getFullYear();
                });
                
            case 'proximos':
                const proximos7 = new Date(hoy);
                proximos7.setDate(hoy.getDate() + 7);
                return eventos.filter(evento => {
                    const eventoDate = new Date(evento.fecha);
                    return eventoDate >= hoy && eventoDate <= proximos7;
                });
                
            default:
                return [...eventos];
        }
    }

    // Formatear fecha para mostrar
    function formatearFecha(fechaStr) {
        const fecha = new Date(fechaStr);
        const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return fecha.toLocaleDateString('es-ES', opciones);
    }

    // Obtener nombre del tipo de evento
    function obtenerNombreTipoEvento(tipo) {
        const tipos = {
            'clase': 'Clase',
            'examen': 'Examen',
            'reunion': 'Reunión',
            'evento': 'Evento Especial',
            'otro': 'Otro'
        };
        return tipos[tipo] || tipo;
    }

    // Abrir modal para nuevo evento
    function abrirModalNuevoEvento() {
        eventoEditando = null;
        document.getElementById('modal-titulo').textContent = 'Nuevo Evento';
        eventoForm.reset();
        document.getElementById('evento-fecha').valueAsDate = new Date();
        eventoModal.style.display = 'block';
    }

    // Editar evento existente
    function editarEvento(id) {
        eventoEditando = eventos.find(evento => evento.id === id);
        if (!eventoEditando) return;
        
        document.getElementById('modal-titulo').textContent = 'Editar Evento';
        document.getElementById('evento-titulo').value = eventoEditando.titulo;
        document.getElementById('evento-descripcion').value = eventoEditando.descripcion || '';
        document.getElementById('evento-fecha').value = eventoEditando.fecha;
        document.getElementById('evento-hora-inicio').value = eventoEditando.horaInicio;
        document.getElementById('evento-hora-fin').value = eventoEditando.horaFin;
        document.getElementById('evento-ubicacion').value = eventoEditando.ubicacion || '';
        document.getElementById('evento-tipo').value = eventoEditando.tipo;
        document.getElementById('evento-notificar').checked = false;
        
        eventoModal.style.display = 'block';
    }

    // Guardar evento (nuevo o editado)
    function guardarEvento() {
        const titulo = document.getElementById('evento-titulo').value.trim();
        const descripcion = document.getElementById('evento-descripcion').value.trim();
        const fecha = document.getElementById('evento-fecha').value;
        const horaInicio = document.getElementById('evento-hora-inicio').value;
        const horaFin = document.getElementById('evento-hora-fin').value;
        const ubicacion = document.getElementById('evento-ubicacion').value.trim();
        const tipo = document.getElementById('evento-tipo').value;
        const notificar = document.getElementById('evento-notificar').checked;
        const participantes = document.getElementById('evento-participantes').value.split(',').map(email => email.trim()).filter(email => email);
        
        // Validaciones básicas
        if (!titulo) {
            alert('Por favor ingresa un título para el evento');
            return;
        }
        
        if (horaInicio >= horaFin) {
            alert('La hora de fin debe ser posterior a la hora de inicio');
            return;
        }
        
        // Verificar conflictos de horario
        if (!eventoEditando && tieneConflictos(fecha, horaInicio, horaFin)) {
            alert('Existe un conflicto de horario con otro evento');
            return;
        }
        
        // Crear o actualizar el evento
        if (eventoEditando) {
            // Actualizar evento existente
            eventoEditando.titulo = titulo;
            eventoEditando.descripcion = descripcion;
            eventoEditando.fecha = fecha;
            eventoEditando.horaInicio = horaInicio;
            eventoEditando.horaFin = horaFin;
            eventoEditando.ubicacion = ubicacion;
            eventoEditando.tipo = tipo;
        } else {
            // Crear nuevo evento
            const nuevoEvento = {
                id: Date.now().toString(),
                titulo,
                descripcion,
                fecha,
                horaInicio,
                horaFin,
                ubicacion,
                tipo,
                creado: new Date().toISOString()
            };
            
            eventos.push(nuevoEvento);
        }
        
        // Guardar en localStorage
        localStorage.setItem('eventos', JSON.stringify(eventos));
        
        // Enviar notificación si está marcado
        if (notificar && participantes.length > 0) {
            enviarNotificacion(eventoEditando || nuevoEvento, participantes);
        }
        
        // Cerrar modal y actualizar vistas
        eventoModal.style.display = 'none';
        initCalendar();
        
        // Mostrar mensaje de éxito
        alert(`Evento "${titulo}" guardado exitosamente`);
    }

    // Verificar conflictos de horario
    function tieneConflictos(fecha, horaInicio, horaFin) {
        return eventos.some(evento => {
            if (evento.fecha !== fecha) return false;
            
            const inicioExistente = evento.horaInicio;
            const finExistente = evento.horaFin;
            
            return (horaInicio >= inicioExistente && horaInicio < finExistente) ||
                   (horaFin > inicioExistente && horaFin <= finExistente) ||
                   (horaInicio <= inicioExistente && horaFin >= finExistente);
        });
    }

    // Enviar notificación por correo (simulado)
    function enviarNotificacion(evento, participantes) {
        console.log(`Notificación enviada a: ${participantes.join(', ')}`);
        console.log(`Asunto: Nuevo evento programado - ${evento.titulo}`);
        console.log(`Mensaje: Se ha programado el evento "${evento.titulo}" para el ${formatearFecha(evento.fecha)} de ${evento.horaInicio} a ${evento.horaFin} en ${evento.ubicacion || 'ubicación por confirmar'}.`);
        
        // En una implementación real, aquí se haría una llamada a un servidor para enviar los correos
    }

    // Confirmar eliminación de evento
    function confirmarEliminarEvento(id) {
        const evento = eventos.find(e => e.id === id);
        if (!evento) return;
        
        document.getElementById('confirmacion-titulo').textContent = 'Eliminar Evento';
        document.getElementById('confirmacion-mensaje').textContent = `¿Estás seguro de que deseas eliminar el evento "${evento.titulo}" programado para el ${formatearFecha(evento.fecha)}?`;
        
        btnAceptarConfirmacion.onclick = function() {
            eliminarEvento(id);
            confirmacionModal.style.display = 'none';
        };
        
        confirmacionModal.style.display = 'block';
    }

    // Eliminar evento
    function eliminarEvento(id) {
        eventos = eventos.filter(evento => evento.id !== id);
        localStorage.setItem('eventos', JSON.stringify(eventos));
        initCalendar();
    }

    // Event Listeners
    btnMesAnterior.addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar();
    });
    
    btnMesSiguiente.addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar();
    });
    
    btnNuevoEvento.addEventListener('click', abrirModalNuevoEvento);
    
    filtroFecha.addEventListener('change', () => {
        renderEventosLista();
    });
    
    btnCancelarEvento.addEventListener('click', () => {
        eventoModal.style.display = 'none';
    });
    
    btnGuardarEvento.addEventListener('click', guardarEvento);
    
    btnCancelarConfirmacion.addEventListener('click', () => {
        confirmacionModal.style.display = 'none';
    });
    
    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            eventoModal.style.display = 'none';
            confirmacionModal.style.display = 'none';
        });
    });
    
    window.addEventListener('click', (event) => {
        if (event.target === eventoModal) {
            eventoModal.style.display = 'none';
        }
        if (event.target === confirmacionModal) {
            confirmacionModal.style.display = 'none';
        }
    });

    // Inicializar la aplicación
    initCalendar();
});