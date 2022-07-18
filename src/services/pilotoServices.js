import api from ".";

export async function report5(driver_id) {
    return api.get(`driver/${driver_id}/wins_by_year/`)
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

export async function report6(driverId) {
    return api.get(`status?driver_id=${driverId}`)
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

export async function overview(driver_id) {
    let data = {}
    await api.get(`driver/${driver_id}/wins/`)
        .then(function (response) {
            // handle success
            data = { ...data, ...response.data }
            return response;
        })
        .catch(function (error) {
            // handle error
            console.log(error);
            return error;
        });
    await api.get(`driver/${driver_id}/years/`)
        .then(function (response) {
            // handle success
            data = { ...data, ...response.data }
            return response;
        })
        .catch(function (error) {
            // handle error
            console.log(error);
            return error;
        });

    console.log(data);
    return data;
}

export async function postPiloto(driverRef, number, code, forename, surname, dob, nationality) {
    return api.post(`driver/`, {
        driverRef,
        number: Number(number),
        code,
        forename,
        surname,
        dob,
        nationality,
        url: ""
    })
        .then(function (response) {
            // handle success
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

export async function getDrivers() {
    return api.get(`driver/`)
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


const pilotoServices = {
    overview,
    report5,
    report6,
    postPiloto,
    getDrivers,
}
export default pilotoServices;
