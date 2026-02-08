import styled from "styled-components";

export const Container = styled.div`
  max-width: 1000px;
  margin: 40px auto;
  padding: 20px;
  min-height: calc(100vh - 200px);
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: #f0f0f0;
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  color: #333;
  margin-bottom: 20px;
  transition: all 0.3s ease;

  svg {
    width: 16px;
    height: 16px;
    fill: #333;
  }

  &:hover {
    background: #59b17a;
    color: white;
    transform: translateX(-4px);

    svg {
      fill: white;
    }
  }
`;

export const ProfileCard = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  animation: slideUp 0.3s ease;

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
`;

export const ProfileHeader = styled.div`
  background: linear-gradient(135deg, #59b17a 0%, #3a8f5e 100%);
  color: white;
  padding: 40px 30px;
  display: flex;
  align-items: center;
  gap: 20px;

  p {
    margin: 0;
  }
`;

export const ProfileImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  font-size: 36px;
  font-weight: bold;
  flex-shrink: 0;
  border: 3px solid white;
`;

export const UserName = styled.h1`
  margin: 0;
  font-size: 24px;
  font-weight: 600;
`;

export const ProfileContent = styled.div`
  padding: 30px;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
`;

export const FieldGroup = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 15px;
  padding: 16px;
  background: #f9f9f9;
  border-radius: 12px;
  border-left: 4px solid #59b17a;
  transition: all 0.3s ease;

  &:hover {
    background: #f0f9f5;
    box-shadow: 0 2px 8px rgba(89, 177, 122, 0.1);
  }
`;

export const IconBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: #e8f5e9;
  border-radius: 8px;
  flex-shrink: 0;

  svg {
    width: 20px;
    height: 20px;
    fill: #59b17a;
  }
`;

export const FieldLabel = styled.label`
  display: block;
  font-size: 12px;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
  font-weight: 600;
`;

export const FieldValue = styled.p`
  margin: 0;
  font-size: 16px;
  color: #333;
  font-weight: 500;
  word-break: break-word;
`;

export const EditButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #59b17a 0%, #3a8f5e 100%);
  color: white;
  border: none;
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 20px;

  svg {
    width: 18px;
    height: 18px;
    fill: white;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(89, 177, 122, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const NoDataMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 16px;
  padding: 60px 20px;
  text-align: center;
  color: #999;
  font-size: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

  p {
    margin: 0;
  }
`;
export const TabContainer = styled.div`
  border-bottom: 1px solid #e0e0e0;
  padding: 0 30px;
  margin-top: 20px;

  @media (max-width: 768px) {
    padding: 0 15px;
  }
`;

export const TabButtons = styled.div`
  display: flex;
  gap: 0;
`;

export const TabButton = styled.button`
  background: none;
  border: none;
  padding: 16px 24px;
  font-size: 15px;
  font-weight: 600;
  color: ${(props) => (props.active ? "#27ae60" : "#999")};
  cursor: pointer;
  transition: all 0.3s ease;
  border-bottom: 3px solid ${(props) => (props.active ? "#27ae60" : "transparent")};
  margin-bottom: -1px;

  &:hover {
    color: #27ae60;
  }

  @media (max-width: 768px) {
    padding: 14px 16px;
    font-size: 14px;
  }
`;

export const TabContent = styled.div`
  padding: 30px;
  animation: fadeIn 0.3s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    padding: 20px;
  }
`;
