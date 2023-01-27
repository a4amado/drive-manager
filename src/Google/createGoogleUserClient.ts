import { Auth, google } from "googleapis";

class GoogleUserClient {
  client: Auth.OAuth2Client;
  constructor() {
    this.client = new google.auth.OAuth2({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      redirectUri: "http://localhost:3000/api/auth/callback/google",
    });
  }
}

export default GoogleUserClient;
