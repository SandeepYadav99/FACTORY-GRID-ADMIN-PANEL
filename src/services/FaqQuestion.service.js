/**
 * Created by charnjeetelectrovese@gmail.com on 1/1/2020.
 */
import {formDataRequest, postRequest} from '../libs/AxiosService.util';


export async function serviceFetchFaqQuestion(params) {
    return await postRequest('faq/question', params);
}
export async function serviceCreateFaqQuestion(params) {
    return await formDataRequest('faq/question/create', params);
}

export async function serviceUpdateFaqQuestion(params) {
    return await formDataRequest('faq/question/update', params);
}

export async function serviceDeleteFaqQuestion(params) {
    return await formDataRequest('faq/question/delete', params);
}

export async function serviceFaqQuestionExists(params) {
    return await postRequest('faq/exists', params);
}

export async function serviceUploadFaqQuestionImage(params) {
    return await formDataRequest('faq/upload/image', params);
}
