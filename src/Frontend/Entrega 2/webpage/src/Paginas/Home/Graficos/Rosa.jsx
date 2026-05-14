import React, { forwardRef } from 'react';
import styled from 'styled-components';
import ReactEcharts from 'echarts-for-react';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  font-family: 'Times New Roman', Times, serif;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
`;

const CategoryCard = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  border-left: 6px solid ${(props) => props.color || '#ccc'};
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  
  span {
    display: block;
    color: #64748b;
    font-size: 14px;
    text-transform: uppercase;
    font-weight: 600;
    margin-bottom: 8px;
  }
  
  strong {
    font-size: 20px;
    color: #1e293b;
  }
`;

const ChartContainer = styled.div`
  background: #fff;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Rosa = forwardRef((props, ref) => {
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
      textStyle: { fontSize: 24, fontWeight: 'bold', color: '#1e293b' },
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c}kg ({d}%)',
    },
    series: [
      {
        name: 'Alimentos',
        type: 'pie',
        roseType: 'area',
        radius: ['20%', '70%'],
        center: ['50%', '50%'],
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
          ref={ref}
          option={option}
          style={{ height: '400px', width: '100%', paddingBottom: '80px' }}
        />
      </ChartContainer>

      <CardGrid>
        {dadosAlimentos.map((item, index) => (
          <CategoryCard key={index} color={item.itemStyle.color}>
            <span>{item.name}</span>
            <strong>{item.value} kg </strong>
          </CategoryCard>
        ))}
      </CardGrid>
    </PageWrapper>
  );
});

export default Rosa;
