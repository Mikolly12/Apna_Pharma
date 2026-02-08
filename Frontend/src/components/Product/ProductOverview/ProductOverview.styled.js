import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  @media only screen and (min-width: 768px) {
    flex-direction: row;
    gap: 16px;
  }

  @media only screen and (min-width: 1440px) {
    flex-direction: column;
    gap: 20px;
  }
`;

export const ImgBox = styled.div`
  overflow: hidden;
  object-fit: cover;
  border-radius: 27px;
  border: 1.155px solid rgba(89, 177, 122, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;

  & img {
    width: 100%;
  }

  @media only screen and (min-width: 768px) {
    width: 364px;
    height: 284px;
  }

  @media only screen and (min-width: 1440px) {
    height: 337px;
  }
`;

export const InfoBox = styled.div`
  border-radius: 20px;
  background: ${({ theme }) => theme.colors.white};
  padding: 20px;
  margin-bottom: 8px;

  @media only screen and (min-width: 768px) {
    padding: 32px;
  }

  @media only screen and (min-width: 1440px) {
    padding: 20px;
  }
`;

export const NamePriceBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;

  @media only screen and (min-width: 768px) {
    flex-direction: column;
    gap: 32px;
    margin-bottom: 66px;
  }

  @media only screen and (min-width: 1440px) {
    flex-direction: row;
    margin-bottom: 40px;
  }
`;

export const Name = styled.p`
  color: ${({ theme }) => theme.colors.black};
  font-size: 16px;
  font-weight: 600;
  line-height: 1.4em;
  margin-bottom: 4px;

  @media only screen and (min-width: 768px) {
    font-size: 20px;
  }
`;

export const Text = styled.p`
  color: rgba(29, 30, 33, 0.6);
  font-size: 12px;
  font-weight: 400;
  line-height: 1.5em;
`;

export const Price = styled.p`
  color: ${({ theme }) => theme.colors.black};
  font-size: 16px;
  font-weight: 600;
  line-height: 1.4em;

  @media only screen and (min-width: 768px) {
    font-size: 20px;
  }
`;

export const BtnBox = styled.div`
  display: flex;
  justify-content: space-between;

  @media only screen and (min-width: 768px) {
    gap: 12px;
  }
`;

export const AmountBox = styled.div`
  border-radius: 60px;
  border: 1px solid rgba(29, 30, 33, 0.1);
  padding: 12px 18px;
  width: 108px;
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: center;

  & button {
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    object-fit: cover;

    & svg {
      width: 20px;
      height: 20px;
    }
  }
`;

export const AddToCartBtn = styled.button`
  padding: 13px 32px;
  width: 140px;
  background: ${({ theme }) => theme.colors.green};
  border-radius: 60px;
  color: ${({ theme }) => theme.colors.white};
  font-size: 14px;
  font-weight: 500;
  line-height: 1.28em;
  transition: 0.3s ease;

  &:hover {
    background: #3f945f;
  }
`;
