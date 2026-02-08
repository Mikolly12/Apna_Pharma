import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser, selectIsLoggedIn } from "../redux/auth/selectors";
import PrescriptionUpload from "../components/PrescriptionUpload/PrescriptionUpload";
import { toast } from "react-toastify";
import styled from "styled-components";

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 30px 20px;
  min-height: calc(100vh - 200px);
`;

const Header = styled.div`
  margin-bottom: 40px;

  h1 {
    font-size: 32px;
    color: #1a1a1a;
    margin: 0 0 10px 0;
    font-weight: 700;
  }

  p {
    color: #666;
    font-size: 16px;
    margin: 0;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 24px;
    }

    p {
      font-size: 14px;
    }
  }
`;

const BackButton = styled.button`
  display: inline-flex;
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

  &:hover {
    background: #27ae60;
    color: white;
    transform: translateX(-4px);
  }

  @media (max-width: 480px) {
    padding: 8px 12px;
    font-size: 13px;
  }
`;

const PrescriptionsPage = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  React.useEffect(() => {
    if (!isLoggedIn) {
      toast.error("Please login to access prescriptions");
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  const handleBack = () => {
    navigate("/home");
  };

  if (!isLoggedIn || !user) {
    return null;
  }

  return (
    <Container>
      <BackButton onClick={handleBack}>← Back to Home</BackButton>
      
      <Header>
        <h1>📋 Prescription Management</h1>
        <p>Upload and manage your medical prescriptions for prescription-required medicines</p>
      </Header>

      <PrescriptionUpload userId={user?.id} />
    </Container>
  );
};

export default PrescriptionsPage;
