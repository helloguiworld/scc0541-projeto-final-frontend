import S from "./styles.module.scss";
import { useState } from "react";
import { useUser } from 'contexts/user'
import { useNavigate } from "react-router-dom";

function PesquisaPiloto(){
    const navigate = useNavigate()
    const [error, setError] = useState(null);
    const [result, setResult] = useState(null);

    const user = useUser();

    // Executa o submit do form
    const handleSubmit = async (ev) => {
        ev.preventDefault();
        setError(null);
        setResult(null);


        const form = ev.target;
        const data = new FormData(form);

        const name = data.get("name");

        //TODO: integração

        //Não encontrado
        if(false)
            setError("Piloto não encontrado")
        else
            setResult({
                name: "João Nomecriativo",
                dateOfBirth: "31/02/1830",
                nationality: "Alienígena"
            })
    }

    return (
        <section className={`container ${S.wrapper}`}>
            <div className={S.card}>
                <form method="post" onSubmit={handleSubmit}>
                    <div className={S.form_group}>
                        <label htmlFor="text">Nome do Piloto pertencente a escuderia <span className="warning">*</span></label>
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
    )
}

export default PesquisaPiloto