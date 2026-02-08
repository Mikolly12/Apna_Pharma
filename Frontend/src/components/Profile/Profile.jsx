import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser, selectIsLoggedIn } from "../../redux/auth/selectors";
import { getUserInfoThunk } from "../../redux/auth/operations";
import {
  Container,
  ProfileCard,
  ProfileHeader,
  ProfileImage,
  UserName,
  ProfileContent,
  FieldGroup,
  FieldLabel,
  FieldValue,
  EditButton,
  BackButton,
  NoDataMessage,
  GridContainer,
  IconBox,
  TabContainer,
  TabButtons,
  TabButton,
  TabContent,
} from "./Profile.styled";
import sprite from "../../images/sprite.svg";
import { toast } from "react-toastify";
import PrescriptionUpload from "../PrescriptionUpload/PrescriptionUpload";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [activeTab, setActiveTab] = useState("profile");

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      toast.error("Please login to view your profile");
      navigate("/login");
      return;
    }
    
    // Fetch user info
    dispatch(getUserInfoThunk());
  }, [isLoggedIn, dispatch, navigate]);

  const handleBackClick = () => {
    navigate("/home");
  };

  if (!user) {
    return (
      <Container>
        <NoDataMessage>
          <p>Loading profile information...</p>
        </NoDataMessage>
      </Container>
    );
  }

  return (
    <Container>
      <BackButton onClick={handleBackClick} title="Go back to home">
        <svg>
          <use href={`${sprite}#arrow`} />
        </svg>
        Back
      </BackButton>

      <ProfileCard>
        <ProfileHeader>
          <ProfileImage>
            <div>{user?.name?.[0]?.toUpperCase() || "U"}</div>
          </ProfileImage>
          <div>
            <UserName>{user?.name || "User"}</UserName>
            <p style={{ color: "#999", fontSize: "14px" }}>Member since {new Date(user?.createdAt).getFullYear() || "2026"}</p>
          </div>
        </ProfileHeader>

        {/* Tab Navigation */}
        <TabContainer>
          <TabButtons>
            <TabButton 
              active={activeTab === "profile"} 
              onClick={() => setActiveTab("profile")}
            >
              👤 Profile
            </TabButton>
            <TabButton 
              active={activeTab === "prescriptions"} 
              onClick={() => setActiveTab("prescriptions")}
            >
              📋 Prescriptions
            </TabButton>
          </TabButtons>
        </TabContainer>

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <ProfileContent>
          <h2 style={{ marginBottom: "20px", color: "#333" }}>📋 Profile Information</h2>

          <GridContainer>
            <FieldGroup>
              <IconBox>
                <svg>
                  <use href={`${sprite}#user`} />
                </svg>
              </IconBox>
              <div>
                <FieldLabel>Full Name</FieldLabel>
                <FieldValue>{user?.name || "Not provided"}</FieldValue>
              </div>
            </FieldGroup>

            <FieldGroup>
              <IconBox>
                <svg>
                  <use href={`${sprite}#mail`} />
                </svg>
              </IconBox>
              <div>
                <FieldLabel>Email Address</FieldLabel>
                <FieldValue>{user?.email || "Not provided"}</FieldValue>
              </div>
            </FieldGroup>

            <FieldGroup>
              <IconBox>
                <svg>
                  <use href={`${sprite}#phone`} />
                </svg>
              </IconBox>
              <div>
                <FieldLabel>Phone Number</FieldLabel>
                <FieldValue>{user?.phone || "Not provided"}</FieldValue>
              </div>
            </FieldGroup>

            <FieldGroup>
              <IconBox>
                <svg>
                  <use href={`${sprite}#location`} />
                </svg>
              </IconBox>
              <div>
                <FieldLabel>Address</FieldLabel>
                <FieldValue>{user?.address || "Not provided"}</FieldValue>
              </div>
            </FieldGroup>

            <FieldGroup>
              <IconBox>
                <svg>
                  <use href={`${sprite}#city`} />
                </svg>
              </IconBox>
              <div>
                <FieldLabel>City</FieldLabel>
                <FieldValue>{user?.city || "Not provided"}</FieldValue>
              </div>
            </FieldGroup>

            <FieldGroup>
              <IconBox>
                <svg>
                  <use href={`${sprite}#pin`} />
                </svg>
              </IconBox>
              <div>
                <FieldLabel>Postal Code</FieldLabel>
                <FieldValue>{user?.postalCode || user?.zipCode || "Not provided"}</FieldValue>
              </div>
            </FieldGroup>
          </GridContainer>

          <h2 style={{ marginTop: "40px", marginBottom: "20px", color: "#333" }}>⚙️ Account Details</h2>

          <FieldGroup style={{ marginBottom: "20px" }}>
            <div style={{ flex: 1 }}>
              <FieldLabel>Account Status</FieldLabel>
              <FieldValue style={{ color: "#27ae60" }}>✓ Active</FieldValue>
            </div>
          </FieldGroup>

          <FieldGroup style={{ marginBottom: "20px" }}>
            <div style={{ flex: 1 }}>
              <FieldLabel>Member Since</FieldLabel>
              <FieldValue>
                {user?.createdAt 
                  ? new Date(user?.createdAt).toLocaleDateString() 
                  : "Not available"}
              </FieldValue>
            </div>
          </FieldGroup>

          <FieldGroup style={{ marginBottom: "20px" }}>
            <div style={{ flex: 1 }}>
              <FieldLabel>Last Updated</FieldLabel>
              <FieldValue>
                {user?.updatedAt 
                  ? new Date(user?.updatedAt).toLocaleDateString() 
                  : "Not available"}
              </FieldValue>
            </div>
          </FieldGroup>
        </ProfileContent>

        <EditButton title="Edit your profile (coming soon)">
          <svg>
            <use href={`${sprite}#edit`} />
          </svg>
          Edit Profile
        </EditButton>
        )}

        {/* Prescriptions Tab */}
        {activeTab === "prescriptions" && (
          <TabContent>
            <PrescriptionUpload userId={user?.id} />
          </TabContent>
        )}
      </ProfileCard>
    </Container>
  );
};

export default Profile;
