/* eslint-disable import/no-anonymous-default-export */

import { GET_TASK_DETAIL } from "../actions/Common.action";

const initialState = {
  present: [],
};

export default function (
  state = JSON.parse(JSON.stringify(initialState)),
  action
) {
  switch (action.type) {
    case GET_TASK_DETAIL: {
      const newData = action.payload;
      return {
        ...state,
        present: newData,
      };
    }
    default: {
      return state;
    }
  }
}
