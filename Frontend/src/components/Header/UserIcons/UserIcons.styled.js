import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;

  @media only screen and (min-width: 768px) {
    gap: 10px;
  }
`;

export const CartBtn = styled.button`
  position: relative;
  background: #f1f1f1;
  box-shadow: 0px -1px 7px rgba(71, 71, 71, 0.05);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;

  & svg {
    width: 16px;
    height: 16px;
  }

  &:hover {
    background: #e8e8e8;
  }

  @media only screen and (min-width: 768px) {
    width: 44px;
    height: 44px;
  }
`;

export const CartItems = styled.div`
  position: absolute;
  background: #e7f1ed;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  top: -2px;
  right: -2px;
  color: ${({ theme }) => theme.colors.green};
  font-size: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const UserIcon = styled.div`
  border-radius: 50%;
  width: 40px;
  height: 40px;
  background: rgba(89, 177, 122, 0.1);
  box-shadow: 0px -1px 7px rgba(71, 71, 71, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.green};
  font-size: 18px;
  font-weight: 600;
  line-height: 1.4em;
  text-transform: capitalize;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(89, 177, 122, 0.2);
    box-shadow: 0px 2px 8px rgba(89, 177, 122, 0.15);
  }

  @media only screen and (min-width: 768px) {
    width: 44px;
    height: 44px;
  }
`;

export const ProfileOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const ProfilePopup = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  max-width: 350px;
  width: 90%;
  animation: slideUp 0.3s ease;
  max-height: 80vh;
  overflow-y: auto;

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media only screen and (max-width: 480px) {
    width: 95%;
    max-width: 100%;
  }
`;

export const ProfileHeader = styled.div`
  background: linear-gradient(135deg, #59b17a 0%, #3a8f5e 100%);
  color: white;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

export const ProfileBody = styled.div`
  padding: 20px;
`;

export const ProfileField = styled.div`
  margin-bottom: 16px;

  label {
    display: block;
    font-size: 12px;
    color: #999;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 6px;
    font-weight: 600;
  }

  p {
    margin: 0;
    font-size: 14px;
    color: #333;
    word-break: break-word;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

export const CloseBtn = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    transform: rotate(90deg);
    opacity: 0.8;
  }
`;

