import React, { useState } from "react";
import {
  PrescriptionBox,
  UploadLabel,
  FileInput,
  FileName,
  RemoveFileBtn,
  WarningText,
  SuccessText,
} from "./PrescriptionUpload.styled";
import sprite from "../../../images/sprite.svg";

const PrescriptionUpload = ({ 
  isRequired, 
  onFileChange, 
  selectedFile, 
  error 
}) => {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    
    if (!file) {
      return;
    }

    // Validate file type (PDF only)
    if (file.type !== "application/pdf") {
      onFileChange(null, "Only PDF files are allowed");
      setFileName("");
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      onFileChange(null, "File size must be less than 5MB");
      setFileName("");
      return;
    }

    // Set file and clear error
    onFileChange(file, "");
    setFileName(file.name);
  };

  const handleRemoveFile = () => {
    onFileChange(null, "");
    setFileName("");
  };

  return (
    <PrescriptionBox>
      <div>
        <h3>
          {isRequired ? (
            <>
              Prescription <span style={{ color: "red" }}>*</span>
            </>
          ) : (
            "Prescription (Optional)"
          )}
        </h3>
        <p>
          {isRequired
            ? "This product requires a valid prescription. Please upload a PDF file."
            : "If any item in your cart requires a prescription, please upload it here."}
        </p>
      </div>

      {selectedFile && fileName ? (
        <div style={{ marginTop: "15px" }}>
          <FileName>
            <svg width="16" height="16">
              <use href={`${sprite}#icon-file-pdf`} />
            </svg>
            {fileName}
          </FileName>
          <RemoveFileBtn onClick={handleRemoveFile}>Remove File</RemoveFileBtn>
          <SuccessText>✓ File uploaded successfully</SuccessText>
        </div>
      ) : (
        <UploadLabel>
          <FileInput
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            disabled={false}
          />
          <span>
            📄 Click to upload or drag and drop
            <br />
            (PDF only, max 5MB)
          </span>
        </UploadLabel>
      )}

      {error && <WarningText>{error}</WarningText>}
    </PrescriptionBox>
  );
};

export default PrescriptionUpload;
