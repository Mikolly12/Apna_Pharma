import styled from "styled-components";

export const PrescriptionItemBox = styled.div`
  padding: 12px;
  margin: 10px 0;
  border: 2px solid #fff3cd;
  border-radius: 6px;
  background-color: #fffbea;

  h4 {
    font-size: 14px;
    color: #333;
  }

  p {
    font-size: 12px;
    color: #666;
  }
`;

export const UploadArea = styled.label`
  display: block;
  padding: 15px;
  border: 2px dashed #ffc107;
  border-radius: 6px;
  background-color: #fff9e6;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #ff9800;
    background-color: #ffe8cc;
  }

  span {
    color: #ff9800;
    font-size: 13px;
    font-weight: 500;
  }
`;

export const FileInput = styled.input`
  display: none;

  &:disabled {
    cursor: not-allowed;
  }
`;

export const FileDisplay = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #e8f5e9;
  border-radius: 4px;
  margin-bottom: 8px;

  span {
    color: #2e7d32;
    font-size: 13px;
    font-weight: 500;
    word-break: break-word;
  }
`;

export const RemoveBtn = styled.button`
  padding: 5px 12px;
  background-color: #ff5252;
  color: white;
  border: none;
  border-radius: 3px;
  font-size: 12px;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-left: 10px;
  white-space: nowrap;

  &:hover:not(:disabled) {
    background-color: #ff1744;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const WarningMsg = styled.p`
  margin: 8px 0 0 0;
  padding: 8px;
  background-color: #ffebee;
  color: #c62828;
  border-left: 3px solid #c62828;
  border-radius: 3px;
  font-size: 12px;
`;

export const SuccessMsg = styled.p`
  margin: 0;
  padding: 8px;
  background-color: #e8f5e9;
  color: #2e7d32;
  border-left: 3px solid #2e7d32;
  border-radius: 3px;
  font-size: 12px;
`;
