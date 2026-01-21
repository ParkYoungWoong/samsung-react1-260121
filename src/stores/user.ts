import { create } from 'zustand'
import { combine } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

interface User {
  displayName: string
  isValid: boolean
  address: {
    city: string
    country: string
    emails: string[]
  }
}
export const useUserStore = create(
  immer(
    combine(
      {
        user: null as User | null
      },
      (set, get) => ({
        signIn: () => {
          set({
            user: {
              displayName: 'HEROPY',
              isValid: true,
              address: {
                city: 'Seoul',
                country: 'Korea',
                emails: ['thesecon@gmail.com', 'thesecon@naver.com']
              }
            }
          })
        },
        setFirstEmail: (newEmail: string) => {
          set(state => {
            if (!state.user) return
            state.user.address.emails[0] = newEmail
          })
          // set({
          //   user: {
          //     ...user,
          //     address: {
          //       ...user.address,
          //       emails: [newEmail, user.address.emails[1]]
          //     }
          //   }
          // })
        },
        setDisplayName: (name: string) => {
          const { user } = get()
          if (!user) return
          set({
            user: {
              ...user,
              displayName: name
            }
          })
        }
      })
    )
  )
)
