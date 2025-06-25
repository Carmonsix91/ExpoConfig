document.addEventListener('DOMContentLoaded', function() {
    // Datos de ejemplo (simulados)
    const postersData = [
        {
            id: 1,
            title: "Sistema de Gestión Escolar",
            student: "Juan Pérez García",
            boleta: "2020630123",
            imageUrl: "https://via.placeholder.com/400x600?text=Cartel+1"
        },
        {
            id: 2,
            title: "Aplicación Móvil de Turismo",
            student: "María López Sánchez",
            boleta: "2020630456",
            imageUrl: "https://via.placeholder.com/400x600?text=Cartel+2"
        },
        {
            id: 3,
            title: "Sistema de Seguridad IoT",
            student: "Carlos Rodríguez Méndez",
            boleta: "2020630789",
            imageUrl: "https://via.placeholder.com/400x600?text=Cartel+3"
        }
    ];

    // Elementos del DOM
    const postersGrid = document.getElementById('posters-grid');
    const filterProject = document.getElementById('filter-project');
    const filterStudent = document.getElementById('filter-student');
    const modal = document.getElementById('poster-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalStudent = document.getElementById('modal-student');
    const modalBoleta = document.getElementById('modal-boleta');
    const modalPosterImage = document.getElementById('modal-poster-image');
    const closeModal = document.querySelector('.close-modal');

    // Cargar carteles
    function loadPosters(filter = '') {
        postersGrid.innerHTML = '';
        
        const filteredPosters = postersData.filter(poster => {
            const matchesProject = poster.title.toLowerCase().includes(filter.toLowerCase());
            const matchesStudent = poster.student.toLowerCase().includes(filter.toLowerCase());
            return matchesProject || matchesStudent;
        });

        if (filteredPosters.length === 0) {
            postersGrid.innerHTML = '<p class="no-results">No se encontraron carteles</p>';
            return;
        }

        filteredPosters.forEach(poster => {
            const posterCard = document.createElement('div');
            posterCard.className = 'poster-card';
            posterCard.innerHTML = `
                <div class="poster-header">
                    <h3>${poster.title}</h3>
                    <p>${poster.student} - ${poster.boleta}</p>
                </div>
                <div class="poster-preview">
                    <img src="${poster.imageUrl}" alt="Cartel del proyecto ${poster.title}">
                </div>
                <div class="poster-actions">
                    <button class="btn-view" data-id="${poster.id}">
                        <i class="fas fa-expand"></i> Ampliar
                    </button>
                    <button class="btn-download" data-id="${poster.id}">
                        <i class="fas fa-download"></i> Descargar
                    </button>
                    <button class="btn-print" data-id="${poster.id}">
                        <i class="fas fa-print"></i> Imprimir
                    </button>
                </div>
            `;
            postersGrid.appendChild(posterCard);
        });

        // Agregar event listeners a los botones
        document.querySelectorAll('.btn-view').forEach(btn => {
            btn.addEventListener('click', function() {
                const posterId = parseInt(this.dataset.id);
                openModal(posterId);
            });
        });

        document.querySelectorAll('.btn-download').forEach(btn => {
            btn.addEventListener('click', function() {
                const posterId = parseInt(this.dataset.id);
                downloadPoster(posterId);
            });
        });

        document.querySelectorAll('.btn-print').forEach(btn => {
            btn.addEventListener('click', function() {
                const posterId = parseInt(this.dataset.id);
                printPoster(posterId);
            });
        });
    }

    // Abrir modal con vista ampliada
    function openModal(posterId) {
        const poster = postersData.find(p => p.id === posterId);
        if (!poster) return;

        modalTitle.textContent = poster.title;
        modalStudent.textContent = poster.student;
        modalBoleta.textContent = poster.boleta;
        modalPosterImage.src = poster.imageUrl;
        modal.style.display = 'block';
    }

    // Descargar cartel
    function downloadPoster(posterId) {
        const poster = postersData.find(p => p.id === posterId);
        if (!poster) return;

        // En una aplicación real, esto descargaría el archivo original
        alert(`Iniciando descarga del cartel: ${poster.title}`);
    }

    // Imprimir cartel
    function printPoster(posterId) {
        const poster = postersData.find(p => p.id === posterId);
        if (!poster) return;

        // En una aplicación real, esto abriría el diálogo de impresión
        alert(`Preparando para imprimir el cartel: ${poster.title}`);
    }

    // Cerrar modal
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Filtrar carteles
    filterProject.addEventListener('input', function() {
        loadPosters(this.value);
    });

    filterStudent.addEventListener('input', function() {
        loadPosters(this.value);
    });

    // Cargar carteles inicialmente
    loadPosters();
});