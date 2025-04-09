document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById('requests-table-body');
    const noRequestsMessage = document.getElementById('no-requests-message');
    const logoutButton = document.getElementById('logout-button');
    const downloadCsvButton = document.getElementById('download-csv-button');

    // 1. Verificar si el usuario está logueado
    if (sessionStorage.getItem('isAdminLoggedIn') !== 'true') {
        // Si no está logueado, redirigir a la página de login
        window.location.href = 'login.html';
        return; // Detener la ejecución del script si no está logueado
    }

    // 2. Cargar y mostrar las solicitudes si está logueado
    cargarSolicitudes();

    // 3. Configurar el botón de logout
    logoutButton.addEventListener('click', () => {
        sessionStorage.removeItem('isAdminLoggedIn'); // Limpiar el indicador de sesión
        window.location.href = 'login.html'; // Redirigir a login
    });

    // 4. Configurar el botón de descarga CSV
    downloadCsvButton.addEventListener('click', () => {
        descargarCsv();
    });

    function cargarSolicitudes() {
        // Limpiar el cuerpo de la tabla y ocultar mensaje previo
        tableBody.innerHTML = '';
        noRequestsMessage.style.display = 'none';

        // Obtener las solicitudes de LocalStorage
        const solicitudes = JSON.parse(localStorage.getItem('solicitudes')) || [];

        if (solicitudes.length === 0) {
            // Mostrar mensaje si no hay solicitudes
            noRequestsMessage.style.display = 'block';
            return;
        }

        // 5. Crear una fila en la tabla por cada solicitud
        solicitudes.forEach(solicitud => {
            const row = tableBody.insertRow(); // Crear una nueva fila (<tr>)

            // Crear celdas (<td>) y asignarles el contenido
            const cellId = row.insertCell();
            cellId.textContent = solicitud.id;

            const cellFecha = row.insertCell();
            cellFecha.textContent = solicitud.fecha;

            const cellResponsable = row.insertCell();
            cellResponsable.textContent = solicitud.responsable;

            const cellCorreo = row.insertCell();
            cellCorreo.textContent = solicitud.correo;

            const cellProyecto = row.insertCell();
            cellProyecto.textContent = solicitud.proyecto;

            const cellPmo = row.insertCell();
            cellPmo.textContent = solicitud.pmo;

            const cellRequerimiento = row.insertCell();
            // Usar textContent para evitar problemas de XSS si el requerimiento tuviera HTML
            // Si se necesita mostrar saltos de línea, se podría hacer con CSS white-space: pre-wrap;
            cellRequerimiento.textContent = solicitud.requerimiento;
        });
    }

    function descargarCsv() {
        // Obtener las solicitudes de LocalStorage
        const solicitudes = JSON.parse(localStorage.getItem('solicitudes')) || [];

        if (solicitudes.length === 0) {
            alert('No hay solicitudes para descargar.');
            return;
        }

        // 6. Convertir las solicitudes a CSV
        const csv = convertirAFormatoCsv(solicitudes);

        // 7. Crear un enlace para descargar el archivo
        const link = document.createElement('a');
        link.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv));
        link.setAttribute('download', 'solicitudes.csv');
        link.style.display = 'none'; // Ocultar el enlace

        // 8. Añadir el enlace al DOM y simular un click
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link); // Eliminar el enlace
    }

    function convertirAFormatoCsv(solicitudes) {
        // Encabezados CSV
        const encabezados = ['ID', 'Fecha', 'Responsable', 'Correo', 'Proyecto', 'Código PMO', 'Requerimiento'];

        // Convertir cada solicitud a una fila CSV
        const filas = solicitudes.map(solicitud => {
            return [
                solicitud.id,
                solicitud.fecha,
                solicitud.responsable,
                solicitud.correo,
                solicitud.proyecto,
                solicitud.pmo,
                solicitud.requerimiento.replace(/[\r\n]+/gm, " ") // Eliminar saltos de línea
            ].join(',');
        });

        // Unir encabezados y filas con saltos de línea
        return encabezados.join(',') + '\r\n' + filas.join('\r\n');
    }
});