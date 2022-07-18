import S from "./styles.module.scss";
import { useState } from "react";
import { useUser } from 'contexts/user'
import { Navigate } from "react-router-dom";

import escuderiaServices from "services/escuderiaServices";

function PesquisaPiloto() {
    const [error, setError] = useState(null);
    const [result, setResult] = useState(null);

    const user = useUser();


    // Executa o submit do form
    const handleSubmit = async (ev) => {
        ev.preventDefault();
        setError(null);

        const form = ev.target;
        const data = new FormData(form);

        const name = data.get("name");

        const response = await escuderiaServices.getEscuderiaDriver(1, name);
        if (response.status !== 200 || response.data.length === 0) {
            setResult(null);
            setError("Piloto não encontrado");
        } else
            setResult({
                name: `${response.data[0][0]} ${response.data[0][1]}`,
                dateOfBirth: response.data[0][2].split('-').reverse().join('/'),
                nationality: response.data[0][3] 
            });
    }

    return (
        <>
            {!user && <Navigate to="/login" />}
            <section className={`container ${S.wrapper}`}>
                <div className={S.card}>
                    <form method="post" onSubmit={handleSubmit}>
                        <div className={S.form_group}>
                            <label htmlFor="text">Nome do Piloto <span className="warning">*</span></label>
                            <input type="text" name="name" id="name" required />
                        </div>
                        <button type="submit">Verificar se há piloto</button>
                    </form>
                    {error && (<p className={`warning ${S.error}`}>{error}</p>)}
                    {result && (
                        <div className={S.results}>
                            <div>
                                <p>Nome Completo</p>
                                <p>{result.name}</p>
                            </div>
                            <div>
                                <p>Data de nascimento</p>
                                <p>{result.dateOfBirth}</p>
                            </div>
                            <div>
                                <p>Nacionalidade</p>
                                <p>{result.nationality}</p>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </>
    )
}

export default PesquisaPiloto