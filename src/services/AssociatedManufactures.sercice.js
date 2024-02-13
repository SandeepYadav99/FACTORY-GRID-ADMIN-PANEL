import { postRequest} from '../libs/AxiosService.util';

export async function serviceAssociatedList(params) {
    return await postRequest('profile/associate/user', params);
}