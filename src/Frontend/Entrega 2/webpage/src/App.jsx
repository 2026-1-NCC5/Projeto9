import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Login from './Login.jsx';
import Footer from './ComponentesGerais/Footer.jsx';
import Cadastro from './Cadastro.jsx';
import Home from './Paginas/Home/Home.jsx';
import Arquivos from './Paginas/Arquivos/Arquivos.jsx';
import Times from './Paginas/Times/Times.jsx';
import Perfil from './Paginas/Perfil/Perfil.jsx';

const Content = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

function App() {
  return (
    <Router>
      <Content>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Cadastro" element={<Cadastro />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Arquivos" element={<Arquivos />} />
          <Route path="/Times" element={<Times />} />
          <Route path="/Perfil" element={<Perfil />} />
        </Routes>
      </Content>
      <Footer />
    </Router>
  );
}

export default App;
