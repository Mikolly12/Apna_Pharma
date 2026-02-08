import styled from "styled-components";

export const List = styled.ul`
  list-style: none;
  padding: 16px;
  margin: 0;
  background: linear-gradient(135deg, #f9fbf9 0%, #f0f7f0 100%);
  border-radius: 12px;
  
  & li:first-child {
    padding-top: 0;
  }

  & li:last-child {
    padding-bottom: 0;
    border-bottom: none;
  }

  @media only screen and (min-width: 768px) {
    padding: 20px;
    border-radius: 16px;
  }

  @media only screen and (min-width: 1440px) {
    width: 100%;
  }
`;

export const Item = styled.li`
  cursor: pointer;
  padding: 16px 12px;
  border-radius: 12px;
  margin-bottom: 12px;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  display: flex;
  gap: 12px;
  align-items: flex-start;
  transition: all 0.3s ease;
  border: 1px solid rgba(76, 175, 80, 0.1);

  &:hover {
    box-shadow: 0 4px 16px rgba(76, 175, 80, 0.15);
    transform: translateY(-2px);
    background: linear-gradient(135deg, #ffffff 0%, #f9fbf9 100%);
  }

  @media only screen and (min-width: 768px) {
    padding: 20px 16px;
    gap: 20px;
    align-items: center;
    margin-bottom: 14px;
    border-radius: 14px;
  }
`;

export const ImgBox = styled.div`
  width: 110px;
  height: 110px;
  border-radius: 12px;
  border: 2px solid #e8f5e9;
  overflow: hidden;
  flex-shrink: 0;
  background: linear-gradient(135deg, #ffffff 0%, #f9fbf9 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.12);
  transition: all 0.3s ease;

  & img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  &:hover {
    transform: scale(1.08);
    box-shadow: 0 6px 20px rgba(76, 175, 80, 0.2);
    border-color: #4caf50;
  }

  @media only screen and (min-width: 768px) {
    width: 150px;
    height: 150px;
    border-radius: 14px;
    padding: 10px;
    border-width: 2px;
  }
`;

export const TextBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

export const MainTextWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 12px;

  & > div {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  @media only screen and (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 0;
  }
`;

export const Subtitle = styled.h3`
  color: ${({ theme }) => theme.colors.black};
  font-size: 14px;
  font-weight: 700;
  line-height: 1.4;
  margin: 0;

  @media only screen and (min-width: 768px) {
    font-size: 17px;
    font-weight: 700;
  }
`;

export const Text = styled.p`
  color: #999999;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.2;
  margin: 0;

  @media only screen and (min-width: 768px) {
    font-size: 13px;
    line-height: 1.3;
  }
`;

export const Price = styled.p`
  color: #4caf50;
  font-size: 17px;
  font-weight: 800;
  line-height: 1.3;
  margin: 0;
  white-space: nowrap;
  margin-left: auto;

  @media only screen and (min-width: 768px) {
    font-size: 19px;
    margin-left: 0;
    margin-top: 0;
  }
`;

export const BtnBox = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: space-between;
  margin-top: 12px;

  @media only screen and (min-width: 768px) {
    margin-top: 0;
    gap: 19px;
  }
`;

export const AmountBox = styled.div`
  border-radius: 60px;
  border: 1px solid rgba(29, 30, 33, 0.1);
  padding: 7px 14px;
  display: flex;
  min-width: 95px;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;

  & button {
    background: transparent;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 4px;

    & svg {
      width: 18px;
      height: 18px;
    }
  }

  & p {
    color: ${({ theme }) => theme.colors.black};
    font-size: 14px;
    font-weight: 600;
    line-height: 1.43em;
    margin: 0;
    min-width: 20px;
    text-align: center;
  }

  @media only screen and (min-width: 768px) {
    padding: 12px 18px;
    min-width: 108px;

    & p {
      font-size: 16px;
      line-height: 1.25em;
    }
  }
`;

export const RemoveBtn = styled.button`
  border-radius: 40px;
  background: rgba(232, 80, 80, 0.1);
  border: none;
  padding: 10px 16px;
  min-width: 85px;
  color: #e85050;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -0.5px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  flex-shrink: 0;

  &:hover {
    background: #e85050;
    color: ${({ theme }) => theme.colors.white};
    transform: scale(1.05);
  }

  & svg {
    width: 18px;
    height: 18px;
  }

  @media only screen and (min-width: 768px) {
    padding: 12px 20px;
    min-width: 90px;
  }
`;
