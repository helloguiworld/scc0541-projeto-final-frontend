import S from "./styles.module.scss";
import { useUser } from 'contexts/user';
import React, { useState, useEffect } from 'react';

import compare from "functions/compare";

import adminServices from "services/reports/adminServices";
import escuderiaServices from "services/reports/escuderiaServices";
import pilotoServices from "services/reports/pilotoServices";

function Relatorios() {
    const user = useUser();
    const [data, setData] = useState([]);

    //TODO: Adicionar opções de relatórios e integrações relativas

    //Array de títulos (Cabeçalho))
    const [titles, setTitles] = useState(['Título 1', 'Título 2', 'Título 3']);

    //Matriz de valores (devem estar ordenados)
    const [values, setValues] = useState([["valor 1x1", "valor 1x2", "valor 1x3"], ["valor 2x1", "valor 2x2", "valor 2x3"]]);

    //Array de larguras (devem estar ordenados e cada unidade equivale a 120px)
    const [widths, setWidths] = useState([1, 1, 1]);

    useEffect(() => {
        // readReport1();
    }, []);

    async function readReport1() {
        const response = await adminServices.report1();
        if (response.status === 200) {
            setTitles(['Status', 'Contagem']);
            setValues(Object.entries(response.data));
        } else
            alert("Erro ao ler relatório 1, tente novamente!");
    }

    async function readReport2() {
        const response = await adminServices.report2("Guarulhos");
        if (response.status === 200) {
            // setTitles(['Cidade', 'Código IATA', 'Nome do Aeroporto', 'Cidade do Aeroporto', 'Distância', 'Tipo']);
            setTitles(['Cidade', 'Nome do Aeroporto', 'Cidade do Aeroporto', 'Distância']);
            setValues(response.data.map(item => ["Guarulhos",
                item["Nome do Aeroporto"],
                item["Nome da Cidade"],
                item["Distância [km]"]
            ]));
        } else
            alert("Erro ao ler relatório 2, tente novamente!");
    }

    async function readReport3() {
        const response = await escuderiaServices.report3(1);
        if (response.status === 200) {
            setTitles(['ID', 'Nome completo', 'Vitórias']);
            setValues(response.data.map(item => [
                item["driverId"],
                `${item["forename"]} ${item["surname"]}`,
                item["poles"] ? item["poles"] : 0
            ]));
        } else
            alert("Erro ao ler relatório 3, tente novamente!");
    }

    async function readReport4() {
        const response = await escuderiaServices.report4(1);
        if (response.status === 200) {
            setTitles(['Status', 'Contagem']);
            setValues(Object.entries(response.data));
        } else
            alert("Erro ao ler relatório 4, tente novamente!");
    }

    async function readReport5() {
        const response = await pilotoServices.report5(12);
        if (response.status === 200) {
            setTitles(['Ano', 'Corrida', 'Vitórias']);
            setValues(response.data.map(item => [
                item["Ano"] ? item["Ano"] : "TODOS OS ANOS",
                item["Nome da Corrida"] ? item["Nome da Corrida"] : "TODAS AS CORRIDAS",
                item["Vitórias"]
            ]));
        } else
            alert("Erro ao ler relatório 5, tente novamente!");
    }

    async function readReport6() {
        const response = await pilotoServices.report6(12);
        if (response.status === 200) {
            setTitles(['Status', 'Contagem']);
            setValues(Object.entries(response.data));
        } else
            alert("Erro ao ler relatório 6, tente novamente!");
    }

    return (
        <section className="section-view">
            <h1>Página de relatorios do usuário {user?.username}</h1>
            <div className={S.reports}>
                <div className={S.buttonsReport}>

                    {user?.role === "admin" && (
                        <>
                            <button type='button' onClick={readReport1}>
                                Resultado por status
                            </button>
                            <button type='button' onClick={readReport2}>
                                Aeroporto por cidade
                            </button>
                        </>
                    )}
                    {user?.role === "driver" && (
                        <>
                            <button type='button' onClick={readReport3}>
                                Quantidade de vitórias
                            </button>
                            <button type='button' onClick={readReport4}>
                                Resultados por status
                            </button>
                        </>
                    )}
                    {/* {user?.role === "constructor" && (
                        <> */}
                    <button type='button' onClick={readReport5}>
                        Pilotos em 1ª posição
                    </button>
                    <button type='button' onClick={readReport6}>
                        Resultados por status
                    </button>
                    {/* </>
                    )} */}
                </div>

                <div className={S.tableContainer}>
                    <table>
                        <thead>
                            <tr>
                                {titles.map((title, index) => {
                                    return (
                                        <th key={index} className={"3widht"}>{title}</th>
                                    )
                                })}
                            </tr>
                        </thead>

                        <tbody>
                            {
                                values.map((item, index) => (
                                    <tr key={index}>
                                        {
                                            item.map((text, index) => (
                                                <td key={index} className={"3widht"}>{text}</td>
                                            ))
                                        }
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}

export default Relatorios