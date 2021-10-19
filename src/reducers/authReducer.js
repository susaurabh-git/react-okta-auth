import { UPDATE } from "../actions/authAction";
const initialState = {};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${UPDATE}`: {
      return {
        ...state,
        status: "Update",
        transaction: action.payload,
      };
    }

    default:
      return state;
  }
};
export default authReducer;
