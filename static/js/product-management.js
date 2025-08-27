/**
 * Product Management JavaScript
 * Handles add/edit product form interactions
 */

class ProductManagement {
    constructor() {
        this.init();
    }

    init() {
        this.setupRequiredFieldStyling();
        this.setupFormValidation();
        this.setupDiscountCalculation();
    }

    /**
     * Setup required field styling fallback - only if CSS ::after not working
     */
    setupRequiredFieldStyling() {
        console.log('Setting up required field styling...');
        const requiredFields = document.querySelectorAll('.required-field');
        
        requiredFields.forEach(field => {
            // Check if CSS ::after is working by checking computed styles
            const computedStyle = window.getComputedStyle(field, '::after');
            const afterContent = computedStyle.getPropertyValue('content');
            
            // Only add JS asterisk if CSS ::after is not working
            if (!afterContent || afterContent === 'none' || afterContent === '""') {
                // Check if asterisk already exists in text content
                if (!field.textContent.includes('*')) {
                    const asterisk = document.createElement('span');
                    asterisk.textContent = ' *';
                    asterisk.style.color = '#dc3545';
                    asterisk.style.fontWeight = 'bold';
                    asterisk.className = 'required-asterisk';
                    field.appendChild(asterisk);
                    console.log('Added JS asterisk for:', field.textContent);
                }
            } else {
                console.log('CSS asterisk working for:', field.textContent);
            }
        });
    }

    /**
     * Setup form validation
     */
    setupFormValidation() {
        const form = document.querySelector('form[method="POST"]');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            const isPublishing = e.submitter && e.submitter.name === 'publish';
            
            if (isPublishing) {
                if (!this.validateForPublish()) {
                    e.preventDefault();
                    return false;
                }
            }
        });
    }

    /**
     * Validate form for publishing
     */
    validateForPublish() {
        let isValid = true;
        const errors = [];

        // Check required fields
        const titleField = document.querySelector('#id_title');
        const priceField = document.querySelector('#id_amount');
        const stockField = document.querySelector('#id_stock_count');
        const categoryField = document.querySelector('#id_category');

        if (!titleField || !titleField.value.trim()) {
            errors.push('Product title is required');
            isValid = false;
        }

        if (!priceField || !priceField.value || parseFloat(priceField.value) <= 0) {
            errors.push('Price must be greater than 0 to publish');
            isValid = false;
        }

        if (!stockField || !stockField.value || parseInt(stockField.value) <= 0) {
            errors.push('Stock must be greater than 0 to publish');
            isValid = false;
        }

        if (!categoryField || !categoryField.value) {
            errors.push('Category is required');
            isValid = false;
        }

        if (!isValid) {
            alert('Please fix the following errors:\n\n' + errors.join('\n'));
        }

        return isValid;
    }

    /**
     * Setup discount calculation
     */
    setupDiscountCalculation() {
        const priceField = document.querySelector('#id_amount');
        const oldPriceField = document.querySelector('#id_old_price');

        if (priceField && oldPriceField) {
            [priceField, oldPriceField].forEach(field => {
                field.addEventListener('input', () => {
                    this.calculateDiscount();
                });
            });
        }
    }

    /**
     * Calculate and display discount percentage
     */
    calculateDiscount() {
        const priceField = document.querySelector('#id_amount');
        const oldPriceField = document.querySelector('#id_old_price');

        if (!priceField || !oldPriceField) return;

        const currentPrice = parseFloat(priceField.value) || 0;
        const oldPrice = parseFloat(oldPriceField.value) || 0;

        // Remove existing discount display
        const existingDiscount = document.querySelector('.discount-display');
        if (existingDiscount) {
            existingDiscount.remove();
        }

        if (oldPrice > 0 && currentPrice > 0 && oldPrice > currentPrice) {
            const discount = ((oldPrice - currentPrice) / oldPrice * 100).toFixed(1);
            
            // Create discount display
            const discountDiv = document.createElement('div');
            discountDiv.className = 'discount-display alert alert-success mt-2';
            discountDiv.innerHTML = `
                <small>
                    <i class="fas fa-tag"></i>
                    Discount: ${discount}% off (Save $${(oldPrice - currentPrice).toFixed(2)})
                </small>
            `;

            // Insert after old price field
            const oldPriceContainer = oldPriceField.closest('.mb-4');
            if (oldPriceContainer) {
                oldPriceContainer.appendChild(discountDiv);
            }
        }
    }

    /**
     * Show loading state for form submission
     */
    showFormLoading(button) {
        const originalText = button.innerHTML;
        button.disabled = true;
        button.innerHTML = `
            <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            Processing...
        `;

        // Store original text for restoration
        button.dataset.originalText = originalText;
    }

    /**
     * Hide loading state
     */
    hideFormLoading(button) {
        button.disabled = false;
        button.innerHTML = button.dataset.originalText || button.innerHTML;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize on add/edit product pages
    if (document.querySelector('form[method="POST"]') && 
        (document.querySelector('.content-title') && 
         (document.querySelector('.content-title').textContent.includes('Add') ||
          document.querySelector('.content-title').textContent.includes('Update')))) {
        new ProductManagement();
    }
});

// Export for external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProductManagement;
}
