import api from "../";

export async function report1() {
    return api.get(`status/`)
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

export async function report2(city_name) {
    return api.get(`airport/${city_name}/distance/`)
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
