const API_BASE = "http://localhost:8080/api";

function getEstudianteId() {
    const user = JSON.parse(localStorage.getItem("usuario"));
    return user?.id || null;
}

function validarLogin() {
    const usuario = localStorage.getItem("usuario");
    if (!usuario) {
        alert("Debes iniciar sesión primero.");
        window.location.href = "/index.html";
    }
}

async function crearEquipo() {
    const nombreEquipo = document.getElementById("nombreEquipoNuevo").value;
    const estudianteId = getEstudianteId();

    if (!nombreEquipo || !estudianteId) return alert("Falta información");

    const response = await fetch(`${API_BASE}/equipos/crear?nombre=${nombreEquipo}&estudianteId=${estudianteId}`, {
        method: "POST"
    });

    const data = await response.json();
    alert("Equipo creado: ID " + data.id);
}

async function unirseAEquipo() {
    const equipoId = document.getElementById("idEquipoExistente").value;
    const estudianteId = getEstudianteId();

    if (!equipoId || !estudianteId) return alert("Falta información");

    const response = await fetch(`${API_BASE}/equipos/unirse?equipoId=${equipoId}&estudianteId=${estudianteId}`, {
        method: "POST"
    });

    const texto = await response.text();
    alert(texto);
}

async function mostrarProyectoAsociado() {
    const estudianteId = getEstudianteId();
    if (!estudianteId) return;

    const response = await fetch(`${API_BASE}/equipos/proyectoPorEstudiante?estudianteId=${estudianteId}`);

    if (!response.ok) {
        console.error("Error al obtener el proyecto");
        return;
    }

    const text = await response.text();
    if (!text) {
        document.getElementById("nombreProyecto").textContent = "Sin proyecto";
        document.getElementById("descripcionProyecto").textContent = "-";
        return;
    }

    const proyecto = JSON.parse(text);

    document.getElementById("nombreProyecto").textContent = proyecto.nombre || "Sin nombre";
    document.getElementById("descripcionProyecto").textContent = proyecto.descripcion || "-";
}
async function cargarEquiposDisponibles() {
    const response = await fetch(`${API_BASE}/equipos/listar`);
    const equipos = await response.json();

    const tbody = document.querySelector("#tablaEquipos tbody");
    tbody.innerHTML = ""; // Limpiar tabla antes de insertar

    equipos.forEach(equipo => {
        const fila = document.createElement("tr");

        const celdaId = document.createElement("td");
        celdaId.textContent = equipo.id;

        const celdaNombre = document.createElement("td");
        celdaNombre.textContent = equipo.nombre;

        const celdaIntegrantes = document.createElement("td");
        celdaIntegrantes.textContent = equipo.integrantes ? equipo.integrantes.length : 0;

        fila.appendChild(celdaId);
        fila.appendChild(celdaNombre);
        fila.appendChild(celdaIntegrantes);

        tbody.appendChild(fila);
    });
}


window.onload = () => {
    validarLogin();
    mostrarProyectoAsociado();
    cargarEquiposDisponibles();
};

