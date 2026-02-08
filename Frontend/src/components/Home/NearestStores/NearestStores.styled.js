import styled from "styled-components";
import { CommonContainer } from "styles/GlobalStyles";

export const Container = styled(CommonContainer)`
  padding-bottom: 80px;
  background: ${({ theme }) => theme.colors.lightGray};

  @media only screen and (min-width: 768px) {
    padding-bottom: 120px;
  }
`;

export const Title = styled.h2`
  color: ${({ theme }) => theme.colors.black};
  text-align: center;
  font-size: 28px;
  font-weight: 600;
  line-height: 1.14em;
  margin-bottom: 14px;

  @media only screen and (min-width: 768px) {
    font-size: 40px;
    line-height: 1.2em;
  }
`;

export const Text = styled.p`
  color: ${({ theme }) => theme.colors.gray};
  text-align: center;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.28em;
  margin-bottom: 40px;

  @media only screen and (min-width: 768px) {
    font-size: 16px;
    line-height: 1.25em;
    margin-bottom: 64px;
  }
`;

export const Wrapper = styled.div`
  @media only screen and (min-width: 768px) {
    display: flex;
    justify-content: center;
  }
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media only screen and (min-width: 768px) {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 32px 16px;
    width: 704px;
  }

  @media only screen and (min-width: 1440px) {
    width: 1248px;
    gap: 38px 36px;
  }
`;

export const Item = styled.li`
  position: relative;
  padding: 32px 32px 40px;
  border-radius: 27px;
  border: 1.155px solid ${({ theme }) => theme.colors.subWhite};
  background: #e7f1ed;
  overflow: hidden;

  &::before {
    position: absolute;
    content: "";
    width: 166.806px;
    height: 35.383px;
    transform: rotate(22deg);
    right: -50.914px;
    bottom: -30.039px;
    border-radius: 20px 0px 0px 20px;
    background: rgba(89, 177, 122, 0.08);
  }

  &::after {
    position: absolute;
    content: "";
    width: 166.806px;
    height: 35.383px;
    transform: rotate(22deg);
    right: -42.914px;
    bottom: 19.961px;
    border-radius: 20px 0px 0px 20px;
    background: rgba(89, 177, 122, 0.08);
  }

  @media only screen and (min-width: 768px) {
    min-width: 344px;
    padding: 40px 40px 46px;

    &::before {
      right: -88.914px;
      bottom: -27.039px;
    }

    &::after {
      right: -74.914px;
      bottom: 23.961px;
    }
  }

  @media only screen and (min-width: 1440px) {
    min-width: 392px;

    &::before {
      right: -33.914px;
      bottom: -24.039px;
    }

    &::after {
      right: -17.914px;
      bottom: 29.961px;
    }
  }
`;

export const SubTitle = styled.h3`
  color: ${({ theme }) => theme.colors.black};
  font-size: 16px;
  font-weight: 600;
  line-height: 1.4em;
  margin-bottom: 32px;
  max-width: 123px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media only screen and (min-width: 768px) {
    font-size: 20px;
    margin-bottom: 40px;
    max-width: 150px;
  }
`;

export const AddressBox = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 18px;

  & svg {
    width: 18px;
    height: 18px;
  }

  & ul {
    display: flex;
    flex-direction: column;
    gap: 4px;
    color: ${({ theme }) => theme.colors.gray};
    font-size: 14px;
    font-weight: 400;
    line-height: 1.28em;
  }

  @media only screen and (min-width: 768px) {
    margin-bottom: 14px;

    & ul {
      font-size: 16px;
      line-height: 1.25em;
    }
  }
`;

export const PhoneBox = styled.div`
  position: relative;
  display: flex;
  gap: 8px;

  &::after {
    position: absolute;
    content: "";
    width: 166.806px;
    height: 35.383px;
    transform: rotate(22deg);
    right: -132.914px;
    bottom: 1.96px;
    border-radius: 20px 0px 0px 20px;
    background: rgba(89, 177, 122, 0.08);
  }

  & svg {
    width: 18px;
    height: 18px;
  }

  & p {
    color: ${({ theme }) => theme.colors.gray};
    font-size: 14px;
    font-weight: 400;
    line-height: 1.28em;
  }

  @media only screen and (min-width: 768px) {
    font-size: 16px;
    line-height: 1.25em;

    &::after {
      right: -170.914px;
      bottom: 0.96px;
    }
  }

  @media only screen and (min-width: 1440px) {
    &::after {
      right: -119.91px;
      bottom: 5.96px;
    }
  }
`;

export const RatingWithBtn = styled.div`
  position: absolute;
  top: 32px;
  right: 32px;
  display: flex;
  gap: 14px;
  align-items: center;

  @media only screen and (min-width: 768px) {
    top: 40px;
    right: 24px;
  }

  @media only screen and (min-width: 1440px) {
    right: 40px;
  }
`;

export const IsOpenItem = styled.div`
  text-transform: uppercase;
  padding: 8px 16px;
  border-radius: 8px;
  background: ${({ open }) =>
    open ? "rgba(89, 177, 122, 0.1)" : "rgba(232, 80, 80, 0.10)"};
  color: ${({ theme, open }) => (open ? theme.colors.green : "#E85050")};
  font-size: 12px;
  font-weight: 600;
  line-height: 1.5em;
  letter-spacing: -0.24px;
`;

export const RatingBox = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;

  & svg {
    width: 16px;
    height: 16px;
    fill: #ffc531;
  }

  & p {
    color: ${({ theme }) => theme.colors.black};
    font-size: 14px;
    font-weight: 500;
    line-height: 1.28em;
  }
`;
