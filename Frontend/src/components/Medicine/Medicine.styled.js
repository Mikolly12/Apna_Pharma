import styled from "styled-components";
import { CommonContainer } from "styles/GlobalStyles";

export const Container = styled(CommonContainer)`
  padding-top: 64px;
  padding-bottom: 80px;
  background: ${({ theme }) => theme.colors.lightGray};

  @media only screen and (min-width: 768px) {
    padding-top: 80px;
    padding-bottom: 120px;
  }

  @media only screen and (min-width: 1440px) {
    padding: 100px 128px 120px;
  }
`;

export const Title = styled.h2`
  color: ${({ theme }) => theme.colors.black};
  font-size: 28px;
  font-weight: 600;
  line-height: 1.14em;
  margin-bottom: 40px;

  @media only screen and (min-width: 768px) {
    margin-bottom: 32px;
  }

  @media only screen and (min-width: 1440px) {
    margin-bottom: 40px;
  }
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media only screen and (min-width: 768px) {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 32px 13px;
  }

  @media only screen and (min-width: 1440px) {
    gap: 40px 21px;
  }
`;

export const Item = styled.li`
  @media only screen and (min-width: 768px) {
    width: 226px;
  }

  @media only screen and (min-width: 1440px) {
    width: 280px;
  }
`;

export const ImgBox = styled.div`
  border-radius: 20px;
  border: 1.155px solid rgba(89, 177, 122, 0.6);
  overflow: hidden;
  margin-bottom: 8px;
  object-fit: cover;

  & img {
    width: 100%;
  }
`;

export const Info = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-radius: 20px;
  padding: 20px;
`;

export const NameWithPriceBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
`;

export const SubTitle = styled.h3`
  color: ${({ theme }) => theme.colors.black};
  font-size: 16px;
  font-weight: 600;
  line-height: 1.4em;
  max-width: 160px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media only screen and (min-width: 768px) {
    font-size: 18px;
  }
`;

export const Text = styled.p`
  color: rgba(29, 30, 33, 0.6);
  font-size: 12px;
  font-weight: 400;
  line-height: 1.5em;
  margin-bottom: 17px;

  @media only screen and (min-width: 768px) {
    margin-bottom: 14px;
  }
`;

export const Price = styled.p`
  color: ${({ theme }) => theme.colors.black};
  font-size: 16px;
  font-weight: 600;
  line-height: 1.4em;
`;

export const BtnBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const AddToCartBtn = styled.button`
  padding: 10px 16px;
  background: ${({ theme }) => theme.colors.green};
  border-radius: 24px;
  color: ${({ theme }) => theme.colors.white};
  font-size: 14px;
  font-weight: 500;
  line-height: 1em;
  transition: 0.3s ease;

  &:hover {
    background: #3f945f;
  }
`;

export const DetailsBtn = styled.button`
  background: transparent;
  color: ${({ theme }) => theme.colors.black};
  font-size: 12px;
  font-weight: 400;
  line-height: 1.5em;
  text-decoration: underline;
`;
