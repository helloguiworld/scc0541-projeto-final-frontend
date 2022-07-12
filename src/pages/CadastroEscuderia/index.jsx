import S from "./styles.module.scss";
import { useState } from "react";
import { useUser } from 'contexts/user'
import { useNavigate } from "react-router-dom";

function CadastroEscuderia(){
    const navigate = useNavigate()
    const [error, setError] = useState(null);
    const user = useUser();

    // Executa o submit do form
    const handleSubmit = async (ev) => {
        ev.preventDefault();
        setError(null);

        const form = ev.target;
        const data = new FormData(form);

        const constructorRef = data.get("constructorRef");
        const name = data.get("name");
        const nationality = data.get("nationality");
        const url = data.get("url");

        //TODO: integração

        navigate('/overview');
    }

    return (
        <section className={`container ${S.wrapper}`}>
            <div className={S.card}>
                <form method="post" onSubmit={handleSubmit}>
                    <div className={S.form_group}>
                        <label htmlFor="text">ConstructorRef <span className="warning">*</span></label>
                        <input type="text" name="constructorRef" id="constructorRef" required />
                    </div>
                    <div className={S.form_group}>
                        <label htmlFor="password">Senha <span className="warning">*</span></label>
                        <input type="text" name="name" id="name" required />
                    </div>
                    <div className={S.form_group}>
                        <label htmlFor="password">Nationality <span className="warning">*</span></label>
                        <input type="text" name="nationality" id="nationality" required />
                    </div>
                    <div className={S.form_group}>
                        <label htmlFor="password">URL <span className="warning">*</span></label>
                        <input type="text" name="url" id="url" required />
                    </div>
                    <button type="submit">Cadastrar escuderias</button>
                </form>
                {error && (<p className={`warning ${S.error}`}>{error}</p>)}
            </div>
        </section>
    )
}

export default CadastroEscuderia