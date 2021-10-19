const SCOPE = "oktaAuth/";
export const UPDATE = `${SCOPE}UPDATE`;

export const authAction = {
  update: (transaction) => ({
    type: UPDATE,
    payload: transaction,
  }),
};
