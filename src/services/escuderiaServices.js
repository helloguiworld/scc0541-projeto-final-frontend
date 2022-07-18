import api from ".";

export async function report3(constructor_id) {
    return api.get(`driver/wins_by_constructor/${constructor_id}/`)
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

export async function report4(constructor_id) {
    return api.get(`status?constructor_id=${constructor_id}`)
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

export async function overview(constructor_id) {
    let data = {}
    await api.get(`constructor/${constructor_id}/wins/`)
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
    await api.get(`constructor/${constructor_id}/drivers/`)
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
    await api.get(`constructor/${constructor_id}/years/`)
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

export async function getEscuderiaDriver(constructor_id, forename) {
    return api.get(`constructor/${constructor_id}/drivers/${forename}/`)
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

export async function getEscuderia(constructor_id) {
    return api.get(`constructor/${constructor_id}/`)
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

export async function postEscuderia(constructorRef, name, nationality, url) {
    return api.post(`constructor/`, {
        constructorRef,
        name,
        nationality,
        url
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

const escuderiaServices = {
    overview,
    report3,
    report4,
    getEscuderiaDriver,
    getEscuderia,
    postEscuderia,
}
export default escuderiaServices;
