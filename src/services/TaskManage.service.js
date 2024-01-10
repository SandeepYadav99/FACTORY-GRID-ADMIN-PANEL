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