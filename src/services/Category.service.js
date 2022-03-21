import {formDataRequest, postRequest} from '../libs/AxiosService.util';

export async function serviceCreateCategory(params) {
    return await formDataRequest('category/create', params);
}
export async function serviceUpdateCategory(params) {
    return await formDataRequest('category/update', params);
}

export async function serviceDeleteCategory(params) {
    return await formDataRequest('category/delete', params);
}

export async function serviceGetCategory(params) {
    return await postRequest('category', params);
}

export async function serviceCategoryCheck (params) {
    return await postRequest('category/check', params);
}
