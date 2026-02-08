import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdminProductsThunk,
  addProductThunk,
  updateProductThunk,
  deleteProductThunk,
} from "../../../redux/admin/operations";
import instance from "../../../redux/instance";
import {
  Section,
  SectionTitle,
  TableWrapper,
  Table,
  Button,
  AddButton,
  FormContainer,
  FormGroup,
  FormLabel,
  FormInput,
  FormTextarea,
  Modal,
  ModalContent,
  CloseBtn,
  ActionButtons,
  DeleteBtn,
} from "../AdminDashboard.styled";

const ProductManagement = () => {
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((state) => state.adminProducts);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [categoryTypes, setCategoryTypes] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: "",
    description: "",
    category_id: "",
    category_type_id: "",
    prescription_required: false,
    imageUrl: "",
    thumbnailUrl: "",
  });

  // Fetch products and categories on component mount
  useEffect(() => {
    console.log("📦 [ProductManagement] Fetching products...");
    dispatch(getAdminProductsThunk());
    fetchCategories();
  }, [dispatch]);

  // Fetch categories from backend
  const fetchCategories = async () => {
    try {
      setLoadingCategories(true);
      console.log("📂 [ProductManagement] Fetching categories...");
      const response = await instance.get("/api/category");
      console.log("✅ [ProductManagement] Categories fetched:", response.data);
      setCategories(response.data || []);
      
      // If categories exist, set default category and its types
      if (response.data && response.data.length > 0) {
        const firstCategory = response.data[0];
        setFormData(prev => ({
          ...prev,
          category_id: firstCategory.id || ""
        }));
        
        // Set category types for first category
        if (firstCategory.categoryTypes && firstCategory.categoryTypes.length > 0) {
          setCategoryTypes(firstCategory.categoryTypes);
          setFormData(prev => ({
            ...prev,
            category_type_id: firstCategory.categoryTypes[0].id || ""
          }));
        }
      }
    } catch (error) {
      console.error("❌ [ProductManagement] Error fetching categories:", error);
    } finally {
      setLoadingCategories(false);
    }
  };

  // Handle category change to update available category types
  const handleCategoryChange = (categoryId) => {
    setFormData(prev => ({
      ...prev,
      category_id: categoryId
    }));

    // Find the selected category and update category types
    const selectedCategory = categories.find(cat => cat.id === categoryId);
    if (selectedCategory && selectedCategory.categoryTypes) {
      setCategoryTypes(selectedCategory.categoryTypes);
      setFormData(prev => ({
        ...prev,
        category_type_id: selectedCategory.categoryTypes[0]?.id || ""
      }));
    } else {
      setCategoryTypes([]);
      setFormData(prev => ({
        ...prev,
        category_type_id: ""
      }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddProduct = () => {
    const defaultCategoryId = categories.length > 0 ? categories[0].id : "";
    const defaultCategoryTypeId = categories.length > 0 && categories[0].categoryTypes ? categories[0].categoryTypes[0]?.id : "";
    
    setFormData({
      name: "",
      brand: "",
      price: "",
      description: "",
      category_id: defaultCategoryId,
      category_type_id: defaultCategoryTypeId,
      prescription_required: false,
      imageUrl: "",
      thumbnailUrl: "",
    });
    
    if (categories.length > 0 && categories[0].categoryTypes) {
      setCategoryTypes(categories[0].categoryTypes);
    }
    
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleEditProduct = (product) => {
    setFormData({
      name: product.name || "",
      brand: product.brand || "",
      price: product.price || "",
      description: product.description || "",
      category_id: product.categoryId || "",
      category_type_id: product.categoryTypeId || "",
      prescription_required: product.prescription_required || false,
      imageUrl: product.imageUrl || "",
      thumbnailUrl: product.thumbnailUrl || "",
    });

    // Load category types for the selected category
    if (product.categoryId) {
      const selectedCategory = categories.find(cat => cat.id === product.categoryId);
      if (selectedCategory && selectedCategory.categoryTypes) {
        setCategoryTypes(selectedCategory.categoryTypes);
      }
    }

    setEditingProduct(product);
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.brand) {
      alert("Please fill in all required fields");
      return;
    }

    const submitData = {
      name: formData.name,
      brand: formData.brand,
      price: parseFloat(formData.price),
      description: formData.description,
      categoryId: formData.category_id,
      categoryTypeId: formData.category_type_id,
      prescription_required: formData.prescription_required,
    };

    if (editingProduct) {
      // Update product
      dispatch(
        updateProductThunk({
          id: editingProduct.id,
          productData: submitData,
        })
      ).then(() => {
        // Refresh products list immediately to reflect changes
        console.log("🔄 [ProductManagement] Refreshing products after update...");
        dispatch(getAdminProductsThunk()).then(() => {
          console.log("✅ [ProductManagement] Products refreshed successfully");
          setShowForm(false);
        });
      });
    } else {
      // Add new product
      console.log("➕ [ProductManagement] Adding new product to database...");
      dispatch(addProductThunk(submitData)).then((result) => {
        // Refresh products list immediately from database
        console.log("✅ [ProductManagement] Product added, refreshing list from database...");
        dispatch(getAdminProductsThunk()).then(() => {
          console.log("🔄 [ProductManagement] Products list updated from database");
          setShowForm(false);
        });
      });
    }
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProductThunk(id)).then(() => {
        // Refresh products list
        dispatch(getAdminProductsThunk());
      });
    }
  };

  return (
    <Section>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <SectionTitle>Product Management</SectionTitle>
        <AddButton onClick={handleAddProduct}>+ Add New Product</AddButton>
      </div>

      <p style={{ color: "#666", marginBottom: "20px" }}>
        Manage your pharmaceutical products ({products?.length || 0} products)
      </p>

      {isLoading && <p style={{ textAlign: "center", color: "#4caf50" }}>Loading products...</p>}

      {!isLoading && (!products || products.length === 0) ? (
        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Category</th>
                <th>Brand</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
                  No products added yet. Click "Add New Product" to get started!
                </td>
              </tr>
            </tbody>
          </Table>
        </TableWrapper>
      ) : (
        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Brand</th>
                <th>Category</th>
                <th>Price</th>
                <th>Rx Required</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products?.map((product) => (
                <tr key={product.id}>
                  <td>
                    <strong>{product.name}</strong>
                  </td>
                  <td>{product.brand || "N/A"}</td>
                  <td>{product.categoryName || "N/A"}</td>
                  <td>₹{product.price}</td>
                  <td>{product.prescription_required ? "Yes" : "No"}</td>
                  <td>
                    <ActionButtons>
                      <Button onClick={() => handleEditProduct(product)}>Edit</Button>
                      <DeleteBtn onClick={() => handleDeleteProduct(product.id)}>Delete</DeleteBtn>
                    </ActionButtons>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableWrapper>
      )}

      {/* Product Form Modal */}
      {showForm && (
        <Modal onClick={() => setShowForm(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseBtn onClick={() => setShowForm(false)}>×</CloseBtn>
            <h2 style={{ marginBottom: "20px", color: "#1d1e21" }}>
              {editingProduct ? "Edit Product" : "Add New Product"}
            </h2>

            <FormContainer onSubmit={handleSubmit}>
              <FormGroup>
                <FormLabel>Product Name *</FormLabel>
                <FormInput
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., Aspirin 500mg"
                  required
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>Brand *</FormLabel>
                <FormInput
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  placeholder="e.g., Cipla"
                  required
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>Price (₹) *</FormLabel>
                <FormInput
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="e.g., 50"
                  required
                  step="0.01"
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>Category *</FormLabel>
                {loadingCategories ? (
                  <FormInput disabled value="Loading categories..." />
                ) : categories.length === 0 ? (
                  <FormInput disabled value="No categories available" />
                ) : (
                  <select
                    name="category_id"
                    value={formData.category_id}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    style={{
                      padding: "10px",
                      borderRadius: "4px",
                      border: "1px solid #ddd",
                      fontSize: "14px",
                      fontFamily: "Poppins, sans-serif",
                      width: "100%",
                      boxSizing: "border-box"
                    }}
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                )}
              </FormGroup>

              <FormGroup>
                <FormLabel>Category Type</FormLabel>
                {categoryTypes.length === 0 ? (
                  <FormInput disabled value="Select a category first" />
                ) : (
                  <select
                    name="category_type_id"
                    value={formData.category_type_id}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      category_type_id: e.target.value
                    }))}
                    style={{
                      padding: "10px",
                      borderRadius: "4px",
                      border: "1px solid #ddd",
                      fontSize: "14px",
                      fontFamily: "Poppins, sans-serif",
                      width: "100%",
                      boxSizing: "border-box"
                    }}
                  >
                    <option value="">Select Category Type</option>
                    {categoryTypes.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                )}
              </FormGroup>

              <FormGroup>
                <FormLabel>Description</FormLabel>
                <FormTextarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Product description..."
                  rows="4"
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>Image URL (Full Size)</FormLabel>
                <FormInput
                  type="url"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                />
                {formData.imageUrl && (
                  <img 
                    src={formData.imageUrl} 
                    alt="Preview" 
                    style={{ maxWidth: "100%", maxHeight: "150px", marginTop: "10px", borderRadius: "4px" }}
                  />
                )}
              </FormGroup>

              <FormGroup>
                <FormLabel>Thumbnail URL (Small Size)</FormLabel>
                <FormInput
                  type="url"
                  name="thumbnailUrl"
                  value={formData.thumbnailUrl}
                  onChange={handleInputChange}
                  placeholder="https://example.com/thumbnail.jpg"
                />
                {formData.thumbnailUrl && (
                  <img 
                    src={formData.thumbnailUrl} 
                    alt="Preview" 
                    style={{ maxWidth: "100%", maxHeight: "100px", marginTop: "10px", borderRadius: "4px" }}
                  />
                )}
              </FormGroup>

              <FormGroup>
                <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <input
                    type="checkbox"
                    name="prescription_required"
                    checked={formData.prescription_required}
                    onChange={handleInputChange}
                  />
                  <span>Prescription Required?</span>
                </label>
              </FormGroup>

              <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                <Button type="submit" style={{ flex: 1, background: "#4caf50" }}>
                  {editingProduct ? "Update Product" : "Add Product"}
                </Button>
                <Button
                  type="button"
                  onClick={() => setShowForm(false)}
                  style={{ flex: 1, background: "#999" }}
                >
                  Cancel
                </Button>
              </div>
            </FormContainer>
          </ModalContent>
        </Modal>
      )}
    </Section>
  );
};

export default ProductManagement;
