import LoginForm from 'components/LoginForm'

import { useUser } from 'contexts/user'
import { Navigate } from 'react-router-dom';


function Login(){
    const loggedIn = Boolean(useUser()); //Verifica se o usuário é null ou não

    return (
        <>
            { loggedIn && <Navigate to="/overview" /> }
            <LoginForm/>
        </>
    )
}

export default Login