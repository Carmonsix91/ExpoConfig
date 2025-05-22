document.addEventListener('DOMContentLoaded', function() {
    // Datos de ejemplo (simulados)
    const projectsData = {
        software: [
            { id: 1, name: "Sistema de Gestión Escolar", student: "Juan Pérez", boleta: "2020630123" },
            { id: 2, name: "App Móvil de Turismo", student: "María López", boleta: "2020630456" }
        ],
        ea: [
            { id: 3, name: "Sistema de Seguridad IoT", student: "Carlos Rodríguez", boleta: "2020630789" }
        ],
        investigacion: [
            { id: 4, name: "Análisis de Algoritmos", student: "Ana García", boleta: "2020630215" }
        ],
        id: [
            { id: 5, name: "Plataforma Smart Home", student: "Luis Martínez", boleta: "2020630321" }
        ]
    };

    const criteriaData = {
        software: [
            { id: 1, name: "Funcionalidad", weight: 30, maxScore: 30 },
            { id: 2, name: "Calidad de código", weight: 20, maxScore: 20 },
            { id: 3, name: "Documentación", weight: 15, maxScore: 15 }
        ],
        hardware: [
            { id: 1, name: "Funcionamiento", weight: 35, maxScore: 35 },
            { id: 2, name: "Diseño electrónico", weight: 25, maxScore: 25 }
        ],
        investigacion: [
            { id: 1, name: "Originalidad", weight: 25, maxScore: 25 },
            { id: 2, name: "Metodología", weight: 25, maxScore: 25 }
        ],
        iot: [
            { id: 1, name: "Integración", weight: 30, maxScore: 30 },
            { id: 2, name: "Escalabilidad", weight: 20, maxScore: 20 }
        ]
    };

    // Elementos del DOM
    const projectTypeSelect = document.getElementById('project-type');
    const projectSelect = document.getElementById('project-select');
    const evaluationContainer = document.getElementById('evaluation-container');
    const totalScoreElement = document.getElementById('total-score');
    const btnSubmit = document.getElementById('btn-submit-evaluation');

    // Variables de estado
    let currentProjectType = '';
    let currentProject = null;
    let scores = {};

    // Event Listeners
    projectTypeSelect.addEventListener('change', loadProjects);
    projectSelect.addEventListener('change', loadEvaluationForm);
    btnSubmit.addEventListener('click', submitEvaluation);

    // Cargar proyectos según tipo seleccionado
    function loadProjects() {
        currentProjectType = projectTypeSelect.value;
        projectSelect.disabled = !currentProjectType;
        
        if (!currentProjectType) {
            projectSelect.innerHTML = '<option value="">Seleccione un tipo primero</option>';
            evaluationContainer.innerHTML = emptyStateHTML();
            return;
        }

        const projects = projectsData[currentProjectType] || [];
        projectSelect.innerHTML = '<option value="">Seleccione un proyecto</option>';
        
        projects.forEach(project => {
            const option = document.createElement('option');
            option.value = project.id;
            option.textContent = `${project.name} - ${project.student} (${project.boleta})`;
            projectSelect.appendChild(option);
        });
    }

    // Cargar formulario de evaluación
    function loadEvaluationForm() {
        const projectId = projectSelect.value;
        currentProject = projectsData[currentProjectType].find(p => p.id == projectId);
        
        if (!currentProject) {
            evaluationContainer.innerHTML = emptyStateHTML();
            btnSubmit.disabled = true;
            return;
        }

        const criteria = criteriaData[currentProjectType];
        scores = {};
        
        let html = `
            <div class="project-info">
                <h2>${currentProject.name}</h2>
                <p>Alumno: ${currentProject.student} (${currentProject.boleta})</p>
            </div>
            <div class="criteria-list">
        `;

        criteria.forEach(criterion => {
            html += `
                <div class="criterion-item">
                    <div class="criterion-header">
                        <h3>${criterion.name}</h3>
                        <span class="criterion-weight">Ponderación: ${criterion.weight}%</span>
                    </div>
                    <div class="criterion-body">
                        <label>Calificación (0-${criterion.maxScore}):</label>
                        <input type="number" 
                               class="score-input" 
                               data-criterion="${criterion.id}" 
                               min="0" 
                               max="${criterion.maxScore}" 
                               step="0.5"
                               required>
                        <span class="score-max">/${criterion.maxScore}</span>
                    </div>
                </div>
            `;
        });

        html += '</div>';
        evaluationContainer.innerHTML = html;
        btnSubmit.disabled = false;

        // Agregar event listeners a los inputs
        document.querySelectorAll('.score-input').forEach(input => {
            input.addEventListener('input', updateTotalScore);
        });
    }

    // Actualizar puntaje total
    function updateTotalScore() {
        const inputs = document.querySelectorAll('.score-input');
        let total = 0;
        
        inputs.forEach(input => {
            const value = parseFloat(input.value) || 0;
            const max = parseFloat(input.max);
            scores[input.dataset.criterion] = Math.min(value, max);
            total += Math.min(value, max);
        });

        totalScoreElement.textContent = total.toFixed(1);
    }

    // Enviar evaluación
    function submitEvaluation() {
        const totalScore = parseFloat(totalScoreElement.textContent);
        
        if (totalScore === 0) {
            alert('Por favor complete la evaluación antes de enviar');
            return;
        }

        const evaluationData = {
            projectId: currentProject.id,
            projectType: currentProjectType,
            scores: scores,
            totalScore: totalScore,
            date: new Date().toISOString()
        };

        // Aquí iría la lógica para enviar al servidor
        console.log('Datos de evaluación:', evaluationData);
        alert('Evaluación enviada correctamente');
        resetForm();
    }

    // Resetear formulario
    function resetForm() {
        projectSelect.value = '';
        evaluationContainer.innerHTML = emptyStateHTML();
        totalScoreElement.textContent = '0';
        btnSubmit.disabled = true;
    }

    // HTML para estado vacío
    function emptyStateHTML() {
        return `
            <div class="empty-state">
                <i class="fas fa-clipboard-list"></i>
                <p>Seleccione un proyecto para comenzar la evaluación</p>
            </div>
        `;
    }
});