import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../../ComponentesGerais/Header.jsx';
import SideNav from '../../ComponentesGerais/SideNav.jsx';

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
  font-size: 25px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ContentArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  font-family:  'Times New Roman', Times, serif;
`;

const Title = styled.h1`
  color: #396c35;
  font-family: 'Times New Roman', Times, serif;
  margin-bottom: 20px;
`;

const RankingTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px; 

  th, td {
    text-align: left;
    padding: 12px;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #f4f4f4;
  }

  tr:nth-child(1) td {
    font-weight: bold;
    color:#5fae59;
  }
`;

const Badge = styled.span`
display: inline-block;
padding: 6px 12px;
border-radius: 6px;
font-weight: 600;
text-align: center;
min-width: 80px;
font-size: 25px;
`;

const formatWeight = (v) => {
  if (v >= 1000000)
    return { val: (v / 1000000).toFixed(2), unit: 't', color: '#b45309' };
  if (v >= 1000)
    return { val: (v / 1000).toFixed(2), unit: 'kg', color: '#2563eb' };
  return { val: v.toFixed(1), unit: 'g', color: '#64748b' };
};

function Times() {
  const initialTeams = [
    { id: 1, name: 'Alpha Squad', score: 1250500 },
    { id: 2, name: 'Beta Force', score: 8500 },
    { id: 3, name: 'Gamma Team', score: 450 },
    { id: 4, name: 'Delta Group', score: 95400 },
  ];

  const [teams] = useState([...initialTeams].sort((a, b) => b.score - a.score));

  return (
    <PageWrapper>
      <Header />
      <MainContent>
        <SideNav />
        <ContentArea>
          <Title>Rankings de Peso</Title>
          <RankingTable>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Equipe</th>
                <th>Peso Total</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team, index) => {
                const display = formatWeight(team.score);

                return (
                  <tr key={team.id}>
                    <td>{index + 1}º</td>
                    <td>{team.name}</td>
                    <td>
                      <Badge color={display.color}>
                        {display.val} {display.unit}
                      </Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </RankingTable>
        </ContentArea>
      </MainContent>
    </PageWrapper>
  );
}
export default Times;
