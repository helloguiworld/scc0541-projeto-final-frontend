import S from "./styles.module.scss";
import { useUser } from 'contexts/user';
import React, { useState } from 'react';
import { Navigate } from "react-router-dom";

import compare from "functions/compare";

import adminServices from "services/adminServices";
import escuderiaServices from "services/escuderiaServices";
import pilotoServices from "services/pilotoServices";

function Relatorios() {
    const user = useUser();
    // const [data, setData] = useState([]);
    const [report, setReport] = useState(0);
    const [inputText, setInputText] = useState("");
    const [alertText, setAlertText] = useState("Escolha uma opção de relatório");

    //TODO: Adicionar opções de relatórios e integrações relativas

    //Array de títulos (Cabeçalho))
    // const [titles, setTitles] = useState(['Título 1', 'Título 2', 'Título 3']);
    const [titles, setTitles] = useState([]);

    //Matriz de valores (devem estar ordenados)
    // const [values, setValues] = useState([["valor 1x1", "valor 1x2", "valor 1x3"], ["valor 2x1", "valor 2x2", "valor 2x3"]]);
    const [values, setValues] = useState([]);


    async function readReport1() {
        setReport(1);
        const response = await adminServices.report1();
        if (response.status === 200) {
            setAlertText("");
            setTitles(['Status', 'Contagem']);
            setValues(Object.entries(response.data).sort((a, b) => compare(a[0], b[0])));
        } else
            alert("Erro ao ler relatório 1, tente novamente!");
    }

    async function readReport2() {
        const response = await adminServices.report2(inputText);
        if (response.status === 200) {
            if (response.data.length) {
                setAlertText("");
                // setTitles(['Cidade', 'Código IATA', 'Nome do Aeroporto', 'Cidade do Aeroporto', 'Distância', 'Tipo']);
                setTitles(['Cidade', 'Nome do Aeroporto', 'Cidade do Aeroporto', 'Distância (Km)']);
                setValues(response.data.map(item => [
                    inputText,
                    item["Nome do Aeroporto"],
                    item["Nome da Cidade"],
                    item["Distância [km]"]
                ]));
            } else {
                setValues([]);
                setAlertText(`Nenhum aeroporto encontrado para ${inputText}`);
            }
        } else
            alert("Erro ao ler relatório 2, tente novamente!");
    }

    async function readReport3() {
        setReport(3);
        const response = await escuderiaServices.report3(user?.original_id);
        if (response.status === 200) {
            setAlertText("");
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
        setReport(4);
        const response = await escuderiaServices.report4(user?.original_id);
        if (response.status === 200) {
            setAlertText("");
            setTitles(['Status', 'Contagem']);
            setValues(Object.entries(response.data).sort((a, b) => compare(a[0], b[0])));
        } else
            alert("Erro ao ler relatório 4, tente novamente!");
    }

    async function readReport5() {
        setReport(5);
        const response = await pilotoServices.report5(user?.original_id);
        if (response.status === 200) {
            setAlertText("");
            setTitles(['Ano', 'Corrida', 'Vitórias']);
            setValues(response.data.map(item => [
                item["Ano"] ? item["Ano"] : "",
                item["Nome da Corrida"] ? item["Nome da Corrida"] : "",
                item["Vitórias"]
            ]).sort((a, b) => compare(`${a[0]} ${a[1]}`, `${b[0]} ${b[1]}`)));
        } else
            alert("Erro ao ler relatório 5, tente novamente!");
    }

    async function readReport6() {
        setReport(6);
        const response = await pilotoServices.report6(user?.original_id);
        if (response.status === 200) {
            setAlertText("");
            setTitles(['Status', 'Contagem']);
            setValues(Object.entries(response.data).sort((a, b) => compare(a[0], b[0])));
        } else
            alert("Erro ao ler relatório 6, tente novamente!");
    }

    return (
        <>
            {!user && <Navigate to="/login" />}
            <section className="section-view">
                <h1>Página de relatorios do usuário {user?.username}</h1>
                <div className={S.reports}>
                    <div className={S.buttonsReport}>
                        {user?.role === "Administrador" && (
                            <>
                                <button type='button' onClick={readReport1}>
                                    Resultado por status
                                </button>
                                <button type='button' onClick={() => {
                                    if (report !== 2) {
                                        setReport(2);
                                        setValues([]);
                                        setAlertText("Digite o nome de uma cidade!");
                                    }
                                }}>
                                    Aeroporto por cidade
                                </button>
                            </>
                        )}

                        {user?.role === "Escuderia" && (
                            <>
                                <button type='button' onClick={readReport3}>
                                    Pilotos em 1ª posição
                                </button>
                                <button type='button' onClick={readReport4}>
                                    Resultados por status
                                </button>
                            </>
                        )}

                        {user?.role === "Piloto" && (
                            <>
                                <button type='button' onClick={readReport5}>
                                    Quantidade de vitórias
                                </button>
                                <button type='button' onClick={readReport6}>
                                    Resultados por status
                                </button>
                            </>
                        )}
                    </div>

                    <div className={S.tableContainer}>
                        {
                            report === 2 ?
                                <div className={S.tableSearch}>
                                    <label htmlFor="">Cidade:</label>
                                    <input type="text" onChange={e => setInputText(e.target.value)} />
                                    <button type="button" onClick={readReport2}>Pesquisar</button>
                                </div>
                                : null
                        }

                        {alertText ? <span className={S.tableMessage}>{alertText}</span> : null}

                        {
                            values && values.length ?
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
                                : null
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default Relatorios