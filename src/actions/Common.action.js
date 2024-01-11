import { reset } from "redux-form";
import { serviceTaskManagementDetail } from "../services/ProviderUser.service";



export const GET_TASK_DETAIL = 'GET_TASK_DETAIL';

export function actionTaskManagementDetail(taskId) {
    const request = serviceTaskManagementDetail({id: taskId});
    return (dispatch) => {
        dispatch({ type: GET_TASK_DETAIL, payload: null });
        request.then((res) => {
          
            if (!reset.error) {
                dispatch({ type: GET_TASK_DETAIL, payload: res.data })
            }
        })
    }
}