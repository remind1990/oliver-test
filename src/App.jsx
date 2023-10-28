import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AppLayout from './pages/AppLayout';
import Home from './pages/Home';
import PageNotFound from './pages/PageNotFound';
import EditPanel from './pages/EditPanel';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Navigate replace to="home" />} />
        <Route element={<AppLayout />}>
          <Route path="home" element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="dashboard/:id" element={<EditPanel />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
