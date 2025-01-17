import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedId = !!auth?.user
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard')
      if (isOnDashboard) {
        if (isLoggedId) return true
        return false
      } else if (isLoggedId) {
        return Response.redirect(new URL('/dashboard', nextUrl))
      }
      return true
    }
  },
  providers: []
} satisfies NextAuthConfig;