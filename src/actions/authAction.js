import AuthService from "../services/AuthService";
const SCOPE = "oktaAuth/";
export const LOGIN = `${SCOPE}LOGIN`;
export const UPDATE = `${SCOPE}UPDATE`;

export const authAction = {
  login: (username, password) => ({
    type: LOGIN,
    payload: { promise: AuthService.login(username, password) },
  }),
  update: (transaction) => ({
    type: UPDATE,
    payload: transaction,
  }),
};
