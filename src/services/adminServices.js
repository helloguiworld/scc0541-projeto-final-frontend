import api from ".";

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
        });
}

export async function overview() {
    let data = {}
    await api.get(`driver?count_only=true`)
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
    await api.get(`constructor/`)
        .then(function (response) {
            // handle success
            data = { ...data, constructors_count: response.data.length }
            return response;
        })
        .catch(function (error) {
            // handle error
            console.log(error);
            return error;
        });
    await api.get(`race/count/`)
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
    await api.get(`season/count/`)
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

const adminServices = {
    overview,
    report1,
    report2,
}
export default adminServices;
