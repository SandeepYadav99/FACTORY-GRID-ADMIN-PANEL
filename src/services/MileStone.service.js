import { postRequest} from '../libs/AxiosService.util';

export async function serviceMilestoneCreate(params) {
    return await postRequest('master/milestone/create', params);
}

export async function serviceMilestoneUpdate(params) {
    return await postRequest('master/milestone/update', params);
}

export async function serviceMilestoneList(params) {
    return await postRequest('master/milestone', params);
}

export async function serviceMilestoneDetail(params) {
    return await postRequest('master/milestone/details', params);
}

export async function serviceMilestoneDelete(params) {
    return await postRequest('master/milestone/delete', params);
}