import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 20px 20px 40px;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 27px;

  & button {
    padding: 8px 25px;
    border-radius: 40px;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: -0.7px;
  }

  @media only screen and (min-width: 768px) {
    padding: 32px 32px 64px;
  }

  @media only screen and (min-width: 1440px) {
    padding: 40px 40px 80px;
  }
`;

export const BtnBox = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 20px;

  @media only screen and (min-width: 768px) {
    margin-bottom: 32px;
  }

  @media only screen and (min-width: 1440px) {
    margin-bottom: 40px;
  }
`;

export const DescBtn = styled.button`
  background: ${({ theme, active }) =>
    active ? theme.colors.green : "rgba(89, 177, 122, 0.1)"};
  color: ${({ theme, active }) =>
    active ? theme.colors.white : theme.colors.green};
  transition: 0.3 s ease;

  &:hover {
    background: ${({ active }) =>
      active ? "#3F945F" : "rgba(89, 177, 122, 0.10)"};
    color: ${({ theme, active }) => (!active ? "#3F945F" : theme.colors.white)};
  }
`;

export const ReviewsBtn = styled.button`
  background: ${({ theme, active }) =>
    active ? theme.colors.green : "rgba(89, 177, 122, 0.1)"};
  color: ${({ theme, active }) =>
    active ? theme.colors.white : theme.colors.green};

  &:hover {
    background: ${({ active }) =>
      active ? "#3F945F" : "rgba(89, 177, 122, 0.10)"};
    color: ${({ theme, active }) => (!active ? "#3F945F" : theme.colors.white)};
  }
`;

export const DescList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Item = styled.li`
  color: ${({ theme }) => theme.colors.black};
  font-size: 14px;
  font-weight: 400;
  line-height: 1.28em;

  & span {
    color: #6a6a6f;
  }

  @media only screen and (min-width: 768px) {
    font-size: 16px;
    line-height: 1.5em;
  }
`;

export const ReviewsList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const ReviewItem = styled.li`
  position: relative;
  padding: 14px 28px;
  border-radius: 20px;
  border: 1px solid #f1f1f1;
`;

export const ImgNameBox = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 14px;
`;

export const ImgBox = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
`;

export const Name = styled.h3`
  color: ${({ theme }) => theme.colors.black};
  font-size: 16px;
  font-weight: 600;
  line-height: 1.4em;
  margin-bottom: 4px;

  @media only screen and (min-width: 768px) {
    font-size: 18px;
  }
`;

export const Time = styled.p`
  color: rgba(29, 30, 33, 0.6);
  font-size: 12px;
  font-weight: 400;
  line-height: 1.5em;
`;

export const Text = styled.p`
  color: #6a6a6f;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.28em;

  @media only screen and (min-width: 768px) {
    font-size: 16px;
  }
`;

export const RatingBox = styled.div`
  position: absolute;
  top: 14px;
  right: 28px;
  display: flex;
  gap: 6px;
  align-items: center;

  & p {
    color: ${({ theme }) => theme.colors.black};
    font-size: 14px;
    font-weight: 500;
    line-height: 1.28em;
  }

  & svg {
    width: 16px;
    height: 16px;
    fill: #ffc531;
  }

  & div {
    display: flex;
    gap: 2px;
  }
`;
