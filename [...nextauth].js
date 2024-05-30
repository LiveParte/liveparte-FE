import { client_id, client_secret } from "@/utils/helper";
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";

// import GithubProvider from "next-auth/providers/github"
export default NextAuth({
    providers: [
      GoogleProvider({
        clientId: client_id,
        clientSecret: client_secret,
      }),
    ],
    secret: `hekooojd`,
  });