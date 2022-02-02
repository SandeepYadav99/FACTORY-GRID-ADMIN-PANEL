/**
 * Created by charnjeetelectrovese@gmail.com on 12/19/2019.
 */
import {formDataRequest, postRequest} from '../libs/AxiosService.util';

export async function serviceCreateBadge(params) {
    return await formDataRequest('badge/create', params);
}

export async function serviceUpdateBadge(params) {
    return await formDataRequest('badge/update', params);
}

export async function serviceDeleteBadge(params) {
    return await formDataRequest('badge/delete', params);
}

export async function serviceGetBadge (params) {
    return await postRequest('badge', params);
}
