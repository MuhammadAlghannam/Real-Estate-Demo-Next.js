import { DisabledAccountError, InvalidCredentialsError } from "@/lib/errors/auth-errors";
import NextAuth, { NextAuthConfig } from "next-auth";
import { JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import { getBaseHeaders } from "./lib/constants/api.constants";

async function refreshAccessToken(token: JWT) {
  try {
    const response = await fetch(
      `${process.env.APIS_URL}/not-the-real-end-point?refresh_token=${token.refresh_token}`,
      {
        cache: "no-store",
      },
    );

    if (!response.ok) {
      throw new Error("Failed to refresh access token");
    }

    const newTokens = await response.json();
    const newExpiry = Date.now() + newTokens.expires_in * 1000;
    const safeExpiry = Math.max(newExpiry, Date.now() + 5000);

    return {
      ...token,
      accessToken: newTokens.access_token,
      refresh_token: newTokens.refresh_token,
      expires_in: newTokens.expires_in,
      refresh_expires_at: newTokens.refresh_expires_at,
      accessTokenExpires: safeExpiry,
    };
  } catch {
    return {
      ...token,
      error: "RefreshTokenExpiredError",
    };
  }
}

const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        if (credentials === null) return null;

        try {
          const headers = await getBaseHeaders();
          const response = await fetch(`${process.env.APIS_URL}/not-the-real-end-point`, {
            method: "POST",
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
            headers: headers,
          });

          if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            const errorMessage = errorData?.message || "Invalid Email or Password";

            // Throw custom error based on backend message
            throw errorMessage === "Disabled Account"
              ? new DisabledAccountError()
              : new InvalidCredentialsError();
          }

          const payload: LoginResponse = await response.json();

          // Return a user object with all fields you need (matching your User type augmentation)
          return {
            access_token: payload.access_token,
            user: payload.user,
            refresh_token: payload.refresh_token,
            expires_in: payload.expires_in?.toString(),
            refresh_expires_at: payload.refresh_expires_at,
          };
        } catch (error) {
          // Re-throw custom errors, otherwise throw InvalidCredentialsError
          if (error instanceof InvalidCredentialsError || error instanceof DisabledAccountError) {
            throw error;
          }
          throw new InvalidCredentialsError();
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, account, user }) => {
      if (user && account) {
        const expiresIn =
          typeof user.expires_in === "string" ? parseInt(user.expires_in) : user.expires_in || 60;
        return {
          ...token,
          accessToken: user.access_token,
          user: user.user,
          refresh_token: user.refresh_token,
          expires_in: user.expires_in,
          refresh_expires_at: user.refresh_expires_at,
          accessTokenExpires: Date.now() + expiresIn * 1000,
        };
      }

      if (token.error) {
        return token;
      }

      if (token.accessTokenExpires && Date.now() < (token.accessTokenExpires as number) - 30000) {
        return token;
      }

      const refreshExpiry = new Date(token.refresh_expires_at as string).getTime();
      if (Date.now() > refreshExpiry) {
        return {
          ...token,
          error: "RefreshTokenExpiredError",
        };
      }

      return await refreshAccessToken(token);
    },
    session: async ({ session, token }) => {
      if (token) {
        session.token = token.accessToken;
        session.user = token.user;
        session.refresh_token = token.refresh_token;
        session.expires_in = token.expires_in;
        session.refresh_expires_at = token.refresh_expires_at;
        session.error = token.error;
      }
      return session;
    },
    authorized({ auth }) {
      return !!auth?.user;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
