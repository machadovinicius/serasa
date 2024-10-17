import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 10px;
  border-bottom: 1px solid #fff;
`;
export const Nav = styled.nav`
  display: flex;
  justify-content: flex-start;
  gap: 20px;
  width: 100%;
  max-width: 1400px;
  padding: 10px 0;
`;

export const NavItem = styled.button`
  background: none;
  border: none;
  color: #ffffff;
  font-size: 18px;
  text-decoration: none;
  padding: 15px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    transition: color 0.2s ease;
    color: #ffffff;
    background: #ffffff22;
  }
`;
