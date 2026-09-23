import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AddService from "./pages/AddService";
import EditService from "./pages/EditService";
import ServiceDetails from "./pages/ServiceDetails";
import Services from "./pages/Services";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";

function App() {
  return (
    <div className="app-shell">
      <Header />
      <main className="app-main">
        <div className="app-container">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/add-service" element={<AddService />} />
            <Route path="/edit-service/:id" element={<EditService />} />
            <Route path="/service-details/:id" element={<ServiceDetails />} />
            <Route path="/services" element={<Services />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
