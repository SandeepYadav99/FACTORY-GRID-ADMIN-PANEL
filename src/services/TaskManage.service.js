import { postRequest } from "../libs/AxiosService.util";


export async function serviceTaskMnagmentUpdateStatus(params) {
    return await postRequest('task/management/update/status', params); ///task/management/notes/create
}

export async function serviceTaskMnagmentNotesCreate(params) {
    return await postRequest('task/management/notes/create', params); ///task/management/notes/create
}

export async function serviceTaskMnagmentNotesList(params) {
    return await postRequest('task/management/notes/by/task', params); ///task/management/notes/create
}

export async function serviceTaskMnagmentDetail(params) {
    return await postRequest('task/management/details', params); ///task/management/notes/create
}

export async function serviceTaskMnagmentUpdate(params) {
    return await postRequest('task/management/update', params); ///task/management/notes/create
}

export async function serviceSearchCategory(params) {
    return await postRequest('task/category', params); // task/management/search/task
}