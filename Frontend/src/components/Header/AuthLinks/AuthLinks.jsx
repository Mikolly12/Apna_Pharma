import React from "react";
import RegisterBtn from "./RegisterBtn/RegisterBtn";
import LoginBtn from "./LoginBtn/LoginBtn";
import { Wrapper } from "./AuthLinks.styled";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../../redux/auth/selectors";
import LogoutBtn from "./LogoutBtn/LogoutBtn";

const AuthLinks = ({ pageType }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <>
      <Wrapper>
        {isLoggedIn ? (
          <LogoutBtn pageType={pageType} />
        ) : (
          <>
            <RegisterBtn pageType={pageType} />
            <LoginBtn pageType={pageType} />
          </>
        )}
      </Wrapper>
    </>
  );
};

export default AuthLinks;
