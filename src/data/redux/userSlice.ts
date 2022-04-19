import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        value: {
            displayName: undefined,
            user_id: undefined,
            imgSrc:"img_src",
        }
    },
    reducers: {
        user_id: (state, action) => {
            state.value.user_id = action.payload;
        },
        userDisplayName: (state, action) => {
            state.value.displayName = action.payload;
        },
        imgSrc:(state,action) => {
            state.value.imgSrc = action.payload;
        }
    }
})

export const { user_id, userDisplayName,imgSrc }  = userSlice.actions;

export default userSlice.reducer;