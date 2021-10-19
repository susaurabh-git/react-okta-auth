const SCOPE = "oktaAuth/";
export const LOGIN = `${SCOPE}LOGIN`;
export const UPDATE = `${SCOPE}UPDATE`;

export const authAction = {
  update: (transaction) => ({
    type: UPDATE,
    payload: transaction,
  }),
};
