const oktaAuthConfig = {
  // Note: If your app is configured to use the Implicit flow
  // instead of the Authorization Code with Proof of Code Key Exchange (PKCE)
  // you will need to add `pkce: false`
  issuer: "https://dev-27949756.okta.com/oauth2/default",
  clientId: "0oa27jq1l01BjKokn5d7",
  redirectUri: window.location.origin + "/login/callback",
  pkce: true,
};

const oktaSignInConfig = {
  baseUrl: "https://dev-27949756.okta.com",
  clientId: "0oa27jq1l01BjKokn5d7",
  redirectUri: window.location.origin + "/login/callback",
  authParams: {
    // If your app is configured to use the Implicit flow
    // instead of the Authorization Code with Proof of Code Key Exchange (PKCE)
    // you will need to uncomment the below line
    // pkce: false
  },
};

export { oktaAuthConfig, oktaSignInConfig };
