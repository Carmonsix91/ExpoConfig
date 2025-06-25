document.addEventListener('DOMContentLoaded', function() {
    const constanciaForm = document.getElementById('constanciaForm');
    const documentoPreview = document.getElementById('documentoPreview');
    const btnImprimir = document.getElementById('btnImprimir');
    const btnNuevoDocumento = document.getElementById('btnNuevoDocumento');
    const tipoDocumento = document.getElementById('tipoDocumento');
    
    // Elementos condicionales
    const eventoGroup = document.getElementById('eventoGroup');
    const fechaEventoGroup = document.getElementById('fechaEventoGroup');
    const motivoGroup = document.getElementById('motivoGroup');

    // Manejar cambio en tipo de documento
    tipoDocumento.addEventListener('change', function() {
        if (tipoDocumento.value === 'constancia') {
            eventoGroup.style.display = 'block';
            fechaEventoGroup.style.display = 'block';
            motivoGroup.style.display = 'none';
        } else if (tipoDocumento.value === 'justificante') {
            eventoGroup.style.display = 'block';
            fechaEventoGroup.style.display = 'block';
            motivoGroup.style.display = 'block';
        } else {
            eventoGroup.style.display = 'none';
            fechaEventoGroup.style.display = 'none';
            motivoGroup.style.display = 'none';
        }
    });

    // Generar folio aleatorio
    function generarFolio() {
        const letras = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
        const numeros = '0123456789';
        let folio = 'CON-';
        
        // 3 letras
        for (let i = 0; i < 3; i++) {
            folio += letras.charAt(Math.floor(Math.random() * letras.length));
        }
        
        // 4 números
        for (let i = 0; i < 4; i++) {
            folio += numeros.charAt(Math.floor(Math.random() * numeros.length));
        }
        
        return folio;
    }

    // Formatear fecha en texto
    function formatearFecha(fecha) {
        if (!fecha) return '';
        
        const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(fecha).toLocaleDateString('es-ES', opciones);
    }

    // Procesar el formulario
    constanciaForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtener valores del formulario
        const tipo = tipoDocumento.value;
        const nombre = document.getElementById('nombre').value;
        const matricula = document.getElementById('matricula').value;
        const carrera = document.getElementById('carrera').value;
        const evento = document.getElementById('evento').value;
        const fechaEvento = document.getElementById('fechaEvento').value;
        const motivo = document.getElementById('motivo').value;
        
        // Validaciones básicas
        if (!tipo) {
            alert('Por favor seleccione el tipo de documento');
            return;
        }
        
        if (!nombre || !matricula || !carrera) {
            alert('Por favor complete todos los campos obligatorios');
            return;
        }
        
        if (tipo === 'constancia' && (!evento || !fechaEvento)) {
            alert('Para constancias, debe especificar el evento y la fecha');
            return;
        }
        
        if (tipo === 'justificante' && (!evento || !fechaEvento || !motivo)) {
            alert('Para justificantes, debe especificar el evento, fecha y motivo');
            return;
        }
        
        // Generar contenido del documento según el tipo
        let titulo = '';
        let contenido = '';
        const fechaActual = new Date().toLocaleDateString('es-ES');
        const folio = generarFolio();
        
        if (tipo === 'constancia') {
            titulo = 'CONSTANCIA DE PARTICIPACIÓN';
            contenido = `
                <p>La Dirección de la Escuela Superior de Cómputo del Instituto Politécnico Nacional, hace constar que:</p>
                
                <p class="destacado"><strong>${nombre}</strong></p>
                <p>Matrícula: <strong>${matricula}</strong></p>
                <p>Carrera: <strong>${carrera}</strong></p>
                
                <p>Participó en el evento/actividad:</p>
                <p class="destacado"><strong>"${evento}"</strong></p>
                <p>Realizado el día <strong>${formatearFecha(fechaEvento)}</strong> en las instalaciones de esta institución.</p>
                
                <p>Se extiende la presente para los fines que al interesado(a) convengan.</p>
                
                <p>Ciudad de México, a ${fechaActual}.</p>
            `;
        } else {
            titulo = 'JUSTIFICANTE DE AUSENCIA';
            contenido = `
                <p>La Dirección de la Escuela Superior de Cómputo del Instituto Politécnico Nacional, hace constar que:</p>
                
                <p class="destacado"><strong>${nombre}</strong></p>
                <p>Matrícula: <strong>${matricula}</strong></p>
                <p>Carrera: <strong>${carrera}</strong></p>
                
                <p>No pudo asistir al evento/actividad:</p>
                <p class="destacado"><strong>"${evento}"</strong></p>
                <p>Programado para el día <strong>${formatearFecha(fechaEvento)}</strong> debido a:</p>
                
                <p class="motivo">"${motivo}"</p>
                
                <p>Se expide la presente para justificar su inasistencia ante quien corresponda.</p>
                
                <p>Ciudad de México, a ${fechaActual}.</p>
            `;
        }
        
        // Mostrar en la vista previa
        document.getElementById('tituloDocumento').textContent = titulo;
        document.getElementById('contenidoDocumento').innerHTML = contenido;
        document.getElementById('folioDocumento').textContent = `Folio: ${folio}`;
        
        // Mostrar vista previa y ocultar formulario
        constanciaForm.style.display = 'none';
        documentoPreview.style.display = 'block';
    });
    
    // Botón para imprimir el documento
    btnImprimir.addEventListener('click', function() {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Documento ESCOM</title>
                <style>
                    body { 
                        margin: 0; 
                        padding: 0; 
                        font-family: Arial, sans-serif;
                    }
                    .documento {
                        width: 800px;
                        margin: 0 auto;
                        padding: 40px;
                        background: white;
                        min-height: 100vh;
                        box-sizing: border-box;
                    }
                    .documento-header {
                        text-align: center;
                        margin-bottom: 30px;
                    }
                    .logos-documento {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        gap: 20px;
                        margin-bottom: 20px;
                    }
                    .logo-documento {
                        width: 80px;
                        height: auto;
                    }
                    .institucion {
                        text-align: center;
                    }
                    .institucion h3 {
                        margin: 0;
                        font-size: 18px;
                        color: #5c0e2d;
                    }
                    .institucion h4 {
                        margin: 5px 0 0;
                        font-size: 16px;
                        color: #333;
                    }
                    .documento-header h2 {
                        color: #5c0e2d;
                        font-size: 20px;
                        text-transform: uppercase;
                        margin: 20px 0;
                        padding-bottom: 10px;
                        border-bottom: 2px solid #5c0e2d;
                    }
                    .documento-body {
                        font-size: 16px;
                        line-height: 1.6;
                        margin-bottom: 50px;
                    }
                    .documento-body p {
                        margin-bottom: 15px;
                        text-align: justify;
                    }
                    .destacado {
                        text-align: center;
                        font-size: 18px;
                        margin: 20px 0;
                    }
                    .motivo {
                        font-style: italic;
                        padding: 10px 20px;
                        background-color: #f5f5f5;
                        border-left: 3px solid #5c0e2d;
                    }
                    .firma {
                        margin-top: 80px;
                        text-align: center;
                    }
                    .linea-firma {
                        width: 300px;
                        height: 1px;
                        background-color: #000;
                        margin: 0 auto 10px;
                    }
                    .firma p {
                        margin: 5px 0;
                        font-size: 14px;
                    }
                    .documento-footer {
                        margin-top: 50px;
                        font-size: 12px;
                        text-align: center;
                        color: #666;
                        border-top: 1px solid #ddd;
                        padding-top: 10px;
                    }
                    @page { size: A4; margin: 0; }
                </style>
            </head>
            <body>
                ${document.getElementById('documentoToPrint').outerHTML}
            </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.onload = function() {
            printWindow.print();
        };
    });
    
    // Botón para generar nuevo documento
    btnNuevoDocumento.addEventListener('click', function() {
        constanciaForm.reset();
        constanciaForm.style.display = 'block';
        documentoPreview.style.display = 'none';
        
        // Restablecer visibilidad de grupos
        eventoGroup.style.display = 'none';
        fechaEventoGroup.style.display = 'none';
        motivoGroup.style.display = 'none';
    });
});