// Map of product names/brands to categories
// This provides a fallback mapping when categoryName is not in API response
export const PRODUCT_CATEGORY_MAP = {
  // Pain Relief
  'Aspirin': 'Pain Relief',
  'Paracetamol': 'Pain Relief',
  'Ibuprofen': 'Pain Relief',
  'Diclofenac': 'Pain Relief',
  'Naproxen': 'Pain Relief',
  'Aceclofenac': 'Pain Relief',

  // Antibiotics
  'Amoxicillin': 'Antibiotics',
  'Cephalexin': 'Antibiotics',
  'Azithromycin': 'Antibiotics',
  'Ciprofloxacin': 'Antibiotics',
  'Doxycycline': 'Antibiotics',

  // Vitamins & Supplements
  'Vitamin C': 'Vitamins & Supplements',
  'Vitamin D3': 'Vitamins & Supplements',
  'Multivitamin': 'Vitamins & Supplements',
  'Vitamin B12': 'Vitamins & Supplements',
  'Omega-3': 'Vitamins & Supplements',
  'Calcium': 'Vitamins & Supplements',

  // Cold & Cough
  'Cough': 'Cold & Cough',
  'Cold': 'Cold & Cough',
  'Cetirizine': 'Cold & Cough',
  'Loratadine': 'Cold & Cough',

  // Digestive
  'Antacid': 'Digestive',
  'Digestive': 'Digestive',
  'Omeprazole': 'Digestive',
  'Ranitidine': 'Digestive',
  'Loperamide': 'Digestive',

  // Heart & Blood Pressure
  'Blood Pressure Monitor': 'Heart & Blood Pressure',
  'Amlodipine': 'Heart & Blood Pressure',
  'Atenolol': 'Heart & Blood Pressure',
  'Lisinopril': 'Heart & Blood Pressure',

  // Diabetes
  'Metformin': 'Diabetes',
  'Glibenclamide': 'Diabetes',
  'Gliclazide': 'Diabetes',
  'Insulin': 'Diabetes',

  // Skin & Derma
  'Skin Cream': 'Skin & Derma',
  'Clotrimazole': 'Skin & Derma',
  'Hydrocortisone': 'Skin & Derma',
  'Acne': 'Skin & Derma',
};

/**
 * Get category name from product using multiple strategies
 * @param {Object} product - Product object
 * @returns {string} Category name
 */
export const getCategoryName = (product) => {
  // Strategy 1: Use categoryName if available from API
  if (product.categoryName) {
    return product.categoryName;
  }

  // Strategy 2: Use nested category object
  if (product.category?.name) {
    return product.category.name;
  }

  // Strategy 3: Use category string if it exists
  if (typeof product.category === 'string') {
    return product.category;
  }

  // Strategy 4: Map by product name/brand
  if (product.name) {
    for (const [keyword, category] of Object.entries(PRODUCT_CATEGORY_MAP)) {
      if (product.name.includes(keyword)) {
        return category;
      }
    }
  }

  // Fallback
  return '';
};
