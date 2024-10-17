import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardPage from '../Pages/DashboardPage/DashBoardPage';
import FarmPage from '../Pages/FarmPage/FarmPage';
import EditFarmPage from '../Pages/FarmPage/EditFarmPage';
import Layout from '../Pages/Layout/Layout';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/farms" element={<FarmPage />} />
          <Route path="/farms/:id/edit" element={<EditFarmPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
