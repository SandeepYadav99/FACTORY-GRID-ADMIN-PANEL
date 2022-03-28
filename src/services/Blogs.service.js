/**
 * Created by charnjeetelectrovese@gmail.com on 1/1/2020.
 */
import {formDataRequest, postRequest} from '../libs/AxiosService.util';


export async function serviceFetchBlogs(params) {
    return await postRequest('blogs', params);
}
export async function serviceCreateBlogs(params) {
    return await formDataRequest('blogs/create', params);
}

export async function serviceUpdateBlogs(params) {
    return await formDataRequest('blogs/update', params);
}

export async function serviceDeleteBlogs(params) {
    return await formDataRequest('blogs/delete', params);
}


export async function serviceBlogsExists(params) {
    return await postRequest('blogs/exists', params);
}

export async function serviceUploadBlogImage(params) {
    return await formDataRequest('blogs/upload/image', params);
}

export async function serviceGetTagsList(params) {
    return await postRequest('tags', params);
}
