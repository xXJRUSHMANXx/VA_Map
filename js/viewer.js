/**
 * Просмотрщик документов (PDF и другие форматы)
 */

class DocumentViewer {
    constructor() {
        this.viewer = document.getElementById('document-viewer');
        this.viewerTitle = document.getElementById('viewer-title');
        this.closeBtn = document.getElementById('close-viewer');
        this.pdfCanvas = document.getElementById('pdf-canvas');
        this.docFrame = document.getElementById('doc-frame');
        this.ctx = this.pdfCanvas.getContext('2d');
        
        this.init();
    }
    
    /**
     * Инициализация
     */
    init() {
        // Закрытие по кнопке
        this.closeBtn.addEventListener('click', () => {
            this.close();
        });
        
        // Закрытие по ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !this.viewer.classList.contains('hidden')) {
                this.close();
            }
        });
    }
    
    /**
     * Открытие документа
     */
    open(docData) {
        console.log('Opening:', docData);
        
        this.viewerTitle.textContent = docData.title;
        this.viewer.classList.remove('hidden');
        
        // В зависимости от типа файла
        if (docData.type === 'pdf') {
            this.renderPDF(docData.path);
        } else if (docData.type === 'image') {
            this.renderImage(docData.path);
        } else {
            this.renderGeneric(docData.path);
        }
    }
    
    /**
     * Рендеринг PDF
     */
    async renderPDF(path) {
        try {
            // Загружаем PDF
            const loadingTask = pdfjsLib.getDocument(path);
            const pdf = await loadingTask.promise;
            
            // Получаем первую страницу
            const page = await pdf.getPage(1);
            
            // Настраиваем масштаб
            const scale = 1.5;
            const viewport = page.getViewport({ scale });
            
            // Устанавливаем размер canvas
            this.pdfCanvas.height = viewport.height;
            this.pdfCanvas.width = viewport.width;
            
            // Рендерим страницу
            const renderContext = {
                canvasContext: this.ctx,
                viewport: viewport
            };
            
            await page.render(renderContext).promise;
            
            // Показываем canvas, скрываем iframe
            this.pdfCanvas.style.display = 'block';
            this.docFrame.style.display = 'none';
            
        } catch (error) {
            console.error('Error loading PDF:', error);
            this.showError('Не удалось загрузить PDF');
        }
    }
    
    /**
     * Рендеринг изображения
     */
    renderImage(path) {
        this.pdfCanvas.style.display = 'none';
        this.docFrame.style.display = 'block';
        this.docFrame.src = path;
    }
    
    /**
     * Рендеринг других файлов
     */
    renderGeneric(path) {
        this.pdfCanvas.style.display = 'none';
        this.docFrame.style.display = 'block';
        this.docFrame.src = path;
    }
    
    /**
     * Закрытие просмотрщика
     */
    close() {
        this.viewer.classList.add('hidden');
        this.docFrame.src = '';
        this.ctx.clearRect(0, 0, this.pdfCanvas.width, this.pdfCanvas.height);
    }
    
    /**
     * Показ ошибки
     */
    showError(message) {
        alert(message);
    }
}

// Экспортируем класс
window.DocumentViewer = DocumentViewer;
