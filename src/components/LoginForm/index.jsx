import S from "./styles.module.scss";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useUser, useSetUser } from "contexts/user";

import loginServices from "services/loginServices";

function LoginForm() {
    const [error, setError] = useState(null);
    const user = useUser();
    const setUser = useSetUser();
    const navigate = useNavigate();

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        setError(null);

        const form = ev.target;
        const data = new FormData(form);
        const username = data.get("username");
        const password = data.get("password");

        const response = await loginServices.login(username, password);
        if (response.status === 200) {
            try {
                setUser(response.data);
            }
            catch (err) {
                console.log(err);
                setError(err.response.data.detail);
            }
        } else
            alert("Erro ao efetuar login!");
    }

    return (
        <section className={`container ${S.wrapper}`}>
            <h2>Sistema Fórmula 1 - Grupo 10</h2>
            <div className={S.card}>
                {user ? <p>{JSON.stringify(user) + "Remove isso depois"}</p> : null}
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