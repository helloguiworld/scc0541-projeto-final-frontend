import S from "./styles.module.scss";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useUser, useSetUser } from "contexts/user";


function LoginForm() {
    const [error, setError] = useState(null);
    const setUser = useSetUser();
    const user = useUser();
    const navigate = useNavigate();

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        setError(null);

        const form = ev.target;
        const data = new FormData(form);
        const username = data.get("username");
        const password = data.get("password");

        try {
            setUser({ username, tipo: "Usuario" });
        }
        catch (err) {
            console.log(err)
            setError(err.response.data.detail);
        }
    }

    return (
        <section className={`container ${S.wrapper}`}>
            <h2>Sistema Fórmula 1 - Grupo 10</h2>
            <div className={S.card}>
                { user ? <p>{JSON.stringify(user) + "Remove isso depois"}</p> : null }
                <form method="post" onSubmit={handleSubmit}>
                    <div className={S.form_group}>
                        <label htmlFor="text">Nome de usuário <span className="warning">*</span></label>
                        <input type="text" name="username" id="username" required />
                    </div>
                    <div className={S.form_group}>
                        <label htmlFor="password">Senha <span className="warning">*</span></label>
                        <input type="password" name="password" id="password" required />
                    </div>
                    <button type="submit">Entrar</button>
                </form>
                {error && (<p className={`warning ${S.error}`}>{error}</p>)}
            </div>
        </section>
    )
}

export default LoginForm;