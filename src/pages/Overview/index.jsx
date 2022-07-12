import S from "./styles.module.scss";
import { useUser } from 'contexts/user';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import userimage from "../../images/Vector.png"

function Overview() {
    const user = useUser();
    const [data, setData] = useState([])

    useEffect(() => {
        //Funcão redefinida de acordo com a role
        //Obtém os dados da API
        let fetchData = async () => {};

        switch(user?.role){
            case "admin":
                fetchData = async () => {
                    //TODO: consultar API
                    setData([
                        {
                            question: "Quantidade de pilotos cadastrados",
                            answer: 76
                        },
                        {
                            question: "Quantidade de escuderias cadastradas",
                            answer: 76
                        },
                        {
                            question: "Quantidade de corridas cadastradas",
                            answer: 76
                        },
                        {
                            question: "Quantidade de temporadas (seasons) cadastradas ",
                            answer: 76
                        }
                    ])
                }
                break;
            case "driver":
                fetchData = async () => {
                    //TODO: consultar API
                    setData([
                        {
                            question: "Quantidade de vitórias do piloto ",
                            answer: 10
                        },
                        {
                            question: "Primeiro ano",
                            answer: 10
                        },
                        {
                            question: "Último ano",
                            answer: 10
                        }
                    ])
                }
                break;
            case "constructor":
                fetchData = async () => {
                    //TODO: consultar API
                    setData([
                        {
                            question: "Quantidade de vitórias da escuderia ",
                            answer: 10
                        },
                        {
                            question: "Quantidade de pilotos diferentes que já correram pela escuderia ",
                            answer: 10
                        },
                        {
                            question: "Primeiro ano",
                            answer: 10
                        },
                        {
                            question: "Último ano",
                            answer: 10
                        }
                    ])
                }
                break;
        }
        fetchData();
    }, [user])

    function retHello(){
        alert("Hello");
    }

    return (
        <>
            <section className={S.overview}>
                <div className={S.usercolumn}>
                    <div className={S.username}>
                        <img alt="user" src={userimage} />
                        <div >{user?.username}</div>
                    </div>
                    <div className={S.ovbutton}>
                        {user?.role === "admin" && (
                            <>
                                
                                <Link to="/relatorios">Acessar Relatórios</Link>
                                <Link to="/cadastro/escuderia">Cadastrar Escuderias</Link>
                                <Link to="/cadastro/piloto">Cadastrar Pilotos</Link>
                            </>
                        )}

                        {user?.role === "driver" && (
                            <>
                                <button onClick={(retHello)}>Relatório 1</button>
                                <Link to="/relatorios">Acessar Relatórios</Link>
                                <Link to="/pesquisa/piloto">Consultar por Forename</Link>
                            </>
                        )}

                        {user?.role === "constructor" && (
                            <>
                                <Link to="/relatorios">Acessar Relatórios</Link>
                                <Link to="/pesquisa/escuderia">Consultar por Forename</Link>
                            </>
                        )}
                    </div>
                </div>

                <div className={S.overviewInfo}>
                    {data.map((item, index) => (
                        <div key={index}>
                            <p>{item.question}</p>
                            <p>{item.answer}</p>
                        </div>
                    ))}
                </div>
            </section>
        </>
    )
}

export default Overview