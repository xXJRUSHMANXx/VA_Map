/**
 * Главный скрипт приложения
 */

// Ждем загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    console.log('3D Document Map initialized');
    
    // Инициализация менеджера документов
    const docManager = new DocumentManager();
    docManager.initialize();
    
    // Инициализация просмотрщика
    const viewer = new DocumentViewer();
    
    // Обработчик открытия документа
    document.addEventListener('document-open', (e) => {
        viewer.open(e.detail);
    });
    
    // Поиск
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    
    searchBtn.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query) {
            docManager.search(query);
        }
    });
    
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = searchInput.value.trim();
            if (query) {
                docManager.search(query);
            }
        }
    });
    
    // Очистка поиска
    searchInput.addEventListener('input', (e) => {
        if (e.target.value === '') {
            // Показываем все документы
            docManager.activeDocuments.forEach(entity => {
                entity.setAttribute('visible', 'true');
            });
        }
    });
    
    // Добавляем телепортацию (быстрое перемещение)
    setupTeleport();
    
    // Настраиваем камеру
    setupCamera();
});

/**
 * Настройка телепортации
 */
function setupTeleport() {
    // Добавляем телепортацию по правому клику
    const scene = document.querySelector('a-scene');
    
    scene.addEventListener('click', (e) => {
        // Если клик не по документу, телепортируемся
        if (!e.target.classList.contains('document')) {
            // Получаем позицию курсора
            const camera = document.getElementById('camera');
            const cursor = document.getElementById('cursor');
            
            // Простая телепортация вперед
            const currentPos = camera.getAttribute('position');
            const newZ = currentPos.z - 2;
            
            camera.setAttribute('position', {
                x: currentPos.x,
                y: currentPos.y,
                z: newZ
            });
        }
    });
}

/**
 * Настройка камеры
 */
function setupCamera() {
    const camera = document.getElementById('camera');
    
    // Добавляем плавное движение
    let targetPosition = null;
    
    camera.addEventListener('target_position', (e) => {
        targetPosition = e.detail;
    });
    
    // Анимация плавного движения
    function animateCamera() {
        if (targetPosition) {
            const currentPos = camera.getAttribute('position');
            const dx = targetPosition.x - currentPos.x;
            const dy = targetPosition.y - currentPos.y;
            const dz = targetPosition.z - currentPos.z;
            
            const distance = Math.sqrt(dx*dx + dy*dy + dz*dz);
            
            if (distance > 0.1) {
                const speed = 0.05;
                camera.setAttribute('position', {
                    x: currentPos.x + dx * speed,
                    y: currentPos.y + dy * speed,
                    z: currentPos.z + dz * speed
                });
            } else {
                targetPosition = null;
            }
        }
        
        requestAnimationFrame(animateCamera);
    }
    
    animateCamera();
}

/**
 * Добавление нового документа (для динамического добавления)
 */
function addDocument(docData) {
    const docManager = new DocumentManager();
    docManager.createDocument(docData);
}

// Экспортируем функции
window.addDocument = addDocument;
