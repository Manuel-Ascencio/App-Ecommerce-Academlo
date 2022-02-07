import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import { ProtectedRoutes, NavBar, MainLayout } from "./components";
import { Login, Shop, ShopDetails, AddToCart } from "./pages";
import { useSelector } from "react-redux";


function App() {

  const isLoading = useSelector(state => state.isLoading)

  return (
    <div className="App">
      <HashRouter>

        { isLoading && <div className="loader-container"><div className="loader">Loading...</div></div>}

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/shop" />} />
          <Route element={<ProtectedRoutes />}>
            <Route element={<MainLayout />}>
              <Route path="/shop" element={<Shop />} />
              <Route path="/shop/:id" element={<ShopDetails />} />
              <Route path="/cart" element={<AddToCart />} />
            </Route>
          </Route>
        </Routes>
        
      </HashRouter>
    </div>
  );
}

export default App;
