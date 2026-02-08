import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCart } from "../../../redux/pharmacy/selectors";
import { selectUser } from "../../../redux/auth/selectors";
import {
  AmountBox,
  BtnBox,
  ImgBox,
  Item,
  List,
  MainTextWrap,
  Price,
  RemoveBtn,
  Subtitle,
  Text,
  TextBox,
} from "./PreviewCartItems.styled";
import sprite from "../../../images/sprite.svg";
import {
  addToCart,
  decreaseQuantity,
  deleteFromCart,
  getCartItems,
  getProductById,
  uploadPrescription,
} from "../../../redux/pharmacy/operations";
import { useNavigate } from "react-router-dom";
import CartItemPrescription from "../CartItemPrescription/CartItemPrescription";
import { toast } from "react-toastify";
import { getMedicineImage } from "../../../utils/medicineImages";

const PreviewCartItems = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector(selectCart);
  const user = useSelector(selectUser);
  const [cartPrescriptions, setCartPrescriptions] = useState({});
  const [uploadingItemId, setUploadingItemId] = useState(null);
  
  console.log("🛒 PreviewCartItems: cart value =", cart);
  console.log("🛒 PreviewCartItems: cart?.cartProducts =", cart?.cartProducts);
  console.log("🛒 PreviewCartItems: cart?.cartProducts?.length =", cart?.cartProducts?.length);

  useEffect(() => {
    dispatch(getCartItems());
  }, [dispatch]);

  const handleIncreaseAmount = async (id) => {
    try {
      await dispatch(
        addToCart({
          productId: id,
          quantity: 1,
        })
      ).unwrap();
      await dispatch(getCartItems()).unwrap();
    } catch (error) {
      console.error("Error increasing quantity:", error);
    }
  };

  const handleDecreaseAmount = async (id) => {
    try {
      await dispatch(
        decreaseQuantity({
          productId: id,
          quantity: 1,
        })
      ).unwrap();
      await dispatch(getCartItems()).unwrap();
    } catch (error) {
      console.error("Error decreasing quantity:", error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await dispatch(deleteFromCart(id)).unwrap();
      await dispatch(getCartItems()).unwrap();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleProductClick = (id) => {
    dispatch(getProductById(id)).then(() => {
      navigate("/product");
    });
  };

  const handlePrescriptionFileChange = async (cartItemId, file, error) => {
    if (error) {
      setCartPrescriptions({
        ...cartPrescriptions,
        [cartItemId]: { file: null, error },
      });
      return;
    }

    if (!file) {
      setCartPrescriptions({
        ...cartPrescriptions,
        [cartItemId]: { file: null, error: "" },
      });
      return;
    }

    // Upload prescription to backend
    setUploadingItemId(cartItemId);

    try {
      await dispatch(
        uploadPrescription({
          file: file,
          userId: user?.id || user?.userId,
          orderId: null,
        })
      ).unwrap();

      setCartPrescriptions({
        ...cartPrescriptions,
        [cartItemId]: {
          file: file,
          error: "",
          prescriptionId: Math.random(), // Will be set by actual response
        },
      });

      toast.success(`Prescription uploaded for cart item!`);
    } catch (err) {
      setCartPrescriptions({
        ...cartPrescriptions,
        [cartItemId]: { file: null, error: "Failed to upload prescription" },
      });
      toast.error("Failed to upload prescription");
    } finally {
      setUploadingItemId(null);
    }
  };

  return (
    <>
      <div>
        {cart?.cartProducts && cart.cartProducts.length > 0 ? (
          <List>
            {cart.cartProducts.map((product) => {
              // Handle both old structure (_id, photo) and new structure (id, thumbnail)
              const productId = product.productId?.id || product.productId?._id;
              const cartItemId = product._id; // This is the cart item's unique ID for deletion
              const productImage = product.productId?.thumbnail || product.productId?.photo;
              const prescriptionRequired = product.productId?.prescription_required;
              const uploadedPrescription = cartPrescriptions[cartItemId];
              
              // Debug logging
              console.log("📦 Product:", {
                name: product.productId?.name,
                prescriptionRequired,
                prescriptionRequiredType: typeof prescriptionRequired,
                prescriptionRequiredValue: product.productId?.prescription_required,
                showUpload: !!prescriptionRequired,
                fullProduct: product.productId
              });
              
              return (
                <div key={productId}>
                  <Item onClick={() => handleProductClick(productId)}>
                    <ImgBox>
                      <img 
                        src={productImage || getMedicineImage(product.productId?.name || "Product")} 
                        alt={product.productId?.name || "product"}
                        onError={(e) => {
                          e.target.src = getMedicineImage(product.productId?.name || "Product");
                        }}
                      />
                    </ImgBox>
                    <TextBox>
                      <MainTextWrap>
                        <div>
                          <Subtitle>{product.productId?.name}</Subtitle>
                          <Text>{product.productId?.brand || product.productId?.category || "N/A"}</Text>
                        </div>
                        <Price>{`₹${product.productId?.price || 0}`}</Price>
                      </MainTextWrap>
                      <BtnBox>
                        <AmountBox>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleIncreaseAmount(cartItemId);
                            }}
                          >
                            <svg>
                              <use href={`${sprite}#plus`} />
                            </svg>
                          </button>
                          <p>{product.quantity}</p>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDecreaseAmount(cartItemId);
                            }}
                          >
                            <svg>
                              <use href={`${sprite}#minus`} />
                            </svg>
                          </button>
                        </AmountBox>
                        <RemoveBtn
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteProduct(cartItemId);
                          }}
                          title="Remove from cart"
                        >
                          <svg>
                            <use href={`${sprite}#trash`} />
                          </svg>
                          <span>Remove</span>
                        </RemoveBtn>
                      </BtnBox>
                    </TextBox>
                  </Item>

                  {/* 🔴 Show Prescription Upload for Prescription-Required Items */}
                  {console.log(`✅ Checking if should show upload for ${product.productId?.name}: prescriptionRequired=${prescriptionRequired} (${typeof prescriptionRequired})`)}
                  {prescriptionRequired && (
                    <CartItemPrescription
                      cartItemId={cartItemId}
                      productName={product.productId?.name}
                      onFileUpload={handlePrescriptionFileChange}
                      uploadedFile={uploadedPrescription?.file}
                      error={uploadedPrescription?.error || ""}
                      uploading={uploadingItemId === cartItemId}
                    />
                  )}
                </div>
              );
            })}
          </List>
        ) : (
          <p style={{ textAlign: "center", padding: "40px", fontSize: "18px", color: "#999" }}>
            Your cart is empty. Add some medicines to get started!
          </p>
        )}
      </div>
    </>
  );
};

export default PreviewCartItems;
