import styled from "styled-components";
import { CommonContainer } from "styles/GlobalStyles";

export const Container = styled(CommonContainer)`
  padding-top: 25px;
  padding-bottom: 191px;
  background: ${({ theme }) => theme.colors.lightGray};

  @media only screen and (min-width: 768px) {
    padding-top: 28px;
    padding-bottom: 250px;
    padding-right: 122px;
  }

  @media only screen and (min-width: 1440px) {
    padding: 28px 98px 262px 100px;
  }
`;

export const LogoWrapper = styled.div`
  width: 135px;
  margin-bottom: 106px;

  @media only screen and (min-width: 768px) {
    width: 172px;
    margin-bottom: 168px;
  }
  @media only screen and (min-width: 1440px) {
    margin-bottom: 226px;
  }
`;

export const MainWrapper = styled.div`
  @media only screen and (min-width: 1440px) {
    display: flex;
    gap: 54px;
  }
`;

export const TitleBox = styled.div`
  position: relative;
  z-index: 10;
`;

export const ImgWrapper = styled.div`
  position: absolute;
  top: -56px;
  right: 20px;
  z-index: -10;

  @media only screen and (min-width: 768px) {
    top: -104px;
    right: 19px;
  }
`;

export const Title = styled.h2`
  color: ${({ theme }) => theme.colors.black};
  font-size: 28px;
  font-weight: 600;
  line-height: 1.21em;
  margin-bottom: 20px;

  & span {
    color: ${({ theme }) => theme.colors.green};
  }

  @media only screen and (min-width: 768px) {
    font-size: 54px;
    line-height: 1.11em;
    width: 614px;
    margin-bottom: 54px;
  }
`;

export const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;

  & label {
    position: relative;
  }

  & span {
    position: absolute;
    bottom: -10px;
    left: 18px;
    color: #e85050;
    font-size: 12px;
  }

  & input {
    width: 100%;
    padding: 13px 18px;
    border-radius: 60px;
    border: 1px solid rgba(29, 30, 33, 0.1);
    background: ${({ theme }) => theme.colors.white};
    color: rgba(29, 30, 33, 0.4);
    font-size: 12px;
    font-weight: 400;
    line-height: 1.5em;
  }

  @media only screen and (min-width: 768px) {
    flex-direction: row;
    flex-wrap: wrap;
    margin-bottom: 62px;

    & input {
      width: 280px;
    }
  }
`;

export const BtnBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;

  & a {
    display: flex;
    justify-content: center;
    color: rgba(29, 30, 33, 0.4);
    font-size: 12px;
    font-weight: 400;
    line-height: 1.5em;
  }

  @media only screen and (min-width: 768px) {
    width: 280px;
  }
`;

export const SubmitBtn = styled.button`
  background: ${({ theme }) => theme.colors.green};
  padding: 13px 129px;
  width: 100%;
  border-radius: 60px;
  color: ${({ theme }) => theme.colors.white};
  font-size: 14px;
  font-weight: 500;
  line-height: 1.28em;
  display: flex;
  justify-content: center;
  transition: 0.3s ease;

  &:hover {
    background: #3f945f;
  }

  @media only screen and (min-width: 768px) {
    padding: 13px 112px;
  }
`;
