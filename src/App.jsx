import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavMenu from './components/NavMenu';
import ItemDetail from './components/ItemDetail';
import AdminPanel from './components/AdminPanel';
import './App.css';

function App() {
  return (
    <Router>
      <NavMenu />

      <Routes>
        <Route
          path="/"
          element={
            <div className="home-page">
              <h1>Welcome to the SCP CRUD Application</h1>

              <img
                src="/images/Home_pic.png"
                alt="SCP Home"
                className="home-image"
              />

              <p className="home-text">
                Browse SCP records, view containment procedures, and manage
                entries through the Admin Panel.
              </p>
            </div>
          }
        />

        <Route path="/item/:id" element={<ItemDetail />} />

        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;