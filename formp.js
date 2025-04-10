document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registroProyecto');
    const mensajeExito = document.getElementById('mensajeExito');
    const btnNuevoProyecto = document.getElementById('btnNuevoProyecto');
    const resumenProyecto = document.getElementById('resumenProyecto');
    const fileInput = document.getElementById('documento');
    const fileName = document.querySelector('.file-name');
    const previewContainer = document.createElement('div');
    previewContainer.className = 'preview-container';
    fileInput.parentNode.insertBefore(previewContainer, fileInput.nextSibling);

    fileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            fileName.textContent = file.name;
            
            // Validar tamaño (5MB máximo)
            if (file.size > 5 * 1024 * 1024) {
                alert('El archivo excede el tamaño máximo de 5MB');
                fileInput.value = '';
                fileName.textContent = 'No se ha seleccionado ningún archivo';
                return;
            }
            
            // Mostrar vista previa (opcional)
            previewContainer.innerHTML = '';
            previewContainer.style.display = 'block';
            
            const previewTitle = document.createElement('div');
            previewTitle.className = 'preview-title';
            previewTitle.textContent = 'Vista previa:';
            previewContainer.appendChild(previewTitle);
            
            const previewContent = document.createElement('div');
            previewContent.className = 'preview-content';
            
            if (file.type === 'application/pdf') {
                previewContent.innerHTML = `
                    <div class="preview-pdf">
                        <i class="pdf-icon">📄</i>
                        <p>${file.name}</p>
                        <small>(Documento PDF)</small>
                    </div>
                `;
            } else if (file.type === 'image/png') {
                const reader = new FileReader();
                reader.onload = function(e) {
                    previewContent.innerHTML = `
                        <img src="${e.target.result}" class="preview-image" alt="Vista previa">
                        <p>${file.name}</p>
                    `;
                };
                reader.readAsDataURL(file);
            }
            
            previewContainer.appendChild(previewContent);
        } else {
            fileName.textContent = 'No se ha seleccionado ningún archivo';
            previewContainer.style.display = 'none';
        }
    });
    
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        if (!fileInput.files[0]) {
            alert('Debe seleccionar un archivo PDF o PNG');
            return;
        }

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
            <strong>Correo:</strong> ${proyecto.correo}<br>
            <strong>Profesor responsable:</strong> ${proyecto.profesor}
        `;
        
        // Mostrar mensaje de éxito
        form.style.display = 'none';
        mensajeExito.style.display = 'block';
        
        // Aquí iría el código para enviar los datos al servidor
        console.log('Datos del proyecto:', proyecto);
        console.log('Archivo seleccionado:', fileInput.files[0]);
    });
    
    btnNuevoProyecto.addEventListener('click', function() {
        form.reset();
        form.style.display = 'block';
        mensajeExito.style.display = 'none';
    });
});
