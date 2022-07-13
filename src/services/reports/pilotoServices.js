import api from "../";

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

const pilotoServices = {
    report5,
    report6,
}
export default pilotoServices;
