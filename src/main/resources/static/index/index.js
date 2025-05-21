document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const eventForm = document.getElementById('eventForm');
    const eventsContainer = document.getElementById('eventsContainer');
    
    // Datos de ejemplo (en un caso real, estos vendrían de una API)
    let eventos = [
        {
            id: 1,
            nombre: "Conferencia de Inteligencia Artificial",
            tipo: "academico",
            fecha: "2023-12-15",
            hora: "10:00",
            descripcion: "Conferencia sobre los últimos avances en IA con expertos del sector.",
            organizador: "Departamento de Computación",
            imagen: "https://www.escom.ipn.mx/images/noticias/2023/ia-conference.jpg"
        },
        {
            id: 2,
            nombre: "Festival Cultural ESCOM",
            tipo: "cultural",
            fecha: "2023-11-25",
            hora: "16:00",
            descripcion: "Presentaciones artísticas y culturales de los estudiantes.",
            organizador: "Comité Cultural ESCOM",
            imagen: "https://www.escom.ipn.mx/images/noticias/2023/cultural-fest.jpg"
        }
    ];

    // Cargar eventos almacenados en localStorage
    const storedEvents = JSON.parse(localStorage.getItem('eventosESCOM'));
    if (storedEvents && storedEvents.length > 0) {
        eventos = storedEvents;
    }

    // Mostrar eventos en la página
    function renderEvents() {
        eventsContainer.innerHTML = '';
        
        eventos.forEach(evento => {
            const eventCard = document.createElement('div');
            eventCard.className = 'event-card';
            
            const eventDate = new Date(evento.fecha);
            const formattedDate = eventDate.toLocaleDateString('es-MX', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });
            
            eventCard.innerHTML = `
                <div class="event-image" style="background-image: url('${evento.imagen || 'https://www.escom.ipn.mx/images/slider/slide2.jpg'}')"></div>
                <div class="event-info">
                    <h3>${evento.nombre}</h3>
                    <div class="event-meta">
                        <span>Tipo: ${getEventTypeName(evento.tipo)}</span>
                        <span>${formattedDate}</span>
                    </div>
                    <div class="event-meta">
                        <span>Hora: ${evento.hora}</span>
                        <span>Org: ${evento.organizador}</span>
                    </div>
                    <p class="event-description">${evento.descripcion}</p>
                </div>
            `;
            
            eventsContainer.appendChild(eventCard);
        });
    }

    // Obtener nombre del tipo de evento
    function getEventTypeName(type) {
        const types = {
            'academico': 'Académico',
            'cultural': 'Cultural',
            'deportivo': 'Deportivo',
            'otro': 'Otro'
        };
        return types[type] || 'Evento';
    }

    // Manejar el envío del formulario
    eventForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(eventForm);
        const newEvent = {
            id: Date.now(),
            nombre: formData.get('eventName'),
            tipo: formData.get('eventType'),
            fecha: formData.get('eventDate'),
            hora: formData.get('eventTime'),
            descripcion: formData.get('eventDescription'),
            organizador: formData.get('organizer'),
            imagen: 'https://www.escom.ipn.mx/images/noticias/2023/default-event.jpg'
        };
        
        eventos.push(newEvent);
        localStorage.setItem('eventosESCOM', JSON.stringify(eventos));
        
        renderEvents();
        eventForm.reset();
        
        // Mostrar mensaje de éxito
        alert('Evento registrado exitosamente!');
        
        // Desplazarse a la sección de eventos
        document.getElementById('eventos').scrollIntoView({ behavior: 'smooth' });
    });

    // Inicializar la página
    renderEvents();

    // Manejar el evento de reset del formulario
    eventForm.addEventListener('reset', function() {
        console.log('Formulario limpiado');
    });

    // Smooth scrolling para los enlaces del menú
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
