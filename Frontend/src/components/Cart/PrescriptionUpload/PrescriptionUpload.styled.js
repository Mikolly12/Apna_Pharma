import styled from "styled-components";

export const PrescriptionBox = styled.div`
  padding: 20px;
  margin: 20px 0;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  background-color: #f9f9f9;

  h3 {
    margin: 0 0 8px 0;
    color: #333;
    font-size: 16px;
    font-weight: 600;
  }

  p {
    margin: 0 0 15px 0;
    color: #666;
    font-size: 14px;
    line-height: 1.5;
  }
`;

export const UploadLabel = styled.label`
  display: block;
  padding: 30px;
  border: 2px dashed #007bff;
  border-radius: 8px;
  background-color: #f0f7ff;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 15px;

  &:hover {
    border-color: #0056b3;
    background-color: #e7f1ff;
  }

  span {
    color: #007bff;
    font-size: 14px;
    font-weight: 500;
    line-height: 1.6;
  }
`;

export const FileInput = styled.input`
  display: none;

  &:disabled {
    cursor: not-allowed;
  }
`;

export const FileName = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  background-color: #e8f5e9;
  border-radius: 6px;
  color: #2e7d32;
  font-size: 14px;
  font-weight: 500;
  word-break: break-word;

  svg {
    flex-shrink: 0;
    color: #2e7d32;
  }
`;

export const RemoveFileBtn = styled.button`
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #ff5252;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #ff1744;
  }
`;

export const WarningText = styled.p`
  margin-top: 10px;
  padding: 10px;
  background-color: #ffebee;
  color: #c62828;
  border-left: 4px solid #c62828;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 500;
`;

export const SuccessText = styled.p`
  margin-top: 10px;
  padding: 10px;
  background-color: #e8f5e9;
  color: #2e7d32;
  border-left: 4px solid #2e7d32;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 500;
`;
