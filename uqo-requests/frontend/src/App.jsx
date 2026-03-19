import { Routes, Route} from "react-router-dom";
import LoginLogiq from "./components/LoginLogiq";
import Register from "./components/Register";
import DemandeDetail from "./components/DemandeDetail"
import Header from "./components/Header"
import HomePage from "./components/HomePage"
import CreationFormulaire from "./components/creationFormulaire";
import DashboardPage from "./components/DashboardPage";
import NotFound from "./components/NotFound"


function App() {
  return (
    <>
    <Header />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/req-form" element={<CreationFormulaire />} />
      <Route path="/login" element={<LoginLogiq />} />
      <Route path="/register" element={<Register />} />
      <Route path="/request-detail" element={<DemandeDetail />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/dashboard" element={<DashboardPage />} />

      
    </Routes>
    
    </>
  );
}

export default App;
