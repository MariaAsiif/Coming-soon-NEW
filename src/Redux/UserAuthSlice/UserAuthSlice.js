import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loginInfo: {
        token: null
    },
    userInfo: {
        name: ""
    }
}
export const UserAuthSlice = createSlice({
    name: 'UserAuthSlice',
    initialState,
    reducers: {
        signin: (state, action) => {
            state.loginInfo.token = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { signin } = UserAuthSlice.actions

export default UserAuthSlice.reducer