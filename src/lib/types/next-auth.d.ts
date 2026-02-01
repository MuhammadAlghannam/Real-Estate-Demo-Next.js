import type { DefaultSession, DefaultUser } from "next-auth";
import type { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  /**
   * Returned by useSession, getSession and received as a prop on the SessionProvider React Context
   */
  interface Session extends DefaultSession {
    user: AdapterUser & ApiUser;
    token?: string;
    refresh_token?: string;
    expires_in?: string;
    refresh_expires_at?: string;
    error?: string;
  }
  /**
   * The shape of the user object returned in the OAuth providers' profile callback,
   * or the second parameter of the session callback, when using a database.
   */
  interface User extends DefaultUser {
    access_token?: string;
    user: ApiUser;
    refresh_token?: string;
    expires_in?: string;
    refresh_expires_at?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    accessToken?: string;
    user?: ApiUser;
    refresh_token?: string;
    expires_in?: string;
    refresh_expires_at?: string;
    error?: string;
    accessToken?: string;
    user?: ApiUser;
    refresh_token?: string;
    expires_in?: string;
    accessTokenExpires?: number;
    refresh_expires_at?: string;
    error?: string;
  }
}
