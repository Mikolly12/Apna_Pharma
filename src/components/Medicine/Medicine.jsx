import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  AddToCartBtn,
  BtnBox,
  Container,
  DetailsBtn,
  ImgBox,
  Info,
  Item,
  List,
  NameWithPriceBox,
  Price,
  SubTitle,
  Text,
  Title,
} from "./Medicine.styled";
import { useDispatch, useSelector } from "react-redux";
import {
  selectTotalPages,
  selectSearchProducts,
} from "../../redux/pharmacy/selectors";
import {
  addToCart,
  getProductById,
  getSearchProducts,
} from "../../redux/pharmacy/operations";
import { useNavigate } from "react-router-dom";
import Modal from "components/Modal/Modal";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import SignIn from "components/Modal/SignIn/SignIn";
import SignUp from "components/Modal/SignUp/SignUp";
import Filter from "./Filter/Filter";
import Pagination from "./Pagination/Pagination";
import { getMedicineImage } from "../../utils/medicineImages";
import MedicineDetailsModal from "./MedicineDetailsModal/MedicineDetailsModal";

// Fallback to empty array - all products come from backend API
const FALLBACK_EMPTY_PRODUCTS = [];

const Medicine = () => {
  const dispatch = useDispatch();
  const totalPages = useSelector(selectTotalPages);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const reduxProducts = useSelector(selectSearchProducts); // Get filtered products from Redux
  const navigate = useNavigate();
  const [openSignIn, setOpenSignIn] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Always use Redux products from backend - never use fallback
  const displayProducts = reduxProducts && reduxProducts.length > 0 
    ? reduxProducts 
    : FALLBACK_EMPTY_PRODUCTS;

  // Set up auto-refresh of products every 5 seconds to catch real-time updates from admin
  useEffect(() => {
    console.log("🔄 [Medicine] Initializing Medicine component - fetching products from backend");
    setLoading(true);
    
    // Initial fetch
    dispatch(getSearchProducts({}))
      .then((result) => {
        console.log("✅ [Medicine] Initial products fetched from /api/products:", result?.payload?.length);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ [Medicine] Error fetching products:", err);
        setLoading(false);
      });

    // Set up auto-refresh interval to check for new products added by admin
    const refreshInterval = setInterval(() => {
      console.log("🔄 [Medicine] Auto-refreshing products from backend...");
      dispatch(getSearchProducts({}))
        .then((result) => {
          console.log("✅ [Medicine] Auto-refresh completed:", result?.payload?.length, "products");
        })
        .catch((err) => {
          console.error("❌ [Medicine] Auto-refresh error:", err);
        });
    }, 5000); // Refresh every 5 seconds

    return () => {
      clearInterval(refreshInterval);
      console.log("🧹 [Medicine] Cleared auto-refresh interval");
    };
  }, [dispatch]);

  // Log when products change (for debugging)
  useEffect(() => {
    console.log("🎨 displayProducts updated:", displayProducts.length, "products");
    console.log("🎨 Redux products:", reduxProducts.length, "products");
    if (displayProducts.length > 0) {
      console.log("   First product:", displayProducts[0].name);
    }
  }, [displayProducts, reduxProducts]);

  const handleOpenSignIn = () => {
    setOpenSignIn(true);
  };

  const handleCloseSignIn = () => {
    setOpenSignIn(false);
  };

  const handleOpenSignUp = () => {
    setOpenSignUp(true);
  };

  const handleCloseSignUp = () => {
    setOpenSignUp(false);
  };

  const handleAddToCart = (id) => {
    const product = displayProducts.find(p => p.id === id);
    
    // Allow adding to cart whether logged in or not (using localStorage fallback)
    dispatch(
      addToCart({
        productId: id,
        quantity: 1,
        // Include product details for fallback
        name: product?.name,
        price: product?.price,
        brand: product?.brand,
        thumbnail: product?.thumbnail
      })
    ).then(() => {
      if (product) {
        toast.info(`✓ "${product.name}" added to cart!`, {
          position: "bottom-right",
          autoClose: 3000
        });
      }
    }).catch((error) => {
      console.error("Failed to add to cart:", error);
      toast.error("Failed to add product to cart");
    });
  };

  const handleDetailsClick = (id) => {
    const product = displayProducts.find(p => p.id === id);
    setSelectedProduct(product);
  };

  const handleCloseDetails = () => {
    setSelectedProduct(null);
  };

  return (
    <>
      <section>
        <Container>
          <Title>Medicine</Title>
          <Filter totalPages={totalPages} />
          
          {loading && <p style={{ textAlign: "center", padding: "20px" }}>⏳ Loading medicines...</p>}
          
          {!loading && (!displayProducts || displayProducts.length === 0) && (
            <p style={{ textAlign: "center", padding: "20px" }}>❌ No medicines found. Try a different search!</p>
          )}
          
          <List>
            {!loading &&
              displayProducts &&
              displayProducts.length > 0 &&
              displayProducts?.map((product) => (
                <Item key={product.id}>
                  <ImgBox>
                    <img 
                      src={product.thumbnailUrl || product.thumbnail || getMedicineImage(product.name)} 
                      alt={product.name}
                      onError={(e) => {
                        e.target.src = getMedicineImage(product.name);
                      }}
                      style={{ width: "100%", height: "200px", objectFit: "cover" }}
                    />
                  </ImgBox>
                  <Info>
                    <NameWithPriceBox>
                      <SubTitle>{product.name}</SubTitle>
                      <Price>{`₹${product.price}`}</Price>
                    </NameWithPriceBox>
                    <Text>{product.brand || "N/A"}</Text>
                    <BtnBox>
                      <AddToCartBtn
                        type="button"
                        onClick={() => handleAddToCart(product.id)}
                      >
                        Add to cart
                      </AddToCartBtn>
                      <DetailsBtn
                        type="button"
                        onClick={() => handleDetailsClick(product.id)}
                      >
                        Details
                      </DetailsBtn>
                    </BtnBox>
                  </Info>
                </Item>
              ))}
          </List>
          {totalPages > 1 && <Pagination totalPages={totalPages} />}
        </Container>
      </section>
      <Modal isOpen={openSignIn} onClose={handleCloseSignIn}>
        <SignIn onClose={handleCloseSignIn} onToggleModal={handleOpenSignUp} />
      </Modal>
      <Modal isOpen={openSignUp} onClose={handleCloseSignUp}>
        <SignUp onClose={handleCloseSignUp} onToggleModal={handleOpenSignIn} />
      </Modal>
      {selectedProduct && (
        <Modal isOpen={true} onClose={handleCloseDetails}>
          <MedicineDetailsModal product={selectedProduct} onClose={handleCloseDetails} />
        </Modal>
      )}
    </>
  );
};

export default Medicine;
