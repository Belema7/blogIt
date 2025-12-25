import { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import { URL } from '../url'

export const UserContext = createContext(null)

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUser()
  }, [])

  const fetchUser = async () => {
    try {
      const res = await axios.get(`${URL}/api/auth/refetch`, {
        withCredentials: true,
      })
      setUser(res.data)
    } catch (error) {
      console.error(error)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider
