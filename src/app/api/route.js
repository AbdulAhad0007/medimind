import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

// This will be your NextAuth config
const authOptions = {
  providers: [
    // Google login
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    // Email/password login (credentials provider)
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Here you can check against your DB (e.g., Firestore)  
        // For demo, using hardcoded example:
        if (
          credentials.email === 'test@example.com' &&
          credentials.password === '123456'
        ) {
          return { id: 1, name: 'Test User', email: 'test@example.com' }
        }
        return null
      },
    }),
  ],

  pages: {
    signIn: '/login', // Custom login page
  },

  session: { strategy: 'jwt', maxAge: 60 * 60 * 24 * 7 },

  callbacks: {
    async session({ session, token }) {
      if (session?.user && token) {
        session.user.id = token.sub
      }
      return session
    },
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
