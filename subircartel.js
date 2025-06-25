document.addEventListener('DOMContentLoaded', function() {
    const fileUpload = document.getElementById('poster-upload');
    const fileName = document.getElementById('file-name');
    const previewContainer = document.getElementById('preview-container');
    const previewImage = document.getElementById('preview-image');
    const previewPdf = document.getElementById('preview-pdf');
    const btnUpload = document.getElementById('btn-upload');

    fileUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        
        if (!file) {
            resetPreview();
            return;
        }

        // Validar tipo de archivo
        const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
        if (!validTypes.includes(file.type)) {
            alert('Por favor sube un archivo PDF, JPG o PNG');
            resetPreview();
            return;
        }

        // Validar tamaño (10MB máximo)
        if (file.size > 10 * 1024 * 1024) {
            alert('El archivo es demasiado grande (máximo 10MB)');
            resetPreview();
            return;
        }

        fileName.textContent = file.name;
        btnUpload.disabled = false;

        // Mostrar vista previa
        if (file.type === 'application/pdf') {
            previewImage.style.display = 'none';
            previewPdf.style.display = 'block';
            previewPdf.src = URL.createObjectURL(file);
            document.querySelector('.preview-placeholder').style.display = 'none';
        } else {
            previewPdf.style.display = 'none';
            previewImage.style.display = 'block';
            previewImage.src = URL.createObjectURL(file);
            document.querySelector('.preview-placeholder').style.display = 'none';
        }
    });

    btnUpload.addEventListener('click', function() {
        const file = fileUpload.files[0];
        if (!file) return;

        // Aquí iría la lógica para subir el archivo al servidor
        // Simulamos una subida exitosa
        setTimeout(() => {
            alert('Cartel subido exitosamente');
            resetForm();
        }, 1000);
    });

    function resetPreview() {
        fileUpload.value = '';
        fileName.textContent = 'Ningún archivo seleccionado';
        previewImage.src = '';
        previewImage.style.display = 'none';
        previewPdf.src = '';
        previewPdf.style.display = 'none';
        document.querySelector('.preview-placeholder').style.display = 'flex';
        btnUpload.disabled = true;
    }

    function resetForm() {
        resetPreview();
    }
});