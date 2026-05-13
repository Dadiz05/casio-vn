import { useState } from 'react'
import type { User } from '@/types'

export default function useAuth() {
  const [user, setUser] = useState<User | null>(null)

  return { user, setUser }
}
