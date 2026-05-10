import { Link } from 'react-router-dom';
import Liderancas from '../assets/liderancas.png';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  font-family: 'Times New Roman', Times, serif;
  font-size: medium;
  text-align: center;
  background-color: #396c35;
  color: #fff;
  padding: 20px 40px; 
  flex-shrink: 0;
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ImgContainer = styled.div`
  max-width: 20%;
`;

const HeaderImg = styled.img`
  width: 100px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-weight: bold;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.8;
  }
`;

const ButtonPerfil = styled(StyledLink)`
  background-color: #2e5a2a;
`;

const ButtonLogin = styled(StyledLink)`
  background-color: #ffffff;
  color: #396c35;
`;

export default function Header() {
  const handleNavigation = () => {
    window.scrollTo(0, 0);
  };

  return (
    <HeaderContainer>
      <nav>
        <NavContainer>
          <ImgContainer>
            <HeaderImg src={Liderancas} alt="Liderancas" />
          </ImgContainer>

          <ButtonGroup>
            <ButtonPerfil onClick={handleNavigation} to="/Perfil">
              Perfil
            </ButtonPerfil>

            <ButtonLogin onClick={handleNavigation} to="/">
              Login
            </ButtonLogin>
          </ButtonGroup>
        </NavContainer>
      </nav>
    </HeaderContainer>
  );
}
