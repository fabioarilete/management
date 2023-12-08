import { Route, Routes } from 'react-router-dom';
import Materials from '../pages/materials/Materials';
import MarkUps from '../pages/markUps/MarkUps';
import Operations from '../pages/operations/Operations';
import Costs from '../pages/costs/Costs';
import NewCost from '../pages/costs/new/NewCost';
import Informations from '../pages/informations/Informations';
import UpdateCost from '../pages/costs/update/UpdateCost';
// import Home from '../pages/Home/Home';

const AppRoutes = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="/costs" element={<Costs />} />
      <Route path="/newCost" element={<NewCost />} />
      <Route path="/costs/:id" element={<UpdateCost />} />
      <Route path="/materials" element={<Materials />} />
      <Route path="/operations" element={<Operations />} />
      <Route path="/markUps" element={<MarkUps />} />
      <Route path="/informations" element={<Informations />} />
    </Routes>
  );
};

export default AppRoutes;
