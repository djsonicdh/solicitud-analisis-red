# Plan de Desarrollo: Solicitud de Análisis de Proyectos de Red

Aplicación web simple para registrar solicitudes de análisis de proyectos de conectividad de red usando HTML, CSS, JavaScript y LocalStorage.

## 1. Configuración Inicial del Proyecto

*   Crear una carpeta `solicitud_analisis_red` en el Escritorio.
*   Dentro de la carpeta, crear:
    *   `index.html`: Estructura y formulario.
    *   `style.css`: Estilos visuales.
    *   `script.js`: Lógica de la aplicación.

## 2. Desarrollo del Frontend (`index.html` y `style.css`)

*   **`index.html`**:
    *   Estructura básica HTML5.
    *   Enlace a `style.css`.
    *   Título: "Solicitud de Análisis de Proyectos de Red".
    *   Formulario (`<form id="request-form">`) con campos para:
        *   Nombre del responsable (`id="responsable"`, `type="text"`)
        *   Correo (`id="correo"`, `type="email"`)
        *   Nombre del proyecto (`id="proyecto"`, `type="text"`)
        *   Código PMO (`id="pmo"`, `type="text"`)
        *   Requerimiento (`<textarea id="requerimiento">`).
        *   Botón de envío (`<button type="submit">`).
    *   Sección para mostrar solicitudes guardadas (`<div id="saved-requests">`).
    *   Enlace a `script.js` al final del `<body>`.
*   **`style.css`**:
    *   Estilos básicos (márgenes, padding, fuentes).
    *   Estilos para el formulario (disposición, bordes, espaciado).
    *   Estilos para el botón.
    *   Estilos para la sección de solicitudes guardadas.

## 3. Implementación de la Lógica (`script.js`)

*   **Manejo del Formulario:**
    *   Obtener referencias a elementos del DOM.
    *   Listener para `submit` en el formulario.
    *   Prevenir recarga (`event.preventDefault()`).
    *   Leer valores de los campos.
    *   Crear objeto de solicitud.
    *   Llamar a `guardarSolicitud()`.
    *   Llamar a `mostrarSolicitudes()`.
    *   Limpiar formulario.
*   **Almacenamiento en LocalStorage:**
    *   Función `guardarSolicitud(solicitud)`:
        *   Obtener solicitudes existentes de `localStorage`.
        *   Parsear JSON (o inicializar array vacío).
        *   Añadir nueva solicitud.
        *   Guardar array actualizado en `localStorage` (stringify).
*   **Visualización de Solicitudes:**
    *   Función `mostrarSolicitudes()`:
        *   Obtener y parsear solicitudes de `localStorage`.
        *   Limpiar sección `#saved-requests`.
        *   Iterar sobre solicitudes y crear HTML para mostrarlas.
*   **Carga Inicial:**
    *   Al cargar la página (`DOMContentLoaded`), llamar a `mostrarSolicitudes()`.

## Diagrama de Flujo

```mermaid
graph LR
    subgraph "Usuario"
        A[Abre index.html] --> B[Ingresa Datos en Formulario];
        B --> C[Clic en Enviar];
    end

    subgraph "Aplicación (script.js)"
        C --> D{Evento 'submit' Capturado};
        D -- Prevenir Recarga --> E[Leer Datos del Formulario];
        E --> F[Crear Objeto Solicitud];
        F --> G[guardarSolicitud()];
        G --> H[Actualizar LocalStorage];
        H --> I[mostrarSolicitudes()];
        I --> J[Actualizar HTML con Solicitudes];
        J --> K[Limpiar Formulario];

        A --> L{Evento 'DOMContentLoaded'};
        L --> M[mostrarSolicitudes()];
        M --> N[Leer LocalStorage];
        N --> J;
    end

    subgraph "Navegador"
       O[(LocalStorage)]
       H --> O;
       N --> O;
       P[Renderizar HTML/CSS]
       J --> P;
    end