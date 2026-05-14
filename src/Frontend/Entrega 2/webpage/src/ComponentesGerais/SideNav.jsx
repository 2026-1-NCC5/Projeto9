import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const SideNav = styled.nav`
  width: 240px;          
  min-width: 240px;     
  height: 100%;          
  background: #396c35;
  display: flex;
  flex-direction: column;
  padding: 20px;
  
  @media (max-width: 768px) {
    width: 100%;
    height: 60px;
    flex-direction: row;
  }
`;

const StyledLink = styled(NavLink)`
  color: #fff;
  text-decoration: none;
  padding: 15px 25px;
  font-size: 20px;
  transition: 0.3s;

  &:hover {
    color: white;
    background: #929f91;
  }

  &.active {
    color: #ffff;
    background:#396c35;
  }
`;

function Sidebar() {
  return (
    <SideNav>
      <StyledLink to="/Home">Home</StyledLink>
      <StyledLink to="/Arquivos">Arquivos</StyledLink>
      <StyledLink to="/Times">Times</StyledLink>
    </SideNav>
  );
}

export default Sidebar;
