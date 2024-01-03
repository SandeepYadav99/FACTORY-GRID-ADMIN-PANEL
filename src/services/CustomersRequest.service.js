import {formDataRequest, postRequest} from '../libs/AxiosService.util';

export async function serviceCreateCustomers(params) {
    return await formDataRequest('customers/create', params);
}
export async function serviceUpdateCustomers(params) {
    return await formDataRequest('customers/update', params);
}

export async function serviceGetCustomers(params) {
    return await postRequest('customers', params);
}

export async function serviceGetCustomersProfile(params) {
    return await postRequest('user/get/user/profile', params);
}

export async function serviceGetUserSuspend(params) {
    return await postRequest('user/suspend', params);
}

export async function serviceResetUserEmail(params) { // user/update/bank/status
    return await postRequest('user/send/email', params);
}

export async function serviceResetUserStatusUpdate(params) { // user/update/bank/status
    return await postRequest('user/update/bank/status', params);
}