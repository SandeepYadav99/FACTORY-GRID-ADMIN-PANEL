/**
 * Created by charnjeetelectrovese@gmail.com on 1/1/2020.
 */
import {formDataRequest, postRequest} from '../libs/AxiosService.util';


export async function serviceFetchFaq(params) {
    return await postRequest('faq/category', params);
}
export async function serviceCreateFaq(params) {
    return await formDataRequest('faq/category/create', params);
}

export async function serviceUpdateFaq(params) {
    return await formDataRequest('faq/category/update', params);
}

export async function serviceDeleteFaq(params) {
    return await formDataRequest('faq/category/delete', params);
}

export async function serviceFaqExists(params) {
    return await postRequest('faq/exists', params);
}

export async function serviceUploadBlogImage(params) {
    return await formDataRequest('faq/upload/image', params);
}
