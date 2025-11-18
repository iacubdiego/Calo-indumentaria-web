// lib/auth.ts
import { NextAuthOptions } from 'next-auth';
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
          console.log('❌ Faltan credenciales');
          return null;
        }

        const validUsername = process.env.ADMIN_USERNAME;
        const validPasswordHash = process.env.ADMIN_PASSWORD_HASH;

        console.log('🔍 Debug - Username env:', validUsername);
        console.log('🔍 Debug - Hash env existe:', !!validPasswordHash);
        console.log('🔍 Debug - Username ingresado:', credentials.username);

        if (!validUsername || !validPasswordHash) {
          console.error('❌ Credenciales no configuradas en .env.local');
          return null;
        }

        if (credentials.username !== validUsername) {
          console.log('❌ Username incorrecto');
          return null;
        }

        try {
          const isValidPassword = await bcrypt.compare(
            credentials.password,
            validPasswordHash
          );

          console.log('🔍 Debug - Password válido:', isValidPassword);

          if (!isValidPassword) {
            console.log('❌ Password incorrecto');
            return null;
          }

          console.log('✅ Autenticación exitosa');
          return {
            id: '1',
            name: validUsername,
            email: 'admin@calo.com',
          };
        } catch (error) {
          console.error('❌ Error al comparar password:', error);
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: '/admin/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60,
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