import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import InputPage from "./pages/InputPage";
import Reports from "./pages/Reports";
import Assistant from "./pages/Assistant";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import "./App.css";

/* Layout component for all pages */
const AppLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="appContainer">
      <button className="mobileMenuBtn" onClick={toggleSidebar}>
        ☰
      </button>
      <Sidebar isOpen={isSidebarOpen} closeSidebar={() => setIsSidebarOpen(false)} />
      <div className="mainContent">
        <Navbar />
        {children}
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <AppLayout>
            <Dashboard />
          </AppLayout>
        } />

        <Route path="/input" element={
          <AppLayout>
            <InputPage />
          </AppLayout>
        } />

        <Route path="/reports" element={
          <AppLayout>
            <Reports />
          </AppLayout>
        } />

        <Route path="/assistant" element={
          <AppLayout>
            <Assistant />
          </AppLayout>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
