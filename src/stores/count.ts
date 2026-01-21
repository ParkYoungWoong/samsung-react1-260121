import { create } from 'zustand'
import {
  combine,
  subscribeWithSelector,
  persist,
  devtools
} from 'zustand/middleware'

export const useCountStore = create(
  devtools(
    persist(
      subscribeWithSelector(
        combine(
          {
            count: 7,
            double: 0
          },
          (set, get) => {
            return {
              increase() {
                const { count } = get()
                set({
                  count: count + 1
                })
              },
              decrease() {
                const { count } = get()
                set({
                  count: count - 1
                })
              }
            }
          }
        )
      ),
      {
        name: 'countStore!!',
        version: 1
      }
    )
  )
)

useCountStore.subscribe(
  state => state.count,
  count => {
    useCountStore.setState({
      double: count * 2
    })
  }
)

// localStorage.getItem('이름')
// localStorage.setItem('이름', 값)
