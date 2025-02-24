import { Role } from '@prisma/client'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserState {
    id: string
    name: string
    email: string
    mobile: string
    role: Role | null
    child: object
}

const initialState: UserState = {
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
        setUser: (state, action: PayloadAction<UserState>) => {
            return action.payload
        },
        clearUser: () => initialState,
    },
})

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer