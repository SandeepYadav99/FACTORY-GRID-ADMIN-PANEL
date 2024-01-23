/**
 * Created by charnjeetelectrovese@gmail.com on 12/19/2019.
 */
import {formDataRequest, postRequest} from '../libs/AxiosService.util';

export async function serviceCreateService(params) {
    return await formDataRequest('service/create', params);
}

export async function serviceUpdateService(params) {
    return await formDataRequest('service/update', params);
}

export async function serviceDeleteService(params) {
    return await formDataRequest('service/delete', params);
}

export async function serviceGetService (params) { // /delete/gallery
    return await postRequest('service', params);
}

export async function serviceDeleteGallery (params) { // /delete/gallery
    return await postRequest('delete/gallery', params);
}

export async function serviceDeleteCertificates (params) { // Services/create
    return await postRequest('delete/certificate', params);
}

export async function serviceServiceCreate (params) { // Services/create
    return await formDataRequest('service/create', params);
}

export async function serviceServiceUpdate(params) { // Services/create
    return await formDataRequest('service/update', params);
}

export async function serviceDetail(params) { // Services/create
    return await formDataRequest('service/details', params);
}

