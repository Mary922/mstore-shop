import {createSlice} from "@reduxjs/toolkit";

export const appCommonSlice = createSlice({
    name: "appCommon",
    token: null,
    initialState: {
        canvasOnShow: false,
        canvasLeftOnShow: false,
        filteredProductIds: [],
    },
    reducers: {
        getFilteredProducts: (state, action) => {
            state.filteredProductIds = action.payload;
        },
    }
})
export const {getFilteredProducts} = appCommonSlice.actions;
export default appCommonSlice.reducer;