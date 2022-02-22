import {formDataRequest, postRequest} from '../libs/AxiosService.util';

export async function serviceCreateSubCategory(params) {
    return await formDataRequest('subcategory/create', params);
}
export async function serviceUpdateSubCategory(params) {
    return await formDataRequest('subcategory/update', params);
}

export async function serviceDeleteSubCategory(params) {
    return await formDataRequest('subcategory/delete', params);
}

export async function serviceGetSubCategory(params) {
    return await postRequest('subcategory', params);
}
