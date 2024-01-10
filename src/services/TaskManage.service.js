import { postRequest } from "../libs/AxiosService.util";


export async function serviceTaskMnagmentUpdateStatus(params) {
    return await postRequest('task/management/update/status', params); // task/management/search/task
}