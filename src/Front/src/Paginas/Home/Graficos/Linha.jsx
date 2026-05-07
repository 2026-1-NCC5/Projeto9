import React from 'react';
import styled from 'styled-components';
import ReactEcharts from 'echarts-for-react';

const PageWrapper = styled.div`
  padding: 40px;
  min-height: 100vh;
  font-family:  'Times New Roman', Times, serif;
  display: flex;
  flex-direction: column;
  align-items: center; 
`;

const ChartContainer = styled.div`
  display: flex;
  padding: 20px;
  width: 100%; 
  max-width: 1200px; 
  background: #ffff;
`;

const CardStyled = styled.div`
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  margin-bottom: 20px;
  width: 100%;      
  max-width: 250px;
  h3 {
    margin: 0;
    font-size: 20px;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .value-container {
    display: flex;
    align-items: baseline;
    gap: 4px;
    margin-top: 8px;
  }

  .number {
    font-size: 32px;
    font-weight: bold;
    color: ${(props) => props.unitColor || '#334155'};
  }

  .unit {
    font-size: 18px;
    font-weight: 600;
    color: #94a3b8;
  }
`;

const WeightCard = ({ total }) => {
  const getDisplayData = (v) => {
    if (v >= 1000000)
      return { val: (v / 1000000).toFixed(2), unit: 't', color: '#b45309' };
    if (v >= 1000)
      return { val: (v / 1000).toFixed(2), unit: 'kg', color: '#2563eb' };
    return { val: v.toFixed(1), unit: 'g', color: '#64748b' };
  };

  const display = getDisplayData(total);

  return (
    <CardStyled unitColor={display.color}>
      <h3>Peso Total Somado</h3>
      <div className="value-container">
        <span className="number">{display.val}</span>
        <span className="unit">{display.unit}</span>
      </div>
    </CardStyled>
  );
};

function Linha() {
  const option = {
    color: ['#5470c6', '#91cc75', '#fac858'],
    title: {
      text: 'Peso dos Alimentos',
      subtext: 'Distribuição por embalagem',
      left: 'center',
      textStyle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#1e293b',
      },
    },
    legend: {
      orient: 'horizontal',
      bottom: '0',
      textStyle: { fontSize: 14 },
    },
    tooltip: { trigger: 'axis' },
    dataset: {
      source: [
        ['product', '500g', '1kg', '5kg'],
        ['Arroz', 43.3, 85.8, 93.7],
        ['Feijão', 83.1, 73.4, 55.1],
        ['Macarrão', 86.4, 65.2, 82.5],
        ['Outros', 72.4, 53.9, 39.1],
      ],
    },
    xAxis: { type: 'category' },
    yAxis: { name: 'Qtd / Peso' },
    series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }],
  };
  const totalGeral = option.dataset.source.slice(1).reduce((acc, curr) => {
    return acc + (curr[1] || 0) + (curr[2] || 0) + (curr[3] || 0);
  }, 0);

  return (
    <PageWrapper>
      <ChartContainer>
        <ReactEcharts
          option={option}
          style={{ height: '450px', width: '100%' }}
        />
      </ChartContainer>
      <WeightCard total={totalGeral} />
    </PageWrapper>
  );
}

export default Linha;
