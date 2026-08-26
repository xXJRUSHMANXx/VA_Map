javascript
/**
 * Документы - конфигурация и управление
 */

// База данных документов (можно расширить)
const documentsDB = [
    {
        id: 1,
        title: "Договор аренды",
        path: "documents/contract.pdf",
        type: "pdf",
        position: { x: 0, y: 1.6, z: -5 },
        color: "#FF6B6B",
        description: "Договор аренды офиса на 2024 год",
        category: "legal"
    },
    {
        id: 2,
        title: "Финансовый отчет",
        path: "documents/report.pdf",
        type: "pdf",
        position: { x: -3, y: 1.6, z: -3 },
        color: "#4ECDC4",
        description: "Отчет за Q1 2024",
        category: "finance"
    },
    {
        id: 3,
        title: "Техническое задание",
        path: "documents/specs.pdf",
        type: "pdf",
        position: { x: 3, y: 1.6, z: -3 },
        color: "#45B7D1",
        description: "ТЗ на разработку проекта",
        category: "tech"
    },
    {
        id: 4,
        title: "Презентация",
        path: "documents/presentation.pdf",
        type: "pdf",
        position: { x: -5, y: 1.6, z: -7 },
        color: "#96CEB4",
        description: "Презентация для инвесторов",
        category: "presentation"
    },
    {
        id: 5,
        title: "Инструкция",
        path: "documents/manual.pdf",
        type: "pdf",
        position: { x: 5, y: 1.6, z: -7 },
        color: "#FFEAA7",
        description: "Руководство пользователя",
        category: "docs"
    }
    // Добавьте больше документов по необходимости
];

/**
 * Класс для управления документами
 */
class DocumentManager {
    constructor() {
        this.documents = documentsDB;
        this.container = document.getElementById('documents-container');
        this.activeDocuments = [];
    }
    
    /**
     * Инициализация всех документов в сцене
     */
    initialize() {
        this.documents.forEach(doc => {
            this.createDocument(doc);
        });
        
        // Обновляем счетчик
        document.getElementById('doc-count').textContent = 
            `${this.documents.length} документов`;
    }
    
    /**
     * Создание 3D объекта документа
     */
    createDocument(docData) {
        // Создаем основной entity
        const docEntity = document.createElement('a-entity');
        docEntity.classList.add('document', 'clickable');
        docEntity.setAttribute('position', docData.position);
        docEntity.setAttribute('data-id', docData.id);
        
        // Добавляем геометрию (куб/книга)
        const box = document.createElement('a-box');
        box.setAttribute('width', 1.5);
        box.setAttribute('height', 2);
        box.setAttribute('depth', 0.2);
        box.setAttribute('color', docData.color);
        box.setAttribute('shadow', 'cast: true; receive: true');
        box.setAttribute('animation', 'property: rotation; to: 0 360 0; loop: true; dur: 20000; easing: linear');
        
        // Добавляем текст с названием
        const text = document.createElement('a-text');
        text.setAttribute('value', docData.title);
        text.setAttribute('align', 'center');
        text.setAttribute('position', '0 -1.2 0');
        text.setAttribute('width', '3');
        text.setAttribute('color', '#FFF');
        text.setAttribute('shadow', 'true');
        
        // Добавляем иконку типа файла
        const icon = this.createFileIcon(docData.type);
        
        // Собираем всё вместе
        docEntity.appendChild(box);
        docEntity.appendChild(text);
        if (icon) docEntity.appendChild(icon);
        
        // Добавляем обработчик клика
        docEntity.addEventListener('click', () => {
            this.openDocument(docData);
        });
        
        // Эффект при наведении
        docEntity.addEventListener('mouseenter', () => {
            box.setAttribute('scale', '1.1 1.1 1.1');
            this.showTooltip(docData);
        });
        
        docEntity.addEventListener('mouseleave', () => {
            box.setAttribute('scale', '1 1 1');
            this.hideTooltip();
        });
        
        // Добавляем в сцену
        this.container.appendChild(docEntity);
        this.activeDocuments.push(docEntity);
    }
    
    /**
     * Создание иконки файла
     */
    createFileIcon(type) {
        const icon = document.createElement('a-entity');
        
        // Простая иконка в виде листа
        const plane = document.createElement('a-plane');
        plane.setAttribute('width', 0.5);
        plane.setAttribute('height', 0.7);
        plane.setAttribute('color', '#FFF');
        plane.setAttribute('position', '0.6 0.8 0.1');
        
        icon.appendChild(plane);
        return icon;
    }
    
    /**
     * Открытие документа
     */
    openDocument(docData) {
        console.log('Opening document:', docData);
        
        // Создаем событие для главного скрипта
        const event = new CustomEvent('document-open', { 
            detail: docData 
        });
        document.dispatchEvent(event);
    }
    
    /**
     * Показать подсказку
     */
    showTooltip(docData) {
        let tooltip = document.getElementById('doc-tooltip');
        
        if (!tooltip) {
            tooltip = document.createElement('a-entity');
            tooltip.id = 'doc-tooltip';
            tooltip.setAttribute('position', '0 2.5 0');
            
            const plane = document.createElement('a-plane');
            plane.setAttribute('width', 3);
            plane.setAttribute('height', 1);
            plane.setAttribute('color', '#000');
            plane.setAttribute('opacity', '0.8');
            
            const text = document.createElement('a-text');
            text.id = 'tooltip-text';
            text.setAttribute('value', docData.description);
            text.setAttribute('align', 'center');
            text.setAttribute('position', '0 0 0.01');
            text.setAttribute('width', '4');
            text.setAttribute('color', '#FFF');
            
            tooltip.appendChild(plane);
            tooltip.appendChild(text);
            this.container.appendChild(tooltip);
        } else {
            document.getElementById('tooltip-text').setAttribute('value', docData.description);
            tooltip.setAttribute('visible', 'true');
        }
    }
    
    /**
     * Скрыть подсказку
     */
    hideTooltip() {
        const tooltip = document.getElementById('doc-tooltip');
        if (tooltip) {
            tooltip.setAttribute('visible', 'false');
        }
    }
    
    /**
     * Поиск документов
     */
    search(query) {
        const lowerQuery = query.toLowerCase();
        
        this.activeDocuments.forEach((entity, index) => {
            const doc = this.documents[index];
            const matches = doc.title.toLowerCase().includes(lowerQuery) ||
                           doc.description.toLowerCase().includes(lowerQuery) ||
                           doc.category.toLowerCase().includes(lowerQuery);
            
            entity.setAttribute('visible', matches);
        });
    }
    
    /**
     * Фильтрация по категории
     */
    filterByCategory(category) {
        this.activeDocuments.forEach((entity, index) => {
            const doc = this.documents[index];
            const matches = category === 'all' || doc.category === category;
            entity.setAttribute('visible', matches);
        });
    }
}

// Экспортируем класс
window.DocumentManager = DocumentManager;
