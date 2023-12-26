/**
 * Created by charnjeetelectrovese@gmail.com on 4/10/2020.
 */
import {formDataRequest, postRequest} from '../libs/AxiosService.util';

export async function serviceCreateProviderUser(params) {
    return await formDataRequest('profile/create', params);
}

export async function serviceUpdateProviderUser(params) {
    return await formDataRequest('profile/update', params);
}

export async function serviceDeleteProviderUser(params) {
    return await formDataRequest('provider/users/delete', params);
}
export async function serviceGetProviderUser(params) {
    return await postRequest('profile', params);
}

export async function serviceGetProviderUserDetail(params) {
    return await postRequest('profile/details', params);
}

export async function serviceProviderUserCheck(params) {
    return await postRequest('provider/users/check', params); //profile/user/lookup
}

export async function serviceProviderUserManager(params) {
    return await postRequest('profile/user/lookup', params); //profile/isexist
}

export async function serviceProviderIsExist(params) {
    return await postRequest('profile/isexist', params); 
}

export async function serviceProfileDetail(params) {
    return await postRequest('profile/details', params); 
}