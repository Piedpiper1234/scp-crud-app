import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavMenu from './components/NavMenu';
import ItemDetail from './components/ItemDetail';
import AdminPanel from './components/AdminPanel';
function App() {
  return (
    <Router>
      <NavMenu />
      <Routes>
        <Route path="/" element={<h1>Welcome to the SCP CRUD Application</h1>} />
        <Route path="/item/:id" element={<ItemDetail />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;
