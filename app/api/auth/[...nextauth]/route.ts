import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Usuario", type: "text" },
        password: { label: "Contraseña", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        // Verificar credenciales contra variables de entorno
        const validUsername = process.env.ADMIN_USERNAME;
        const validPasswordHash = process.env.ADMIN_PASSWORD_HASH;

        if (!validUsername || !validPasswordHash) {
          console.error('Credenciales de admin no configuradas en .env.local');
          return null;
        }

        // Verificar username
        if (credentials.username !== validUsername) {
          return null;
        }

        // Verificar password
        const isValidPassword = await bcrypt.compare(
          credentials.password,
          validPasswordHash
        );

        if (!isValidPassword) {
          return null;
        }

        // Autenticación exitosa
        return {
          id: '1',
          name: validUsername,
          email: 'admin@calo.com',
        };
      }
    })
  ],
  pages: {
    signIn: '/admin/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 horas
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
