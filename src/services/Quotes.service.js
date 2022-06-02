import { postRequest} from '../libs/AxiosService.util';

export async function serviceGetQuotes(params) {
    return await postRequest('quotes', params);
}

export async function serviceGetQuoteDetail(params) {
    return await postRequest('quotes/detail', params);
}

export async function serviceGetQuoteNotes(params) {
    return await postRequest('quote/notes', params);
}

export async function serviceChangeQuoteStatus(params) {
    return await postRequest('quote/change/status', params);
}

export async function serviceChangeQuotePriority(params) {
    return await postRequest('quote/change/priority', params);
}

export async function serviceAddQuoteNote(params) {
    return await postRequest('quote/notes/create', params);
}

export async function serviceAssignUserToQuote(params) {
    return await postRequest('quote/assign/user', params);
}

export async function serviceGetQuoteUsers(params) {
    return await postRequest('quote/users/crm', params);
}
