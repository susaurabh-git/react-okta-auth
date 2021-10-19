import { LOGIN, UPDATE } from "../actions/authAction";
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
    case `${LOGIN}`: {
      return {
        ...state,
        status: "Login",
        transaction: action.payload,
      };
    }
    case `${LOGIN}_PENDING`: {
      return {
        ...state,
        status: "Login_Pending",
      };
    }
    case `${LOGIN}_FULFILLED`: {
      return {
        ...state,
        status: "Login_Fulfilled",
        transaction: action.payload,
      };
    }
    case `${LOGIN}_REJECTED`: {
      return {
        ...state,
        status: "Login_Rejected",
        error: action.payload,
      };
    }
    default:
      return state;
  }
};
export default authReducer;
