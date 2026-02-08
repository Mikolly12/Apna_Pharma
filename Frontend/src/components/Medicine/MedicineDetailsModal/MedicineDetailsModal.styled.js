import styled from "styled-components";

export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
`;

export const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 20px;
  padding: 20px;
  position: relative;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    max-width: 95%;
    padding: 15px;
    gap: 15px;
  }

  @media (max-width: 480px) {
    max-height: 80vh;
    padding: 12px;
  }
`;

export const CloseBtn = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: #f0f0f0;
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 10;

  &:hover {
    background: #e74c3c;
    color: white;
    transform: scale(1.1);
  }
`;

export const ImgSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f9f9f9;
  border-radius: 8px;
  padding: 15px;
  min-height: 300px;

  img {
    max-width: 100%;
    max-height: 350px;
    object-fit: contain;
    border-radius: 8px;
  }

  @media (max-width: 768px) {
    min-height: 250px;
  }
`;

export const DetailsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 30px;

  @media (max-width: 768px) {
    padding-top: 0;
  }
`;

export const ProductName = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin: 0;
  line-height: 1.3;

  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

export const BrandInfo = styled.div`
  font-size: 14px;
  color: #666;
  display: flex;
  align-items: center;
  gap: 8px;

  strong {
    color: #333;
  }
`;

export const RatingSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #333;

  span {
    color: #f39c12;
    font-weight: bold;
  }
`;

export const Star = styled.span`
  color: #f39c12;
  font-size: 16px;
`;

export const PriceSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
`;

export const Price = styled.span`
  font-size: 28px;
  font-weight: bold;
  color: #27ae60;

  @media (max-width: 480px) {
    font-size: 24px;
  }
`;

export const Description = styled.div`
  font-size: 13px;
  color: #555;
  line-height: 1.6;

  h4 {
    margin: 8px 0 6px 0;
    color: #333;
    font-size: 14px;
    font-weight: 600;
  }

  p {
    margin: 0;
  }

  ul {
    margin: 0;
  }

  li {
    color: #666;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 15px;
  padding-top: 10px;
  border-top: 1px solid #eee;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 8px;
  }
`;

export const AddBtn = styled.button`
  flex: 1;
  background: linear-gradient(135deg, #27ae60 0%, #229954 100%);
  color: white;
  border: none;
  padding: 12px 16px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(39, 174, 96, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(39, 174, 96, 0.4);
    background: linear-gradient(135deg, #229954 0%, #1e8449 100%);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const ViewDetailsBtn = styled.button`
  flex: 1;
  background: #f0f0f0;
  color: #333;
  border: 1px solid #ddd;
  padding: 12px 16px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #e8e8e8;
    border-color: #999;
  }

  &:active {
    background: #ddd;
  }
`;
