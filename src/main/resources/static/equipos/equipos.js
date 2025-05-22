// Mostrar el proyecto asociado al equipo
function mostrarProyectoAsociado(idEquipo) {
    fetch(`/api/equipos/proyecto/${idEquipo}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("No se encontró proyecto asociado.");
            }
            return response.json();
        })
        .then(proyecto => {
            document.getElementById("nombreProyecto").textContent = proyecto.nombre || proyecto.titulo;
            document.getElementById("descripcionProyecto").textContent = proyecto.descripcion;
        })
        .catch(error => {
            console.error(error);
            document.getElementById("nombreProyecto").textContent = "Sin proyecto";
            document.getElementById("descripcionProyecto").textContent = "Este equipo no tiene proyecto asignado aún.";
        });
}

// Unirse a un equipo desde botón en tabla
function unirseAEquipo(idEquipo) {
    const idEstudiante = localStorage.getItem("id");
    if (!idEstudiante) {
        alert("⚠️ No se encontró el ID del usuario. Inicia sesión nuevamente.");
        return;
    }

    fetch(`/api/estudiantes/unir/${idEstudiante}/${idEquipo}`, {
        method: "PUT"
    })
        .then(response => {
            if (!response.ok) throw new Error("Error al unirse al equipo.");
            localStorage.setItem("idEquipo", idEquipo);
            mostrarProyectoAsociado(idEquipo);
            cargarEquipos();
            alert("✅ ¡Te has unido al equipo correctamente!");
        })
        .catch(error => {
            console.error("❌ Error al unirse al equipo:", error);
            alert("❌ No se pudo unir al equipo.");
        });
}

// Unirse a un equipo desde el input
function unirseAEquipoDesdeInput() {
    const idInput = document.getElementById("idEquipoExistente").value;
    if (idInput) {
        unirseAEquipo(parseInt(idInput));
    } else {
        alert("Introduce un ID de equipo válido.");
    }
}

// Crear un nuevo equipo y asociar al usuario actual
function crearEquipo() {
    const nombre = document.getElementById("nombreEquipoNuevo").value;
    if (!nombre) {
        alert("Debes ingresar un nombre para el equipo.");
        return;
    }

    fetch("/api/equipos/crear", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ nombre: nombre })
    })
    .then(response => {
        if (!response.ok) throw new Error("Error al crear el equipo.");
        return response.json();
    })
    .then(equipo => {
        const idEstudiante = localStorage.getItem("id");
        if (!idEstudiante) {
            alert("⚠️ No se encontró el ID del estudiante logueado.");
            return;
        }

        // Unir automáticamente al creador al nuevo equipo
        fetch(`/api/estudiantes/unir/${idEstudiante}/${equipo.id}`, {
            method: "PUT"
        })
        .then(resp => {
            if (!resp.ok) throw new Error("Error al unir al creador al nuevo equipo.");
            localStorage.setItem("idEquipo", equipo.id);
            mostrarProyectoAsociado(equipo.id);
            cargarEquipos();
            alert("✅ Equipo creado y asignado correctamente.");
        });
    })
    .catch(error => {
        console.error("❌ Error al crear equipo:", error);
        alert("❌ No se pudo crear el equipo.");
    });
}

// Cargar todos los equipos en la tabla
function cargarEquipos() {
    fetch("/api/equipos/listar")
        .then(response => response.json())
        .then(equipos => {
            const tabla = document.querySelector("#tablaEquipos tbody");
            tabla.innerHTML = ""; // Limpiar tabla antes de insertar
            equipos.forEach(equipo => {
                const fila = document.createElement("tr");
                // Puedes mostrar el número de integrantes si tu backend lo envía en el JSON
                const integrantes = equipo.integrantes ? equipo.integrantes.length : 0;
                fila.innerHTML = `
                    <td>${equipo.id}</td>
                    <td>${equipo.nombre}</td>
                    <td>${integrantes}</td>
                    <td><button onclick="unirseAEquipo(${equipo.id})" class="btn btn-primary">Unirse</button></td>
                `;
                tabla.appendChild(fila);
            });
        })
        .catch(error => console.error("Error al cargar equipos:", error));
}

// Al cargar la página
window.onload = function () {
    const idEquipo = localStorage.getItem("idEquipo");
    if (idEquipo) {
        mostrarProyectoAsociado(idEquipo);
    }

    cargarEquipos();
};
