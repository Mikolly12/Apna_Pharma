import styled from "styled-components";

export const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f5f5f5;
`;

export const Header = styled.div`
  background-color: #59b17a;
  color: white;
  padding: 20px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const HeaderTitle = styled.h1`
  margin: 0;
  font-size: 24px;
  font-weight: 600;
`;

export const LogoutBtn = styled.button`
  background-color: #e85050;
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #d43f3f;
  }
`;

export const SidebarNav = styled.nav`
  width: 220px;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  height: fit-content;
`;

export const NavItem = styled.div`
  padding: 12px 16px;
  margin-bottom: 8px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  color: ${({ active }) => (active ? "white" : "#1d1e21")};
  background-color: ${({ active }) => (active ? "#59b17a" : "transparent")};

  &:hover {
    background-color: ${({ active }) => (active ? "#59b17a" : "#f0f0f0")};
  }
`;

export const MainContent = styled.div`
  flex: 1;
  padding: 0 20px 20px 20px;
`;

export const Section = styled.div`
  background-color: white;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

export const SectionTitle = styled.h2`
  margin: 0 0 20px 0;
  font-size: 20px;
  color: #1d1e21;
  font-weight: 600;
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

export const StatCard = styled.div`
  background: linear-gradient(135deg, #59b17a 0%, #3f945f 100%);
  color: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(89, 177, 122, 0.2);
`;

export const StatValue = styled.div`
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 10px;
`;

export const StatLabel = styled.div`
  font-size: 14px;
  opacity: 0.9;
`;

export const TableWrapper = styled.div`
  overflow-x: auto;
  margin-top: 20px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  thead {
    background-color: #f5f5f5;
    border-bottom: 2px solid #e0e0e0;
  }

  th {
    padding: 12px;
    text-align: left;
    font-weight: 600;
    color: #1d1e21;
    font-size: 14px;
  }

  td {
    padding: 12px;
    border-bottom: 1px solid #e0e0e0;
    color: #666;
  }

  tbody tr {
    transition: background-color 0.2s ease;

    &:hover {
      background-color: #f9f9f9;
    }
  }

  tbody tr:last-child td {
    border-bottom: none;
  }
`;

// Form and Modal Styles
export const AddButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }
`;

export const Button = styled.button`
  background-color: #59b17a;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #4a9468;
  }
`;

export const DeleteBtn = styled.button`
  background-color: #e85050;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #d43f3f;
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
`;

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
`;

export const ModalContent = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 30px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
`;

export const CloseBtn = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 28px;
  color: #999;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #333;
  }
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const FormLabel = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #1d1e21;
`;

export const FormInput = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  font-family: inherit;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #4caf50;
    box-shadow: 0 0 4px rgba(76, 175, 80, 0.3);
  }
`;

export const FormTextarea = styled.textarea`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  font-family: inherit;
  resize: vertical;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #4caf50;
    box-shadow: 0 0 4px rgba(76, 175, 80, 0.3);
  }
`;
