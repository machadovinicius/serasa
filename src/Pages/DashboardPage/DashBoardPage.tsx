import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFarms, deleteFarmAsync } from '../../redux/farmSlice';
import { RootState, AppDispatch } from '../../redux/store';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Title,
  BoxInfos,
  ChartContainer,
  StatsContainer,
  StatCard,
  ChartArea,
  EmptyMessage,
  FarmTable,
  TableHeader,
  TableRow,
  TableData,
  ButtonGroup,
  EditButton,
  DeleteButton,
} from './DashboardPage.styles';

ChartJS.register(ArcElement, Tooltip, Legend);

const DashboardPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const farms = useSelector((state: RootState) => state.farms.farms);

  useEffect(() => {
    dispatch(fetchFarms());
  }, [dispatch]);

  const totalFarms = farms.length;
  const totalArea = farms.reduce((acc, farm) => acc + (farm.totalArea || 0), 0);

  const farmsByState = farms.reduce((acc: Record<string, number>, farm) => {
    acc[farm.state] = (acc[farm.state] || 0) + 1;
    return acc;
  }, {});

  const stateData = {
    labels: Object.keys(farmsByState),
    datasets: [
      {
        data: Object.values(farmsByState),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50'],
      },
    ],
  };

  const farmsByCrop = farms.reduce((acc: Record<string, number>, farm) => {
    farm.crops.forEach((crop) => {
      acc[crop] = (acc[crop] || 0) + 1;
    });
    return acc;
  }, {});

  const cropData = {
    labels: Object.keys(farmsByCrop),
    datasets: [
      {
        data: Object.values(farmsByCrop),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#8E44AD'],
      },
    ],
  };

  const totalArableArea = farms.reduce(
    (acc, farm) => acc + (farm.arableArea || 0),
    0
  );
  const totalVegetationArea = farms.reduce(
    (acc, farm) => acc + (farm.vegetationArea || 0),
    0
  );

  const landUsageData = {
    labels: ['Área Agricultável', 'Vegetação'],
    datasets: [
      {
        data: [totalArableArea, totalVegetationArea],
        backgroundColor: ['#4CAF50', '#8BC34A'],
      },
    ],
  };

  const handleDelete = (id: string) => {
    dispatch(deleteFarmAsync(id));
  };

  const handleEdit = (id: string) => {
    navigate(`/farms/${id}/edit`);
  };

  return (
    <Container>
      <Title>Dashboard</Title>
      {totalFarms === 0 ? (
        <EmptyMessage>Não há fazendas cadastradas.</EmptyMessage>
      ) : (
        <>
          <BoxInfos>
            <StatsContainer>
              <StatCard>
                <h3>Total de Fazendas</h3>
                <p>{totalFarms}</p>
              </StatCard>
              <StatCard>
                <h3>Área Total (Hectares)</h3>
                <p>{totalArea} ha</p>
              </StatCard>
            </StatsContainer>
          </BoxInfos>
          <ChartArea>
            <ChartContainer>
              <h3>Fazendas por Estado</h3>
              <Pie data={stateData} />
            </ChartContainer>

            <ChartContainer>
              <h3>Fazendas por Cultura</h3>
              <Pie data={cropData} />
            </ChartContainer>

            <ChartContainer>
              <h3>Uso de Solo</h3>
              <Pie data={landUsageData} />
            </ChartContainer>
          </ChartArea>
          <FarmTable>
            <TableHeader>
              <tr>
                <th>Nome da Fazenda</th>
                <th>CPF/CNPJ</th>
                <th>Nome do Proprietário</th>
                <th>Cidade</th>
                <th>Estado</th>
                <th>Área Total (ha)</th>
                <th>Área Agricultável (ha)</th>
                <th>Área de Vegetação (ha)</th>
                <th>Culturas</th>
                <th>Ações</th>
              </tr>
            </TableHeader>
            <tbody>
              {farms.map((farm) => (
                <TableRow key={farm.id}>
                  <TableData>{farm.farmName}</TableData>
                  <TableData>{farm.cpfCnpj}</TableData>
                  <TableData>{farm.farmerName}</TableData>
                  <TableData>{farm.city}</TableData>
                  <TableData>{farm.state}</TableData>
                  <TableData>{farm.totalArea}</TableData>
                  <TableData>{farm.arableArea}</TableData>
                  <TableData>{farm.vegetationArea}</TableData>
                  <TableData>{farm.crops.join(', ')}</TableData>
                  <TableData>
                    <ButtonGroup>
                      <EditButton onClick={() => handleEdit(farm.id!)}>
                        Editar
                      </EditButton>
                      <DeleteButton onClick={() => handleDelete(farm.id!)}>
                        Excluir
                      </DeleteButton>
                    </ButtonGroup>
                  </TableData>
                </TableRow>
              ))}
            </tbody>
          </FarmTable>
        </>
      )}
    </Container>
  );
};

export default DashboardPage;
