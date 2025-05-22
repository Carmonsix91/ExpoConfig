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

// Cargar todos los equipos en la tabla (soporta array o objeto)
function cargarEquipos() {
    fetch("/api/equipos/listar")
        .then(response => response.json())
        .then(equipos => {
            // Si equipos es un objeto, conviértelo a array para forEach
            if (!Array.isArray(equipos)) {
                equipos = [equipos];
            }
            const tabla = document.querySelector("#tablaEquipos tbody");
            tabla.innerHTML = ""; // Limpiar antes de volver a agregar filas

            if (!equipos || equipos.length === 0 || !equipos[0].id) {
                const fila = document.createElement("tr");
                fila.innerHTML = `<td colspan="4">No hay equipos registrados.</td>`;
                tabla.appendChild(fila);
                return;
            }

            equipos.forEach(equipo => {
                let integrantes = (equipo.integrantes && Array.isArray(equipo.integrantes))
                    ? equipo.integrantes.map(i => i.nombre ? i.nombre : 'Sin nombre').join(", ")
                    : "0";
                const fila = document.createElement("tr");
                fila.innerHTML = `
                    <td>${equipo.id}</td>
                    <td>${equipo.nombre}</td>
                    <td>${integrantes}</td>
                    <td><button onclick="unirseAEquipo(${equipo.id})" class="btn btn-primary">Unirse</button></td>
                `;
                tabla.appendChild(fila);
            });
        })
        .catch(error => {
            console.error("Error al cargar equipos:", error);
            const tabla = document.querySelector("#tablaEquipos tbody");
            tabla.innerHTML = `<tr><td colspan="4">Error al cargar equipos.</td></tr>`;
        });
}

// Al cargar la página
window.onload = function () {
    const idEquipo = localStorage.getItem("idEquipo");
    if (idEquipo) {
        mostrarProyectoAsociado(idEquipo);
    }
    cargarEquipos();
};
