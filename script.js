document.addEventListener('DOMContentLoaded', () => {
    const requestForm = document.getElementById('request-form');
    const themeToggle = document.getElementById('theme-toggle');

    // 1. Cargar el tema preferido desde localStorage o usar el tema oscuro por defecto
    let currentTheme = localStorage.getItem('theme') || 'dark';
    aplicarTema(currentTheme);

    // 2. Función para aplicar el tema
    function aplicarTema(theme) {
        if (theme === 'dark') {
            document.body.classList.remove('light-theme');
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
            document.body.classList.add('light-theme');
        }
    }

    // 3. Configurar el botón de cambio de tema
    themeToggle.addEventListener('click', () => {
        // Alternar entre los temas
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';

        // Guardar el tema preferido en localStorage
        localStorage.setItem('theme', currentTheme);

        // Aplicar el tema
        aplicarTema(currentTheme);

        // Actualizar el icono del botón
        actualizarIconoTema();
    });

    // Función para actualizar el icono del tema
    function actualizarIconoTema() {
        if (currentTheme === 'dark') {
            themeToggle.textContent = '🌙 Cambiar Tema';
        } else {
            themeToggle.textContent = '☀️ Cambiar Tema';
        }
    }

    // Llamar a la función para establecer el icono inicial
    actualizarIconoTema();

    // 4. Cargar el contador de ID desde localStorage o inicializarlo
    let idCounter = parseInt(localStorage.getItem('idCounter')) || 1;

    // 5. Función para guardar el contador en localStorage
    function guardarContador() {
        localStorage.setItem('idCounter', idCounter.toString());
    }

    requestForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Evitar que el formulario recargue la página

        // Leer los valores del formulario
        const responsable = document.getElementById('responsable').value.trim();
        const correo = document.getElementById('correo').value.trim();
        const proyecto = document.getElementById('proyecto').value.trim();
        const pmo = document.getElementById('pmo').value.trim();
        const requerimiento = document.getElementById('requerimiento').value.trim();

        // Obtener el banco seleccionado
        const bancoSeleccionado = document.querySelector('input[name="banco"]:checked');

        let idPrefix = '';
        if (bancoSeleccionado) {
            if (bancoSeleccionado.value === 'BCH') {
                idPrefix = 'BCH-';
            } else if (bancoSeleccionado.value === 'BINV') {
                idPrefix = 'BINV-';
            }
        }

        // 6. Incrementar el contador y guardar
        const currentId = idCounter;
        idCounter++;
        guardarContador();

        // 7. Crear el ID final
        const nuevaSolicitudId = `${idPrefix}${currentId}`;

        // Crear un objeto para la nueva solicitud
        const nuevaSolicitud = {
            id: nuevaSolicitudId,
            fecha: new Date().toLocaleString('es-CL'), // Fecha y hora local
            responsable,
            correo,
            proyecto,
            pmo: pmo || 'N/A', // Usar 'N/A' si PMO está vacío
            requerimiento
        };

        // Guardar la nueva solicitud
        guardarSolicitud(nuevaSolicitud);

        // Limpiar el formulario
        requestForm.reset();
    });

    function guardarSolicitud(solicitud) {
        // Obtener las solicitudes existentes de LocalStorage
        let solicitudes = JSON.parse(localStorage.getItem('solicitudes')) || [];

        // Añadir la nueva solicitud al array
        solicitudes.push(solicitud);

        // Guardar el array actualizado en LocalStorage
        localStorage.setItem('solicitudes', JSON.stringify(solicitudes));
    }
});