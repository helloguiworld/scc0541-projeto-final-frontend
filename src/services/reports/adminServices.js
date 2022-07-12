import api from "../";

export async function report1() {
    return api.get(`ws/01001000/json/`)
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
        })
        .finally(function () {
            // always executed
        });
}

export async function report2() {
    return api.get(`ws/01001000/json/`)
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
        })
        .finally(function () {
            // always executed
        });
}

const adminServices = {
    report1,
    report2,
}
export default adminServices;
