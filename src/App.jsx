import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { UserProvider } from "contexts/user";

import Login from "pages/Login";
import Overview from "pages/Overview";
import Relatorios from "pages/Relatorios";
import CadastroEscuderia from "pages/CadastroEscuderia";
import CadastroPiloto from "pages/CadastroPiloto";
import PesquisaPiloto from "pages/PesquisaPiloto";
import PesquisaEscuderia from "pages/PesquisaEscuderia";

import "global.scss";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <main>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/relatorios" element={<Relatorios />} />
            <Route path="/cadastro/escuderia" element={<CadastroEscuderia />} />
            <Route path="/cadastro/piloto" element={<CadastroPiloto />} />
            <Route path="/pesquisa/piloto" element={<PesquisaPiloto />} />
            <Route path="/pesquisa/escuderia" element={<PesquisaEscuderia />} />
          </Routes>
        </main>   
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
