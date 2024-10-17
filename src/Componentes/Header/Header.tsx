import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Nav, NavItem, Container } from './Header.styles';

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <Container>
      <Nav>
        <NavItem onClick={() => handleNavigation('/')}>Dashboard</NavItem>
        <NavItem onClick={() => handleNavigation('/farms')}>Cadastro</NavItem>
      </Nav>
    </Container>
  );
};

export default Header;
