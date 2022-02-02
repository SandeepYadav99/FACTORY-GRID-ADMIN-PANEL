/**
 * Created by charnjeetelectrovese@gmail.com on 4/10/2020.
 */
import {formDataRequest, postRequest,getRequest} from '../libs/AxiosService.util';

export async function serviceCreateIndustry(params) {
    return await formDataRequest('industry/create', params);
}

export async function serviceUpdateIndustry(params) {
    return await formDataRequest('industry/update', params);
}

export async function serviceDeleteIndustry(params) {
    return await formDataRequest('industry/delete', params);
}
export async function serviceGetIndustry (params) {
    return await postRequest('industry/', params);
}

export async function serviceGetIndustryList (params) {
    return await getRequest('/industries', params);
}

export async function serviceIndustryCheck (params) {
    return await postRequest('industry/check', params);
}
