import React, { useCallback, useEffect } from "react";
import { CloseBtn, Container, Content, Overlay } from "./Menu.styled";
import sprite from "../../../images/sprite.svg";
import NavLinks from "../NavLinks/NavLinks";
import AuthLinks from "../AuthLinks/AuthLinks";

const Menu = ({ isOpen, onClose, pageType }) => {
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [handleKeyDown, isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <Overlay onClick={onClose}>
        <Content onClick={(e) => e.stopPropagation()}>
          <Container>
            <CloseBtn type="button" onClick={onClose}>
              <svg>
                <use href={`${sprite}#close`} />
              </svg>
            </CloseBtn>
            <NavLinks />
            <AuthLinks pageType={pageType} />
          </Container>
        </Content>
      </Overlay>
    </>
  );
};

export default Menu;
