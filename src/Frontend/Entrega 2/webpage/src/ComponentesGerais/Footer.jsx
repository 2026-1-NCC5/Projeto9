import styled from 'styled-components';
import { FaInstagram, FaYoutube } from 'react-icons/fa';
import { AiOutlineX } from 'react-icons/ai';
import React from 'react';
import Liderancas from '../assets/liderancas.png';

const FooterContainer = styled.footer`
  font-family: 'Times New Roman', Times, serif;
  font-size: medium;
  text-align: center;
  background-color: #396c35;
  color: #fff;
  padding: 20px 40px; 
  display: flex;
  justify-content: space-between;
  flex-shrink: 0;
`;

const ImgContainer = styled.div`
  max-width: 20%;
`;

const FooterImg = styled.img`
  width: 100px ;
  text-align: center;
`;

const LinksContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 33%;
  gap: 20px;
  
  a {
    color: white;
    text-decoration: none;
    font-weight: bold;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 21px;
    max-height: 1.5em;

    &:hover {
      color: lightgray;
      transition: all 0.2s ease-in-out;
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: end;
  align-items: end;
  /* border: 2px solid; */
  width: 33%;
  a {
    color: white;
    margin: 0 10px;
    text-decoration: none;
    font-weight: bold;
    font-size: 35px;

    &:hover {
      color: lightgray;
      transition: all 0.2s ease-in-out;
    }
  }
`;

function Footer() {
  return (
    <FooterContainer>
      <ImgContainer>
        <a>
          <FooterImg src={Liderancas} alt="Liderancas" className="Liderancas" />
        </a>
      </ImgContainer>
      <SocialLinks>
        <a
          href="https://www.youtube.com/@Lideran%C3%A7asEmp%C3%A1ticas"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaYoutube />
        </a>

        <a
          href="https://www.linkedin.com/company/projeto-lideran%C3%A7as-emp%C3%A1ticas/?viewAsMember=true"
          target="_blank"
          rel="noopener noreferrer"
        >
          <AiOutlineX />
        </a>
        <a
          href="https://www.instagram.com/liderancasempaticas/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram />
        </a>
      </SocialLinks>
    </FooterContainer>
  );
}

export default Footer;
