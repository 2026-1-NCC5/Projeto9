import React, { useRef } from 'react';
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
  display: flex;
  flex-direction: column;

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

const SaveButton = styled.button`
  background-color: #396c35;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 20px; 
  align-self: flex-start;
  transition: background 0.3s;

  &:hover {
    background-color: #2d5429;
  }
`;

function Home() {
  const rosaRef = useRef(null);
  const linhaRef = useRef(null);

  const salvarNoHistorico = () => {
    const refs = [
      { ref: rosaRef, name: 'Gráfico Rosa (Distribuição)' },
      { ref: linhaRef, name: 'Gráfico de Linha (Tendência)' },
    ];

    const novosRelatorios = [];

    refs.forEach(({ ref, name }) => {
      if (ref.current) {
        const chartInstance = ref.current.getEchartsInstance();
        const base64Image = chartInstance.getDataURL({
          type: 'png',
          pixelRatio: 2,
          backgroundColor: '#fff',
        });

        novosRelatorios.push({
          id: Date.now() + Math.random(),
          name: name,
          date: new Date().toLocaleString(),
          image: base64Image,
        });
      }
    });

    if (novosRelatorios.length > 0) {
      const historicoExistente = JSON.parse(
        localStorage.getItem('meu-historico-charts') || '[]'
      );
      localStorage.setItem(
        'meu-historico-charts',
        JSON.stringify([...novosRelatorios, ...historicoExistente])
      );
      alert('Ambos os gráficos foram salvos no histórico!');
    } else {
      alert('Erro: Não foi possível capturar os gráficos.');
    }
  };

  return (
    <PageWrapper>
      <Header />
      <MainContent>
        <SideNav />
        <ContentArea>
          <SaveButton onClick={salvarNoHistorico}>Salvar Gráficos</SaveButton>

          <ChartGrid>
            <Rosa ref={rosaRef} />
            <Linha ref={linhaRef} />
          </ChartGrid>
        </ContentArea>
      </MainContent>
    </PageWrapper>
  );
}

export default Home;
