import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";
import {
  Container,
  Card,
  Title,
  Subtitle,
  UploadSection,
  UploadBox,
  UploadIcon,
  FileInput,
  UploadLabel,
  UploadHint,
  FilePreview,
  FileName,
  FileSize,
  RemoveBtn,
  ButtonGroup,
  SubmitBtn,
  CancelBtn,
  SuccessMessage,
  ErrorMessage,
  ProgressBar,
  ProgressBarFill,
  HistorySection,
  PrescriptionList,
  PrescriptionItem,
  ItemHeader,
  ItemName,
  ItemDate,
  ItemStatus,
  StatusBadge,
  ViewBtn,
  DeleteBtn,
  EmptyState,
  EmptyIcon,
  EmptyText,
  LoadingSpinner,
} from "./PrescriptionUpload.styled";

const PrescriptionUpload = ({ userId: propUserId }) => {
  // Get user from Redux store (logged-in user)
  const reduxUser = useSelector(selectUser);
  
  // Try multiple ways to get userId
  // 1. From props
  // 2. From Redux user object (try different field names)
  // 3. Try to extract from JWT token
  const getUserId = () => {
    if (propUserId) {
      console.log("✅ User ID from props:", propUserId);
      return propUserId;
    }
    if (reduxUser?.id) {
      console.log("✅ User ID from redux.id:", reduxUser.id);
      return reduxUser.id;
    }
    if (reduxUser?.userId) {
      console.log("✅ User ID from redux.userId:", reduxUser.userId);
      return reduxUser.userId;
    }
    if (reduxUser?.user_id) {
      console.log("✅ User ID from redux.user_id:", reduxUser.user_id);
      return reduxUser.user_id;
    }
    
    // Try to get from JWT token if available
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        // Decode JWT to get user info
        const payload = token.split('.')[1];
        const decoded = JSON.parse(atob(payload));
        console.log("✅ Decoded JWT token:", decoded);
        const extractedId = decoded.sub || decoded.userId || decoded.user_id || decoded.id;
        if (extractedId) {
          console.log("✅ User ID from JWT token:", extractedId);
          return extractedId;
        }
      } catch (e) {
        console.error('Failed to decode token:', e);
      }
    }
    
    console.warn("⚠️ No user ID found! Redux user:", reduxUser);
    return null;
  };
  
  const userId = getUserId();

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [prescriptions, setPrescriptions] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [message, setMessage] = useState(null);

  // Fetch user prescriptions on component mount
  React.useEffect(() => {
    if (userId) {
      fetchPrescriptions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const fetchPrescriptions = async () => {
    try {
      setLoadingHistory(true);
      const response = await axios.get(
        `http://16.171.177.144:8080/api/prescriptions/user/${userId}`
      );
      if (response.data.success) {
        setPrescriptions(response.data.data || []);
      }
    } catch (error) {
      console.error("Error fetching prescriptions:", error);
      toast.error("Failed to load prescription history");
    } finally {
      setLoadingHistory(false);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Validate file type
      const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
      if (!allowedTypes.includes(selectedFile.type)) {
        toast.error("Only PDF and image files (JPG, PNG) are allowed");
        return;
      }

      // Validate file size (max 10MB)
      const maxSize = 10 * 1024 * 1024;
      if (selectedFile.size > maxSize) {
        toast.error("File size must be less than 10MB");
        return;
      }

      setFile(selectedFile);
      setMessage(null);
      setUploadProgress(0);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setUploadProgress(0);
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file to upload");
      return;
    }

    if (!userId) {
      console.error("❌ User ID is null! Redux user:", reduxUser);
      console.error("Available user fields:", Object.keys(reduxUser || {}));
      toast.error("User ID is required - Please log in");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("userId", userId);

      console.log("📤 Uploading prescription...");
      console.log("📋 File:", file.name, "Size:", file.size);
      console.log("👤 User ID:", userId);
      console.log("🔗 API Endpoint: http://16.171.177.144:8080/api/prescriptions/upload");

      const response = await axios.post(
        "http://16.171.177.144:8080/api/prescriptions/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
            console.log(`⬆️ Upload progress: ${percentCompleted}%`);
          },
        }
      );

      console.log("✅ Response received:", response.data);

      // Handle different response formats
      if (response.data.success || response.data.code === 200 || response.status === 200) {
        toast.success("✓ Prescription uploaded successfully!");
        setMessage({
          type: "success",
          text: "Your prescription has been uploaded and will be verified shortly.",
        });
        setFile(null);
        setUploadProgress(0);
        // Refresh prescriptions list
        console.log("🔄 Fetching updated prescription list...");
        await fetchPrescriptions();
      } else {
        throw new Error(response.data.message || "Upload failed");
      }
    } catch (error) {
      console.error("❌ Upload error:", error);
      console.error("Error response:", error.response?.data);
      console.error("Error status:", error.response?.status);
      console.error("Error message:", error.message);
      
      const errorMsg =
        error.response?.data?.message || 
        error.response?.data?.error ||
        error.message ||
        "Failed to upload prescription";
      
      toast.error(errorMsg);
      setMessage({
        type: "error",
        text: errorMsg,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (prescriptionId) => {
    if (window.confirm("Are you sure you want to delete this prescription?")) {
      try {
        // Call delete API
        await axios.delete(
          `http://16.171.177.144:8080/api/prescriptions/${prescriptionId}`
        );
        toast.success("✓ Prescription deleted successfully");
        await fetchPrescriptions();
      } catch (error) {
        console.error("Delete error:", error);
        toast.error("Failed to delete prescription");
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "uploaded":
        return "#f39c12";
      case "verified":
        return "#27ae60";
      case "rejected":
        return "#e74c3c";
      default:
        return "#95a5a6";
    }
  };

  // Show error if user is not logged in
  if (!userId) {
    return (
      <Container>
        <Card>
          <ErrorMessage>
            ⚠️ Please log in first to upload prescriptions
          </ErrorMessage>
        </Card>
      </Container>
    );
  }

  return (
    <Container>
      {/* Upload Section */}
      <Card>
        <Title>📋 Upload Prescription</Title>
        <Subtitle>
          Upload your medical prescription for verification. Supported formats:
          PDF, JPG, PNG
        </Subtitle>

        <UploadSection>
          {!file ? (
            <UploadBox>
              <UploadIcon>📄</UploadIcon>
              <UploadLabel>
                <FileInput
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  disabled={loading}
                />
                <span>Click to upload or drag and drop</span>
              </UploadLabel>
              <UploadHint>PDF, JPG or PNG files up to 10MB</UploadHint>
            </UploadBox>
          ) : (
            <FilePreview>
              <UploadIcon>✓</UploadIcon>
              <FileName>{file.name}</FileName>
              <FileSize>
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </FileSize>
              {!loading && (
                <RemoveBtn onClick={handleRemoveFile}>Remove File</RemoveBtn>
              )}
            </FilePreview>
          )}

          {loading && uploadProgress > 0 && (
            <ProgressBar>
              <ProgressBarFill progress={uploadProgress}>
                {uploadProgress}%
              </ProgressBarFill>
            </ProgressBar>
          )}

          {message && (
            <>
              {message.type === "success" ? (
                <SuccessMessage>{message.text}</SuccessMessage>
              ) : (
                <ErrorMessage>{message.text}</ErrorMessage>
              )}
            </>
          )}

          {file && !loading && (
            <ButtonGroup>
              <SubmitBtn onClick={handleUpload}>
                🚀 Upload Prescription
              </SubmitBtn>
              <CancelBtn onClick={handleRemoveFile}>Cancel</CancelBtn>
            </ButtonGroup>
          )}

          {loading && (
            <ButtonGroup>
              <LoadingSpinner />
              <span>Uploading... {uploadProgress}%</span>
            </ButtonGroup>
          )}
        </UploadSection>
      </Card>

      {/* History Section */}
      <Card>
        <Title>📝 Prescription History</Title>
        <Subtitle>Your previously uploaded prescriptions</Subtitle>

        <HistorySection>
          {loadingHistory ? (
            <EmptyState>
              <LoadingSpinner />
              <EmptyText>Loading prescriptions...</EmptyText>
            </EmptyState>
          ) : prescriptions && prescriptions.length > 0 ? (
            <PrescriptionList>
              {prescriptions.map((prescription) => (
                <PrescriptionItem key={prescription.prescriptionId}>
                  <ItemHeader>
                    <div>
                      <ItemName>
                        📄 {prescription.fileName}
                      </ItemName>
                      <ItemDate>
                        Uploaded: {formatDate(prescription.uploadDate)}
                      </ItemDate>
                    </div>
                    <StatusBadge color={getStatusColor(prescription.status)}>
                      {prescription.status}
                    </StatusBadge>
                  </ItemHeader>
                  <ItemStatus>
                    <span>Size: {(prescription.fileSize / 1024).toFixed(2)} KB</span>
                    {prescription.verifiedAt && (
                      <span>
                        Verified: {formatDate(prescription.verifiedAt)}
                      </span>
                    )}
                  </ItemStatus>
                  <ButtonGroup>
                    <ViewBtn>👁️ View</ViewBtn>
                    <DeleteBtn onClick={() => handleDelete(prescription.prescriptionId)}>
                      🗑️ Delete
                    </DeleteBtn>
                  </ButtonGroup>
                </PrescriptionItem>
              ))}
            </PrescriptionList>
          ) : (
            <EmptyState>
              <EmptyIcon>📋</EmptyIcon>
              <EmptyText>No prescriptions uploaded yet</EmptyText>
              <span style={{ fontSize: "13px", color: "#999", marginTop: "8px" }}>
                Upload your first prescription to get started
              </span>
            </EmptyState>
          )}
        </HistorySection>
      </Card>
    </Container>
  );
};

export default PrescriptionUpload;
