/**
 * Created by charnjeetelectrovese@gmail.com on 12/19/2019.
 */
import {formDataRequest, postRequest} from '../libs/AxiosService.util';

export async function serviceCreateBadge(params) {
    return await formDataRequest('badges/create', params);
}

export async function serviceUpdateBadge(params) {
    return await formDataRequest('badges/update', params);
}

export async function serviceDeleteBadge(params) {
    return await formDataRequest('badges/delete', params);
}

export async function serviceGetBadge (params) { // /delete/gallery
    return await postRequest('badges', params);
}

export async function serviceDeleteGallery (params) { // /delete/gallery
    return await postRequest('delete/gallery', params);
}

export async function serviceDeleteCertificates (params) { // /delete/gallery
    return await postRequest('delete/certificate', params);
}