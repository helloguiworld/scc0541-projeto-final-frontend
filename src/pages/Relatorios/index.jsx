import S from "./styles.module.scss";
import { useUser } from 'contexts/user';
import React, { useState, useEffect } from 'react';

import adminServices from "services/reports/adminServices";

function Relatorios() {
    const user = useUser();
    const [data, setData] = useState([]);

    //TODO: Adicionar opções de relatórios e integrações relativas

    //Array de títulos (Cabeçalho))
    const [titles, setTitles] = useState(['Título 1', 'Título 2', 'Título 3']);

    //Matriz de valores (devem estar ordenados)
    const [values, setValues] = useState([["valor 1x1", "valor 1x2", "valor 1x3"], ["valor 2x1", "valor 2x2", "valor 2x3"]]);

    useEffect(() => {
        adminServices.report1();
    }, []);

    async function readReport1() {
        const response = await adminServices.report1();
        if (response.status === 200) {
            // setStudentInfos(response.data);
            console.log("Great");
            // setTitles(['Título 1', 'Título 2', 'Título 3']);
            // setValues([[], []]);
        } else
            alert("Erro ao ler relatório 1, tente novamente!");
    }

    async function readReport2() {
        const response = await adminServices.report1();
        if (response.status === 200) {
            // setStudentInfos(response.data);
            console.log("Great");
            // setTitles(['Título 1', 'Título 2', 'Título 3']);
            // setValues([[], []]);
        } else
            alert("Erro ao ler relatório 2, tente novamente!");
    }

    async function readReport3() {
        const response = await adminServices.report1();
        if (response.status === 200) {
            // setStudentInfos(response.data);
            console.log("Great");
            // setTitles(['Título 1', 'Título 2', 'Título 3']);
            // setValues([[], []]);
        } else
            alert("Erro ao ler relatório 3, tente novamente!");
    }

    async function readReport4() {
        const response = await adminServices.report1();
        if (response.status === 200) {
            // setStudentInfos(response.data);
            console.log("Great");
            // setTitles(['Título 1', 'Título 2', 'Título 3']);
            // setValues([[], []]);
        } else
            alert("Erro ao ler relatório 4, tente novamente!");
    }

    async function readReport5() {
        const response = await adminServices.report1();
        if (response.status === 200) {
            // setStudentInfos(response.data);
            console.log("Great");
            // setTitles(['Título 1', 'Título 2', 'Título 3']);
            // setValues([[], []]);
        } else
            alert("Erro ao ler relatório 5, tente novamente!");
    }

    async function readReport6() {
        const response = await adminServices.report1();
        if (response.status === 200) {
            // setStudentInfos(response.data);
            console.log("Great");
            // setTitles(['Título 1', 'Título 2', 'Título 3']);
            // setValues([[], []]);
        } else
            alert("Erro ao ler relatório 6, tente novamente!");
    }

    return (
        <>
            <h1>Página de relatorios do usuário {user?.username}</h1>
            <div className={S.reports}>
                <div className={S.buttonsReport}>
                    {user?.role === "admin" && (
                        <>
                            <button type='button' onClick={readReport1}>
                                Resultado por Status
                            </button>
                            <button type='button' onClick={readReport2}>
                                Aeroporto por cidade
                            </button>
                        </>
                    )}
                    {user?.role === "driver" && (
                        <>
                            <button type='button' onClick={readReport3}>
                                Quantidade de Vitórias
                            </button>
                            <button type='button' onClick={readReport4}>
                                Resultados por status
                            </button>
                        </>
                    )}
                    {user?.role === "constructor" && (
                        <>
                            <button type='button' onClick={readReport5}>
                                Pilotos em Primeira Posição
                            </button>
                            <button type='button' onClick={readReport6}>
                                Resultados por status
                            </button>
                        </>
                    )}
                </div>
                <table>
                    <thead>
                        <tr>
                            {titles.map((title, index) => {
                                return (
                                    <th key={index}>{title}</th>
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
                                            <td key={index}>{text}</td>
                                        ))
                                    }
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Relatorios