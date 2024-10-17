import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100%;
  max-width: 1440px;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  padding: 20px;
  background: #f1f1f1;
  min-height: 100vh;
  margin: 50px auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;

export const Title = styled.h2`
  margin-bottom: 20px;
  color: #1b51de;
  width: 100%;
  text-align: center;
`;
export const BoxInfos = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const StatsContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 40px;
`;

export const StatCard = styled.div`
  background-color: #fff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;

  h3 {
    margin-bottom: 10px;
  }
`;

export const ChartContainer = styled.div`
  background-color: #fff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

export const ChartArea = styled.ul`
  display: flex;
  gap: 20px;
`;
export const FarmList = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
  h3 {
    margin-bottom: 20px;
  }
`;

export const FarmItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const FarmName = styled.span`
  font-weight: 500;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

export const EditButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

export const DeleteButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #e53935;
  }
`;

export const EmptyMessage = styled.p`´
  width:100%;
  font-size: 18px;
  color: #777;
  margin-top: 20px;
`;

export const FarmTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

export const TableHeader = styled.thead`
  background-color: #f0f0f0;
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

export const TableData = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
  text-align: center;
`;
