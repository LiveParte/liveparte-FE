import { client_id, client_secret } from '@/utils/helper';
import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = { 
  providers: [
    GoogleProvider({
      clientId: client_id,
      clientSecret: client_secret,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
};

export default NextAuth(authOptions);
