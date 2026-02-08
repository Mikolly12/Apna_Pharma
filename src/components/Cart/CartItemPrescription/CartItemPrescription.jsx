import React, { useState } from "react";
import {
  PrescriptionItemBox,
  UploadArea,
  FileInput,
  FileDisplay,
  RemoveBtn,
  WarningMsg,
  SuccessMsg,
} from "./CartItemPrescription.styled";

const CartItemPrescription = ({
  cartItemId,
  productName,
  onFileUpload,
  uploadedFile,
  error,
  uploading,
}) => {
  const [localFile, setLocalFile] = useState(uploadedFile || null);
  const [localFileName, setLocalFileName] = useState(
    uploadedFile?.fileName || ""
  );

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    // Validate file type (PDF only)
    if (file.type !== "application/pdf") {
      onFileUpload(cartItemId, null, "Only PDF files are allowed");
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      onFileUpload(cartItemId, null, "File size must be less than 5MB");
      return;
    }

    setLocalFile(file);
    setLocalFileName(file.name);
    onFileUpload(cartItemId, file, "");
  };

  const handleRemoveFile = () => {
    setLocalFile(null);
    setLocalFileName("");
    onFileUpload(cartItemId, null, "");
  };

  return (
    <PrescriptionItemBox>
      <div style={{ marginBottom: "10px" }}>
        <h4 style={{ margin: "0 0 5px 0", color: "#333" }}>
          📋 Prescription for <strong>{productName}</strong>
        </h4>
        <p style={{ margin: 0, color: "#666", fontSize: "13px" }}>
          This item requires a valid prescription
        </p>
      </div>

      {localFile && localFileName ? (
        <div>
          <FileDisplay>
            <span>✓ {localFileName}</span>
            <RemoveBtn
              type="button"
              onClick={handleRemoveFile}
              disabled={uploading}
            >
              Remove
            </RemoveBtn>
          </FileDisplay>
          <SuccessMsg>✓ Prescription uploaded successfully</SuccessMsg>
        </div>
      ) : (
        <UploadArea htmlFor={`file-${cartItemId}`}>
          <FileInput
            type="file"
            id={`file-${cartItemId}`}
            accept=".pdf"
            onChange={handleFileChange}
            disabled={uploading}
          />
          <span>
            {uploading ? "⏳ Uploading..." : "📄 Click to upload PDF"}
          </span>
        </UploadArea>
      )}

      {error && <WarningMsg>{error}</WarningMsg>}
    </PrescriptionItemBox>
  );
};

export default CartItemPrescription;
