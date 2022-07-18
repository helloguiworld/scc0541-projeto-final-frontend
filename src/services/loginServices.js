import api from ".";

export async function login(username, password) {
    return api.post(`login/`, {
        username,
        password
    })
        .then(function (response) {
            // handle success
            console.log(response);
            return response;
        })
        .catch(function (error) {
            // handle error
            console.log(error);
            if (error.response) {
                console.log(error.response.data);
            }
            return error;
        });
}

const loginServices = {
    login,
}
export default loginServices;