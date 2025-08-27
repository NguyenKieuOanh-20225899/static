/* filepath: c:\project code\python-naitei25_ecommerce-1\static\js\products-page.js */
/**
 * Products Page JavaScript
 * Handles product list page interactions including navigation safety
 */

class ProductsPage {
    constructor() {
        this.init();
    }

    init() {
        this.setupSafeNavigation();
        this.setupProductStatusIndicators();
        this.setupSearchAndFilter();
    }

    /**
     * Setup safe navigation for toggle, sort, edit buttons and product links
     * Prevents JavaScript conflicts with confirmation dialogs
     */
    setupSafeNavigation() {
        console.log('Setting up safe navigation for products page...');
        
        // Select all buttons that should navigate without confirmation
        const safeButtons = document.querySelectorAll('.toggle-view-btn, .sort-btn, .edit-btn, .product-link');
        
        safeButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                // Stop any other event handlers from interfering
                e.stopImmediatePropagation();
                
                // Allow normal navigation
                if (button.href) {
                    window.location.href = button.href;
                }
            });
        });

        console.log(`Safe navigation setup for ${safeButtons.length} buttons`);
    }

    /**
     * Setup visual indicators for different product statuses
     */
    setupProductStatusIndicators() {
        const productItems = document.querySelectorAll('.itemlist');
        
        productItems.forEach(item => {
            const statusBadge = item.querySelector('.badge');
            if (statusBadge) {
                const status = statusBadge.textContent.toLowerCase().trim();
                
                // Add hover effects based on status
                item.addEventListener('mouseenter', () => {
                    if (status === 'deleted') {
                        item.style.backgroundColor = '#f8f9fa';
                    }
                });
                
                item.addEventListener('mouseleave', () => {
                    item.style.backgroundColor = '';
                });
            }
        });
    }

    /**
     * Setup search and filter functionality
     */
    setupSearchAndFilter() {
        // Add live search functionality if needed
        const searchInput = document.querySelector('#product-search');
        if (searchInput) {
            let searchTimeout;
            
            searchInput.addEventListener('input', (e) => {
                clearTimeout(searchTimeout);
                searchTimeout = setTimeout(() => {
                    this.filterProducts(e.target.value);
                }, 300);
            });
        }
    }

    /**
     * Filter products based on search term
     */
    filterProducts(searchTerm) {
        const productItems = document.querySelectorAll('.itemlist');
        const term = searchTerm.toLowerCase();
        
        productItems.forEach(item => {
            const title = item.querySelector('.info h6')?.textContent.toLowerCase() || '';
            const shouldShow = title.includes(term);
            
            item.style.display = shouldShow ? '' : 'none';
        });
    }

    /**
     * Handle bulk actions (if needed in future)
     */
    setupBulkActions() {
        const selectAllCheckbox = document.querySelector('#select-all-products');
        const productCheckboxes = document.querySelectorAll('.product-checkbox');
        
        if (selectAllCheckbox) {
            selectAllCheckbox.addEventListener('change', (e) => {
                productCheckboxes.forEach(checkbox => {
                    checkbox.checked = e.target.checked;
                });
            });
        }
    }

    /**
     * Refresh product list (for AJAX updates)
     */
    refreshProductList() {
        // Reload the current page to refresh product list
        window.location.reload();
    }

    /**
     * Show loading state
     */
    showLoading() {
        const loadingOverlay = document.createElement('div');
        loadingOverlay.className = 'loading-overlay';
        loadingOverlay.innerHTML = `
            <div class="text-center">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <p class="mt-2">Loading products...</p>
            </div>
        `;
        
        document.body.appendChild(loadingOverlay);
    }

    /**
     * Hide loading state
     */
    hideLoading() {
        const loadingOverlay = document.querySelector('.loading-overlay');
        if (loadingOverlay) {
            loadingOverlay.remove();
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize on products list page
    if (document.querySelector('.content-title') && 
        document.querySelector('.content-title').textContent.includes('Products List')) {
        new ProductsPage();
    }
});

// Export for external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProductsPage;
}