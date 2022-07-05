import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { UserProvider } from "contexts/user";

import Login from "pages/Login";
import Overview from "pages/Overview";
import Relatorios from "pages/Relatorios";

import "global.scss";

/* Router and default layout (Header and footer) */
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
          </Routes>
        </main>   
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
