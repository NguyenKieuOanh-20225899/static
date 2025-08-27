/**
 * Products List JavaScript
 * Handles product list interactions and confirmations
 */

class ProductsList {
    constructor() {
        this.init();
    }

    init() {
        this.setupDeleteConfirmation();
        this.setupRestoreConfirmation();
        // Không setup view toggle - để nó hoạt động tự nhiên
    }

    /**
     * Setup delete confirmation for delete buttons only
     */
    setupDeleteConfirmation() {
        const deleteButtons = document.querySelectorAll('.delete-btn');
        
        deleteButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const productTitle = button.getAttribute('data-product-title') || 'this product';
                const confirmMessage = `Are you sure you want to delete "${productTitle}"?`;
                
                if (confirm(confirmMessage)) {
                    window.location.href = button.href;
                }
            });
        });
    }

    /**
     * Setup restore confirmation for restore buttons only
     */
    setupRestoreConfirmation() {
        const restoreButtons = document.querySelectorAll('.restore-btn');
        
        restoreButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const productTitle = button.getAttribute('data-product-title') || 'this product';
                const confirmMessage = `Are you sure you want to restore "${productTitle}"?`;
                
                if (confirm(confirmMessage)) {
                    window.location.href = button.href;
                }
            });
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize if we're on the products list page
    if (document.querySelector('.content-title') && 
        document.querySelector('.content-title').textContent.includes('Products List')) {
        new ProductsList();
    }
});

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProductsList;
}