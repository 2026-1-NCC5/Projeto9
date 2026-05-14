import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../../ComponentesGerais/Header.jsx';
import SideNav from '../../ComponentesGerais/SideNav.jsx';
import { jsPDF } from 'jspdf';

const MainContent = styled.main`
  display: flex;
  flex: 1;
  height: 100px;
  overflow: hidden;
`;

const ContentArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 30px;
`;

const Title = styled.h1`
  color: #396c35;
  font-family: 'Times New Roman', Times, serif;
  border-bottom: 2px solid #396c35;
  padding-bottom: 10px;
`;

const HistoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 25px;
  margin-top: 30px;
`;

const HistoryCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 15px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: transform 0.2s;

  &:hover { transform: translateY(-5px); }

  img { 
    width: 100%; 
    height: 180px; 
    object-fit: contain; 
    background: #fff;
    border: 1px solid #eee;
    border-radius: 4px;
  }
`;

const CardInfo = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  span { font-size: 14px; color: #666; }
  strong { font-size: 16px; color: #333; }
`;

const DownloadButton = styled.button`
  background-color: #396c35;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  
  &:hover { background-color: #2d5429; }
`;

function Arquivos() {
  const [chartHistory, setChartHistory] = useState([]);

  // Carrega o histórico salvo no navegador ao abrir a página
  useEffect(() => {
    const savedHistory = localStorage.getItem('meu-historico-charts');
    if (savedHistory) {
      setChartHistory(JSON.parse(savedHistory));
    }
  }, []);

  const exportToPDF = (imageData, fileName) => {
    const pdf = new jsPDF('landscape');
    pdf.addImage(imageData, 'PNG', 10, 10, 280, 150);
    pdf.save(`${fileName}.pdf`);
  };

  const deleteFromHistory = (id) => {
    const filtered = chartHistory.filter((item) => item.id !== id);
    setChartHistory(filtered);
    localStorage.setItem('meu-historico-charts', JSON.stringify(filtered));
  };

  return (
    <>
      <Header />
      <MainContent>
        <SideNav />
        <ContentArea>
          <Title>Histórico de Relatórios</Title>
          {chartHistory.length === 0 ? (
            <p style={{ marginTop: '20px' }}>
              Nenhum gráfico armazenado no histórico.
            </p>
          ) : (
            <HistoryGrid>
              {chartHistory.map((item) => (
                <HistoryCard key={item.id}>
                  <img src={item.image} alt="Snapshot do gráfico" />
                  <CardInfo>
                    <strong>{item.name || 'Gráfico Sem Nome'}</strong>
                    <span>Data: {item.date}</span>
                    <DownloadButton
                      onClick={() =>
                        exportToPDF(item.image, item.name || 'grafico')
                      }
                    >
                      Exportar PDF
                    </DownloadButton>
                    <button
                      onClick={() => deleteFromHistory(item.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'red',
                        cursor: 'pointer',
                        fontSize: '12px',
                      }}
                    >
                      Excluir
                    </button>
                  </CardInfo>
                </HistoryCard>
              ))}
            </HistoryGrid>
          )}
        </ContentArea>
      </MainContent>
    </>
  );
}

export default Arquivos;
