import { Route, Routes } from 'react-router-dom';
import Materials from '../pages/materials/Materials';
import MarkUps from '../pages/markUps/MarkUps';
import Operations from '../pages/operations/Operations';
// import Home from '../pages/Home/Home';
// import Costs from '../pages/Products/Costs/Costs';
// import NewCost from '../pages/Products/Costs/new/NewCost';

const AppRoutes = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<Home />} /> */}
      {/* <Route path="/products" element={<Costs />} /> */}
      {/* <Route path="/newCost" element={<NewCost />} /> */}
      <Route path="/materialsList" element={<Materials />} />
      <Route path="/operationsList" element={<Operations />} />
      <Route path="/markUpsList" element={<MarkUps />} />
    </Routes>
  );
};

export default AppRoutes;
