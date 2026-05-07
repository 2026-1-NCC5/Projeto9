import React from 'react';
import styled from 'styled-components';
import Header from '../../ComponentesGerais/Header.jsx';
import SideNav from '../../ComponentesGerais/SideNav.jsx';
import Rosa from './Graficos/Rosa.jsx';
import Linha from './Graficos/Linha.jsx';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
`;

const MainContent = styled.main`
  display: flex;
  flex: 1; 
  overflow: hidden; 

  @media (max-width: 768px) {
    flex-direction: column;
    overflow-y: auto;
  }
`;

const ContentArea = styled.div`
  flex: 1;       
  overflow-y: auto; 
  padding: 20px;

  @media (max-width: 480px) {
    padding: 10px;
  }
`;

const ChartGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  width: 100%;
`;

function Home() {
  return (
    <PageWrapper>
      <Header />
      <MainContent>
        <SideNav />
        <ContentArea>
          <ChartGrid>
            <Rosa />
            <Linha />
          </ChartGrid>
        </ContentArea>
      </MainContent>
    </PageWrapper>
  );
}

export default Home;
