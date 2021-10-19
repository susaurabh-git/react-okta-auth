import { OktaAuth } from "@okta/okta-auth-js";
const oktaAuthClient = new OktaAuth({
  issuer: "https://dev-27949756.okta.com/oauth2/default",
  clientId: "0oa27jq1l01BjKokn5d7",
  responseType: "code",
  redirectUri: window.location.origin + "/login/callback",
  pkce: true,
});
export default oktaAuthClient;
