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
        signout: (state) => {
            state.loginInfo.token = null
        },
    },
})

// Action creators are generated for each case reducer function
export const { signin, signout } = UserAuthSlice.actions

export default UserAuthSlice.reducer