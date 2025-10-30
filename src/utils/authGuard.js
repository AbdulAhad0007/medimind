'use client'
import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../lib/firebase'

export default function authGuard(Component) {
  return function AuthenticatedComponent(props) {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (u) => {
        if (u) {
          setUser(u)
        } else {
          window.location.href = '/login'
        }
        setLoading(false)
      })

      return () => unsubscribe()
    }, [])

    if (loading) {
      return <p className="text-center mt-10">Checking authentication...</p>
    }

    return <Component {...props} user={user} />
  }
}
