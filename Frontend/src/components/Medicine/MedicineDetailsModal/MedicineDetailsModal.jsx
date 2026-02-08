import React from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/pharmacy/operations";
import { getMedicineImage } from "../../../utils/medicineImages";
import {
  ModalContainer,
  ModalContent,
  CloseBtn,
  ImgSection,
  DetailsSection,
  ProductName,
  BrandInfo,
  RatingSection,
  Star,
  PriceSection,
  Price,
  Description,
  ButtonContainer,
  AddBtn,
  ViewDetailsBtn,
} from "./MedicineDetailsModal.styled";

const MedicineDetailsModal = ({ product, onClose }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        productId: product.id,
        quantity: 1,
        name: product.name,
        price: product.price,
        brand: product.brand,
        thumbnail: product.thumbnail,
      })
    ).then(() => {
      toast.success(`✓ "${product.name}" added to cart!`, {
        position: "bottom-right",
        autoClose: 3000,
      });
      onClose();
    }).catch((error) => {
      console.error("Failed to add to cart:", error);
      toast.error("Failed to add product to cart");
    });
  };

  return (
    <ModalContainer>
      <ModalContent>
        <CloseBtn onClick={onClose}>✕</CloseBtn>

        <ImgSection>
          <img
            src={product.imageUrl || product.thumbnailUrl || product.thumbnail || getMedicineImage(product.name)}
            alt={product.name}
            onError={(e) => {
              e.target.src = getMedicineImage(product.name);
            }}
            style={{ width: "100%", maxHeight: "300px", objectFit: "contain" }}
          />
        </ImgSection>

        <DetailsSection>
          <ProductName>{product.name}</ProductName>
          
          <BrandInfo>
            <strong>Brand:</strong> {product.brand || "N/A"}
          </BrandInfo>

          <RatingSection>
            <Star>★</Star>
            <span>{product.rating || 4.5}</span> / 5.0
          </RatingSection>

          <PriceSection>
            <Price>₹{product.price}</Price>
            <span style={{ fontSize: "12px", color: "#999" }}>
              {product.price < 100 && "Best price for tablets"}
              {product.price >= 100 && product.price < 500 && "Quality medicine"}
              {product.price >= 500 && "Premium product"}
            </span>
          </PriceSection>

          <Description>
            <h4>Description:</h4>
            <p>{product.description || "High-quality medicine for your health."}</p>
          </Description>

          <Description style={{ marginTop: "15px" }}>
            <h4>Key Benefits:</h4>
            <ul style={{ paddingLeft: "20px", lineHeight: "1.8" }}>
              <li>Manufactured by {product.brand}</li>
              <li>Trusted quality and efficacy</li>
              <li>Store in cool, dry place</li>
              <li>Follow doctor's prescription if required</li>
            </ul>
          </Description>

          <ButtonContainer>
            <AddBtn onClick={handleAddToCart}>
              🛒 Add to Cart
            </AddBtn>
            <ViewDetailsBtn onClick={onClose}>
              ← Close
            </ViewDetailsBtn>
          </ButtonContainer>
        </DetailsSection>
      </ModalContent>
    </ModalContainer>
  );
};

export default MedicineDetailsModal;
