import React from 'react';
import styled from 'styled-components';
import LoginBox from './LoginBox.jsx';
import './App.css';

const StyleTitulo = styled.h2`
  color: #244421; 
  font-size: 30px;
  font-weight: bold;
  font-family: Georgia, 'Times New Roman', Times, serif;
  text-align: center;
  margin-bottom: 20px;
`;

const StyleBackground = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center; 
    align-items: center;     
    padding: 20px;           
    box-sizing: border-box;
`;

function Login() {
  return (
    <div className="main-content">
      <StyleBackground>
        <StyleTitulo>Bem vind@ ao site! Faça login para continuar</StyleTitulo>
        <LoginBox />
      </StyleBackground>
    </div>
  );
}

export default Login;
