document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const criteriaSelects = document.querySelectorAll('.criteria-select');
    const gradeValues = {
        originality: document.getElementById('originality-value'),
        content: document.getElementById('content-value'),
        presentation: document.getElementById('presentation-value'),
        resources: document.getElementById('resources-value'),
        applicability: document.getElementById('applicability-value')
    };
    const progressBars = document.querySelectorAll('.grade-progress');
    const totalGradeElement = document.getElementById('total-grade');
    const submitButton = document.getElementById('submit-evaluation');
    const successMessage = document.getElementById('success-message');
    const finalGradeDisplay = document.getElementById('final-grade-display');

    // Calcular calificación inicial
    updateGrades();

    // Escuchar cambios en los selectores
    criteriaSelects.forEach(select => {
        select.addEventListener('change', updateGrades);
    });

    // Función para actualizar las calificaciones
    function updateGrades() {
        let total = 0;
        
        criteriaSelects.forEach(select => {
            const value = parseFloat(select.value);
            const criterion = select.id;
            
            // Actualizar valores numéricos
            gradeValues[criterion].textContent = value.toFixed(1);
            
            // Actualizar barras de progreso
            const percentage = (value / 5) * 100;
            document.querySelector(`#${criterion}-value`).nextElementSibling
                .querySelector('.grade-progress').style.width = `${percentage}%`;
            
            // Sumar al total
            total += value;
        });
        
        // Calcular promedio
        const average = total / criteriaSelects.length;
        totalGradeElement.textContent = average.toFixed(1);
    }

    // Manejar envío del formulario
    submitButton.addEventListener('click', function() {
        // Validar que todos los campos estén completos
        let isValid = true;
        criteriaSelects.forEach(select => {
            if (!select.value) isValid = false;
        });
        
        if (!isValid) {
            alert('Por favor complete todos los criterios de evaluación');
            return;
        }
        
        // Mostrar mensaje de éxito
        successMessage.style.display = 'block';
        finalGradeDisplay.textContent = totalGradeElement.textContent;
        
        // Desplazarse al mensaje
        successMessage.scrollIntoView({ behavior: 'smooth' });
        
        // Opcional: Enviar datos al servidor
        // sendEvaluationToServer();
    });

    // Función para enviar datos al servidor (ejemplo)
    function sendEvaluationToServer() {
        const evaluationData = {
            project: document.getElementById('project-name').textContent,
            team: 'Los Innovadores', // Esto debería ser dinámico
            date: new Date().toISOString(),
            criteria: {
                originality: document.getElementById('originality').value,
                content: document.getElementById('content').value,
                presentation: document.getElementById('presentation').value,
                resources: document.getElementById('resources').value,
                applicability: document.getElementById('applicability').value
            },
            comments: {
                strengths: document.getElementById('strengths').value,
                improvements: document.getElementById('improvements').value
            },
            total: totalGradeElement.textContent
        };
        
        console.log('Datos a enviar:', evaluationData);
        // Aquí iría la lógica para enviar al servidor con fetch()
    }
});