
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductListPage from "./pages/ProductListPage";
import AddEditProductPage from "./pages/AddEditProductPage";
const App = () => {
  return (
    <Router>
      <div className="app-container">
        {/* <Navbar /> Thêm Navbar vào đây */}
        <Routes>
          <Route path="/product-crud" element={<ProductListPage />} />
          <Route path="/product-crud/create-product" element={<AddEditProductPage />} />
          <Route path="/product-crud/edit-product/:id" element={<AddEditProductPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
