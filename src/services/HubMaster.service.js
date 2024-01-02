import { postRequest} from '../libs/AxiosService.util';

export async function serviceHubMasterCreate(params) {
    return await postRequest('hub/master/create', params);
}

export async function serviceHubMasterUpdate(params) {
    return await postRequest('hub/master/update', params);
}

export async function serviceHubMasterList(params) {
    return await postRequest('hub/master', params);
}

export async function serviceHubMasterDetail(params) {
    return await postRequest('hub/master/details', params);
}

