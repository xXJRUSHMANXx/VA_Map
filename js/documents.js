javascript
/**
 * Документы - конфигурация и управление
 */

// База данных документов (можно расширить)
const documentsDB = [
    {
        id: 1,
        title: "Aspectes bàsics del contracte de distribució internacional",
        path: "documents/Aspectes bàsics del contracte de distribució internacional.pdf",
        type: "pdf",
        position: { x: 0, y: 1.6, z: -5 },
        color: "#FF6B6B",
        description: "Contractes internacionals i distribució.",
        category: "comercial"
    },
    {
        id: 2,
        title: "Consideraciones para exportar Diseños",
        path: "documents/Consideraciones para exportar Diseños.pdf",
        type: "pdf",
        position: { x: 1, y: 1.6, z: -5 },
        color: "#FFD93D",
        description: "Guia per a l’exportació de dissenys industrials.",
        category: "internacional"
    },
    {
        id: 3,
        title: "Decisors Econòmics",
        path: "documents/Decisors Econòmics.pdf",
        type: "pdf",
        position: { x: 2, y: 1.6, z: -5 },
        color: "#6BCB77",
        description: "Anàlisi dels agents econòmics i la presa de decisions.",
        category: "economia"
    },
    {
        id: 4,
        title: "Diagrama de Flujos Gestión Integral Proyectos",
        path: "documents/Diagrama de Flujos Gestión Integral Proyectos.pdf",
        type: "pdf",
        position: { x: 3, y: 1.6, z: -5 },
        color: "#4D96FF",
        description: "Fluxos de treball en la gestió de projectes.",
        category: "projectes"
    },
    {
        id: 5,
        title: "Informació sobre el compliment de Normes",
        path: "documents/Informació sobre el compliment de Normes.pdf",
        type: "pdf",
        position: { x: 4, y: 1.6, z: -5 },
        color: "#845EC2",
        description: "Normatives i conformitat en processos industrials.",
        category: "normes"
    },
    {
        id: 6,
        title: "Model Keynesià",
        path: "documents/Model Keynesià.pdf",
        type: "pdf",
        position: { x: 5, y: 1.6, z: -5 },
        color: "#FF9671",
        description: "Model econòmic basat en la teoria de Keynes.",
        category: "economia"
    },
    {
        id: 7,
        title: "Màrqueting Industrial",
        path: "documents/Màrqueting Industrial.pdf",
        type: "pdf",
        position: { x: 6, y: 1.6, z: -5 },
        color: "#FFC75F",
        description: "Estratègies de màrqueting aplicades al sector industrial.",
        category: "marketing"
    },
    {
        id: 8,
        title: "Patentabilitat",
        path: "documents/Patentabilitat.pdf",
        type: "pdf",
        position: { x: 7, y: 1.6, z: -5 },
        color: "#F9F871",
        description: "Criteris i procediments per a la patentabilitat.",
        category: "propietat"
    },
    {
        id: 9,
        title: "Planificació Comercial",
        path: "documents/Planificació Comercial.pdf",
        type: "pdf",
        position: { x: 8, y: 1.6, z: -5 },
        color: "#00C9A7",
        description: "Estratègies de planificació comercial.",
        category: "comercial"
    },
    {
        id: 10,
        title: "Poyección Internacional del Diseño y Proyectos Industriales",
        path: "documents/Poyección Internacional del Diseño y Proyectos Industriales.pdf",
        type: "pdf",
        position: { x: 9, y: 1.6, z: -5 },
        color: "#C34A36",
        description: "Projecció internacional de disseny i projectes.",
        category: "internacional"
    },
    {
        id: 11,
        title: "Què és la Propietat Industrial",
        path: "documents/Què és la Propietat Industrial.pdf",
        type: "pdf",
        position: { x: 10, y: 1.6, z: -5 },
        color: "#FF6B6B",
        description: "Introducció a la propietat industrial i intel·lectual.",
        category: "propietat"
    },
    {
        id: 12,
        title: "Resum del més destacat de les diapositives dels apunts de classe",
        path: "documents/Resum del més destacat de les diapositives dels apunts de classe.pdf",
        type: "pdf",
        position: { x: 11, y: 1.6, z: -5 },
        color: "#6BCB77",
        description: "Resum general dels continguts de classe.",
        category: "educació"
    },
    {
        id: 13,
        title: "Segmentación",
        path: "documents/Segmentación.pdf",
        type: "pdf",
        position: { x: 12, y: 1.6, z: -5 },
        color: "#4D96FF",
        description: "Segmentació de mercats i estratègies de posicionament.",
        category: "marketing"
    },
    {
        id: 14,
        title: "Spanish market study",
        path: "documents/Spanish market study.pdf",
        type: "pdf",
        position: { x: 13, y: 1.6, z: -5 },
        color: "#845EC2",
        description: "Estudi de mercat espanyol.",
        category: "marketing"
    }
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
