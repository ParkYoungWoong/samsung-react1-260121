import { create } from 'zustand'
import { combine, subscribeWithSelector } from 'zustand/middleware'

export const useCountStore = create(
  subscribeWithSelector(
    combine(
      {
        count: 0,
        double: 0
      },
      (set, get) => {
        return {
          increase() {
            const { count } = get()
            set({
              count: count + 1,
              double: (count + 1) * 2
            })
          }
        }
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
