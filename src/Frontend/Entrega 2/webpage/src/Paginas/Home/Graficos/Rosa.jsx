import React from 'react';
import styled from 'styled-components';
import ReactEcharts from 'echarts-for-react';

const PageWrapper = styled.div`
  min-height: 100vh;
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  font-family:  'Times New Roman', Times, serif;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
`;

const CategoryCard = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  border-left: 6px solid ${(props) => props.color || '#ccc'};
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
  
  span {
    display: block;
    color: #64748b;
    font-size: 14px;
    text-transform: uppercase;
    font-weight: 600;
    margin-bottom: 8px;
  }
  
  strong {
    font-size: 25px;
    color: #1e293b;
  }
`;

const ChartContainer = styled.div`
  background: #fff;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
`;

function Rosa() {
  const dadosAlimentos = [
    { value: 104, name: 'Arroz', itemStyle: { color: '#5dac57' } },
    { value: 73, name: 'Feijão', itemStyle: { color: '#2e7829' } },
    { value: 50, name: 'Macarrão', itemStyle: { color: '#446041' } },
    { value: 58, name: 'Outros', itemStyle: { color: '#0f9e03' } },
  ];

  const option = {
    title: {
      text: 'Alimentos arrecadados',
      subtext: 'Dados atuais',
      left: 'center',
      top: 0,
      textStyle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#1e293b',
      },
      subtextStyle: {
        fontSize: 18,
        color: '#64748b',
      },
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c}kg ({d}%)',
    },
    legend: {
      orient: 'horizontal',
      bottom: '0',
      itemGap: 20,
      textStyle: { fontSize: 14 },
    },
    series: [
      {
        name: 'Alimentos',
        type: 'pie',
        roseType: 'area',
        radius: ['20%', '75%'],
        center: ['50%', '55%'],
        data: dadosAlimentos,
        itemStyle: {
          borderColor: '#fff',
          borderWidth: 2,
          borderRadius: 8,
        },
      },
    ],
  };
  return (
    <PageWrapper>
      <ChartContainer>
        <ReactEcharts
          option={option}
          style={{ height: '400px', width: '100%' }}
        />
      </ChartContainer>

      <CardGrid>
        {dadosAlimentos.map((item, index) => (
          <CategoryCard key={index} color={item.itemStyle.color}>
            <span>{item.name}</span>
            <strong>{item.value} Itens </strong>
          </CategoryCard>
        ))}
      </CardGrid>
    </PageWrapper>
  );
}

export default Rosa;
