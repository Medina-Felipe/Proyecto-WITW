document.addEventListener('DOMContentLoaded', () => {

    // --- Mapa con Leaflet ---
    let map;
    let mapInitialized = false;

    function initializeMap() {
        const mapContainer = document.getElementById('map-container');
        if (mapContainer) {
            mapContainer.innerHTML = '';
        } else {
            console.error('ERROR CRÍTICO: No se pudo encontrar el elemento #map-container.');
            return;
        }

        if (mapInitialized) {
            setTimeout(() => map.invalidateSize(), 100);
            return;
        }

        // Coordenadas centradas en Chile
        const chileCenter = [-33.45694, -70.64827]; 
        map = L.map('map-container').setView(chileCenter, 5); 

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker(chileCenter).addTo(map)
            .bindPopup('<b>Santiago de Chile</b><br>Un evento de ejemplo.')
            .openPopup();
            
        mapInitialized = true;
        
        setTimeout(() => map.invalidateSize(), 100);
    }


    // --- Datos y localStorage ---
    const DUMMY_ACTIVITIES = [
        { id: 1, nombre: 'Senderismo en el Parque Nacional', lugar: 'Parque Nacional La Campana', fecha: '2025-11-15', hora: '09:00', descripcion: 'Excursión al cerro La Campana, dificultad media.', imagenUrl: 'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2070&auto=format&fit=crop' },
        { id: 2, nombre: 'Día de Playa y Surf', lugar: 'Pichilemu', fecha: '2026-01-20', hora: '11:00', descripcion: 'Clases de surf y relajo en la playa principal.', imagenUrl: 'https://images.unsplash.com/photo-1502680390469-be75c88b63f8?q=80&w=2070&auto=format&fit=crop' },
        { id: 3, nombre: 'Tour Astronómico', lugar: 'Valle del Elqui', fecha: '2026-02-10', hora: '21:00', descripcion: 'Observación de estrellas con telescopios profesionales.', imagenUrl: 'https://images.unsplash.com/photo-1534235826754-0a3511d1323a?q=80&w=1974&auto=format&fit=crop' }
    ];

    function getActivities() {
        let activities = localStorage.getItem('activities');
        if (!activities) {
            localStorage.setItem('activities', JSON.stringify(DUMMY_ACTIVITIES));
            return DUMMY_ACTIVITIES;
        }
        return JSON.parse(activities);
    }

    function saveActivities(activities) {
        localStorage.setItem('activities', JSON.stringify(activities));
    }

    // --- Navegación de Página Única (SPA) ---
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.section');

    function showSection(sectionId) {
        sections.forEach(section => {
            section.style.display = (section.id === sectionId) ? 'block' : 'none';
        });

        if (sectionId === 'mapa') {
            initializeMap();
        }

        // Oculta el menú de perfil al cambiar de sección
        const profileMenu = document.getElementById('profileMenu');
        if (profileMenu) {
            profileMenu.classList.add('hidden');
        }
    }

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const sectionId = button.getAttribute('data-section');
            if (sectionId) {
                showSection(sectionId);
            }
        });
    });

    // --- Lógica de la Sección de Inicio ---
    const contenedorActividades = document.getElementById('contenedor-actividades');

    function displayActivities() {
        const activities = getActivities();
        contenedorActividades.innerHTML = '';
        activities.forEach(act => {
            const card = document.createElement('div');
            card.className = 'bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300';
            card.innerHTML = `
                <img src="${act.imagenUrl}" alt="${act.nombre}" class="w-full h-48 object-cover" onerror="this.onerror=null;this.src='https.placehold.co/600x400/EEE/31343C?text=Imagen no disponible';">
                <div class="p-4">
                    <h3 class="text-xl font-semibold mb-2">${act.nombre}</h3>
                    <p class="text-gray-600 mb-2"><i class="bi bi-geo-alt-fill"></i> ${act.lugar}</p>
                    <p class="text-gray-700 text-sm mb-4">${act.descripcion}</p>
                    <div class="text-sm text-gray-500">
                        <i class="bi bi-calendar-event"></i> ${act.fecha} a las ${act.hora}
                    </div>
                </div>
            `;
            contenedorActividades.appendChild(card);
        });
    }

    // --- Lógica para Añadir Actividad ---
    const addForm = document.getElementById('form-add');
    if(addForm) {
        addForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const newActivity = {
                id: Date.now(),
                nombre: addForm.querySelector('[name="nombre"]').value,
                lugar: addForm.querySelector('[name="lugar"]').value,
                fecha: addForm.querySelector('[name="fecha"]').value,
                hora: addForm.querySelector('[name="hora"]').value,
                descripcion: addForm.querySelector('[name="descripcion"]').value,
                imagenUrl: addForm.querySelector('[name="imagenUrl"]').value,
            };

            const activities = getActivities();
            activities.push(newActivity);
            saveActivities(activities);

            alert('¡Actividad agregada con éxito!');
            addForm.reset();
            displayActivities();
            showSection('inicio');
        });
    }

    // --- Lógica del Menú de Perfil ---
    const profileBtn = document.getElementById('profileBtn');
    const profileMenu = document.getElementById('profileMenu');
    profileBtn.addEventListener('click', () => {
        profileMenu.classList.toggle('hidden');
    });

    // --- Inicialización ---
    displayActivities(); 
    showSection('inicio');
});
