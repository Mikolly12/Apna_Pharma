import styled from "styled-components";

export const PaymentContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 40px 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    padding: 20px 10px;
  }
`;

export const PaymentContent = styled.div`
  background: white;
  border-radius: 15px;
  padding: 40px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  max-width: 1200px;
  width: 100%;

  @media (max-width: 768px) {
    padding: 20px;
    border-radius: 10px;
  }
`;

export const PaymentHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;

  h1 {
    color: #333;
    font-size: 32px;
    margin-bottom: 10px;
    font-weight: 700;

    @media (max-width: 768px) {
      font-size: 24px;
    }
  }

  p {
    color: #666;
    font-size: 16px;
    font-weight: 500;

    @media (max-width: 768px) {
      font-size: 14px;
    }
  }
`;

export const PaymentMethods = styled.div`
  flex: 1;
  min-width: 300px;

  h2 {
    color: #333;
    font-size: 20px;
    margin-bottom: 25px;
    font-weight: 600;
  }

  @media (max-width: 768px) {
    flex: 1 1 100%;
    margin-bottom: 30px;
  }
`;

export const PaymentOption = styled.div`
  display: flex;
  align-items: center;
  padding: 18px;
  margin-bottom: 15px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${(props) => (props.selected ? "#f0f8ff" : "#fff")};
  border-color: ${(props) => (props.selected ? "#667eea" : "#e0e0e0")};

  &:hover {
    border-color: #667eea;
    background: #f0f8ff;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.2);
  }

  input[type="radio"] {
    width: 20px;
    height: 20px;
    margin-right: 15px;
    cursor: pointer;
    accent-color: #667eea;
    flex-shrink: 0;
  }

  div {
    h4 {
      margin: 0;
      color: #333;
      font-size: 16px;
      margin-bottom: 5px;
      font-weight: 600;
    }

    p {
      margin: 0;
      color: #999;
      font-size: 13px;
      line-height: 1.4;
    }
  }
`;

export const PaymentButton = styled.button`
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &:hover:not(:disabled) {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
  }

  &:active:not(:disabled) {
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    padding: 12px;
    font-size: 15px;
  }
`;

export const OrderSummary = styled.div`
  flex: 1;
  background: #f9f9f9;
  padding: 25px;
  border-radius: 12px;
  height: fit-content;
  border: 1px solid #e8e8e8;

  h2 {
    color: #333;
    font-size: 20px;
    margin-bottom: 20px;
    font-weight: 600;
  }

  h3 {
    color: #333;
    font-size: 16px;
    margin-bottom: 15px;
    font-weight: 600;
  }

  @media (max-width: 768px) {
    flex: 1 1 100%;
    padding: 20px;
  }
`;

export const PaymentDetails = styled.div`
  background: white;
  padding: 18px;
  border-radius: 8px;
  margin-bottom: 15px;
  border: 1px solid #e8e8e8;

  p {
    margin: 12px 0;
    color: #666;
    font-size: 14px;
    line-height: 1.6;

    strong {
      color: #333;
      font-weight: 600;
    }
  }

  p:first-child {
    margin-top: 0;
  }

  p:last-child {
    margin-bottom: 0;
  }
`;

export const OrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #e0e0e0;
  color: #666;
  font-size: 14px;

  &:last-child {
    border-bottom: none;
  }

  span:first-child {
    color: #333;
    font-weight: 500;
    flex: 1;
  }

  span:last-child {
    color: #667eea;
    font-weight: 600;
    margin-left: 10px;
  }

  @media (max-width: 768px) {
    font-size: 13px;
    padding: 10px 0;
  }
`;

export const TotalAmount = styled.div`
  margin-top: 20px;
  padding-top: 20px;
  border-top: 2px solid #e0e0e0;
  background: white;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #e8e8e8;

  h3 {
    margin-bottom: 12px;
    color: #333;
  }

  p {
    font-size: 32px;
    color: #667eea;
    font-weight: 700;
    margin: 0;
    letter-spacing: 0.5px;

    @media (max-width: 768px) {
      font-size: 26px;
    }
  }
`;

export const LoadingSpinner = styled.div`
  width: 16px;
  height: 16px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const ErrorMessage = styled.div`
  padding: 15px;
  background: #ffebee;
  color: #c62828;
  border-radius: 8px;
  margin-top: 15px;
  font-size: 14px;
  border-left: 4px solid #c62828;
  line-height: 1.5;
`;
