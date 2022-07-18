import S from "./styles.module.scss";
import { useState } from "react";
import { useUser } from 'contexts/user'
import { useNavigate } from "react-router-dom";

import pilotoServices from "services/pilotoServices";

function CadastroPiloto(){
    const navigate = useNavigate()
    const [error, setError] = useState(null);
    const user = useUser();

    // Executa o submit do form
    const handleSubmit = async (ev) => {
        ev.preventDefault();
        setError(null);

        const form = ev.target;
        const data = new FormData(form);

        const driverRef = data.get("driverRef");
        const forename = data.get("forename");
        const number = data.get("number");
        const surname = data.get("surname");
        const code = data.get("code");
        const dob = data.get("dateOfBirth");
        const nationality = data.get("nationality");
        
        console.log({driverRef, number, code, forename, surname, dob, nationality});
        const response = await pilotoServices.postPiloto(driverRef, number, code, forename, surname, dob, nationality);
        if (response.status === 200) {
            navigate('/overview');
        } else
            alert("Erro ao criar piloto, tente novamente!");
    }

    return (
        <section className={`container ${S.wrapper}`}>
            <div className={S.card}>
                <form method="post" onSubmit={handleSubmit}>
                    <div className={S.row_2}>
                        <div className={S.form_group}>
                            <label htmlFor="text">DriverRef <span className="warning">*</span></label>
                            <input type="text" name="driverRef" id="driverRef" required />
                        </div>
                        <div className={S.form_group}>
                            <label htmlFor="password">Forename <span className="warning">*</span></label>
                            <input type="text" name="forename" id="forename" required />
                        </div>
                    </div>
                    <div className={S.row_2}>
                        <div className={S.form_group}>
                            <label htmlFor="text">Number <span className="warning">*</span></label>
                            <input type="text" name="number" id="number" required />
                        </div>
                        <div className={S.form_group}>
                            <label htmlFor="password">Surname <span className="warning">*</span></label>
                            <input type="text" name="surname" id="surname" required />
                        </div>
                    </div>
                    <div className={S.row_2}>
                        <div className={S.form_group}>
                            <label htmlFor="text">Code <span className="warning">*</span></label>
                            <input type="text" name="code" id="code" required />
                        </div>
                        <div className={S.form_group}>
                            <label htmlFor="password">Date of Birth <span className="warning">*</span></label>
                            <input type="date" name="dateOfBirth" id="dateOfBirth" required />
                        </div>
                    </div>
                    <div className={S.form_group}>
                        <label htmlFor="password">Nationality <span className="warning">*</span></label>
                        <input type="text" name="nationality" id="nationality" required />
                    </div>
                    <button type="submit">Cadastrar Piloto</button>
                </form>
                {error && (<p className={`warning ${S.error}`}>{error}</p>)}
            </div>
        </section>
    )
}

export default CadastroPiloto