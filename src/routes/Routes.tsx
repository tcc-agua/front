import React from 'react';
import Initial from '../pages/Initial/Initial';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute/PrivateRoute';
import { Dashboards } from '../pages/Dashboards/Dashboards';
import { Map } from '../pages/Map/Map';
import { Collect } from '../pages/Collect/Collect';
import { PointCollect } from '../pages/PointCollect/PointCollect';
import Historic from '../pages/Historic/Historic';
import ExportExcel from '../pages/ExportExcel/ExportExcel';
import Login from '../pages/Login/Login';
import NotFound from '../pages/NotFound/NotFound';
import SplashPage from '../pages/Splash/Splash';
import { LastActivities } from '../pages/LastActivities/LastActivities';
import { useAuth } from '../hooks/useAuth';

const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/inicial" element={<Initial />}>
        {/* Rotas protegidas */}
        <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
            <Route index element={<Dashboards />} />
            <Route path='mapa' element={<Map />} />
            <Route path='coleta_de_dados' element={<Collect />} />
            <Route path='pontos_de_coleta' element={<PointCollect />} />
            <Route path='historico' element={<Historic />} />
            <Route path='exportar_excel' element={<ExportExcel />} />
            <Route path='ultimas_atividades' element={<LastActivities />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
