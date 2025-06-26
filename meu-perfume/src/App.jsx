import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Wishlist from "./pages/Wishlist";
import AddPerfume from "./pages/AddPerfume";
import Collection from "./pages/Collection";
import AddToCollection from "./pages/AddToCollection"; // nova importação
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Rotas públicas */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        php-template
        Copiar
        Editar
        {/* Rotas protegidas */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          }
        />
        <Route
          path="/wishlist/add"
          element={
            <ProtectedRoute>
              <AddPerfume />
            </ProtectedRoute>
          }
        />
        <Route
          path="/collection"
          element={
            <ProtectedRoute>
              <Collection />
            </ProtectedRoute>
          }
        />
        <Route
          path="/collection/add"
          element={
            <ProtectedRoute>
              <AddToCollection />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;