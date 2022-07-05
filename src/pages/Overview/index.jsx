import S from "./styles.module.scss";
import { useUser } from 'contexts/user';
import { Navigate } from 'react-router-dom';
import React from 'react'
import userimage from "../../images/Vector.png"
import overviewData from "../../contexts/overview-data"

function Overview() {
    const user = useUser();

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
                        <a href="/relatorios">Acessar Relatórios</a>
                        <a href="#">Consultar por Forename</a>
                    </div>
                </div>

                <div className={S.overviewInfo}>
                    {overviewData.map((item, index) => (
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