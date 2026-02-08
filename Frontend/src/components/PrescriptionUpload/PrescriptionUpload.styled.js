import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  gap: 30px;

  @media (max-width: 768px) {
    padding: 20px 15px;
    gap: 20px;
  }
`;

export const Card = styled.div`
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
  animation: ${slideIn} 0.3s ease;

  @media (max-width: 768px) {
    padding: 20px;
  }

  @media (max-width: 480px) {
    padding: 15px;
  }
`;

export const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 8px 0;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

export const Subtitle = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0 0 25px 0;
  line-height: 1.5;
`;

export const UploadSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const UploadBox = styled.div`
  border: 2px dashed #27ae60;
  border-radius: 12px;
  padding: 40px 20px;
  text-align: center;
  background: #f0fdf4;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #229954;
    background: #e8fce7;
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    padding: 30px 15px;
  }
`;

export const UploadIcon = styled.div`
  font-size: 48px;
  margin-bottom: 15px;
  animation: ${slideIn} 0.3s ease;

  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

export const FileInput = styled.input`
  display: none;
`;

export const UploadLabel = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  cursor: pointer;

  span {
    font-size: 16px;
    font-weight: 600;
    color: #1a1a1a;
  }
`;

export const UploadHint = styled.p`
  font-size: 12px;
  color: #999;
  margin: 0;
  margin-top: 8px;
`;

export const FilePreview = styled.div`
  border: 2px solid #27ae60;
  border-radius: 12px;
  padding: 25px;
  background: #f0fdf4;
  text-align: center;
  animation: ${slideIn} 0.3s ease;
`;

export const FileName = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 12px 0 8px 0;
  word-break: break-all;
`;

export const FileSize = styled.p`
  font-size: 13px;
  color: #666;
  margin: 0 0 15px 0;
`;

export const RemoveBtn = styled.button`
  background: #e74c3c;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #c0392b;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 480px) {
    flex-direction: column;
    width: 100%;

    button {
      width: 100%;
    }
  }
`;

export const SubmitBtn = styled.button`
  background: linear-gradient(135deg, #27ae60 0%, #229954 100%);
  color: white;
  border: none;
  padding: 12px 32px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(39, 174, 96, 0.3);
  min-width: 200px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(39, 174, 96, 0.4);
    background: linear-gradient(135deg, #229954 0%, #1e8449 100%);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (max-width: 480px) {
    min-width: 100%;
    padding: 14px 20px;
  }
`;

export const CancelBtn = styled.button`
  background: #f0f0f0;
  color: #333;
  border: 1px solid #ddd;
  padding: 12px 32px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 120px;

  &:hover {
    background: #e8e8e8;
    border-color: #999;
  }

  &:active {
    background: #ddd;
  }

  @media (max-width: 480px) {
    min-width: 100%;
    padding: 14px 20px;
  }
`;

export const SuccessMessage = styled.div`
  background: #d4edda;
  border: 1px solid #c3e6cb;
  color: #155724;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  animation: ${slideIn} 0.3s ease;
`;

export const ErrorMessage = styled.div`
  background: #f8d7da;
  border: 1px solid #f5c6cb;
  color: #721c24;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  animation: ${slideIn} 0.3s ease;
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
  margin: 10px 0;
`;

export const ProgressBarFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #27ae60, #229954);
  width: ${(props) => props.progress}%;
  transition: width 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  color: white;
  font-weight: bold;
  border-radius: 4px;
`;

export const HistorySection = styled.div`
  min-height: 200px;
`;

export const PrescriptionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const PrescriptionItem = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;
  background: #fafafa;
  transition: all 0.3s ease;

  &:hover {
    border-color: #27ae60;
    background: #f5fbf5;
    box-shadow: 0 2px 8px rgba(39, 174, 96, 0.1);
  }

  @media (max-width: 480px) {
    padding: 12px;
  }
`;

export const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 15px;
  margin-bottom: 12px;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 10px;
  }
`;

export const ItemName = styled.p`
  font-size: 15px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
  word-break: break-word;
`;

export const ItemDate = styled.p`
  font-size: 12px;
  color: #999;
  margin: 4px 0 0 0;
`;

export const ItemStatus = styled.div`
  display: flex;
  gap: 20px;
  font-size: 12px;
  color: #666;
  margin-bottom: 12px;
  flex-wrap: wrap;

  @media (max-width: 480px) {
    gap: 10px;
  }
`;

export const StatusBadge = styled.span`
  background: ${(props) => props.color};
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: capitalize;
  white-space: nowrap;
`;

export const ViewBtn = styled.button`
  background: #3498db;
  color: white;
  border: none;
  padding: 6px 14px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #2980b9;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const DeleteBtn = styled.button`
  background: #e74c3c;
  color: white;
  border: none;
  padding: 6px 14px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #c0392b;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  gap: 12px;

  @media (max-width: 768px) {
    padding: 40px 15px;
  }
`;

export const EmptyIcon = styled.div`
  font-size: 64px;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 48px;
  }
`;

export const EmptyText = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: #999;
  margin: 0;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #f0f0f0;
  border-top: 4px solid #27ae60;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;
