import React, { useEffect, useState } from "react";
import sprite from "../../../images/sprite.svg";
import { CartBtn, CartItems, UserIcon, Wrapper, ProfilePopup, ProfileOverlay, ProfileHeader, ProfileBody, ProfileField, CloseBtn } from "./UserIcons.styled";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../../redux/auth/selectors";
import { useNavigate } from "react-router-dom";
import { selectCart } from "../../../redux/pharmacy/selectors";
import { getCartItems } from "../../../redux/pharmacy/operations";
import { getUserInfoThunk } from "../../../redux/auth/operations";

const UserIcons = ({ pageType }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const cart = useSelector(selectCart);
  const cartItemsQuantity = cart?.cartProducts?.length || 0;
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    dispatch(getCartItems());
  }, [dispatch, cartItemsQuantity]);

  useEffect(() => {
    dispatch(getUserInfoThunk());
  }, [dispatch]);

  console.log("👤 UserIcons - Current user:", user);
  console.log("👤 UserIcons - User name:", user?.name);
  console.log("👤 UserIcons - First letter:", user?.name?.[0]);

  const handleCartClick = () => {
    navigate("/cart");
  };

  const handleUserIconClick = () => {
    setShowProfile(!showProfile);
  };

  const handleOverlayClick = () => {
    setShowProfile(false);
  };

  const handlePrescriptionUpload = () => {
    setShowProfile(false);
    navigate("/prescriptions");
  };

  const handleViewProfile = () => {
    setShowProfile(false);
    navigate("/profile");
  };

  const iconBackground =
    pageType === "home" ? "#F1F1F1" : "rgba(89, 177, 122, 0.10)";

  // Get the display letter - fallback to "U" if no name
  const displayLetter = user?.name?.[0]?.toUpperCase() || "U";

  return (
    <>
      <Wrapper>
        <CartBtn onClick={handleCartClick}>
          <svg>
            <use href={`${sprite}#shop`} />
          </svg>
          <CartItems>{cartItemsQuantity}</CartItems>
        </CartBtn>
        <UserIcon 
          style={{ background: iconBackground, cursor: "pointer" }} 
          title={`Logged in as: ${user?.name || "User"}`}
          onClick={handleUserIconClick}
        >
          {displayLetter}
        </UserIcon>
      </Wrapper>

      {/* Profile Popup Modal */}
      {showProfile && (
        <ProfileOverlay onClick={handleOverlayClick}>
          <ProfilePopup onClick={(e) => e.stopPropagation()}>
            <ProfileHeader>
              <div style={{ display: "flex", alignItems: "center", gap: "15px", flex: 1 }}>
                <div style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  background: "#59b17a",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: "24px",
                  fontWeight: "bold"
                }}>
                  {displayLetter}
                </div>
                <div>
                  <h3 style={{ margin: "0 0 5px 0", color: "#333" }}>{user?.name || "User"}</h3>
                  <p style={{ margin: 0, color: "#999", fontSize: "12px" }}>{user?.email || "No email"}</p>
                </div>
              </div>
              <CloseBtn onClick={handleOverlayClick}>✕</CloseBtn>
            </ProfileHeader>

            <ProfileBody>
              {user?.phone && (
                <ProfileField>
                  <label>📞 Phone</label>
                  <p>{user.phone}</p>
                </ProfileField>
              )}
              
              {user?.address && (
                <ProfileField>
                  <label>📍 Address</label>
                  <p>{user.address}</p>
                </ProfileField>
              )}

              {user?.city && (
                <ProfileField>
                  <label>🏙️ City</label>
                  <p>{user.city}</p>
                </ProfileField>
              )}

              {!user?.phone && !user?.address && !user?.city && (
                <p style={{ textAlign: "center", color: "#999" }}>No additional details</p>
              )}

              {/* Action Buttons */}
              <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                <button
                  onClick={handlePrescriptionUpload}
                  style={{
                    flex: 1,
                    padding: "10px 15px",
                    background: "#27ae60",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontWeight: "600",
                    fontSize: "14px",
                    transition: "all 0.3s ease"
                  }}
                  onMouseOver={(e) => e.target.style.background = "#229954"}
                  onMouseOut={(e) => e.target.style.background = "#27ae60"}
                >
                  📋 Upload Prescription
                </button>
                <button
                  onClick={handleViewProfile}
                  style={{
                    flex: 1,
                    padding: "10px 15px",
                    background: "#3498db",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontWeight: "600",
                    fontSize: "14px",
                    transition: "all 0.3s ease"
                  }}
                  onMouseOver={(e) => e.target.style.background = "#2980b9"}
                  onMouseOut={(e) => e.target.style.background = "#3498db"}
                >
                  👤 Profile
                </button>
              </div>
            </ProfileBody>
          </ProfilePopup>
        </ProfileOverlay>
      )}
    </>
  );
};

export default UserIcons;
