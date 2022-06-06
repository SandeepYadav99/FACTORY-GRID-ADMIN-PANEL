import {getRequest, postRequest} from '../libs/AxiosService.util';

export async function serviceGetQuotes(params) {
    return await postRequest('quotes', params);
}

export async function serviceGetQuoteDetail(params) {
    return await postRequest('quotes/detail', params);
}

export async function serviceGetQuoteNotes(params) {
    return await postRequest('quotes/notes', params);
}

export async function serviceChangeQuoteStatus(params) {
    return await postRequest('quotes/change/status', params);
}

export async function serviceChangeQuotePriority(params) {
    return await postRequest('quotes/change/priority', params);
}

export async function serviceAddQuoteNote(params) {
    return await postRequest('quotes/notes/create', params);
}

export async function serviceAssignUserToQuote(params) {
    return await postRequest('quotes/assign/user', params);
}

export async function serviceGetQuoteUsers(params) {
    return await getRequest('list/admin/users', params);
}

export async function serviceGetQuoteTimeline(params) {
    return await postRequest('quotes/timeline', params);
}
