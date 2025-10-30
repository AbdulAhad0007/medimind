import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'

export default async function ProfilePage() {
  const session = await getServerSession(authOptions)
  if (!session) {
    return <p className="container-page py-8 text-gray-600">You must be logged in to view this page.</p>
  }

  return (
    <div className="container-page py-8">
      <img src="/images/secure.svg" alt="Profile" className="w-10 h-10 mb-3" />
      <h1 className="text-3xl font-bold">Welcome, {session.user.name}!</h1>
      <p className="text-sm text-gray-600 mt-1">Manage your account and privacy preferences here.</p>
    </div>
  )
}
