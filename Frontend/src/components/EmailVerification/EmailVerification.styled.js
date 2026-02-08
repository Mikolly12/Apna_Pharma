import styled from "styled-components";
import { SubmitBtn as BaseSubmitBtn } from "components/Register/Register.styled";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`;

export const LogoWrapper = styled.div`
  padding: 16px 20px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const MainWrapper = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  padding: 40px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  align-items: center;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 30px;
    padding: 20px;
  }

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 16px;
  }
`;

export const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
`;

export const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  line-height: 1.4;
  color: #1a1a1a;
  margin: 0;

  span {
    color: #59b17a;
  }

  @media (max-width: 768px) {
    font-size: 24px;
  }

  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

export const ImgWrapper = styled.div`
  width: 100%;
  max-width: 400px;

  img {
    width: 100%;
    height: auto;
    display: block;
  }
`;

export const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  label {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  input {
    padding: 12px 16px;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    font-size: 16px;
    transition: all 0.3s ease;
    font-family: inherit;
    text-align: center;
    letter-spacing: 2px;
    font-weight: 600;

    &:focus {
      outline: none;
      border-color: #59b17a;
      box-shadow: 0 0 0 3px rgba(89, 177, 122, 0.1);
    }

    &::placeholder {
      color: #999;
      letter-spacing: normal;
      font-weight: normal;
    }
  }

  span {
    color: #e74c3c;
    font-size: 13px;
    margin-top: -4px;
  }
`;

export const BtnBox = styled.div`
  display: flex;
  gap: 12px;
  flex-direction: column;
  margin-top: 24px;
`;

export const SubmitBtn = styled(BaseSubmitBtn)`
  width: 100%;
  padding: 13px 32px;
  background-color: #59b17a;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    background-color: #48a06a;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(89, 177, 122, 0.3);
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const MessageBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  background-color: #f0fdf4;
  border-left: 4px solid #59b17a;
  border-radius: 4px;
  margin-bottom: 24px;
`;

export const InfoText = styled.p`
  margin: 0;
  color: #333;
  font-size: 14px;
  line-height: 1.5;

  strong {
    color: #59b17a;
    font-weight: 600;
  }
`;

export const ResendLink = styled.button`
  background: none;
  border: none;
  color: #59b17a;
  cursor: pointer;
  text-decoration: underline;
  font-size: 14px;
  padding: 8px 0;
  transition: all 0.3s ease;
  font-family: inherit;

  &:hover:not(:disabled) {
    color: #48a06a;
  }

  &:disabled {
    color: #ccc;
    cursor: not-allowed;
  }
`;
