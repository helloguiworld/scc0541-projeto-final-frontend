import S from "./styles.module.scss";
import { useUser, useSetUser } from 'contexts/user';
import { Navigate, Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import userimage from "../../images/Vector.png";
// import overviewData from "../../contexts/overview-data";

import adminServices from "services/adminServices";
import escuderiaServices from "services/escuderiaServices";
import pilotoServices from "services/pilotoServices";

function Overview() {
    const user = useUser();
    const setUser = useSetUser();
    const [data, setData] = useState([]);

    useEffect(() => {
        // eslint-disable-next-line default-case
        switch (user?.role) {
            case "Administrador":
                adminOverview();
                break;
            case "Escuderia":
                escuderiaOverview();
                break;
            case "Piloto":
                pilotoOverview();
                break;
        }
    }, []);

    async function adminOverview() {
        const response = await adminServices.overview();
        if (Object.keys(response).length) {
            setData([
                ["Pilotos cadastrados", response.drivers_count],
                ["Escuderias cadastradas", response.constructors_count],
                ["Corridas cadastradas", response.races_count],
                ["Temporadas cadastradas", response.seasons_count],
            ]);
        } else
            alert("Erro ao ler Overview do admin, tente novamente!");
    }

    async function escuderiaOverview() {
        const response = await escuderiaServices.overview(1);
        if (Object.keys(response).length) {
            setData([
                ["Vitórias da escuderia", response.wins],
                ["Pilotos que já correram pela escuderia", response.drivers],
                ["Primeiro ano de registro da escuderia", response.first_year],
                ["Último ano de registro da escuderia", response.last_year],
            ]);
        } else
            alert("Erro ao ler Overview da escuderia, tente novamente!");
    }

    async function pilotoOverview() {
        const response = await pilotoServices.overview(1);
        if (Object.keys(response).length) {
            setData([
                ["Vitórias do piloto", response.wins],
                ["Primeiro ano de registro do piloto", response.first_year],
                ["Último ano de registro do piloto", response.last_year],
            ]);
        } else
            alert("Erro ao ler Overview do piloto, tente novamente!");
    }

    function logout() {
        setUser(null);
    }

    return (
        <>
            {!user && <Navigate to="/login" />}
            <section className={S.overview}>
                <div className={S.usercolumn}>
                    <div className={S.username}>
                        <img alt="user" src={userimage} />
                        <div >{user?.username}</div>
                    </div>
                    <div className={S.ovbutton}>
                        <Link to="/relatorios">Acessar relatórios</Link>

                        {user?.role === "Administrador" && (
                            <>
                                <Link to="/cadastro/escuderia">Cadastrar escuderia</Link>
                                <Link to="/cadastro/piloto">Cadastrar piloto</Link>
                            </>
                        )}

                        {user?.role === "Escuderia" && (
                            <Link to="/pesquisa/piloto">Consultar por <i>Forename</i></Link>
                        )}

                        <button type="button" className="red" onClick={logout}>Logout</button>
                    </div>
                </div>

                <div className={S.overviewInfo}>
                    {data.map((item, index) => (
                        <div key={index}>
                            <p>{item[0]}</p>
                            <p>{item[1]}</p>
                        </div>
                    ))}
                </div>
            </section>
        </>
    )
}

export default Overview