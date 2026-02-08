import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;

export const Icon = styled.div`
  padding: 8px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.borders.icon};
  width: 44px;
  height: 44px;
  transition: 0.3s ease;
  cursor: pointer;

  &:hover {
    border: 1px solid rgba(247, 248, 250, 0.5);
  }

  & svg {
    width: 28px;
    height: 28px;
  }
`;
