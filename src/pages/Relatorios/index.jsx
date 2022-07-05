import S from "./styles.module.scss";
import { useUser } from 'contexts/user';
import { Navigate } from 'react-router-dom';

function Relatorios() {
    const user = useUser();

    let relatorio = [
        [
            "teste",
            "valor",
            3
        ],
        [
            "teste novo",
            "outro valor",
            4
        ]
    ]

    return (
        <>
            {/* { !Boolean(user) && <Navigate to="/login" /> } */}
            <h1>Página de relatorios do usuário {user?.username}</h1>
            <table>
                <thead>
                    <tr>
                        <th>titulo 1</th>
                        <th>titulo 2</th>
                        <th>titulo 3</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        relatorio.map((item, index) => (
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
        </>
    )
}

export default Relatorios