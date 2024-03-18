import {getRequest, postRequest} from '../libs/AxiosService.util';

export async function serviceCreateTopManufacture(params) {
    return await postRequest('top/manufacture/create', params);
}

export async function serviceUpdateTopManufacture(params) {
    return await postRequest('top/manufacture/update', params);
}

export async function serviceDetailTopManufacture(params) {
    return await postRequest('top/manufacture/details', params);
}
export async function serviceDeleteTopManufacture(params) {
    return await postRequest('top/manufacture/delete', params);
}

export async function serviceGetTopManufacture (params) {
    return await postRequest('top/manufacture', params);
}

export async function serviceTopManufactureSearch (params) {
    return await postRequest('top/manufacture/search', params);
}

