import { User } from '@/types/user'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: User = {
    id: "",
    name: "",
    email: "",
    mobile: "",
    role: null,
    child: {}
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            return action.payload
        },
        clearUser: () => initialState,
    },
})

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer