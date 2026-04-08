import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),

  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    Credentials({
      credentials: {
        email:    { label: 'E-posta',  type: 'email' },
        password: { label: 'Şifre',    type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const user = await prisma.user.findUnique({
          where: { email: String(credentials.email) },
        })
        if (!user?.passwordHash) return null

        const valid = await bcrypt.compare(
          String(credentials.password),
          user.passwordHash,
        )
        if (!valid) return null

        return {
          id:    user.id,
          name:  user.name,
          email: user.email,
          image: user.image,
          role:  user.role,
        }
      },
    }),
  ],

  // Credentials provider JWT gerektiriyor
  session: { strategy: 'jwt' },

  pages: {
    signIn: '/giris',
  },

  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id   = user.id
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        token.role = (user as any).role as string | undefined
      }
      return token
    },
    session({ session, token }) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(session.user as any).id   = token.id
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(session.user as any).role = token.role
      return session
    },
  },
})
