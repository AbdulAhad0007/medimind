'use client'
import { useEffect, useState } from 'react'
import { auth } from '../../lib/firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'

export default function Dashboard() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (u) {
        setUser(u)
      } else {
        window.location.href = '/login'
      }
    })
    return () => unsub()
  }, [])

  const logout = async () => {
    await signOut(auth)
    window.location.href = '/'
  }

  return (
    <div className="container-page py-8">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      {user && (
        <div className="card">
          <p className="text-gray-700">Welcome, <span className="font-semibold">{user.displayName}</span></p>
          <p className="text-sm text-gray-500 mt-1">Your recent activity and saved chats will appear here.</p>
          <button onClick={logout} className="mt-4 bg-red-600">
            Logout
          </button>
        </div>
      )}
    </div>
  )
}
